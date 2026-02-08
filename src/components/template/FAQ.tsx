import { useTheme } from "@/contexts/ThemeContext";
import { getCardClasses, getSectionPadding } from "@/lib/themeStyles";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FAQLayout } from "@/lib/themes";

const faqs = [
  {
    q: "Wie erkenne ich, ob mein Kind eine Lernstörung hat?",
    a: "Typische Anzeichen sind anhaltende Schwierigkeiten beim Lesen, Schreiben oder Rechnen trotz regelmäßigem Üben, Vermeidungsverhalten, sinkende Motivation und emotionale Belastung. In einem kostenlosen Erstgespräch können wir gemeinsam herausfinden, wo Euer Kind steht.",
  },
  {
    q: "Wie läuft eine Lerntherapie ab?",
    a: "Zunächst analysiere ich den aktuellen Entwicklungsstand Eures Kindes. Darauf aufbauend erstelle ich einen individuellen Förderplan mit gezielten Übungen. Die Sitzungen finden regelmäßig statt — online oder vor Ort — und werden laufend angepasst.",
  },
  {
    q: "Wie viele Sitzungen sind nötig?",
    a: "Das hängt von der individuellen Situation ab. Manche Kinder zeigen schon nach wenigen Wochen deutliche Fortschritte, andere brauchen eine längere Begleitung. Im Erstgespräch besprechen wir eine realistische Einschätzung.",
  },
  {
    q: "Bieten Sie auch Online-Sitzungen an?",
    a: "Ja! Online-Lerntherapie ist genauso wirksam wie Präsenzsitzungen. Alles was Ihr braucht, ist ein ruhiger Platz, einen Computer und eine stabile Internetverbindung.",
  },
  {
    q: "Was unterscheidet Lerntherapie von Nachhilfe?",
    a: "Nachhilfe wiederholt den Schulstoff. Lerntherapie setzt tiefer an: Ich arbeite an den grundlegenden Fähigkeiten, die das Lernen erst ermöglichen — wie Lesen, Schreiben und Rechnen — und stärke gleichzeitig das Selbstvertrauen Eures Kindes.",
  },
  {
    q: "Können auch Eltern an den Sitzungen teilnehmen?",
    a: "Auf jeden Fall! Die Einbindung der Eltern ist mir sehr wichtig. Ich zeige Euch, wie Ihr Euer Kind zuhause sinnvoll begleiten könnt — ohne Stress und Streit.",
  },
];

export function FAQ() {
  const { ref: containerRef, revealed } = useScrollReveal();
  const { cardStyle, sectionSpacing, faqLayout } = useTheme();

  return (
    <section id="faq" className={`${getSectionPadding(sectionSpacing)} bg-background`}>
      <div className={`mx-auto max-w-5xl px-6 ${revealed ? "revealed" : ""}`} ref={containerRef}>
        <div className="text-center mb-12 reveal">
          <span className="text-sm font-medium text-primary tracking-widest uppercase">FAQ</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3">Häufige Fragen</h2>
          <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
            Alles, was Du wissen solltest, bevor wir starten.
          </p>
        </div>

        <FAQContent layout={faqLayout} cardStyle={cardStyle} />
      </div>
    </section>
  );
}

function FAQContent({ layout, cardStyle }: { layout: FAQLayout; cardStyle: string }) {
  switch (layout) {
    case "grid": return <GridLayout cardStyle={cardStyle} />;
    case "two-column": return <TwoColumnLayout cardStyle={cardStyle} />;
    case "flat": return <FlatLayout cardStyle={cardStyle} />;
    case "accordion":
    default: return <AccordionLayout cardStyle={cardStyle} />;
  }
}

/* ── Layout 1: Accordion (original) ── */
function AccordionLayout({ cardStyle }: { cardStyle: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={`divide-y divide-border overflow-hidden reveal reveal-delay-1 max-w-3xl mx-auto ${getCardClasses(cardStyle as any)}`}>
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <span>{faq.q}</span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Layout 2: Grid (question cards in 2-col grid) ── */
function GridLayout({ cardStyle }: { cardStyle: string }) {
  return (
    <div className="grid sm:grid-cols-2 gap-6 reveal reveal-delay-1">
      {faqs.map((faq, i) => (
        <div key={i} className={`p-6 ${getCardClasses(cardStyle as any)}`}>
          <h3 className="font-display text-base font-semibold text-foreground mb-3">{faq.q}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
        </div>
      ))}
    </div>
  );
}

/* ── Layout 3: Two-Column (split accordion columns) ── */
function TwoColumnLayout({ cardStyle }: { cardStyle: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const half = Math.ceil(faqs.length / 2);
  const left = faqs.slice(0, half);
  const right = faqs.slice(half);

  const renderColumn = (items: typeof faqs, offset: number) => (
    <div className={`divide-y divide-border overflow-hidden ${getCardClasses(cardStyle as any)}`}>
      {items.map((faq, i) => {
        const idx = i + offset;
        const isOpen = openIndex === idx;
        return (
          <div key={idx}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <span>{faq.q}</span>
              <ChevronDown size={16} className={`shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            </button>
            <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden">
                <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="grid md:grid-cols-2 gap-6 reveal reveal-delay-1">
      {renderColumn(left, 0)}
      {renderColumn(right, half)}
    </div>
  );
}

/* ── Layout 4: Flat (all answers visible, no accordion) ── */
function FlatLayout({ cardStyle }: { cardStyle: string }) {
  return (
    <div className="space-y-8 max-w-3xl mx-auto reveal reveal-delay-1">
      {faqs.map((faq, i) => (
        <div key={i} className="border-b border-border pb-8 last:border-0">
          <h3 className="font-display text-lg font-semibold text-foreground mb-3">{faq.q}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
        </div>
      ))}
    </div>
  );
}
