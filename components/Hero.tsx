"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Grid3X3, Zap, File } from "lucide-react";

export function Hero() {
  const { isConnected } = useAccount();

  return (
    <section className="mb-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
          Grid{" "}
          <span className="bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
            Templates
          </span>
        </h1>
        <p className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
          Discover and apply beautiful grid templates to your LUKSO Universal
          Profile with a single transaction.
        </p>
      </div>

      {/* Connection CTA - only show when not connected */}
      {!isConnected && (
        <div className="flex justify-center mb-10">
          <ConnectButton.Custom>
            {({ openConnectModal }) => (
              <button
                onClick={openConnectModal}
                className="px-6 py-3 text-sm font-medium text-white bg-violet-600 hover:bg-violet-500 rounded-xl transition-colors"
              >
                Connect Universal Profile
              </button>
            )}
          </ConnectButton.Custom>
        </div>
      )}

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
              <Grid3X3 className="w-5 h-5 text-violet-400" />
            </div>
            <h3 className="font-medium text-white">Beautiful Templates</h3>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Curated collection of stunning grid layouts for every style, use and
            audience.
          </p>
        </div>

        <div className="card rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="font-medium text-white">One-Click Apply</h3>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Apply a grid template directly to your profile in one click with one
            single transaction.
          </p>
        </div>

        <div className="card rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center">
              <File className="w-5 h-5 text-fuchsia-400" />
            </div>
            <h3 className="font-medium text-white">Grid Data</h3>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Find the encoded grid data value of each template to set under your
            Universal Profile.
          </p>
        </div>
      </div>
    </section>
  );
}
