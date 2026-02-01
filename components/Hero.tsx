"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Grid3X3, Sparkles, Zap, Shield } from "lucide-react";

export function Hero() {
  const { isConnected, address } = useAccount();

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-pink-600/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative">
        {/* Main Content */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2.5 mb-8">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-300 font-medium">
              Built for LUKSO Universal Profiles
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
            Customize Your
            <br />
            <span className="gradient-text">Grid Experience</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover beautiful grid templates for your Universal Profile. Connect
            your UP, browse templates, and apply them with a single transaction.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {!isConnected ? (
              <ConnectButton label="Connect Universal Profile" />
            ) : (
              <div className="flex items-center gap-3 glass-card rounded-full px-5 py-2.5 border-green-500/30">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-400 text-sm font-medium">
                  Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
              </div>
            )}
            <a
              href="#featured"
              className="px-8 py-3.5 glass-card hover:bg-white/10 text-white font-semibold rounded-full transition-all"
            >
              Browse Templates
            </a>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="glass-card rounded-2xl p-8 text-center group">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/25">
              <Grid3X3 className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Beautiful Templates
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Curated collection of stunning grid layouts for every style and purpose.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-8 text-center group">
            <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-pink-500/25">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-3">
              One-Click Apply
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Apply templates directly to your Universal Profile with a single
              transaction.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-8 text-center group">
            <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-violet-500/25">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Universal Profile
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Grid layouts are stored directly on your Universal Profile using LSP2 data keys.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
