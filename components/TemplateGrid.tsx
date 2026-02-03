"use client";

import { useState, useMemo, useEffect } from "react";
import { gridTemplates, Category } from "@/lib/templates";
import { CategoryFilter } from "./CategoryFilter";
import { TemplateCard } from "./TemplateCard";
import { TemplateModal } from "./TemplateModal";
import { GridTemplate } from "@/lib/templates";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

const FEATURED_ITEMS_PER_PAGE = 8;
const COMMUNITY_ITEMS_PER_PAGE = 9;

export function TemplateGrid() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [communityPage, setCommunityPage] = useState(1);
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

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(
    filteredTemplates.length / FEATURED_ITEMS_PER_PAGE,
  );
  const startIndex = (currentPage - 1) * FEATURED_ITEMS_PER_PAGE;
  const endIndex = startIndex + FEATURED_ITEMS_PER_PAGE;
  const paginatedTemplates = filteredTemplates.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const featuredTemplates = useMemo(() => {
    return gridTemplates.filter(
      (t) => t.featured && t.category !== "community",
    );
  }, []);

  const communityTemplates = useMemo(() => {
    return gridTemplates.filter((t) => t.category === "community");
  }, []);

  // Community templates pagination
  const communityTotalPages = Math.ceil(
    communityTemplates.length / COMMUNITY_ITEMS_PER_PAGE,
  );
  const communityStartIndex = (communityPage - 1) * COMMUNITY_ITEMS_PER_PAGE;
  const communityEndIndex = communityStartIndex + COMMUNITY_ITEMS_PER_PAGE;
  const paginatedCommunityTemplates = communityTemplates.slice(
    communityStartIndex,
    communityEndIndex,
  );

  const goToCommunityPage = (page: number) => {
    if (page >= 1 && page <= communityTotalPages) {
      setCommunityPage(page);
      // Scroll to community section
      const communitySection = document.getElementById("community");
      if (communitySection) {
        communitySection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div>
      {/* All Templates */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            All Templates
          </h2>
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
              className="w-full py-2.5 pl-11 pr-4 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none rounded-xl"
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
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {paginatedTemplates.map((template, index) => (
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => {
                      // Show first page, last page, current page, and pages around current
                      const showPage =
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1);

                      if (!showPage) {
                        // Show ellipsis
                        if (
                          page === currentPage - 2 ||
                          page === currentPage + 2
                        ) {
                          return (
                            <span key={page} className="px-2 text-gray-500">
                              ...
                            </span>
                          );
                        }
                        return null;
                      }

                      return (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`px-4 py-2 rounded-lg border transition-colors ${
                            currentPage === page
                              ? "bg-violet-500/20 border-violet-500/50 text-violet-400"
                              : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    },
                  )}
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Results count */}
            <div className="mt-4 text-center text-sm text-gray-500">
              Showing {startIndex + 1}-
              {Math.min(endIndex, filteredTemplates.length)} of{" "}
              {filteredTemplates.length} templates
            </div>
          </>
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
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
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
      <section id="community" className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Community Templates
          </h2>
        </div>

        {communityTemplates.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedCommunityTemplates.map((template, index) => (
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

            {/* Community Pagination Controls */}
            {communityTotalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() => goToCommunityPage(communityPage - 1)}
                  disabled={communityPage === 1}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {Array.from(
                    { length: communityTotalPages },
                    (_, i) => i + 1,
                  ).map((page) => {
                    // Show first page, last page, current page, and pages around current
                    const showPage =
                      page === 1 ||
                      page === communityTotalPages ||
                      (page >= communityPage - 1 && page <= communityPage + 1);

                    if (!showPage) {
                      // Show ellipsis
                      if (
                        page === communityPage - 2 ||
                        page === communityPage + 2
                      ) {
                        return (
                          <span key={page} className="px-2 text-gray-500">
                            ...
                          </span>
                        );
                      }
                      return null;
                    }

                    return (
                      <button
                        key={page}
                        onClick={() => goToCommunityPage(page)}
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                          communityPage === page
                            ? "bg-violet-500/20 border-violet-500/50 text-violet-400"
                            : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => goToCommunityPage(communityPage + 1)}
                  disabled={communityPage === communityTotalPages}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Community Results count */}
            <div className="mt-4 text-center text-sm text-gray-500">
              Showing {communityStartIndex + 1}-
              {Math.min(communityEndIndex, communityTemplates.length)} of{" "}
              {communityTemplates.length} templates
            </div>
          </>
        ) : (
          <div className="card rounded-2xl p-12 text-center">
            <p className="text-gray-500">No community templates available.</p>
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
