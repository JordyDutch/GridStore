"use client";

import * as React from "react";
import {
  RainbowKitProvider,
  darkTheme,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { config } from "@/lib/wagmi";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";

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

// Custom dark theme matching website style
const gridStoreDarkTheme = darkTheme({
  accentColor: "#8b5cf6",
  accentColorForeground: "white",
  borderRadius: "large",
  fontStack: "system",
  overlayBlur: "small",
});

// Override specific colors for dark theme
gridStoreDarkTheme.colors.modalBackground = "#12121a";
gridStoreDarkTheme.colors.modalBorder = "rgba(255, 255, 255, 0.08)";
gridStoreDarkTheme.colors.profileForeground = "#12121a";
gridStoreDarkTheme.colors.closeButton = "rgba(255, 255, 255, 0.6)";
gridStoreDarkTheme.colors.closeButtonBackground = "rgba(255, 255, 255, 0.08)";
gridStoreDarkTheme.colors.actionButtonBorder = "rgba(139, 92, 246, 0.3)";
gridStoreDarkTheme.colors.actionButtonSecondaryBackground =
  "rgba(255, 255, 255, 0.05)";
gridStoreDarkTheme.colors.connectButtonBackground = "#8b5cf6";
gridStoreDarkTheme.colors.connectButtonInnerBackground = "#8b5cf6";
gridStoreDarkTheme.shadows.connectButton =
  "0 4px 12px rgba(139, 92, 246, 0.25)";

// Custom light theme
const gridStoreLightTheme = lightTheme({
  accentColor: "#8b5cf6",
  accentColorForeground: "white",
  borderRadius: "large",
  fontStack: "system",
  overlayBlur: "small",
});

// Override specific colors for light theme
gridStoreLightTheme.colors.modalBackground = "#ffffff";
gridStoreLightTheme.colors.modalBorder = "rgba(0, 0, 0, 0.1)";
gridStoreLightTheme.colors.profileForeground = "#ffffff";
gridStoreLightTheme.colors.closeButton = "rgba(0, 0, 0, 0.6)";
gridStoreLightTheme.colors.closeButtonBackground = "rgba(0, 0, 0, 0.05)";
gridStoreLightTheme.colors.actionButtonBorder = "rgba(139, 92, 246, 0.3)";
gridStoreLightTheme.colors.actionButtonSecondaryBackground =
  "rgba(0, 0, 0, 0.05)";
gridStoreLightTheme.colors.connectButtonBackground = "#8b5cf6";
gridStoreLightTheme.colors.connectButtonInnerBackground = "#8b5cf6";
gridStoreLightTheme.shadows.connectButton =
  "0 4px 12px rgba(139, 92, 246, 0.25)";

// Suppress noisy console warnings in development
if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  const originalError = console.error;

  console.warn = function (...args: unknown[]) {
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

  console.error = function (...args: unknown[]) {
    const message = String(args[0] || "");
    if (message.includes("@react-native-async-storage")) {
      return;
    }
    originalError.apply(console, args);
  };
}

// RainbowKitWrapper must be defined outside Providers but will be rendered inside ThemeProvider
function RainbowKitWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const [rainbowMounted, setRainbowMounted] = React.useState(false);

  React.useEffect(() => {
    setRainbowMounted(true);
  }, []);

  return (
    <RainbowKitProvider
      theme={theme === "dark" ? gridStoreDarkTheme : gridStoreLightTheme}
      modalSize="compact"
      appInfo={{
        appName: "GridStore",
        learnMoreUrl: "https://docs.lukso.tech",
      }}
    >
      {rainbowMounted ? children : null}
    </RainbowKitProvider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ThemeProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitWrapper>{mounted ? children : null}</RainbowKitWrapper>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}
