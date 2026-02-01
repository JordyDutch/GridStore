import { Header, Hero, TemplateGrid, Footer } from "@/components";

export default function Home() {
  return (
    <main className="min-h-screen antialiased">
      <Header />
      
      <div className="pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <Hero />
          <TemplateGrid />
        </div>
        
        <Footer />
      </div>
    </main>
  );
}
