export interface GridTemplate {
    id: string;
    name: string;
    description: string;
    preview: string; // URL to preview image or CSS gradient
    category:
        | "minimal"
        | "creative"
        | "professional"
        | "gaming"
        | "social"
        | "community";
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
    // LSP3Profile tags (fetched from UP metadata, used for display and filter)
    tags?: string[];
}

// ============================================
// LSP28TheGrid Layout Data Types
// ============================================

/** Grid item type identifiers */
export type GridItemType =
    | "IFRAME"
    | "TEXT"
    | "IMAGES"
    | "ELFSIGHT"
    | "X"
    | "INSTAGRAM"
    | "QR_CODE";

/** Properties for IFRAME grid items */
export interface GridItemPropertiesIframe {
    src: string;
    allow?: string;
    sandbox?: string;
    allowfullscreen?: boolean;
    referrerpolicy?: string;
}

/** Properties for TEXT grid items */
export interface GridItemPropertiesText {
    title?: string;
    titleColor?: string;
    text?: string;
    textColor?: string;
    backgroundColor?: string;
    backgroundImage?: string;
    link?: string;
}

/** Properties for IMAGES grid items */
export interface GridItemPropertiesImages {
    type?: "grid" | "carousel";
    images: string[];
}

/** Properties for ELFSIGHT grid items */
export interface GridItemPropertiesElfsight {
    id: string;
}

/** Properties for X (Twitter) grid items */
export interface GridItemPropertiesX {
    type: "post" | "timeline";
    username: string;
    id?: string;
    theme?: "light" | "dark";
    language?: string;
    donottrack?: boolean;
}

/** Properties for INSTAGRAM grid items */
export interface GridItemPropertiesInstagram {
    type: string; // e.g., "p" for post
    id: string;
}

/** Properties for QR_CODE grid items */
export interface GridItemPropertiesQRCode {
    data: string;
}

/** Union type for all grid item properties */
export type GridItemProperties =
    | GridItemPropertiesIframe
    | GridItemPropertiesText
    | GridItemPropertiesImages
    | GridItemPropertiesElfsight
    | GridItemPropertiesX
    | GridItemPropertiesInstagram
    | GridItemPropertiesQRCode
    | Record<string, unknown>;

/** A single item in the grid layout */
export interface GridItem {
    width: number;
    height: number;
    type: GridItemType;
    properties: GridItemProperties;
}

/** A section/page of the grid layout */
export interface GridSection {
    title?: string;
    gridColumns: 2 | 3 | 4;
    visibility?: "private" | "public";
    grid: GridItem[];
}

/** The full LSP28TheGrid data structure */
export interface GridLayoutData {
    LSP28TheGrid: GridSection[];
}
