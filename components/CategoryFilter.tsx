"use client";

import { Category, categories } from "@/templates/templates";
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
        <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
                const Icon = iconMap[category.icon as keyof typeof iconMap];
                const isSelected = selectedCategory === category.id;

                return (
                    <button
                        key={category.id}
                        onClick={() => onCategoryChange(category.id)}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                            isSelected
                                ? "bg-violet-500 text-white"
                                : "bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-200 dark:border-white/5"
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
