"use client";

import { useState, useEffect } from "react";
import { fetchProfileMetadata } from "@/lib/erc725";

interface CommunityProfileImages {
  profileImage?: string;
  backgroundImage?: string;
}

interface LSP3ProfileValue {
  LSP3Profile?: {
    name?: string;
    description?: string;
    profileImage?: Array<{ url?: string }>;
    backgroundImage?: Array<{ url?: string }>;
  };
}

/**
 * Convert IPFS URL to HTTP gateway URL
 */
function resolveIPFSUrl(url?: string): string | undefined {
  if (!url) return undefined;

  if (url.startsWith("ipfs://")) {
    return `https://api.universalprofile.cloud/ipfs/${url.slice(7)}`;
  }

  return url;
}

// Cache for profile images to avoid re-fetching
const profileCache = new Map<string, CommunityProfileImages>();

/**
 * Custom hook to fetch profile and background images for a Universal Profile address
 */
export function useCommunityProfile(profileAddress?: string) {
  const [images, setImages] = useState<CommunityProfileImages>(() => {
    // Check cache on initial render
    if (profileAddress && profileCache.has(profileAddress)) {
      return profileCache.get(profileAddress)!;
    }
    return {};
  });
  const [isLoading, setIsLoading] = useState(() => {
    // Start loading if we have an address and no cached data
    return !!profileAddress && !profileCache.has(profileAddress);
  });

  useEffect(() => {
    async function fetchImages() {
      if (!profileAddress) {
        setImages({});
        setIsLoading(false);
        return;
      }

      // Check cache first
      if (profileCache.has(profileAddress)) {
        setImages(profileCache.get(profileAddress)!);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const metadata = (await fetchProfileMetadata(
          profileAddress
        )) as LSP3ProfileValue | null;

        if (metadata?.LSP3Profile) {
          const lsp3 = metadata.LSP3Profile;

          const profileImageUrl = lsp3.profileImage?.[0]?.url;
          const backgroundImageUrl = lsp3.backgroundImage?.[0]?.url;

          const newImages = {
            profileImage: resolveIPFSUrl(profileImageUrl),
            backgroundImage: resolveIPFSUrl(backgroundImageUrl),
          };

          // Cache the result
          profileCache.set(profileAddress, newImages);
          setImages(newImages);
        }
      } catch (err) {
        console.error("Error fetching community profile images:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchImages();
  }, [profileAddress]);

  return { images, isLoading };
}
