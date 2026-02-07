import { Navbar } from "@/components/template/Navbar";
import { Hero } from "@/components/template/Hero";
import { About } from "@/components/template/About";
import { Services } from "@/components/template/Services";
import { Process } from "@/components/template/Process";
import { ParallaxBand } from "@/components/template/ParallaxBand";
import { Testimonials } from "@/components/template/Testimonials";
import { FAQ } from "@/components/template/FAQ";
import { CTABand } from "@/components/template/CTABand";
import { Contact } from "@/components/template/Contact";
import { Footer } from "@/components/template/Footer";
import { ThemeSwitcher } from "@/components/template/ThemeSwitcher";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Process />
      <ParallaxBand />
      <Testimonials />
      <FAQ />
      <CTABand />
      <Contact />
      <Footer />

      {/* ── Variant Showcase ── */}
      <div className="border-t-4 border-dashed border-primary/30 mt-0">
        <div className="bg-muted/50 py-6 text-center">
          <p className="font-display text-lg font-semibold text-foreground">⬇ Section Variants Showcase</p>
          <p className="text-sm text-muted-foreground">Alternative styles for comparison — will be cleaned up later</p>
        </div>

        {/* Hero variants */}
        <div className="bg-muted/30 py-4 text-center">
          <span className="text-xs font-medium text-primary uppercase tracking-widest">Hero — Photo Background</span>
        </div>
        <Hero variant="image" />

        <div className="bg-muted/30 py-4 text-center">
          <span className="text-xs font-medium text-primary uppercase tracking-widest">Hero — Animated Orbs</span>
        </div>
        <Hero variant="animated" />

        <div className="bg-muted/30 py-4 text-center">
          <span className="text-xs font-medium text-primary uppercase tracking-widest">Hero — Clean Gradient</span>
        </div>
        <Hero variant="gradient" />
      </div>

      <ThemeSwitcher />
    </div>
  );
};

export default Index;
