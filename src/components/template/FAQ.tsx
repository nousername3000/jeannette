import { useTheme } from "@/contexts/ThemeContext";
import { getCardClasses, getSectionPadding } from "@/lib/themeStyles";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What is hypnotherapy and how does it work?",
    a: "Hypnotherapy uses guided relaxation and focused attention to reach a heightened state of awareness, sometimes called a trance. In this state, your mind is more open to positive suggestions and can address deep-seated patterns of thought and behaviour.",
  },
  {
    q: "Is hypnotherapy safe?",
    a: "Absolutely. Hypnotherapy is a well-established, evidence-based practice. You remain fully in control throughout every session. It's a collaborative process — I simply guide you into a deeply relaxed state where change becomes easier.",
  },
  {
    q: "How many sessions will I need?",
    a: "Most clients see meaningful results within 3–6 sessions. Some concerns, like phobias or single-event issues, may resolve in as few as 1–2 sessions. We'll discuss a personalised plan during your free consultation.",
  },
  {
    q: "What can hypnotherapy help with?",
    a: "Common areas include anxiety and stress management, smoking cessation, weight management, phobias, sleep issues, confidence building, and pain management. If you're unsure whether your concern is a fit, reach out for a free chat.",
  },
  {
    q: "What happens during a session?",
    a: "Each session begins with a conversation about your progress, followed by a guided hypnosis experience lasting 20–30 minutes. You'll feel deeply relaxed — many clients describe it as the most restful experience they've ever had.",
  },
  {
    q: "Do you offer online sessions?",
    a: "Yes! Online hypnotherapy is just as effective as in-person sessions. All you need is a quiet space, a comfortable seat, and a stable internet connection. I offer sessions via Zoom worldwide.",
  },
];

export function FAQ() {
  const { ref: containerRef } = useScrollReveal();
  const { cardStyle, sectionSpacing } = useTheme();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className={`${getSectionPadding(sectionSpacing)} bg-background`}>
      <div className="mx-auto max-w-3xl px-6" ref={containerRef}>
        <div className="text-center mb-12 reveal">
          <span className="text-sm font-medium text-primary tracking-widest uppercase">
            FAQ
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3">
            Common Questions
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
            Everything you need to know before your first session.
          </p>
        </div>

        <div className={`divide-y divide-border overflow-hidden reveal reveal-delay-1 ${getCardClasses(cardStyle)}`}>
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
                    className={`shrink-0 text-muted-foreground transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
