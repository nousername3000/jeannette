import { Navbar } from "@/components/template/Navbar";
import { Hero } from "@/components/template/Hero";
import { About } from "@/components/template/About";
import { Services } from "@/components/template/Services";
import { Process } from "@/components/template/Process";
import { Testimonials } from "@/components/template/Testimonials";
import { CTABand } from "@/components/template/CTABand";
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
      <Testimonials />
      <CTABand />
      <Footer />
      <ThemeSwitcher />
    </div>
  );
};

export default Index;
