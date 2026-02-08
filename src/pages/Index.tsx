import { Navbar } from "@/components/template/Navbar";
import { Hero } from "@/components/template/Hero";
import { About } from "@/components/template/About";
import { Services } from "@/components/template/Services";
import { LogoTicker } from "@/components/template/LogoTicker";
import { Process } from "@/components/template/Process";
import { ParallaxBand } from "@/components/template/ParallaxBand";
import { Testimonials } from "@/components/template/Testimonials";
import { Gallery } from "@/components/template/Gallery";
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
      <LogoTicker />
      <Process />
      <ParallaxBand />
      <Testimonials />
      <Gallery />
      <FAQ />
      <CTABand />
      <Contact />
      <Footer />

      <ThemeSwitcher />
    </div>
  );
};

export default Index;
