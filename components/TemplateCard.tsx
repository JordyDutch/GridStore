"use client";

import { GridTemplate } from "@/lib/templates";
import { Download, Star, User } from "lucide-react";

interface TemplateCardProps {
  template: GridTemplate;
  onSelect: (template: GridTemplate) => void;
  isSelected?: boolean;
}

export function TemplateCard({ template, onSelect, isSelected }: TemplateCardProps) {
  return (
    <div
      onClick={() => onSelect(template)}
      className={`template-card relative rounded-2xl overflow-hidden cursor-pointer ${
        isSelected
          ? "border-purple-500/50 shadow-lg shadow-purple-500/20 bg-white/[0.04]"
          : ""
      }`}
    >
      {/* Preview */}
      <div
        className="h-44 relative"
        style={{ background: template.preview }}
      >
        {/* Grid Preview Overlay */}
        <div className="absolute inset-0 p-5 flex items-center justify-center">
          <div
            className="w-full h-full grid gap-1.5 opacity-40"
            style={{
              gridTemplateColumns: `repeat(${template.gridConfig.columns}, 1fr)`,
              gridTemplateRows: `repeat(${template.gridConfig.rows}, 1fr)`,
            }}
          >
            {Array.from({ length: template.gridConfig.columns * template.gridConfig.rows }).map(
              (_, i) => (
                <div key={i} className="bg-white/60 rounded-sm backdrop-blur-sm" />
              )
            )}
          </div>
        </div>

        {/* Featured Badge */}
        {template.featured && (
          <div className="absolute top-3 right-3 featured-badge px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-white fill-white" />
            <span className="text-xs font-semibold text-white">Featured</span>
          </div>
        )}

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-white text-lg mb-2">{template.name}</h3>
        <p className="text-gray-400 text-sm line-clamp-2 mb-4 leading-relaxed">
          {template.description}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            <span>{template.author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" />
            <span>{template.downloads.toLocaleString()}</span>
          </div>
        </div>

        {/* Grid Config */}
        <div className="flex items-center gap-2 text-xs">
          <span className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-gray-300">
            {template.gridConfig.columns}x{template.gridConfig.rows}
          </span>
          <span className="capitalize bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 rounded-lg text-purple-300">
            {template.category}
          </span>
        </div>
      </div>

      {/* Selected Indicator */}
      {isSelected && (
        <div className="absolute inset-0 bg-purple-500/5 pointer-events-none rounded-2xl" />
      )}
    </div>
  );
}
