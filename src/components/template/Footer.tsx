import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-xl font-bold text-card-foreground mb-3">
              Jeannette Kühnel
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Familienberaterin & Lerntherapeutin — ich begleite Familien und
              ihre Kinder auf dem Weg zu mehr Leichtigkeit im Schulalltag.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-sm font-semibold text-card-foreground mb-4 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Über mich", href: "about" },
                { label: "Angebote", href: "services" },
                { label: "Ablauf", href: "process" },
                { label: "Erfahrungen", href: "testimonials" },
                { label: "FAQ", href: "faq" },
                { label: "Kontakt", href: "contact" },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={`#${l.href}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-semibold text-card-foreground mb-4 uppercase tracking-wider">
              Kontakt
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                info@jeannette-kuehnel.de
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                +49 (0) 30 123 456 78
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                Berlin, Deutschland
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Jeannette Kühnel — Familienberatung & Lerntherapie. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
}
