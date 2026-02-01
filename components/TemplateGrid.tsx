"use client";

import { useState, useMemo } from "react";
import { gridTemplates, Category } from "@/lib/templates";
import { CategoryFilter } from "./CategoryFilter";
import { TemplateCard } from "./TemplateCard";
import { TemplateModal } from "./TemplateModal";
import { GridTemplate } from "@/lib/templates";
import { Search } from "lucide-react";

export function TemplateGrid() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<GridTemplate | null>(
    null
  );

  const filteredTemplates = useMemo(() => {
    return gridTemplates.filter((template) => {
      const matchesCategory =
        selectedCategory === "all" || template.category === selectedCategory;
      const matchesSearch =
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredTemplates = useMemo(() => {
    return gridTemplates.filter((t) => t.featured);
  }, []);

  return (
    <div>
      {/* Featured Section */}
      <section id="featured" className="mb-20">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <span className="w-1.5 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
          Featured Templates
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTemplates.slice(0, 3).map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onSelect={setSelectedTemplate}
              isSelected={selectedTemplate?.id === template.id}
            />
          ))}
        </div>
      </section>

      {/* All Templates */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <span className="w-1.5 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
          All Templates
        </h2>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full glass-card rounded-2xl py-4 pl-14 pr-6 text-white placeholder-gray-500 focus:outline-none"
          />
        </div>

        {/* Category Filter */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Templates Grid */}
        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onSelect={setSelectedTemplate}
                isSelected={selectedTemplate?.id === template.id}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No templates found matching your criteria.
            </p>
          </div>
        )}
      </section>

      {/* Template Modal */}
      {selectedTemplate && (
        <TemplateModal
          template={selectedTemplate}
          onClose={() => setSelectedTemplate(null)}
        />
      )}
    </div>
  );
}
