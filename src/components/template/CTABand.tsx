import { useScrollReveal } from "@/hooks/useScrollReveal";

export function CTABand() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-20 md:py-28 bg-primary">
      <div
        ref={ref}
        className={`mx-auto max-w-4xl px-6 text-center reveal ${isVisible ? "visible" : ""}`}
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
          Ready to Begin Your Transformation?
        </h2>
        <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
          Your first consultation is completely free. Let's talk about what
          you'd like to change — no pressure, no commitment.
        </p>
        <a
          href="#contact"
          className="inline-flex items-center justify-center rounded-[var(--radius)] bg-background text-foreground px-8 py-3.5 text-base font-semibold hover:opacity-90 transition-opacity shadow-theme"
        >
          Book Your Free Call
        </a>
      </div>
    </section>
  );
}
