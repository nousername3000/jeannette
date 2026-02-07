import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTheme } from "@/contexts/ThemeContext";
import { Brain, Moon, Shield, Sparkles, Flame, Leaf } from "lucide-react";
import { getCardClasses, getCardHoverClasses, getIconContainerClasses, getSectionPadding, getImageClasses } from "@/lib/themeStyles";

import anxietyImg from "@/assets/services/anxiety-relief.jpg";
import stressImg from "@/assets/services/stress-management.jpg";
import sleepImg from "@/assets/services/sleep-improvement.jpg";
import confidenceImg from "@/assets/services/confidence-building.jpg";
import smokingImg from "@/assets/services/smoking-cessation.jpg";
import weightImg from "@/assets/services/weight-management.jpg";

const services = [
  {
    icon: Shield,
    title: "Anxiety Relief",
    description: "Release deep-seated anxiety and develop lasting inner calm through targeted subconscious techniques.",
    image: anxietyImg,
  },
  {
    icon: Brain,
    title: "Stress Management",
    description: "Rewire your stress response and build resilience with evidence-based hypnotic strategies.",
    image: stressImg,
  },
  {
    icon: Moon,
    title: "Sleep Improvement",
    description: "Overcome insomnia and restless nights by training your mind for deep, restorative sleep.",
    image: sleepImg,
  },
  {
    icon: Sparkles,
    title: "Confidence Building",
    description: "Unlock your true potential by dissolving self-doubt and amplifying your inner strength.",
    image: confidenceImg,
  },
  {
    icon: Flame,
    title: "Smoking Cessation",
    description: "Break free from smoking with a proven hypnotherapy protocol — most clients quit in 1–3 sessions.",
    image: smokingImg,
  },
  {
    icon: Leaf,
    title: "Weight Management",
    description: "Transform your relationship with food through mindful, subconscious reprogramming.",
    image: weightImg,
  },
];

export function Services() {
  const { ref, revealed } = useScrollReveal();
  const { cardStyle, sectionSpacing, servicesStyle, imageStyle } = useTheme();
  const showImages = servicesStyle === "with-images";

  return (
    <section id="services" className={getSectionPadding(sectionSpacing)}>
      <div ref={ref} className={`mx-auto max-w-6xl px-6 ${revealed ? "revealed" : ""}`}>
        <div className="text-center mb-16 reveal">
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
              className={`group overflow-hidden ${getCardClasses(cardStyle)} ${getCardHoverClasses(cardStyle)} reveal reveal-delay-${i + 1}`}
            >
              {showImages && (
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${getImageClasses(imageStyle)}`}
                  />
                </div>
              )}
              <div className={showImages ? "p-6" : "p-8"}>
                <div className={`mb-5 inline-flex items-center justify-center w-12 h-12 ${getIconContainerClasses(cardStyle)} transition-colors group-hover:bg-primary group-hover:text-primary-foreground`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-semibold text-card-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
