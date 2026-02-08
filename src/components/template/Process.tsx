import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTheme } from "@/contexts/ThemeContext";
import { getCardClasses, getCardHoverClasses, getSectionPadding } from "@/lib/themeStyles";
import type { ProcessLayout } from "@/lib/themes";

const steps = [
  {
    number: "01",
    title: "Kostenloses Erstgespräch",
    description: "Wir sprechen über Eure Situation und finden gemeinsam heraus, wie ich Euch am besten unterstützen kann.",
  },
  {
    number: "02",
    title: "Analyse & Diagnose",
    description: "Ich analysiere den Entwicklungsstand Eures Kindes und identifiziere die Faktoren, die den Lernerfolg blockieren.",
  },
  {
    number: "03",
    title: "Individuelle Begleitung",
    description: "Mit maßgeschneiderten Übungen und Konzepten begleite ich Euer Kind Schritt für Schritt — online oder vor Ort.",
  },
  {
    number: "04",
    title: "Nachhaltige Veränderung",
    description: "Euer Kind gewinnt Selbstvertrauen zurück und Ihr erlebt wieder mehr Leichtigkeit im Familien- und Schulalltag.",
  },
];

export function Process() {
  const { ref, revealed } = useScrollReveal();
  const { sectionSpacing, processLayout, cardStyle } = useTheme();

  return (
    <section id="process" className={`${getSectionPadding(sectionSpacing)} bg-muted/40`}>
      <div ref={ref} className={`mx-auto max-w-6xl px-6 ${revealed ? "revealed" : ""}`}>
        <div className="text-center mb-16 reveal">
          <p className="text-sm font-medium uppercase tracking-[0.15em] text-primary mb-3">So funktioniert's</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Euer Weg zur Veränderung</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Ein klarer, unterstützender Prozess — vom ersten Gespräch bis zur nachhaltigen Veränderung.
          </p>
        </div>

        <ProcessContent layout={processLayout} cardStyle={cardStyle} />
      </div>
    </section>
  );
}

function ProcessContent({ layout, cardStyle }: { layout: ProcessLayout; cardStyle: string }) {
  switch (layout) {
    case "timeline": return <TimelineLayout />;
    case "cards": return <CardsLayout cardStyle={cardStyle} />;
    case "minimal": return <MinimalLayout />;
    case "grid":
    default: return <GridLayout />;
  }
}

/* ── Layout 1: Grid (original) ── */
function GridLayout() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {steps.map((step, i) => (
        <div key={step.number} className={`relative reveal reveal-delay-${i + 1}`}>
          <span className="font-display text-5xl font-bold text-primary/15">{step.number}</span>
          <h3 className="mt-2 font-display text-lg font-semibold text-foreground">{step.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
          {i < steps.length - 1 && (
            <div className="hidden lg:block absolute top-6 right-0 translate-x-1/2 w-8 h-px bg-border" />
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Layout 2: Timeline (vertical line with alternating sides) ── */
function TimelineLayout() {
  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-border" />
      {steps.map((step, i) => (
        <div
          key={step.number}
          className={`relative flex items-start gap-6 mb-12 last:mb-0 reveal reveal-delay-${i + 1} ${
            i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
          }`}
        >
          <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background z-10 mt-1.5" />
          <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
            <span className="text-xs font-bold text-primary uppercase tracking-widest">{step.number}</span>
            <h3 className="font-display text-lg font-semibold text-foreground mt-1">{step.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Layout 3: Cards (individual styled cards) ── */
function CardsLayout({ cardStyle }: { cardStyle: string }) {
  return (
    <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {steps.map((step, i) => (
        <div
          key={step.number}
          className={`p-8 ${getCardClasses(cardStyle as any)} ${getCardHoverClasses(cardStyle as any)} reveal reveal-delay-${i + 1}`}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-display text-sm font-bold mb-4">
            {step.number}
          </span>
          <h3 className="font-display text-lg font-semibold text-foreground">{step.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
        </div>
      ))}
    </div>
  );
}

/* ── Layout 4: Minimal (numbered list, clean) ── */
function MinimalLayout() {
  return (
    <div className="max-w-2xl mx-auto space-y-10">
      {steps.map((step, i) => (
        <div key={step.number} className={`flex gap-6 items-start reveal reveal-delay-${i + 1}`}>
          <span className="font-display text-4xl font-bold text-primary/20 shrink-0 w-12">{step.number}</span>
          <div className="border-b border-border pb-8 flex-1">
            <h3 className="font-display text-lg font-semibold text-foreground">{step.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
