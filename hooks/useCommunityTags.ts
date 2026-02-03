"use client";

import { useState, useEffect, useMemo } from "react";
import { fetchProfileMetadata } from "@/lib/erc725";
import { luksoMainnet } from "@/lib/wagmi";

interface LSP3ProfileValue {
  LSP3Profile?: {
    name?: string;
    description?: string;
    tags?: string[];
    profileImage?: Array<{ url?: string }>;
    backgroundImage?: Array<{ url?: string }>;
  };
}

// Cache: profileAddress -> tags[]
const tagsCache = new Map<string, string[]>();

/**
 * Pre-fetch LSP3Profile metadata for all given Universal Profile addresses,
 * extract tags from each, and return unique tag list + map of address -> tags.
 */
export function useCommunityTags(profileAddresses: string[]) {
  const [tagsByAddress, setTagsByAddress] = useState<Map<string, string[]>>(
    () => new Map()
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (profileAddresses.length === 0) {
      setTagsByAddress(new Map());
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchAll() {
      const nextMap = new Map<string, string[]>();

      const results = await Promise.allSettled(
        profileAddresses.map(async (address) => {
          if (tagsCache.has(address)) {
            return { address, tags: tagsCache.get(address)! };
          }
          const metadata = (await fetchProfileMetadata(
            address,
            luksoMainnet
          )) as LSP3ProfileValue | null;
          const tags =
            metadata?.LSP3Profile?.tags && Array.isArray(metadata.LSP3Profile.tags)
              ? metadata.LSP3Profile.tags.filter(
                (t): t is string => typeof t === "string" && t.trim().length > 0
              )
              : [];
          tagsCache.set(address, tags);
          return { address, tags };
        })
      );

      if (cancelled) return;

      for (const result of results) {
        if (result.status === "fulfilled") {
          nextMap.set(result.value.address, result.value.tags);
        }
      }

      setTagsByAddress(nextMap);
      setIsLoading(false);
    }

    fetchAll();
    return () => {
      cancelled = true;
    };
  }, [profileAddresses.join(",")]);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    tagsByAddress.forEach((tags) => tags.forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
  }, [tagsByAddress]);

  return { allTags, tagsByAddress, isLoading };
}
