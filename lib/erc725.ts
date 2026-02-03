import {
    ERC725,
    ERC725JSONSchema,
    decodeDataSourceWithHash,
} from "@erc725/erc725.js";
import LSP3Schema from "@erc725/erc725.js/schemas/LSP3ProfileMetadata.json";
import { Chain, createPublicClient, http } from "viem";
import type { GridLayoutData } from "./types";

const DEFAULT_RPC_ENDPOINT = "https://rpc.mainnet.lukso.network";

// Official Universal Everything Grid data key
export const GRID_DATA_KEY =
    "0x724141d9918ce69e6b8afcf53a91748466086ba2c74b94cab43c649ae2ac23ff";

// Grid Layout schema using the official Universal Everything Grid key
export const GridLayoutSchema: ERC725JSONSchema[] = [
    {
        name: "LSP28TheGrid",
        key: GRID_DATA_KEY,
        keyType: "Singleton",
        valueType: "bytes",
        valueContent: "VerifiableURI",
    },
];

// Combined schema for full profile + grid data
export const CombinedSchema: ERC725JSONSchema[] = [
    ...LSP3Schema,
    ...GridLayoutSchema,
];

/**
 * Create an ERC725 instance for a Universal Profile
 * @param profileAddress - The Universal Profile address
 * @param chain - Optional chain. Defaults to mainnet.
 */
export function createERC725Instance(profileAddress: string, chain?: Chain) {
    const rpcEndpoint = chain?.rpcUrls.default.http[0] || DEFAULT_RPC_ENDPOINT;

    return new ERC725(CombinedSchema, profileAddress, rpcEndpoint, {
        ipfsGateway: "https://api.universalprofile.cloud/ipfs",
    });
}

/**
 * Fetch the current grid data from a Universal Profile
 * @param profileAddress - The Universal Profile address
 * @param chain - Optional chain. Defaults to mainnet.
 */
export async function fetchGridData(profileAddress: string, chain?: Chain) {
    try {
        const erc725 = createERC725Instance(profileAddress, chain);
        const result = await erc725.fetchData("LSP28TheGrid");
        return result?.value;
    } catch (error) {
        console.error("Error fetching grid data:", error);
        return null;
    }
}

/**
 * Fetch the raw grid data value (hex string) from a Universal Profile
 * This returns the raw bytes that can be used directly in setData
 * Uses a direct contract call to getData(bytes32) instead of erc725.js
 * @param profileAddress - The Universal Profile address
 * @param chain - Optional chain. Defaults to mainnet.
 */
export async function fetchRawGridData(
    profileAddress: string,
    chain?: Chain
): Promise<string | null> {
    try {
        // Create a public client for the specific chain
        const rpcEndpoint = chain
            ? chain.rpcUrls.default.http[0]
            : DEFAULT_RPC_ENDPOINT;
        const publicClient = createPublicClient({
            chain,
            transport: http(rpcEndpoint),
        });

        // Direct contract call to getData(bytes32) function
        const rawData = (await publicClient.readContract({
            address: profileAddress as `0x${string}`,
            abi: UniversalProfileABI,
            functionName: "getData",
            args: [GRID_DATA_KEY as `0x${string}`],
        })) as string;

        // Return the raw bytes as hex string, or null if empty
        return rawData && rawData !== "0x" ? rawData : null;
    } catch (error) {
        console.error("Error fetching raw grid data:", error);
        return null;
    }
}

/**
 * Fetch profile metadata from a Universal Profile
 * @param profileAddress - The Universal Profile address
 * @param chain - Optional chain. Defaults to mainnet.
 */
export async function fetchProfileMetadata(
    profileAddress: string,
    chain?: Chain
) {
    try {
        const erc725 = createERC725Instance(profileAddress, chain);
        const result = await erc725.fetchData("LSP3Profile");
        return result?.value;
    } catch (error) {
        console.error("Error fetching profile metadata:", error);
        return null;
    }
}

/**
 * Convert string to hex
 */
function stringToHex(str: string): string {
    let hex = "";
    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i);
        hex += charCode.toString(16).padStart(2, "0");
    }
    return hex;
}

/**
 * Encode VerifiableURI manually without relying on ERC725.js schema matching
 * Format: 0x0000 (no verification) + url as hex bytes
 * Or: verification method (2 bytes) + data length (2 bytes) + hash + url
 *
 * @param ipfsUrl - The IPFS URL of the grid configuration (e.g., "ipfs://Qm...")
 * @param hash - Optional keccak256 hash of the grid configuration JSON
 */
export function encodeVerifiableURI(ipfsUrl: string, hash?: string): string {
    // Convert URL to hex
    const urlHex = stringToHex(ipfsUrl);

    if (
        hash &&
        hash !==
            "0x0000000000000000000000000000000000000000000000000000000000000000"
    ) {
        // With verification: keccak256(utf8) method = 0x6f357c6a
        // Format: verification method (4 bytes) + hash (32 bytes) + url
        const cleanHash = hash.startsWith("0x") ? hash.slice(2) : hash;
        return `0x00006f357c6a${cleanHash}${urlHex}`;
    } else {
        // No verification: 0x00000000
        return `0x00000000${urlHex}`;
    }
}

/**
 * Get the raw encoded data for setData transaction
 * This bypasses ERC725.js schema issues
 */
export function getGridSetDataParams(rawValue: string): {
    key: `0x${string}`;
    value: `0x${string}`;
} {
    return {
        key: GRID_DATA_KEY as `0x${string}`,
        value: rawValue as `0x${string}`,
    };
}

/**
 * Universal Profile ABI for setData function
 */
export const UniversalProfileABI = [
    {
        inputs: [
            { internalType: "bytes32", name: "dataKey", type: "bytes32" },
            { internalType: "bytes", name: "dataValue", type: "bytes" },
        ],
        name: "setData",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "bytes32[]", name: "dataKeys", type: "bytes32[]" },
            { internalType: "bytes[]", name: "dataValues", type: "bytes[]" },
        ],
        name: "setDataBatch",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [{ internalType: "bytes32", name: "dataKey", type: "bytes32" }],
        name: "getData",
        outputs: [{ internalType: "bytes", name: "dataValue", type: "bytes" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "bytes32[]", name: "dataKeys", type: "bytes32[]" },
        ],
        name: "getDataBatch",
        outputs: [
            { internalType: "bytes[]", name: "dataValues", type: "bytes[]" },
        ],
        stateMutability: "view",
        type: "function",
    },
] as const;

// ============================================
// Grid Data Decoding & Fetching Utilities
// ============================================

const IPFS_GATEWAY = "https://api.universalprofile.cloud/ipfs/";

/**
 * Resolve an IPFS URL to a HTTP gateway URL
 * @param url - The URL to resolve (can be ipfs:// or http(s)://)
 */
export function resolveIPFSUrl(url: string): string {
    if (!url) return "";

    if (url.startsWith("ipfs://")) {
        const cid = url.replace("ipfs://", "");
        return `${IPFS_GATEWAY}${cid}`;
    }

    // Already a gateway URL or regular HTTP URL
    return url;
}

/**
 * Decoded result from a VerifiableURI
 */
export interface DecodedVerifiableURI {
    verification: {
        method: string;
        data: string;
    };
    url: string;
}

/**
 * Decode a raw hex value (VerifiableURI) to get the IPFS URL and verification data
 * @param rawValue - The raw hex string (e.g., from gridData.rawValue)
 * @returns Decoded object with verification info and URL
 */
export function decodeGridRawValue(rawValue: string): DecodedVerifiableURI {
    return decodeDataSourceWithHash(rawValue) as DecodedVerifiableURI;
}

/**
 * Fetch the grid layout JSON from an IPFS URL
 * @param ipfsUrl - The IPFS URL (ipfs://...) or HTTP URL
 * @returns The parsed GridLayoutData or null if fetch fails
 */
export async function fetchGridJSON(
    ipfsUrl: string
): Promise<GridLayoutData | null> {
    try {
        const resolvedUrl = resolveIPFSUrl(ipfsUrl);
        const response = await fetch(resolvedUrl);

        if (!response.ok) {
            console.error(
                `Failed to fetch grid JSON: ${response.status} ${response.statusText}`
            );
            return null;
        }

        const data = await response.json();
        return data as GridLayoutData;
    } catch (error) {
        console.error("Error fetching grid JSON:", error);
        return null;
    }
}

/**
 * Decode a raw grid value and fetch the grid layout JSON in one step
 * @param rawValue - The raw hex string (VerifiableURI encoded)
 * @returns The parsed GridLayoutData or null if decode/fetch fails
 */
export async function decodeAndFetchGridData(
    rawValue: string
): Promise<GridLayoutData | null> {
    try {
        const decoded = decodeGridRawValue(rawValue);
        if (!decoded?.url) {
            console.error("No URL found in decoded raw value");
            return null;
        }

        return await fetchGridJSON(decoded.url);
    } catch (error) {
        console.error("Error decoding and fetching grid data:", error);
        return null;
    }
}
