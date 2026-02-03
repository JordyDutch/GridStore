import { ERC725, ERC725JSONSchema } from "@erc725/erc725.js";
import LSP3Schema from "@erc725/erc725.js/schemas/LSP3ProfileMetadata.json";
import { createPublicClient, http } from "viem";
import { lukso } from "viem/chains";

// RPC endpoint for LUKSO
const RPC_ENDPOINT = "https://rpc.mainnet.lukso.network";

// Public client for direct contract calls
const publicClient = createPublicClient({
  chain: lukso,
  transport: http(RPC_ENDPOINT),
});

// Official Universal Everything Grid data key
export const GRID_DATA_KEY = "0x724141d9918ce69e6b8afcf53a91748466086ba2c74b94cab43c649ae2ac23ff";

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
 */
export function createERC725Instance(profileAddress: string) {
  return new ERC725(CombinedSchema, profileAddress, RPC_ENDPOINT, {
    ipfsGateway: "https://api.universalprofile.cloud/ipfs",
  });
}

/**
 * Fetch the current grid data from a Universal Profile
 */
export async function fetchGridData(profileAddress: string) {
  try {
    const erc725 = createERC725Instance(profileAddress);
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
 */
export async function fetchRawGridData(profileAddress: string): Promise<string | null> {
  try {
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
 */
export async function fetchProfileMetadata(profileAddress: string) {
  try {
    const erc725 = createERC725Instance(profileAddress);
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
  let hex = '';
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    hex += charCode.toString(16).padStart(2, '0');
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

  if (hash && hash !== "0x0000000000000000000000000000000000000000000000000000000000000000") {
    // With verification: keccak256(utf8) method = 0x6f357c6a
    // Format: verification method (4 bytes) + hash (32 bytes) + url
    const cleanHash = hash.startsWith('0x') ? hash.slice(2) : hash;
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
export function getGridSetDataParams(rawValue: string): { key: `0x${string}`, value: `0x${string}` } {
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
    inputs: [{ internalType: "bytes32[]", name: "dataKeys", type: "bytes32[]" }],
    name: "getDataBatch",
    outputs: [{ internalType: "bytes[]", name: "dataValues", type: "bytes[]" }],
    stateMutability: "view",
    type: "function",
  },
] as const;
