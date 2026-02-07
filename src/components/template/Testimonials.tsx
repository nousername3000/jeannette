import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTheme } from "@/contexts/ThemeContext";
import { Star } from "lucide-react";
import { getCardClasses, getSectionPadding } from "@/lib/themeStyles";

const testimonials = [
  {
    quote:
      "After just three sessions, my lifelong anxiety felt manageable for the first time. Sarah has a gift for making you feel completely safe and understood.",
    name: "Emily R.",
    role: "Anxiety & Stress",
    stars: 5,
  },
  {
    quote:
      "I was sceptical about hypnotherapy, but Sarah's professional, science-backed approach won me over. I quit smoking in two sessions and haven't looked back.",
    name: "James T.",
    role: "Smoking Cessation",
    stars: 5,
  },
  {
    quote:
      "The confidence I've gained through our sessions has transformed my career and personal life. I can't recommend Sarah highly enough.",
    name: "Priya K.",
    role: "Confidence Building",
    stars: 5,
  },
];

export function Testimonials() {
  const { ref } = useScrollReveal();
  const { cardStyle, sectionSpacing } = useTheme();

  return (
    <section id="testimonials" className={getSectionPadding(sectionSpacing)}>
      <div ref={ref} className="mx-auto max-w-6xl px-6">
        <div className={`text-center mb-16 reveal`}>
          <p className="text-sm font-medium uppercase tracking-[0.15em] text-primary mb-3">
            Testimonials
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Stories of Transformation
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
