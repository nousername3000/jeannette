import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTheme } from "@/contexts/ThemeContext";

export function CTABand() {
  const { ref, revealed } = useScrollReveal();
  const { buttonStyle } = useTheme();

  return (
    <section className="py-20 md:py-28 bg-primary">
      <div
        ref={ref}
        className={`mx-auto max-w-4xl px-6 text-center reveal ${revealed ? "revealed visible" : ""}`}
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
          Bereit für mehr Leichtigkeit?
        </h2>
        <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
          Euer kostenloses Erstgespräch ist der erste Schritt. Lass uns gemeinsam
          herausfinden, wie ich Euch unterstützen kann — ganz unverbindlich.
        </p>
        <a
          href="#contact"
          className={`inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold shadow-theme ${
            buttonStyle === "pill"
              ? "rounded-full bg-background text-foreground hover:opacity-90 transition-opacity"
              : "rounded-[var(--radius)] bg-background text-foreground hover:opacity-90 transition-opacity"
          }`}
        >
          Kostenloses Erstgespräch buchen
        </a>
      </div>
    </section>
  );
}
