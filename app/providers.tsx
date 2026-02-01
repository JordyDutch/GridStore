"use client";

import * as React from "react";
import {
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { config } from "@/lib/wagmi";

import "@rainbow-me/rainbowkit/styles.css";

// Create QueryClient outside component to prevent recreation
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
});

// Custom LUKSO theme for RainbowKit
const luksoTheme = darkTheme({
  accentColor: "#FE005B",
  accentColorForeground: "white",
  borderRadius: "medium",
  fontStack: "system",
  overlayBlur: "small",
});

// Suppress noisy console warnings in development
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    const message = args[0]?.toString() || "";
    // Suppress known harmless warnings
    if (
      message.includes("WalletConnect") ||
      message.includes("Lit is in dev mode") ||
      message.includes("Multiple versions of Lit")
    ) {
      return;
    }
    originalWarn.apply(console, args);
  };
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={luksoTheme}
          modalSize="compact"
          appInfo={{
            appName: "GridStore",
            learnMoreUrl: "https://docs.lukso.tech",
          }}
        >
          {mounted ? children : null}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
