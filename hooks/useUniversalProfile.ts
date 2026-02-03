"use client";

import { useState, useEffect } from "react";
import { useAccount, useChainId } from "wagmi";
import { fetchProfileMetadata } from "@/lib/erc725";
import { luksoMainnet, luksoTestnet } from "@/lib/wagmi";

interface ProfileData {
    name: string;
    description?: string;
    profileImage?: string;
    backgroundImage?: string;
    tags?: string[];
}

interface LSP3ProfileValue {
    LSP3Profile?: {
        name?: string;
        description?: string;
        profileImage?: Array<{ url?: string }>;
        backgroundImage?: Array<{ url?: string }>;
        tags?: string[];
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

/**
 * Custom hook to fetch Universal Profile data
 */
export function useUniversalProfile() {
    const { address, isConnected } = useAccount();
    const chainId = useChainId();
    const chain = chainId == 42 ? luksoMainnet : luksoTestnet;

    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProfile() {
            if (!isConnected || !address) {
                setProfile(null);
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const metadata = (await fetchProfileMetadata(
                    address,
                    chain
                )) as LSP3ProfileValue | null;

                if (metadata?.LSP3Profile) {
                    const lsp3 = metadata.LSP3Profile;

                    // Get the first profile image URL
                    const profileImageUrl = lsp3.profileImage?.[0]?.url;
                    const backgroundImageUrl = lsp3.backgroundImage?.[0]?.url;

                    setProfile({
                        name: lsp3.name || "",
                        description: lsp3.description,
                        profileImage: resolveIPFSUrl(profileImageUrl),
                        backgroundImage: resolveIPFSUrl(backgroundImageUrl),
                        tags: lsp3.tags,
                    });
                } else {
                    setProfile(null);
                }
            } catch (err) {
                console.error("Error fetching profile:", err);
                setError("Failed to load profile");
                setProfile(null);
            } finally {
                setIsLoading(false);
            }
        }

        fetchProfile();
    }, [address, isConnected, chain]);

    return {
        profile,
        isLoading,
        error,
        address,
        isConnected,
    };
}
