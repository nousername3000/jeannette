import heroBg from "@/assets/hero-bg.jpg";
import { useTheme } from "@/contexts/ThemeContext";
import { getButtonClasses, getOutlineButtonClasses } from "@/lib/themeStyles";

export function Hero() {
  const { buttonStyle } = useTheme();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-background/70" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center py-32">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Certified Clinical Hypnotherapist
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight text-foreground mb-6">
          Find Your
          <br />
          <span className="text-primary">Inner Calm</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
          Gentle, evidence-based hypnotherapy to help you release anxiety,
          overcome limiting beliefs, and reclaim the peaceful life you deserve.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className={`inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold shadow-theme ${getButtonClasses(buttonStyle)}`}
          >
            Book Your Free Consultation
          </a>
          <a
            href="#services"
            className={`inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold ${getOutlineButtonClasses(buttonStyle)}`}
          >
            Explore Services
          </a>
        </div>
      </div>
    </section>
  );
}
