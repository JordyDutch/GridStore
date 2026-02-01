"use client";

import { Grid3X3, Github, Twitter, ExternalLink } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/5 mt-24 bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                <Grid3X3 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">GridStore</span>
            </Link>
            <p className="text-gray-400 text-sm max-w-md leading-relaxed">
              The marketplace for Universal Profile grid templates. Customize your
              LUKSO profile with beautiful layouts stored on-chain.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-5">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://docs.lukso.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 text-sm flex items-center gap-2 transition-colors"
                >
                  LUKSO Docs
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://universaleverything.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 text-sm flex items-center gap-2 transition-colors"
                >
                  Universal Everything
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://universalprofile.cloud"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 text-sm flex items-center gap-2 transition-colors"
                >
                  Profile Explorer
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-5">Connect</h4>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 glass-card rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/30 transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 glass-card rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/30 transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} GridStore. Built on LUKSO.
          </p>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>Powered by</span>
            <a
              href="https://lukso.network"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
            >
              LUKSO
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
