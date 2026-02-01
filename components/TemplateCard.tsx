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
      className={`template-card relative bg-lukso-gray rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${
        isSelected
          ? "border-lukso-pink shadow-lg shadow-lukso-pink/20"
          : "border-transparent hover:border-white/20"
      }`}
    >
      {/* Preview */}
      <div
        className="h-40 relative"
        style={{ background: template.preview }}
      >
        {/* Grid Preview Overlay */}
        <div className="absolute inset-0 p-4 flex items-center justify-center">
          <div
            className="w-full h-full grid gap-1 opacity-30"
            style={{
              gridTemplateColumns: `repeat(${template.gridConfig.columns}, 1fr)`,
              gridTemplateRows: `repeat(${template.gridConfig.rows}, 1fr)`,
            }}
          >
            {Array.from({ length: template.gridConfig.columns * template.gridConfig.rows }).map(
              (_, i) => (
                <div key={i} className="bg-white/50 rounded-sm" />
              )
            )}
          </div>
        </div>

        {/* Featured Badge */}
        {template.featured && (
          <div className="absolute top-3 right-3 bg-gradient-lukso px-3 py-1 rounded-full flex items-center gap-1">
            <Star className="w-3 h-3 text-white fill-white" />
            <span className="text-xs font-semibold text-white">Featured</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-white text-lg mb-1">{template.name}</h3>
        <p className="text-gray-400 text-sm line-clamp-2 mb-3">
          {template.description}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            <span>{template.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Download className="w-3 h-3" />
            <span>{template.downloads.toLocaleString()}</span>
          </div>
        </div>

        {/* Grid Config */}
        <div className="mt-3 pt-3 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="bg-white/10 px-2 py-1 rounded">
              {template.gridConfig.columns}x{template.gridConfig.rows}
            </span>
            <span className="capitalize bg-white/10 px-2 py-1 rounded">
              {template.category}
            </span>
          </div>
        </div>
      </div>

      {/* Selected Indicator */}
      {isSelected && (
        <div className="absolute inset-0 bg-lukso-pink/10 pointer-events-none" />
      )}
    </div>
  );
}
