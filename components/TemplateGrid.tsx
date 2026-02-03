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
    null,
  );

  const filteredTemplates = useMemo(() => {
    return gridTemplates.filter((template) => {
      const matchesCategory =
        selectedCategory === "all" || template.category === selectedCategory;
      const matchesSearch =
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        template.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredTemplates = useMemo(() => {
    return gridTemplates.filter(
      (t) => t.featured && t.category !== "community",
    );
  }, []);

  const communityTemplates = useMemo(() => {
    return gridTemplates.filter((t) => t.category === "community");
  }, []);

  return (
    <div>
      {/* All Templates */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full" />
          <h2 className="text-xl font-semibold text-white">All Templates</h2>
        </div>

        {/* Search & Filter Card */}
        <div className="card rounded-2xl p-4 sm:p-5 mb-6">
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2.5 pl-11 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none rounded-xl"
            />
          </div>

          {/* Category Filter */}
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Templates Grid */}
        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTemplates.map((template, index) => (
              <div
                key={template.id}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
                className="animate-slideUp opacity-0"
              >
                <TemplateCard
                  template={template}
                  onSelect={setSelectedTemplate}
                  isSelected={selectedTemplate?.id === template.id}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="card rounded-2xl p-12 text-center">
            <p className="text-gray-500">
              No templates found matching your criteria.
            </p>
          </div>
        )}
      </section>

      {/* Featured Section */}
      <section id="featured" className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full" />
          <h2 className="text-xl font-semibold text-white">
            Featured Templates
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredTemplates.map((template, index) => (
            <div
              key={template.id}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
              className="animate-slideUp opacity-0"
            >
              <TemplateCard
                template={template}
                onSelect={setSelectedTemplate}
                isSelected={selectedTemplate?.id === template.id}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Community Section */}
      <section id="featured" className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full" />
          <h2 className="text-xl font-semibold text-white">
            Community Templates
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {communityTemplates.map((template, index) => (
            <div
              key={template.id}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
              className="animate-slideUp opacity-0"
            >
              <TemplateCard
                template={template}
                onSelect={setSelectedTemplate}
                isSelected={selectedTemplate?.id === template.id}
              />
            </div>
          ))}
        </div>
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
