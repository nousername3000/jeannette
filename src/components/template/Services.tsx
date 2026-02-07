import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Brain, Moon, Shield, Sparkles, Flame, Leaf } from "lucide-react";

const services = [
  {
    icon: Shield,
    title: "Anxiety Relief",
    description:
      "Release deep-seated anxiety and develop lasting inner calm through targeted subconscious techniques.",
  },
  {
    icon: Brain,
    title: "Stress Management",
    description:
      "Rewire your stress response and build resilience with evidence-based hypnotic strategies.",
  },
  {
    icon: Moon,
    title: "Sleep Improvement",
    description:
      "Overcome insomnia and restless nights by training your mind for deep, restorative sleep.",
  },
  {
    icon: Sparkles,
    title: "Confidence Building",
    description:
      "Unlock your true potential by dissolving self-doubt and amplifying your inner strength.",
  },
  {
    icon: Flame,
    title: "Smoking Cessation",
    description:
      "Break free from smoking with a proven hypnotherapy protocol — most clients quit in 1–3 sessions.",
  },
  {
    icon: Leaf,
    title: "Weight Management",
    description:
      "Transform your relationship with food through mindful, subconscious reprogramming.",
  },
];

export function Services() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="services" className="py-24 md:py-32">
      <div ref={ref} className="mx-auto max-w-6xl px-6">
        <div className={`text-center mb-16 reveal ${isVisible ? "visible" : ""}`}>
          <p className="text-sm font-medium uppercase tracking-[0.15em] text-primary mb-3">
            Services
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            How I Can Help You
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Every journey is unique. I offer a range of specialised
            hypnotherapy services tailored to your individual needs.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`group rounded-[var(--radius)] border border-border bg-card p-8 transition-all duration-300 hover:shadow-theme-lg hover:-translate-y-1 reveal ${isVisible ? "visible" : ""} reveal-delay-${i + 1}`}
            >
              <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-[var(--radius)] bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-semibold text-card-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
