export interface GridTemplate {
    id: string;
    name: string;
    description: string;
    preview: string; // URL to preview image or CSS gradient
    category: "minimal" | "creative" | "professional" | "gaming" | "social" | "community";
    gridConfig: {
        columns: number;
        rows: number;
        gap: string;
        areas?: string[];
    };
    featured: boolean;
    author: string;
    // On-chain grid data
    gridData?: {
        // Raw encoded value to be used directly in setData (hex string)
        rawValue?: string;
        // Or IPFS URL + hash to encode
        ipfsUrl?: string;
        hash?: string;
    };
    profileLink?: string;
    // Universal Profile address for fetching profile/background images
    profileAddress?: string;
}