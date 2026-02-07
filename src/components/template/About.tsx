import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTheme } from "@/contexts/ThemeContext";
import { Award, GraduationCap, Heart } from "lucide-react";
import { getCardClasses, getCardHoverClasses, getImageClasses, getSectionPadding } from "@/lib/themeStyles";
import type { AboutLayout } from "@/lib/themes";

const credentials = [
  { icon: GraduationCap, text: "MSc Clinical Hypnotherapy" },
  { icon: Award, text: "15+ Years Experience" },
  { icon: Heart, text: "2,000+ Lives Changed" },
];

const bioShort = "I'm Sarah Mitchell, and I believe that every person holds the power to heal within themselves.";
const bioLong = "As a certified clinical hypnotherapist, I've spent over 15 years guiding individuals through gentle, evidence-based techniques that unlock their subconscious potential.";
const bioApproach = "My approach combines traditional hypnotherapy with modern neuroscience, creating a warm and supportive environment where real change happens — naturally and comfortably.";

export function About() {
  const { ref, revealed } = useScrollReveal();
  const { imageStyle, sectionSpacing, aboutLayout, cardStyle } = useTheme();

  return (
    <section id="about" className={`${getSectionPadding(sectionSpacing)} bg-muted/40`}>
      <div ref={ref} className={`mx-auto max-w-6xl px-6 ${revealed ? "revealed" : ""}`}>
        <AboutContent layout={aboutLayout} imageStyle={imageStyle} cardStyle={cardStyle} />
      </div>
    </section>
  );
}

function AboutContent({ layout, imageStyle, cardStyle }: { layout: AboutLayout; imageStyle: string; cardStyle: string }) {
  switch (layout) {
    case "centered": return <CenteredLayout imageStyle={imageStyle} />;
    case "cards": return <CardsLayout cardStyle={cardStyle} />;
    case "full-width": return <FullWidthLayout />;
    case "split":
    default: return <SplitLayout imageStyle={imageStyle} />;
  }
}

/* ── Shared: Avatar placeholder ── */
function Avatar({ className = "w-72 h-72 md:w-80 md:h-80", imageStyle }: { className?: string; imageStyle?: string }) {
  return (
    <div className={`${className} bg-secondary shadow-theme-lg ${imageStyle ? getImageClasses(imageStyle as any) : "rounded-[var(--radius)]"}`}>
      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
        <span className="font-display text-6xl text-primary/40">SM</span>
      </div>
    </div>
  );
}

/* ── Shared: Credential badges ── */
function Credentials() {
  return (
    <div className="flex flex-wrap gap-6">
      {credentials.map((cred) => (
        <div key={cred.text} className="flex items-center gap-2">
          <cred.icon className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-foreground">{cred.text}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Layout 1: Split (original — image left, text right) ── */
function SplitLayout({ imageStyle }: { imageStyle: string }) {
  return (
    <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center reveal">
      <div className="flex justify-center">
        <div className="relative">
          <Avatar imageStyle={imageStyle} />
          <div className={`absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 -z-10 ${getImageClasses(imageStyle as any)}`} />
        </div>
      </div>
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.15em] text-primary mb-3">About Me</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">A Safe Space for Transformation</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">{bioShort} {bioLong}</p>
        <p className="text-muted-foreground leading-relaxed mb-8">{bioApproach}</p>
        <Credentials />
      </div>
    </div>
  );
}

/* ── Layout 2: Centered (image on top, text centered below) ── */
function CenteredLayout({ imageStyle }: { imageStyle: string }) {
  return (
    <div className="text-center reveal">
      <div className="flex justify-center mb-8">
        <Avatar className="w-40 h-40 md:w-48 md:h-48" imageStyle={imageStyle} />
      </div>
      <p className="text-sm font-medium uppercase tracking-[0.15em] text-primary mb-3">About Me</p>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">A Safe Space for Transformation</h2>
      <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed mb-4">{bioShort} {bioLong}</p>
      <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed mb-8">{bioApproach}</p>
      <div className="flex justify-center">
        <Credentials />
      </div>
    </div>
  );
}

/* ── Layout 3: Cards (credentials as separate styled cards) ── */
function CardsLayout({ cardStyle }: { cardStyle: string }) {
  return (
    <div className="reveal">
      <div className="text-center mb-12">
        <p className="text-sm font-medium uppercase tracking-[0.15em] text-primary mb-3">About Me</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">A Safe Space for Transformation</h2>
        <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed">{bioShort} {bioLong}</p>
      </div>
      <div className="grid sm:grid-cols-3 gap-6">
        {credentials.map((cred) => (
          <div key={cred.text} className={`p-8 text-center ${getCardClasses(cardStyle as any)} ${getCardHoverClasses(cardStyle as any)}`}>
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
              <cred.icon className="w-7 h-7 text-primary" />
            </div>
            <p className="font-display text-base font-semibold text-foreground">{cred.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Layout 4: Full-width (background gradient, dramatic) ── */
function FullWidthLayout() {
  return (
    <div className="reveal -mx-6 px-6 py-16 md:py-20 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-[var(--radius)]">
      <div className="max-w-3xl mx-auto">
        <p className="text-sm font-medium uppercase tracking-[0.15em] text-primary mb-3">About Me</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8">A Safe Space for Transformation</h2>
        <blockquote className="border-l-4 border-primary pl-6 mb-8">
          <p className="text-lg text-foreground leading-relaxed italic">{bioShort}</p>
        </blockquote>
        <p className="text-muted-foreground leading-relaxed mb-4">{bioLong}</p>
        <p className="text-muted-foreground leading-relaxed mb-10">{bioApproach}</p>
        <Credentials />
      </div>
    </div>
  );
}
