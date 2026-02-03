"use client";

import { useState } from "react";
import {
  Header,
  Hero,
  TemplateGrid,
  Footer,
  TemplateModal,
} from "@/components";
import type { GridTemplate } from "@/lib/types";

export default function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState<GridTemplate | null>(
    null,
  );

  const handleSelectTemplate = (template: GridTemplate) => {
    setSelectedTemplate(template);
  };

  const handleCloseModal = () => {
    setSelectedTemplate(null);
  };

  return (
    <main className="min-h-screen antialiased">
      <Header />

      <div className="pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <Hero />
          <TemplateGrid onSelectTemplate={handleSelectTemplate} />
        </div>

        <Footer />
      </div>

      {/* Modal (lifted to page level) */}
      {selectedTemplate && (
        <TemplateModal template={selectedTemplate} onClose={handleCloseModal} />
      )}
    </main>
  );
}
