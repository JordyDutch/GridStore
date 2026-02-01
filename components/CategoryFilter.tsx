"use client";

import { Category, categories } from "@/lib/templates";
import {
  Grid3X3,
  Minus,
  Sparkles,
  Briefcase,
  Gamepad2,
  Users,
} from "lucide-react";

const iconMap = {
  Grid3X3,
  Minus,
  Sparkles,
  Briefcase,
  Gamepad2,
  Users,
};

interface CategoryFilterProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {categories.map((category) => {
        const Icon = iconMap[category.icon as keyof typeof iconMap];
        const isSelected = selectedCategory === category.id;

        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full font-medium transition-all ${
              isSelected
                ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg shadow-purple-500/25"
                : "glass-card text-gray-400 hover:text-white hover:border-purple-500/30"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm">{category.name}</span>
          </button>
        );
      })}
    </div>
  );
}
