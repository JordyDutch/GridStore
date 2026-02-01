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

// Custom theme matching website style
const gridStoreTheme = darkTheme({
  accentColor: "#8b5cf6",
  accentColorForeground: "white",
  borderRadius: "large",
  fontStack: "system",
  overlayBlur: "small",
});

// Override specific colors
gridStoreTheme.colors.modalBackground = "#12121a";
gridStoreTheme.colors.modalBorder = "rgba(255, 255, 255, 0.08)";
gridStoreTheme.colors.profileForeground = "#12121a";
gridStoreTheme.colors.closeButton = "rgba(255, 255, 255, 0.6)";
gridStoreTheme.colors.closeButtonBackground = "rgba(255, 255, 255, 0.08)";
gridStoreTheme.colors.actionButtonBorder = "rgba(139, 92, 246, 0.3)";
gridStoreTheme.colors.actionButtonSecondaryBackground = "rgba(255, 255, 255, 0.05)";
gridStoreTheme.colors.connectButtonBackground = "#8b5cf6";
gridStoreTheme.colors.connectButtonInnerBackground = "#8b5cf6";
gridStoreTheme.shadows.connectButton = "0 4px 12px rgba(139, 92, 246, 0.25)";

// Suppress noisy console warnings in development
if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  const originalError = console.error;
  
  console.warn = function(...args: unknown[]) {
    const message = String(args[0] || "");
    if (
      message.includes("WalletConnect") ||
      message.includes("Lit is in dev mode") ||
      message.includes("Multiple versions of Lit")
    ) {
      return;
    }
    originalWarn.apply(console, args);
  };
  
  console.error = function(...args: unknown[]) {
    const message = String(args[0] || "");
    if (message.includes("@react-native-async-storage")) {
      return;
    }
    originalError.apply(console, args);
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
          theme={gridStoreTheme}
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
