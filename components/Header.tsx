"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Grid3X3, Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-lukso rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <Grid3X3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">GridStore</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Templates
            </Link>
            <Link
              href="#featured"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Featured
            </Link>
            <a
              href="https://erc725-inspect.lukso.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              ERC725 Inspect
            </a>
            <a
              href="https://docs.lukso.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Docs
            </a>
          </nav>

          {/* Connect Button */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <ConnectButton
                chainStatus="icon"
                accountStatus={{
                  smallScreen: "avatar",
                  largeScreen: "full",
                }}
                showBalance={{
                  smallScreen: false,
                  largeScreen: true,
                }}
              />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Templates
              </Link>
              <Link
                href="#featured"
                className="text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Featured
              </Link>
              <a
                href="https://erc725-inspect.lukso.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors py-2"
              >
                ERC725 Inspect
              </a>
              <a
                href="https://docs.lukso.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors py-2"
              >
                Docs
              </a>
              <div className="pt-4 sm:hidden">
                <ConnectButton />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
