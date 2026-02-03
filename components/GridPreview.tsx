"use client";

import {
    Loader2,
    AlertCircle,
    Grid3X3,
    Type,
    Image,
    Globe,
    Twitter,
    Instagram,
    QrCode,
    Sparkles,
    LayoutGrid,
    Play,
    Music,
} from "lucide-react";
import type {
    GridSection,
    GridItem,
    GridItemType,
    GridItemPropertiesImages,
    GridItemPropertiesText,
    GridItemPropertiesX,
    GridItemPropertiesIframe,
} from "@/lib/types";
import { useGridPreview } from "@/hooks/useGridPreview";
import { resolveIPFSUrl } from "@/lib/erc725";
import styles from "./GridPreview.module.css";

interface GridPreviewProps {
    /** Raw hex value (VerifiableURI encoded) to decode and fetch */
    rawValue?: string;
    /** Pre-fetched grid section data (alternative to rawValue) */
    gridSection?: GridSection;
    /** Optional title override */
    title?: string;
    /** Optional class name */
    className?: string;
}

/**
 * Get the icon component for a grid item type
 */
function getItemIcon(type: GridItemType) {
    switch (type) {
        case "TEXT":
            return Type;
        case "IMAGES":
            return Image;
        case "IFRAME":
            return Globe;
        case "X":
            return Twitter;
        case "INSTAGRAM":
            return Instagram;
        case "QR_CODE":
            return QrCode;
        case "ELFSIGHT":
            return Sparkles;
        default:
            return LayoutGrid;
    }
}

/**
 * Get the CSS class for a grid item type
 */
function getItemClass(type: GridItemType): string {
    switch (type) {
        case "TEXT":
            return styles.itemText;
        case "IMAGES":
            return styles.itemImages;
        case "IFRAME":
            return styles.itemIframe;
        case "X":
            return styles.itemX;
        case "INSTAGRAM":
            return styles.itemInstagram;
        case "ELFSIGHT":
            return styles.itemElfsight;
        case "QR_CODE":
            return styles.itemQrCode;
        default:
            return styles.itemDefault;
    }
}

/**
 * Get a display label for a grid item type
 */
function getItemLabel(type: GridItemType): string {
    switch (type) {
        case "TEXT":
            return "Text";
        case "IMAGES":
            return "Images";
        case "IFRAME":
            return "Embed";
        case "X":
            return "X/Twitter";
        case "INSTAGRAM":
            return "Instagram";
        case "ELFSIGHT":
            return "Widget";
        case "QR_CODE":
            return "QR Code";
        default:
            return type;
    }
}

/**
 * Get the image URL from a grid item if available
 */
function getItemImageUrl(item: GridItem): string | null {
    if (item.type === "IMAGES") {
        const props = item.properties as GridItemPropertiesImages;
        if (props.images && props.images.length > 0) {
            return resolveIPFSUrl(props.images[0]);
        }
    }

    if (item.type === "TEXT") {
        const props = item.properties as GridItemPropertiesText;
        if (props.backgroundImage) {
            return resolveIPFSUrl(props.backgroundImage);
        }
    }

    return null;
}

/**
 * Extract YouTube video ID from various YouTube URL formats
 */
function getYouTubeVideoId(url: string): string | null {
    const patterns = [
        /youtube\.com\/embed\/([^?&]+)/,
        /youtube-nocookie\.com\/embed\/([^?&]+)/,
        /youtube\.com\/watch\?v=([^&]+)/,
        /youtu\.be\/([^?&]+)/,
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    return null;
}

/**
 * Check if URL is a Spotify embed
 */
function isSpotifyEmbed(url: string): boolean {
    return url.includes("spotify.com/embed");
}

/**
 * Renders TEXT item content
 */
function TextItemContent({ item }: { item: GridItem }) {
    const props = item.properties as GridItemPropertiesText;
    const Icon = getItemIcon(item.type);
    const itemClass = getItemClass(item.type);

    return (
        <div
            className={`${styles.gridItem} ${styles.itemWithContent}`}
            style={{
                gridColumn: `span ${item.width}`,
                gridRow: `span ${item.height}`,
                backgroundColor: props.backgroundColor || undefined,
            }}
        >
            <div className={styles.textContent}>
                {props.title && (
                    <h4
                        className={styles.textTitle}
                        style={{ color: props.titleColor || undefined }}
                    >
                        {props.title}
                    </h4>
                )}
                {props.text && (
                    <p
                        className={styles.textBody}
                        style={{ color: props.textColor || undefined }}
                    >
                        {props.text}
                    </p>
                )}
            </div>
            <div className={`${styles.gridItemOverlay} ${itemClass}`}>
                <Icon className={styles.gridItemIconSmall} />
            </div>
        </div>
    );
}

/**
 * Renders X/Twitter item content
 */
function XItemContent({ item }: { item: GridItem }) {
    const props = item.properties as GridItemPropertiesX;
    const Icon = getItemIcon(item.type);
    const itemClass = getItemClass(item.type);

    return (
        <div
            className={`${styles.gridItem} ${styles.itemX} ${styles.itemWithContent}`}
            style={{
                gridColumn: `span ${item.width}`,
                gridRow: `span ${item.height}`,
            }}
        >
            <div className={styles.xContent}>
                <Twitter className={styles.xLogo} />
                <span className={styles.xUsername}>@{props.username}</span>
                {props.id && (
                    <span className={styles.xPostId}>
                        Post #{props.id.slice(-6)}
                    </span>
                )}
            </div>
            <div className={`${styles.gridItemOverlay} ${itemClass}`}>
                <Icon className={styles.gridItemIconSmall} />
            </div>
        </div>
    );
}

/**
 * Renders IFRAME item with special handling for YouTube/Spotify
 */
function IframeItemContent({ item }: { item: GridItem }) {
    const props = item.properties as GridItemPropertiesIframe;
    const Icon = getItemIcon(item.type);
    const itemClass = getItemClass(item.type);
    const youtubeId = getYouTubeVideoId(props.src);
    const isSpotify = isSpotifyEmbed(props.src);

    // YouTube video thumbnail
    if (youtubeId) {
        return (
            <div
                className={`${styles.gridItem} ${styles.itemWithImage}`}
                style={{
                    gridColumn: `span ${item.width}`,
                    gridRow: `span ${item.height}`,
                }}
            >
                <img
                    src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
                    alt="YouTube Video"
                    className={styles.gridItemImage}
                    loading="lazy"
                />
                <div className={styles.youtubePlayOverlay}>
                    <Play className={styles.youtubePlayIcon} />
                </div>
                <div
                    className={`${styles.gridItemOverlay} ${styles.itemYoutube}`}
                >
                    <Play className={styles.gridItemIconSmall} />
                </div>
            </div>
        );
    }

    // Spotify embed
    if (isSpotify) {
        return (
            <div
                className={`${styles.gridItem} ${styles.itemSpotify}`}
                style={{
                    gridColumn: `span ${item.width}`,
                    gridRow: `span ${item.height}`,
                }}
            >
                <div className={styles.spotifyContent}>
                    <Music className={styles.spotifyIcon} />
                    <span className={styles.spotifyLabel}>Spotify</span>
                </div>
                <div
                    className={`${styles.gridItemOverlay} ${styles.itemSpotify}`}
                >
                    <Music className={styles.gridItemIconSmall} />
                </div>
            </div>
        );
    }

    // Generic iframe/embed
    const showLabel = item.height > 1 || item.width > 1;
    return (
        <div
            className={`${styles.gridItem} ${itemClass}`}
            style={{
                gridColumn: `span ${item.width}`,
                gridRow: `span ${item.height}`,
            }}
        >
            <Icon className={styles.gridItemIcon} />
            {showLabel && <span className={styles.gridItemLabel}>Embed</span>}
        </div>
    );
}

/**
 * Renders a single grid item
 */
function GridItemCell({ item }: { item: GridItem; index: number }) {
    const Icon = getItemIcon(item.type);
    const itemClass = getItemClass(item.type);
    const label = getItemLabel(item.type);
    const imageUrl = getItemImageUrl(item);

    // TEXT item with content
    if (item.type === "TEXT") {
        const props = item.properties as GridItemPropertiesText;
        // If has background image, show image version
        if (props.backgroundImage) {
            return (
                <div
                    className={`${styles.gridItem} ${styles.itemWithImage}`}
                    style={{
                        gridColumn: `span ${item.width}`,
                        gridRow: `span ${item.height}`,
                    }}
                >
                    <img
                        src={resolveIPFSUrl(props.backgroundImage)}
                        alt={props.title || "Text"}
                        className={styles.gridItemImage}
                        loading="lazy"
                    />
                    {(props.title || props.text) && (
                        <div className={styles.imageTextOverlay}>
                            {props.title && (
                                <h4
                                    className={styles.imageTextTitle}
                                    style={{
                                        color: props.titleColor || undefined,
                                    }}
                                >
                                    {props.title}
                                </h4>
                            )}
                        </div>
                    )}
                    <div className={`${styles.gridItemOverlay} ${itemClass}`}>
                        <Icon className={styles.gridItemIconSmall} />
                    </div>
                </div>
            );
        }
        // Text without background image
        if (props.title || props.text) {
            return <TextItemContent item={item} />;
        }
    }

    // X/Twitter item
    if (item.type === "X") {
        return <XItemContent item={item} />;
    }

    // IFRAME item (YouTube, Spotify, etc.)
    if (item.type === "IFRAME") {
        return <IframeItemContent item={item} />;
    }

    // IMAGES item with image
    if (imageUrl) {
        return (
            <div
                className={`${styles.gridItem} ${styles.itemWithImage}`}
                style={{
                    gridColumn: `span ${item.width}`,
                    gridRow: `span ${item.height}`,
                }}
                title={`${label} (${item.width}×${item.height})`}
            >
                <img
                    src={imageUrl}
                    alt={label}
                    className={styles.gridItemImage}
                    loading="lazy"
                />
                <div className={`${styles.gridItemOverlay} ${itemClass}`}>
                    <Icon className={styles.gridItemIconSmall} />
                </div>
            </div>
        );
    }

    // Default rendering without image
    const showLabel = item.height > 1 || item.width > 1;
    return (
        <div
            className={`${styles.gridItem} ${itemClass}`}
            style={{
                gridColumn: `span ${item.width}`,
                gridRow: `span ${item.height}`,
            }}
            title={`${label} (${item.width}×${item.height})`}
        >
            <Icon className={styles.gridItemIcon} />
            {showLabel && <span className={styles.gridItemLabel}>{label}</span>}
        </div>
    );
}

/**
 * Renders a visual preview of a grid layout
 */
function GridPreviewContent({
    section,
    title,
}: {
    section: GridSection;
    title?: string;
}) {
    const displayTitle = title || section.title || "Grid Preview";

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className="flex items-center gap-2">
                    <Grid3X3 className="w-4 h-4 text-violet-500" />
                    <span className={styles.title}>{displayTitle}</span>
                </div>
                <span className={styles.columnsBadge}>
                    {section.gridColumns} columns
                </span>
            </div>
            <div className={styles.gridWrapper}>
                <div
                    className={styles.grid}
                    style={{
                        gridTemplateColumns: `repeat(${section.gridColumns}, 1fr)`,
                    }}
                >
                    {section.grid.map((item, index) => (
                        <GridItemCell key={index} item={item} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}

/**
 * GridPreview component - displays a visual preview of a grid layout
 *
 * Can be used in two ways:
 * 1. With `rawValue` - decodes and fetches the grid data automatically
 * 2. With `gridSection` - uses pre-fetched grid section data
 */
export function GridPreview({
    rawValue,
    gridSection: externalGridSection,
    title,
    className,
}: GridPreviewProps) {
    // Use the hook to fetch grid data if rawValue is provided
    const {
        gridSection: fetchedGridSection,
        isLoading,
        error,
    } = useGridPreview(rawValue);

    // Prefer external gridSection over fetched one
    const section = externalGridSection || fetchedGridSection;

    // If using rawValue and still loading
    if (rawValue && isLoading) {
        return (
            <div className={`${styles.loadingContainer} ${className || ""}`}>
                <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
                <span className={styles.loadingText}>
                    Loading grid preview...
                </span>
            </div>
        );
    }

    // If using rawValue and there was an error
    if (rawValue && error) {
        return (
            <div className={`${styles.errorContainer} ${className || ""}`}>
                <AlertCircle className="w-8 h-8 text-red-500" />
                <span className={styles.errorText}>{error}</span>
            </div>
        );
    }

    // No data available
    if (!section || !section.grid || section.grid.length === 0) {
        return (
            <div className={`${styles.emptyContainer} ${className || ""}`}>
                <Grid3X3 className="w-8 h-8 text-gray-400" />
                <span className={styles.emptyText}>No grid data available</span>
            </div>
        );
    }

    return (
        <div className={className}>
            <GridPreviewContent section={section} title={title} />
        </div>
    );
}
