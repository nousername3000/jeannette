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
            Get in Touch
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3">
            Begin Your Journey
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
            Ready to take the first step? Reach out to schedule a free consultation 
            and discover how hypnotherapy can help you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className={`p-6 md:p-8 reveal reveal-delay-1 ${getCardClasses(cardStyle)}`}>
            <h3 className="font-display text-xl font-semibold text-foreground mb-6">
              Send a Message
            </h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Jane"
                    className="w-full rounded-[var(--radius)] border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full rounded-[var(--radius)] border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="jane@example.com"
                  className="w-full rounded-[var(--radius)] border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="w-full rounded-[var(--radius)] border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell me a bit about what you're looking for…"
                  className="w-full rounded-[var(--radius)] border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>
              <button
                type="submit"
                className={`w-full px-6 py-3 text-sm font-medium ${getButtonClasses(buttonStyle)}`}
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Map & Address */}
          <div className="space-y-6 reveal reveal-delay-2">
            {/* Map placeholder */}
            <div className={`overflow-hidden aspect-[4/3] ${getCardClasses(cardStyle)}`}>
              <iframe
                title="Location map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-0.1278%2C51.5074%2C-0.1178%2C51.5124&layer=mapnik"
                className="w-full h-full border-0 grayscale-[30%] opacity-90"
                loading="lazy"
              />
            </div>

            {/* Address info */}
            <div className={`p-6 ${getCardClasses(cardStyle)}`}>
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                Visit the Practice
              </h3>
              <div className="space-y-3">
                {[
                  { icon: MapPin, text: "42 Serenity Lane, Suite 3B\nLondon, SW1A 1AA" },
                  { icon: Phone, text: "+44 20 7946 0958" },
                  { icon: Mail, text: "hello@sarahmitchell.co" },
                  { icon: Clock, text: "Mon–Fri: 9am – 7pm\nSat: 10am – 4pm" },
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
