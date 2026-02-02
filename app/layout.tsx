import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GridStore - Grid Templates for Universal Profiles",
  description:
    "Discover and apply beautiful grid templates to your LUKSO Universal Profile. Connect your UP and customize your Grid layout.",
  keywords: [
    "LUKSO",
    "Universal Profile",
    "Grid",
    "Templates",
    "Web3",
    "Blockchain",
  ],
  authors: [{ name: "GridStore" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "GridStore - Grid Templates for Universal Profiles",
    description:
      "Discover and apply beautiful grid templates to your LUKSO Universal Profile.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
