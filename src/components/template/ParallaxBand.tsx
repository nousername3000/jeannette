import { useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { getSectionPadding } from "@/lib/themeStyles";
import parallaxBg from "@/assets/parallax-bg.jpg";

export function ParallaxBand() {
  const { sectionSpacing } = useTheme();
  const bandRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const band = bandRef.current;
    const bg = bgRef.current;
    if (!band || !bg) return;

    let raf: number;
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        const rect = band.getBoundingClientRect();
        const progress = -rect.top / (rect.height + window.innerHeight);
        // parallax: background moves slower than scroll
        const offset = progress * 120;
        bg.style.transform = `translateY(${offset}px) scale(1.15)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Slow pan animation via CSS
  return (
    <section
      ref={bandRef}
      className={`relative overflow-hidden ${getSectionPadding(sectionSpacing)}`}
    >
      {/* Parallax background with slow pan animation */}
      <div
        ref={bgRef}
        className="absolute inset-0 -inset-y-20 bg-cover bg-center will-change-transform animate-slow-pan"
        style={{ backgroundImage: `url(${parallaxBg})` }}
      />

      {/* Color overlay that adapts to theme */}
      <div className="absolute inset-0 bg-foreground/60" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <p className="font-display text-2xl md:text-4xl font-bold text-background leading-snug">
          "The mind is everything. What you think, you become."
        </p>
        <span className="mt-6 inline-block text-sm tracking-widest uppercase text-background/70">
          — Buddha
        </span>
      </div>
    </section>
  );
}
