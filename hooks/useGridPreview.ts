"use client";

import { useState, useEffect } from "react";
import { decodeAndFetchGridData } from "@/lib/erc725";
import type { GridLayoutData, GridSection } from "@/lib/types";

interface UseGridPreviewResult {
    /** The parsed grid layout data */
    gridData: GridLayoutData | null;
    /** The first (or only) grid section for preview */
    gridSection: GridSection | null;
    /** Whether the data is currently being fetched */
    isLoading: boolean;
    /** Error message if fetch failed */
    error: string | null;
}

// Cache for grid data to avoid re-fetching
const gridDataCache = new Map<string, GridLayoutData>();

/**
 * Custom hook to decode and fetch grid layout data from a raw hex value
 * @param rawValue - The raw hex string (VerifiableURI encoded grid data)
 */
export function useGridPreview(rawValue?: string): UseGridPreviewResult {
    const [gridData, setGridData] = useState<GridLayoutData | null>(() => {
        // Check cache on initial render
        if (rawValue && gridDataCache.has(rawValue)) {
            return gridDataCache.get(rawValue)!;
        }
        return null;
    });
    const [isLoading, setIsLoading] = useState(() => {
        // Start loading if we have a rawValue and no cached data
        return !!rawValue && !gridDataCache.has(rawValue);
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchGridData() {
            if (!rawValue) {
                setGridData(null);
                setIsLoading(false);
                setError(null);
                return;
            }

            // Check cache first
            if (gridDataCache.has(rawValue)) {
                setGridData(gridDataCache.get(rawValue)!);
                setIsLoading(false);
                setError(null);
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const data = await decodeAndFetchGridData(rawValue);

                if (data) {
                    // Cache the result
                    gridDataCache.set(rawValue, data);
                    setGridData(data);
                } else {
                    setError("Failed to decode or fetch grid data");
                    setGridData(null);
                }
            } catch (err) {
                console.error("Error in useGridPreview:", err);
                setError(
                    err instanceof Error
                        ? err.message
                        : "Unknown error fetching grid data"
                );
                setGridData(null);
            } finally {
                setIsLoading(false);
            }
        }

        fetchGridData();
    }, [rawValue]);

    // Extract the first grid section for easy access
    const gridSection = gridData?.LSP28TheGrid?.[0] ?? null;

    return { gridData, gridSection, isLoading, error };
}
