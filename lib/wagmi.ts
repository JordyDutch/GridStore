import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import { type Chain } from "viem";

// Define LUKSO Mainnet chain
export const luksoMainnet: Chain = {
    id: 42,
    name: "LUKSO",
    nativeCurrency: {
        decimals: 18,
        name: "LYX",
        symbol: "LYX",
    },
    rpcUrls: {
        default: {
            http: ["https://rpc.mainnet.lukso.network"],
        },
        public: {
            http: ["https://rpc.mainnet.lukso.network"],
        },
    },
    blockExplorers: {
        default: {
            name: "LUKSO Explorer",
            url: "https://explorer.execution.mainnet.lukso.network",
        },
    },
};

// Define LUKSO Testnet chain
export const luksoTestnet: Chain = {
    id: 4201,
    name: "LUKSO Testnet",
    nativeCurrency: {
        decimals: 18,
        name: "LYXt",
        symbol: "LYXt",
    },
    rpcUrls: {
        default: {
            http: ["https://rpc.testnet.lukso.network"],
        },
        public: {
            http: ["https://rpc.testnet.lukso.network"],
        },
    },
    blockExplorers: {
        default: {
            name: "LUKSO Testnet Explorer",
            url: "https://explorer.execution.testnet.lukso.network",
        },
    },
    testnet: true,
};

// RainbowKit + Wagmi configuration
export const config = getDefaultConfig({
    appName: "GridStore",
    projectId:
        process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "YOUR_PROJECT_ID",
    chains: [luksoMainnet, luksoTestnet],
    transports: {
        [luksoMainnet.id]: http("https://rpc.mainnet.lukso.network"),
        [luksoTestnet.id]: http("https://rpc.testnet.lukso.network"),
    },
    ssr: true,
});
