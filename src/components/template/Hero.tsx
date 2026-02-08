import heroBg from "@/assets/hero-bg.jpg";
import heroCompactBg from "@/assets/hero-compact-bg.jpg";
import heroSplitPhoto from "@/assets/hero-split-photo.png";
import { useTheme } from "@/contexts/ThemeContext";
import { getButtonClasses, getOutlineButtonClasses } from "@/lib/themeStyles";
import type { HeroStyle, HeroLayout } from "@/lib/themes";

/* ── CTA Buttons ── */
function HeroCTA({ buttonStyle }: { buttonStyle: string }) {
  const btnClasses = getButtonClasses(buttonStyle as any);
  const outlineBtnClasses = getOutlineButtonClasses(buttonStyle as any);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <a
        href="#contact"
        className={`inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold shadow-theme ${btnClasses}`}
      >
        Kostenloses Erstgespräch
      </a>
      <a
        href="#services"
        className={`inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold ${outlineBtnClasses}`}
      >
        Meine Angebote
      </a>
    </div>
  );
}

/* ── Layout 1: Centered (original) ── */
function LayoutCentered({ buttonStyle }: { buttonStyle: string }) {
  return (
    <div className="relative z-10 mx-auto max-w-4xl px-6 text-center py-32">
      <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Familienberaterin & Lerntherapeutin
      </p>
      <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight text-foreground mb-6">
        Raus aus dem
        <br />
        <span className="text-primary">Schulfrust</span>
      </h1>
      <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
        Ich begleite Familien und ihre Kinder mit Schulproblemen, Lernstörungen
        und Schulangst — hin zu mehr Leichtigkeit, Klarheit und Sicherheit.
      </p>
      <HeroCTA buttonStyle={buttonStyle} />
    </div>
  );
}

/* ── Layout 2: Split (text left, visual right) ── */
function LayoutSplit({ buttonStyle }: { buttonStyle: string }) {
  return (
    <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Familienberaterin & Lerntherapeutin
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight text-foreground mb-6">
          Raus aus dem <span className="text-primary">Schulfrust</span>
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          Ich begleite Familien und ihre Kinder mit Schulproblemen, Lernstörungen
          und Schulangst — hin zu mehr Leichtigkeit, Klarheit und Sicherheit.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <HeroCTA buttonStyle={buttonStyle} />
        </div>
      </div>
      <div className="hidden md:flex justify-center items-center">
        <div className="w-full max-w-md aspect-[4/3] rounded-[var(--radius)] overflow-hidden shadow-theme-lg">
          <img src={heroSplitPhoto} alt="Jeannette Kühnel" className="w-full h-full object-cover object-top" />
        </div>
      </div>
    </div>
  );
}

/* ── Layout 3: Minimal ── */
function LayoutMinimal({ buttonStyle }: { buttonStyle: string }) {
  return (
    <div className="relative z-10 mx-auto max-w-3xl px-6 text-center py-40 md:py-48">
      <h1 className="font-display text-6xl md:text-8xl font-bold leading-[0.95] text-foreground mb-8">
        Mehr <span className="text-primary">Leichtigkeit</span>
      </h1>
      <p className="text-lg text-muted-foreground mb-10">
        Familienberatung & Lerntherapie für ein entspanntes Schulleben.
      </p>
      <HeroCTA buttonStyle={buttonStyle} />
    </div>
  );
}

/* ── Layout 4: Bold ── */
function LayoutBold({ buttonStyle }: { buttonStyle: string }) {
  return (
    <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:py-32">
      <p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-primary">
        Familienberaterin & Lerntherapeutin
      </p>
      <h1 className="font-display text-6xl md:text-[8rem] font-bold leading-[0.9] text-foreground mb-8 max-w-4xl">
        Raus aus dem <span className="text-primary">Schulfrust</span>
      </h1>
      <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
        <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
          Ich begleite Familien mit Schulproblemen und Lernstörungen zurück zu Leichtigkeit und Selbstvertrauen.
        </p>
        <HeroCTA buttonStyle={buttonStyle} />
      </div>
    </div>
  );
}

/* ── Layout 5: Compact ── */
function LayoutCompact({ buttonStyle }: { buttonStyle: string }) {
  return (
    <div className="relative z-10 mx-auto max-w-4xl px-6 text-center py-20 md:py-28">
      <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Familienberaterin & Lerntherapeutin
      </p>
      <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight text-foreground mb-6">
        Raus aus dem
        <br />
        <span className="text-primary">Schulfrust</span>
      </h1>
      <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
        Ich begleite Familien und ihre Kinder mit Schulproblemen, Lernstörungen
        und Schulangst — hin zu mehr Leichtigkeit, Klarheit und Sicherheit.
      </p>
      <HeroCTA buttonStyle={buttonStyle} />
    </div>
  );
}

const layouts: Record<HeroLayout, React.FC<{ buttonStyle: string }>> = {
  centered: LayoutCentered,
  split: LayoutSplit,
  minimal: LayoutMinimal,
  bold: LayoutBold,
  compact: LayoutCompact,
};

/* ── Background variants ── */
function HeroImage() {
  return (
    <div className="absolute inset-0">
      <img src={heroBg} alt="" className="w-full h-full object-cover" loading="eager" />
      <div className="absolute inset-0 bg-background/70" />
    </div>
  );
}

function HeroCompactImage() {
  return (
    <div className="absolute inset-0">
      <img src={heroCompactBg} alt="" className="w-full h-full object-cover" loading="eager" />
      <div className="absolute inset-0 bg-background/60" />
    </div>
  );
}

function HeroAnimated() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute w-[600px] h-[600px] -top-40 -left-40 rounded-full bg-primary/15 blur-3xl animate-hero-orb-1" />
      <div className="absolute w-[500px] h-[500px] top-1/3 -right-32 rounded-full bg-accent/12 blur-3xl animate-hero-orb-2" />
      <div className="absolute w-[400px] h-[400px] -bottom-20 left-1/3 rounded-full bg-secondary/20 blur-3xl animate-hero-orb-3" />
    </div>
  );
}

function HeroGradient() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}

const backgrounds: Record<HeroStyle, () => JSX.Element> = {
  image: HeroImage,
  animated: HeroAnimated,
  gradient: HeroGradient,
};

export function Hero({ variant }: { variant?: HeroStyle }) {
  const { buttonStyle, heroStyle, heroLayout } = useTheme();
  const style = variant ?? heroStyle;
  const isCompact = heroLayout === "compact";
  const Background = backgrounds[isCompact ? "image" : style];
  const Layout = layouts[heroLayout];

  return (
    <section className={`relative ${isCompact ? "" : "min-h-screen"} flex items-center justify-center overflow-hidden`}>
      {isCompact ? <HeroCompactImage /> : <Background />}
      <Layout buttonStyle={buttonStyle} />
    </section>
  );
}
