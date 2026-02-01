import { Header, Hero, TemplateGrid, Footer } from "@/components";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Hero />
          <TemplateGrid />
        </div>
        
        <Footer />
      </div>
    </main>
  );
}
