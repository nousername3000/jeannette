import { useRef, useEffect } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import { useTheme } from "@/contexts/ThemeContext";
import { getButtonClasses, getOutlineButtonClasses } from "@/lib/themeStyles";
import type { HeroStyle } from "@/lib/themes";

function HeroContent({ buttonStyle }: { buttonStyle: string }) {
  const btnClasses = getButtonClasses(buttonStyle as any);
  const outlineBtnClasses = getOutlineButtonClasses(buttonStyle as any);

  return (
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
          className={`inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold shadow-theme ${btnClasses}`}
        >
          Book Your Free Consultation
        </a>
        <a
          href="#services"
          className={`inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold ${outlineBtnClasses}`}
        >
          Explore Services
        </a>
      </div>
    </div>
  );
}

/* ── Image variant ── */
function HeroImage() {
  return (
    <div className="absolute inset-0">
      <img src={heroBg} alt="" className="w-full h-full object-cover" loading="eager" />
      <div className="absolute inset-0 bg-background/70" />
    </div>
  );
}

/* ── Animated gradient variant ── */
function HeroAnimated() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute w-[600px] h-[600px] -top-40 -left-40 rounded-full bg-primary/15 blur-3xl animate-hero-orb-1" />
      <div className="absolute w-[500px] h-[500px] top-1/3 -right-32 rounded-full bg-accent/12 blur-3xl animate-hero-orb-2" />
      <div className="absolute w-[400px] h-[400px] -bottom-20 left-1/3 rounded-full bg-secondary/20 blur-3xl animate-hero-orb-3" />
    </div>
  );
}

/* ── Gradient variant (no animation, clean sweep) ── */
function HeroGradient() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}

const backgrounds: Record<HeroStyle, () => JSX.Element> = {
  image: HeroImage,
  animated: HeroAnimated,
  gradient: HeroGradient,
};

export function Hero({ variant }: { variant?: HeroStyle }) {
  const { buttonStyle, heroStyle } = useTheme();
  const style = variant ?? heroStyle;
  const Background = backgrounds[style];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Background />
      <HeroContent buttonStyle={buttonStyle} />
    </section>
  );
}
