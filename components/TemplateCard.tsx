"use client";

import { GridTemplate } from "@/lib/templates";
import { useCommunityProfile } from "@/hooks/useCommunityProfile";
import { User, Star, ExternalLink, Loader2 } from "lucide-react";

interface TemplateCardProps {
  template: GridTemplate;
  onSelect: (template: GridTemplate) => void;
  isSelected?: boolean;
}

export function TemplateCard({
  template,
  onSelect,
  isSelected,
}: TemplateCardProps) {
  const isCommunityTemplate =
    template.category === "community" && template.profileAddress;
  const { images, isLoading } = useCommunityProfile(
    isCommunityTemplate ? template.profileAddress : undefined,
  );

  return (
    <div
      onClick={() => onSelect(template)}
      className={`template-card cursor-pointer flex flex-col h-full ${
        isSelected ? "border-violet-500/50 bg-violet-500/5" : ""
      }`}
    >
      {/* Preview */}
      <div
        className="h-36 relative shrink-0 overflow-hidden"
        style={{
          background: images.backgroundImage ? undefined : template.preview,
        }}
      >
        {/* Background Image for Community Templates */}
        {images.backgroundImage && (
          <img
            src={images.backgroundImage}
            alt={`${template.author}'s background`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Loading State for Community Templates */}
        {isCommunityTemplate && isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <Loader2 className="w-6 h-6 text-white/50 animate-spin" />
          </div>
        )}

        {/* Grid Preview Overlay - only show for non-community or when no background image */}
        {!images.backgroundImage && (
          <div className="absolute inset-0 p-4 flex items-center justify-center">
            <div
              className="w-full h-full grid gap-1 opacity-30"
              style={{
                gridTemplateColumns: `repeat(${template.gridConfig.columns}, 1fr)`,
                gridTemplateRows: `repeat(${template.gridConfig.rows}, 1fr)`,
              }}
            >
              {Array.from({
                length: template.gridConfig.columns * template.gridConfig.rows,
              }).map((_, i) => (
                <div key={i} className="bg-white/70 rounded-sm" />
              ))}
            </div>
          </div>
        )}

        {/* Profile Image for Community Templates */}
        {images.profileImage && (
          <div className="absolute bottom-3 left-3">
            <img
              src={images.profileImage}
              alt={template.author}
              className="w-10 h-10 rounded-full border-2 border-white/20 object-cover shadow-lg"
            />
          </div>
        )}

        {/* Featured Badge */}
        {template.featured && (
          <div className="absolute top-3 right-3 badge-featured flex items-center gap-1.5 px-2.5 py-1">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-xs font-medium">Featured</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 min-h-0">
        <h3 className="font-medium text-white mb-1.5">{template.name}</h3>
        <p className="text-gray-400 text-sm line-clamp-2 mb-4 leading-relaxed min-h-[2.5rem]">
          {template.description}
        </p>

        {/* Meta & Tags */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <User className="w-3.5 h-3.5" />
            <span>{template.author}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            {template.profileAddress && (
              <a
                href={`https://universaleverything.io/${template.profileAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-violet-500/10 border border-violet-500/20 text-violet-400 hover:bg-violet-500/20 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                View Grid
              </a>
            )}
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300">
              {template.gridConfig.columns}×{template.gridConfig.rows}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
