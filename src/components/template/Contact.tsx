import { useTheme } from "@/contexts/ThemeContext";
import { getCardClasses, getButtonClasses, getSectionPadding } from "@/lib/themeStyles";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function Contact() {
  const { ref: containerRef, revealed } = useScrollReveal();
  const { cardStyle, buttonStyle, sectionSpacing } = useTheme();

  return (
    <section id="contact" className={`${getSectionPadding(sectionSpacing)} bg-muted/30`}>
      <div className={`mx-auto max-w-6xl px-6 ${revealed ? "revealed" : ""}`} ref={containerRef}>
        <div className="text-center mb-12 reveal">
          <span className="text-sm font-medium text-primary tracking-widest uppercase">
            Kontakt
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3">
            Lass uns sprechen
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
            Bereit für den ersten Schritt? Buche Dir ein kostenloses Erstgespräch
            und finde heraus, wie ich Euch unterstützen kann.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className={`p-6 md:p-8 reveal reveal-delay-1 ${getCardClasses(cardStyle)}`}>
            <h3 className="font-display text-xl font-semibold text-foreground mb-6">
              Nachricht senden
            </h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Dein Name"
                    className="w-full rounded-[var(--radius)] border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    placeholder="+49 ..."
                    className="w-full rounded-[var(--radius)] border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  E-Mail
                </label>
                <input
                  type="email"
                  placeholder="deine@email.de"
                  className="w-full rounded-[var(--radius)] border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Wenn Euer Problem eine Überschrift hätte, wie würde sie lauten?
                </label>
                <input
                  type="text"
                  placeholder="z.B. Mein Kind verweigert die Hausaufgaben"
                  className="w-full rounded-[var(--radius)] border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Schildert kurz Euer Problem
                </label>
                <textarea
                  rows={4}
                  placeholder="Erzähle mir ein wenig über Eure Situation…"
                  className="w-full rounded-[var(--radius)] border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>
              <button
                type="submit"
                className={`w-full px-6 py-3 text-sm font-medium ${getButtonClasses(buttonStyle)}`}
              >
                Nachricht senden
              </button>
            </form>
          </div>

          {/* Map & Address */}
          <div className="space-y-6 reveal reveal-delay-2">
            <div className={`overflow-hidden aspect-[4/3] ${getCardClasses(cardStyle)}`}>
              <iframe
                title="Standort"
                src="https://www.openstreetmap.org/export/embed.html?bbox=13.35%2C52.50%2C13.45%2C52.54&layer=mapnik"
                className="w-full h-full border-0 grayscale-[30%] opacity-90"
                loading="lazy"
              />
            </div>

            <div className={`p-6 ${getCardClasses(cardStyle)}`}>
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                Kontaktdaten
              </h3>
              <div className="space-y-3">
                {[
                  { icon: MapPin, text: "Berlin, Deutschland" },
                  { icon: Phone, text: "+49 (0) 30 123 456 78" },
                  { icon: Mail, text: "info@jeannette-kuehnel.de" },
                  { icon: Clock, text: "Mo–Fr: 9:00 – 18:00 Uhr\nSa: nach Vereinbarung" },
                ].map(({ icon: Icon, text }, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="mt-0.5 text-primary">
                      <Icon size={18} />
                    </div>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
