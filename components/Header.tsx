"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  Grid3X3,
  Menu,
  X,
  ChevronDown,
  ExternalLink,
  LogOut,
  Wallet,
  Sun,
  Moon,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUniversalProfile } from "@/hooks/useUniversalProfile";
import { useDisconnect, useBalance } from "wagmi";
import { useTheme } from "@/contexts/ThemeContext";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { profile, isLoading, address, isConnected } = useUniversalProfile();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({
    address: address as `0x${string}` | undefined,
  });
  const { theme, toggleTheme } = useTheme();

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatBalance = (value: bigint | undefined, decimals: number = 18) => {
    if (!value) return "0";
    const formatted = Number(value) / Math.pow(10, decimals);
    return formatted.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#0a0a0f]/80 backdrop-blur-md border-b border-gray-200 dark:border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Grid3X3 className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              GridStore
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-white/5"
            >
              Templates
            </Link>
            <Link
              href="#featured"
              className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-white/5"
            >
              Featured
            </Link>
            <a
              href="https://erc725-inspect.lukso.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-white/5"
            >
              ERC725 Inspect
            </a>
            <a
              href="https://docs.lukso.tech/learn/mini-apps/connect-upprovider/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-white/5"
            >
              Docs
            </a>
          </nav>

          {/* Connect Button / Profile */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label={`Switch to ${
                theme === "dark" ? "light" : "dark"
              } mode`}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <div className="hidden sm:block">
              {isConnected && address ? (
                <div className="relative" ref={menuRef}>
                  {/* Profile Button */}
                  <button
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    className="flex items-center gap-2.5 pl-3 pr-2 py-1.5 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all"
                  >
                    {/* Name */}
                    {isLoading ? (
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Loading...
                      </span>
                    ) : profile?.name ? (
                      <span className="text-sm text-gray-900 dark:text-white font-medium max-w-[120px] truncate">
                        {profile.name}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-700 dark:text-gray-300 font-mono">
                        {address.slice(0, 6)}...{address.slice(-4)}
                      </span>
                    )}

                    {/* Profile Image */}
                    {profile?.profileImage ? (
                      <div className="w-7 h-7 rounded-full overflow-hidden border border-white/10 relative">
                        <Image
                          src={profile.profileImage}
                          alt={profile.name || "Profile"}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                        <span className="text-xs text-white font-medium">
                          {profile?.name?.charAt(0) ||
                            address?.slice(2, 4).toUpperCase()}
                        </span>
                      </div>
                    )}

                    <ChevronDown
                      className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform ${
                        profileMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {profileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-[#12121a] border border-gray-200 dark:border-white/10 shadow-xl overflow-hidden animate-fadeIn">
                      {/* Balance */}
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-white/5">
                        <p className="text-xs text-gray-600 dark:text-gray-500 mb-1">
                          Balance
                        </p>
                        <p className="text-gray-900 dark:text-white font-medium">
                          {formatBalance(balance?.value)}{" "}
                          {balance?.symbol || "LYX"}
                        </p>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        <a
                          href={`https://universaleverything.io/${address}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                          onClick={() => setProfileMenuOpen(false)}
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Profile
                        </a>
                        <a
                          href={`https://explorer.execution.mainnet.lukso.network/address/${address}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                          onClick={() => setProfileMenuOpen(false)}
                        >
                          <Wallet className="w-4 h-4" />
                          Explorer
                        </a>
                      </div>

                      {/* Disconnect */}
                      <div className="border-t border-gray-200 dark:border-white/5 py-1">
                        <button
                          onClick={() => {
                            disconnect();
                            setProfileMenuOpen(false);
                          }}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors w-full"
                        >
                          <LogOut className="w-4 h-4" />
                          Disconnect
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <ConnectButton.Custom>
                  {({ openConnectModal }) => (
                    <button
                      onClick={openConnectModal}
                      className="px-5 py-2 text-sm font-medium text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition-colors"
                    >
                      Connect
                    </button>
                  )}
                </ConnectButton.Custom>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-white/5 animate-fadeIn">
            <nav className="flex flex-col gap-1">
              <Link
                href="/"
                className="px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Templates
              </Link>
              <Link
                href="#featured"
                className="px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Featured
              </Link>
              <a
                href="https://erc725-inspect.lukso.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
              >
                ERC725 Inspect
              </a>
              <a
                href="https://docs.lukso.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
              >
                Docs
              </a>

              {/* Mobile Profile Section */}
              {isConnected && address ? (
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-white/5">
                  <div className="px-4 py-2 flex items-center gap-3">
                    {profile?.profileImage ? (
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 dark:border-white/10 relative">
                        <Image
                          src={profile.profileImage}
                          alt={profile.name || "Profile"}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                        <span className="text-sm text-white font-medium">
                          {profile?.name?.charAt(0) ||
                            address?.slice(2, 4).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {profile?.name ||
                          `${address.slice(0, 6)}...${address.slice(-4)}`}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-500">
                        {formatBalance(balance?.value)}{" "}
                        {balance?.symbol || "LYX"}
                      </p>
                    </div>
                  </div>

                  <a
                    href={`https://universaleverything.io/${address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Profile
                  </a>

                  <button
                    onClick={() => {
                      disconnect();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors w-full"
                  >
                    <LogOut className="w-4 h-4" />
                    Disconnect
                  </button>
                </div>
              ) : (
                <div className="pt-3 px-4">
                  <ConnectButton.Custom>
                    {({ openConnectModal }) => (
                      <button
                        onClick={openConnectModal}
                        className="w-full px-5 py-2.5 text-sm font-medium text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition-colors"
                      >
                        Connect Universal Profile
                      </button>
                    )}
                  </ConnectButton.Custom>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
