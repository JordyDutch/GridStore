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
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category) => {
        const Icon = iconMap[category.icon as keyof typeof iconMap];
        const isSelected = selectedCategory === category.id;

        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
              isSelected
                ? "bg-gradient-lukso text-white"
                : "bg-lukso-gray text-gray-400 hover:text-white hover:bg-white/10"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{category.name}</span>
          </button>
        );
      })}
    </div>
  );
}
