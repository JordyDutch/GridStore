"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Grid3X3, Sparkles, Zap, Shield } from "lucide-react";

export function Hero() {
  const { isConnected, address } = useAccount();

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-lukso-pink/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-lukso-purple/20 rounded-full blur-3xl" />

      <div className="relative">
        {/* Main Content */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-lukso-pink" />
            <span className="text-sm text-gray-300">
              Built for LUKSO Universal Profiles
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Customize Your{" "}
            <span className="gradient-text">Grid Experience</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Discover beautiful grid templates for your Universal Profile. Connect
            your UP, browse templates, and apply them with a single transaction.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {!isConnected ? (
              <ConnectButton label="Connect Universal Profile" />
            ) : (
              <div className="flex items-center gap-3 bg-green-500/20 border border-green-500/50 rounded-xl px-4 py-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-400 text-sm">
                  Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
              </div>
            )}
            <a
              href="#featured"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all"
            >
              Browse Templates
            </a>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-lukso-pink/50 transition-colors">
            <div className="w-12 h-12 bg-gradient-lukso rounded-xl flex items-center justify-center mx-auto mb-4">
              <Grid3X3 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Beautiful Templates
            </h3>
            <p className="text-gray-400 text-sm">
              Curated collection of stunning grid layouts for every style and purpose.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-lukso-pink/50 transition-colors">
            <div className="w-12 h-12 bg-gradient-lukso rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              One-Click Apply
            </h3>
            <p className="text-gray-400 text-sm">
              Apply templates directly to your Universal Profile with a single
              transaction.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-lukso-pink/50 transition-colors">
            <div className="w-12 h-12 bg-gradient-lukso rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              On-Chain Storage
            </h3>
            <p className="text-gray-400 text-sm">
              Your template preferences are stored securely on the LUKSO blockchain.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
