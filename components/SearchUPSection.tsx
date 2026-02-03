"use client";

import { useState } from "react";
import { fetchProfileMetadata } from "@/lib/erc725";
import { luksoMainnet } from "@/lib/wagmi";
import type { GridTemplate } from "@/lib/types";
import { isAddress } from "viem";
import {
    Search,
    Loader2,
    AlertCircle,
    Copy,
    ExternalLink,
    User,
} from "lucide-react";

interface SearchUPSectionProps {
    onSelectTemplate: (template: GridTemplate) => void;
}

interface ProfileData {
    name?: string;
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

export function SearchUPSection({ onSelectTemplate }: SearchUPSectionProps) {
    const [addressInput, setAddressInput] = useState("");
    const [searchedAddress, setSearchedAddress] = useState<string | null>(null);
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async () => {
        const trimmedAddress = addressInput.trim();

        // Validate address
        if (!trimmedAddress) {
            setError("Please enter an address");
            setProfile(null);
            setSearchedAddress(null);
            return;
        }

        if (!isAddress(trimmedAddress)) {
            setError(
                "Invalid address format. Must be a valid Ethereum address (0x...)"
            );
            setProfile(null);
            setSearchedAddress(null);
            return;
        }

        setIsLoading(true);
        setError(null);
        setProfile(null);

        try {
            const metadata = (await fetchProfileMetadata(
                trimmedAddress,
                luksoMainnet
            )) as LSP3ProfileValue | null;

            if (metadata?.LSP3Profile) {
                const lsp3 = metadata.LSP3Profile;
                const profileImageUrl = lsp3.profileImage?.[0]?.url;
                const backgroundImageUrl = lsp3.backgroundImage?.[0]?.url;

                setProfile({
                    name: lsp3.name,
                    profileImage: resolveIPFSUrl(profileImageUrl),
                    backgroundImage: resolveIPFSUrl(backgroundImageUrl),
                });
                setSearchedAddress(trimmedAddress);
            } else {
                setError("No profile found for this address");
                setSearchedAddress(null);
            }
        } catch (err) {
            console.error("Error fetching profile:", err);
            setError("Failed to fetch profile. Please try again.");
            setSearchedAddress(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleCopyGrid = () => {
        if (!searchedAddress) return;

        // Build synthetic GridTemplate for the modal
        const syntheticTemplate: GridTemplate = {
            id: `search-${searchedAddress}`,
            name: profile?.name ?? "Universal Profile",
            description: "Grid from searched Universal Profile",
            preview: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            category: "community",
            gridConfig: {
                columns: 3,
                rows: 3,
                gap: "12px",
            },
            featured: false,
            author: profile?.name ?? searchedAddress.slice(0, 8) + "...",
            profileAddress: searchedAddress,
        };

        onSelectTemplate(syntheticTemplate);
    };

    return (
        <section className="mb-12 max-w-2xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Search Grids
                </h2>
            </div>

            <div className="card rounded-2xl p-4">
                {/* Search Input */}
                <div className="flex gap-2 mb-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Paste UP address (0x...)"
                            value={addressInput}
                            onChange={(e) => setAddressInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full py-2.5 pl-10 pr-4 text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10"
                        />
                    </div>
                    <button
                        onClick={handleSearch}
                        disabled={isLoading}
                        className="btn-primary px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium"
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            "Search"
                        )}
                    </button>
                </div>

                {/* Error State */}
                {error && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 dark:text-red-400 text-sm mb-4">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Loading State */}
                {isLoading && (
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-6 h-6 text-violet-500 animate-spin" />
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                            Fetching profile...
                        </span>
                    </div>
                )}

                {/* Profile Card */}
                {profile && searchedAddress && !isLoading && (
                    <div className="rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden">
                        {/* Background / Banner */}
                        <div
                            className="h-24 relative"
                            style={{
                                background: profile.backgroundImage
                                    ? undefined
                                    : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            }}
                        >
                            {profile.backgroundImage && (
                                <img
                                    src={profile.backgroundImage}
                                    alt="Profile background"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            )}

                            {/* Profile Image */}
                            <div className="absolute -bottom-6 left-4">
                                {profile.profileImage ? (
                                    <img
                                        src={profile.profileImage}
                                        alt={profile.name ?? "Profile"}
                                        className="w-14 h-14 rounded-full border-4 border-white dark:border-gray-900 object-cover shadow-lg"
                                    />
                                ) : (
                                    <div className="w-14 h-14 rounded-full border-4 border-white dark:border-gray-900 bg-gray-200 dark:bg-gray-700 flex items-center justify-center shadow-lg">
                                        <User className="w-6 h-6 text-gray-500" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="pt-8 pb-4 px-4">
                            <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                                {profile.name ?? "Unknown Profile"}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-mono mb-4 truncate">
                                {searchedAddress}
                            </p>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button
                                    onClick={handleCopyGrid}
                                    className="flex-1 btn-primary py-2 px-3 rounded-lg flex items-center justify-center gap-2 text-sm font-medium"
                                >
                                    <Copy className="w-4 h-4" />
                                    Copy Grid
                                </button>
                                <a
                                    href={`https://universaleverything.io/${searchedAddress}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors flex items-center gap-2 text-sm"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    View
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!profile && !isLoading && !error && (
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
                        Enter a Universal Profile address to fetch and copy its
                        grid layout.
                    </p>
                )}
            </div>
        </section>
    );
}
