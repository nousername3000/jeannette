import { useTheme } from "@/contexts/ThemeContext";
import { getSectionPadding } from "@/lib/themeStyles";

import cert1 from "@/assets/logos/cert-1.png";
import cert2 from "@/assets/logos/cert-2.png";
import cert3 from "@/assets/logos/cert-3.png";
import cert4 from "@/assets/logos/cert-4.png";
import cert5 from "@/assets/logos/cert-5.png";
import cert6 from "@/assets/logos/cert-6.png";

const logos = [
  { src: cert1, alt: "Certified Hypnotherapist" },
  { src: cert2, alt: "National Hypnotherapy Society" },
  { src: cert3, alt: "Accredited Practitioner" },
  { src: cert4, alt: "Mental Health Foundation" },
  { src: cert5, alt: "Institute of Clinical Hypnosis" },
  { src: cert6, alt: "Registered Therapist" },
];

export function LogoTicker() {
  const { sectionSpacing } = useTheme();

  // Duplicate the list for seamless infinite scroll
  const doubled = [...logos, ...logos];

  return (
    <section className={getSectionPadding(sectionSpacing)}>
      <div className="mx-auto max-w-6xl px-6 mb-10 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.15em] text-primary mb-3">
          Credentials
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
          Trusted & Accredited
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Fully certified and registered with leading professional bodies.
        </p>
      </div>

      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-background to-transparent" />

        <div className="flex animate-logo-scroll hover:[animation-play-state:paused]">
          {doubled.map((logo, i) => (
            <div
              key={`${logo.alt}-${i}`}
              className="flex-shrink-0 mx-8 md:mx-12 flex items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-16 md:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
