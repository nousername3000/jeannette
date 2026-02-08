import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTheme } from "@/contexts/ThemeContext";
import { Star } from "lucide-react";
import { getCardClasses, getSectionPadding } from "@/lib/themeStyles";

const testimonials = [
  {
    quote:
      "Dank Jeannette hat unser Sohn endlich wieder Freude am Schreiben gefunden. Die täglichen Kämpfe bei den Hausaufgaben gehören der Vergangenheit an.",
    name: "Sandra M.",
    role: "Mutter eines 8-Jährigen",
    stars: 5,
  },
  {
    quote:
      "Ich war skeptisch, ob Online-Sitzungen funktionieren — aber nach nur wenigen Wochen hat sich das Schriftbild meiner Tochter merklich verbessert. Absolut empfehlenswert!",
    name: "Thomas K.",
    role: "Vater einer 10-Jährigen",
    stars: 5,
  },
  {
    quote:
      "Jeannette versteht es wie keine andere, Kinder dort abzuholen, wo sie stehen. Unser Kind geht jetzt wieder gerne zur Schule.",
    name: "Nina L.",
    role: "Mutter eines 7-Jährigen",
    stars: 5,
  },
];

export function Testimonials() {
  const { ref, revealed } = useScrollReveal();
  const { cardStyle, sectionSpacing } = useTheme();

  return (
    <section id="testimonials" className={getSectionPadding(sectionSpacing)}>
      <div ref={ref} className={`mx-auto max-w-6xl px-6 ${revealed ? "revealed" : ""}`}>
        <div className={`text-center mb-16 reveal`}>
          <p className="text-sm font-medium uppercase tracking-[0.15em] text-primary mb-3">
            Erfahrungsberichte
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Das sagen Eltern
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`p-8 flex flex-col ${getCardClasses(cardStyle)} reveal reveal-delay-${i + 1}`}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-primary text-primary"
                  />
                ))}
              </div>
              <blockquote className="text-sm text-card-foreground leading-relaxed flex-1 mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div>
                <p className="font-display font-semibold text-card-foreground">
                  {t.name}
                </p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
