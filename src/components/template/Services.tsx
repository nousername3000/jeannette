import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTheme } from "@/contexts/ThemeContext";
import { BookOpen, Users, Brain, Sparkles, Heart, Shield } from "lucide-react";
import { getCardClasses, getCardHoverClasses, getIconContainerClasses, getSectionPadding, getImageClasses } from "@/lib/themeStyles";
import type { ServicesLayout } from "@/lib/themes";

import anxietyImg from "@/assets/services/anxiety-relief.jpg";
import stressImg from "@/assets/services/stress-management.jpg";
import sleepImg from "@/assets/services/sleep-improvement.jpg";
import confidenceImg from "@/assets/services/confidence-building.jpg";
import smokingImg from "@/assets/services/smoking-cessation.jpg";
import weightImg from "@/assets/services/weight-management.jpg";
import type { LucideIcon } from "lucide-react";

interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
}

const services: ServiceItem[] = [
  {
    icon: BookOpen,
    title: "Lerntherapie",
    description: "Individuelle Förderung bei Lese-Rechtschreibstörung (Legasthenie) und Rechenstörung (Dyskalkulie) — Schritt für Schritt zum Erfolg.",
    image: anxietyImg,
  },
  {
    icon: Users,
    title: "Familienberatung",
    description: "Systemische Beratung für Familien, die unter Schulstress und Konflikten rund ums Lernen leiden.",
    image: stressImg,
  },
  {
    icon: Brain,
    title: "Lese- & Schreibförderung",
    description: "Dein Kind wird Schritt für Schritt zum sicheren Schreiber und Leser — ganz ohne Stress, Streit und Tränen.",
    image: sleepImg,
  },
  {
    icon: Sparkles,
    title: "Selbstbewusstsein stärken",
    description: "Kinder, die sich für dumm halten, brauchen Erfolgserlebnisse. Ich schaffe den Rahmen dafür.",
    image: confidenceImg,
  },
  {
    icon: Heart,
    title: "Schulangst & Schulphobie",
    description: "Bauchschmerzen, Heulattacken, Verweigerung — gemeinsam finden wir Wege zurück in ein entspanntes Schulleben.",
    image: smokingImg,
  },
  {
    icon: Shield,
    title: "Elterncoaching",
    description: "Du lernst, WAS dein Kind braucht und WIE du es als Lernbegleitung kompetent unterstützen kannst.",
    image: weightImg,
  },
];

export function Services() {
  const { ref, revealed } = useScrollReveal();
  const { cardStyle, sectionSpacing, servicesStyle, servicesLayout, imageStyle } = useTheme();
  const showImages = servicesStyle === "with-images";

  return (
    <section id="services" className={getSectionPadding(sectionSpacing)}>
      <div ref={ref} className={`mx-auto max-w-6xl px-6 ${revealed ? "revealed" : ""}`}>
        <div className="text-center mb-16 reveal">
          <p className="text-sm font-medium uppercase tracking-[0.15em] text-primary mb-3">
            Angebote
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Wie ich Euch helfen kann
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Jede Familie ist einzigartig. Ich biete verschiedene Unterstützungsmöglichkeiten,
            die genau auf Eure Situation zugeschnitten sind.
          </p>
        </div>

        <ServicesGrid
          layout={servicesLayout}
          services={services}
          showImages={showImages}
          cardStyle={cardStyle}
          imageStyle={imageStyle}
        />
      </div>
    </section>
  );
}

function ServicesGrid({
  layout,
  services,
  showImages,
  cardStyle,
  imageStyle,
}: {
  layout: ServicesLayout;
  services: ServiceItem[];
  showImages: boolean;
  cardStyle: string;
  imageStyle: string;
}) {
  switch (layout) {
    case "horizontal":
      return <HorizontalLayout services={services} showImages={showImages} cardStyle={cardStyle} imageStyle={imageStyle} />;
    case "minimal":
      return <MinimalLayout services={services} showImages={showImages} cardStyle={cardStyle} imageStyle={imageStyle} />;
    case "overlay":
      return <OverlayLayout services={services} showImages={showImages} cardStyle={cardStyle} imageStyle={imageStyle} />;
    case "cards":
    default:
      return <CardsLayout services={services} showImages={showImages} cardStyle={cardStyle} imageStyle={imageStyle} />;
  }
}

/* ─── Layout 1: Cards (original) ─── */
function CardsLayout({ services, showImages, cardStyle, imageStyle }: LayoutProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, i) => (
        <div
          key={service.title}
          className={`group overflow-hidden ${getCardClasses(cardStyle as any)} ${getCardHoverClasses(cardStyle as any)} reveal reveal-delay-${i + 1}`}
        >
          {showImages && (
            <div className="aspect-[4/3] overflow-hidden">
              <img src={service.image} alt={service.title} className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${getImageClasses(imageStyle as any)}`} />
            </div>
          )}
          <div className={showImages ? "p-6" : "p-8"}>
            <div className={`mb-5 inline-flex items-center justify-center w-12 h-12 ${getIconContainerClasses(cardStyle as any)} transition-colors group-hover:bg-primary group-hover:text-primary-foreground`}>
              <service.icon className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-semibold text-card-foreground mb-3">{service.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Layout 2: Horizontal (image left, text right) ─── */
function HorizontalLayout({ services, showImages, cardStyle, imageStyle }: LayoutProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {services.map((service, i) => (
        <div
          key={service.title}
          className={`group overflow-hidden flex ${showImages ? "flex-row" : "flex-row items-center"} ${getCardClasses(cardStyle as any)} ${getCardHoverClasses(cardStyle as any)} reveal reveal-delay-${i + 1}`}
        >
          {showImages && (
            <div className="w-1/3 shrink-0 overflow-hidden">
              <img src={service.image} alt={service.title} className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${getImageClasses(imageStyle as any)}`} />
            </div>
          )}
          <div className="p-6 flex flex-col justify-center">
            <div className={`mb-3 inline-flex items-center justify-center w-10 h-10 ${getIconContainerClasses(cardStyle as any)} transition-colors group-hover:bg-primary group-hover:text-primary-foreground`}>
              <service.icon className="w-5 h-5" />
            </div>
            <h3 className="font-display text-lg font-semibold text-card-foreground mb-2">{service.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Layout 3: Minimal (clean list rows) ─── */
function MinimalLayout({ services, showImages, cardStyle, imageStyle }: LayoutProps) {
  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {services.map((service, i) => (
        <div
          key={service.title}
          className={`group flex items-center gap-5 p-5 ${getCardClasses(cardStyle as any)} ${getCardHoverClasses(cardStyle as any)} reveal reveal-delay-${i + 1}`}
        >
          {showImages ? (
            <div className="w-16 h-16 shrink-0 overflow-hidden rounded-[var(--radius)]">
              <img src={service.image} alt={service.title} className={`w-full h-full object-cover ${getImageClasses(imageStyle as any)}`} />
            </div>
          ) : (
            <div className={`shrink-0 inline-flex items-center justify-center w-12 h-12 ${getIconContainerClasses(cardStyle as any)} transition-colors group-hover:bg-primary group-hover:text-primary-foreground`}>
              <service.icon className="w-6 h-6" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {showImages && <service.icon className="w-4 h-4 text-primary shrink-0" />}
              <h3 className="font-display text-lg font-semibold text-card-foreground">{service.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Layout 4: Overlay (image background with text overlay) ─── */
function OverlayLayout({ services, showImages, cardStyle, imageStyle }: LayoutProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, i) => (
        <div
          key={service.title}
          className={`group relative overflow-hidden aspect-[3/4] ${getCardClasses(cardStyle as any)} reveal reveal-delay-${i + 1}`}
        >
          {showImages ? (
            <>
              <img
                src={service.image}
                alt={service.title}
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${getImageClasses(imageStyle as any)}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="relative z-10 flex flex-col justify-end h-full p-6">
                <div className="mb-3 inline-flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm text-white rounded-[var(--radius)] border border-white/20">
                  <service.icon className="w-5 h-5" />
                </div>
                <h3 className="font-display text-xl font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{service.description}</p>
              </div>
            </>
          ) : (
            <div className="flex flex-col justify-end h-full p-6 bg-gradient-to-t from-primary/15 via-primary/5 to-transparent">
              <div className={`mb-4 inline-flex items-center justify-center w-12 h-12 ${getIconContainerClasses(cardStyle as any)} transition-colors group-hover:bg-primary group-hover:text-primary-foreground`}>
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-semibold text-card-foreground mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

interface LayoutProps {
  services: ServiceItem[];
  showImages: boolean;
  cardStyle: string;
  imageStyle: string;
}
