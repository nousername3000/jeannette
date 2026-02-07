import { useState } from "react";
import { Palette, X } from "lucide-react";
import { themes, CardStyle, ImageStyle, ButtonStyle, SectionSpacing, HeroStyle, HeroLayout, GalleryStyle, ServicesStyle, ServicesLayout, FAQLayout, ProcessLayout, AboutLayout } from "@/lib/themes";
import { fontPairings } from "@/lib/fontPairings";
import { colorSchemes } from "@/lib/colorSchemes";
import { useTheme } from "@/contexts/ThemeContext";

const cardOptions: { value: CardStyle; label: string }[] = [
  { value: "flat", label: "Flat" },
  { value: "bordered", label: "Bordered" },
  { value: "elevated", label: "Elevated" },
  { value: "glass", label: "Glass" },
  { value: "squared", label: "Squared" },
];

const imageOptions: { value: ImageStyle; label: string }[] = [
  { value: "rounded", label: "Rounded" },
  { value: "square", label: "Square" },
  { value: "circle", label: "Circle" },
];

const buttonOptions: { value: ButtonStyle; label: string }[] = [
  { value: "solid", label: "Solid" },
  { value: "pill", label: "Pill" },
  { value: "soft", label: "Soft" },
];

const spacingOptions: { value: SectionSpacing; label: string }[] = [
  { value: "compact", label: "Compact" },
  { value: "comfortable", label: "Comfortable" },
  { value: "spacious", label: "Spacious" },
];

const heroOptions: { value: HeroStyle; label: string }[] = [
  { value: "image", label: "Photo" },
  { value: "animated", label: "Animated" },
  { value: "gradient", label: "Gradient" },
];

const heroLayoutOptions: { value: HeroLayout; label: string }[] = [
  { value: "centered", label: "Centered" },
  { value: "split", label: "Split" },
  { value: "minimal", label: "Minimal" },
  { value: "bold", label: "Bold" },
  { value: "compact", label: "Compact" },
];

const galleryOptions: { value: GalleryStyle; label: string }[] = [
  { value: "masonry", label: "Masonry" },
  { value: "grid", label: "Uniform" },
];

const servicesOptions: { value: ServicesStyle; label: string }[] = [
  { value: "icons-only", label: "Icons Only" },
  { value: "with-images", label: "With Images" },
];

const servicesLayoutOptions: { value: ServicesLayout; label: string }[] = [
  { value: "cards", label: "Cards" },
  { value: "horizontal", label: "Horizontal" },
  { value: "minimal", label: "Minimal" },
  { value: "overlay", label: "Overlay" },
];

const faqLayoutOptions: { value: FAQLayout; label: string }[] = [
  { value: "accordion", label: "Accordion" },
  { value: "grid", label: "Grid" },
  { value: "two-column", label: "Two Column" },
  { value: "flat", label: "Flat" },
];

const processLayoutOptions: { value: ProcessLayout; label: string }[] = [
  { value: "grid", label: "Grid" },
  { value: "timeline", label: "Timeline" },
  { value: "cards", label: "Cards" },
  { value: "minimal", label: "Minimal" },
];

const aboutLayoutOptions: { value: AboutLayout; label: string }[] = [
  { value: "split", label: "Split" },
  { value: "centered", label: "Centered" },
  { value: "cards", label: "Cards" },
  { value: "full-width", label: "Full Width" },
];

function StyleRow<T extends string>({
  label, options, value, onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="space-y-1.5">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`px-2.5 py-1 text-xs rounded-full transition-colors ${
              value === opt.value
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <span className="text-[10px] font-semibold text-primary uppercase tracking-widest">{children}</span>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

export function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const {
    themeId, setThemeId,
    cardStyle, imageStyle, buttonStyle, sectionSpacing, heroStyle, heroLayout, galleryStyle, servicesStyle, servicesLayout, faqLayout, processLayout, aboutLayout,
    overrides, setOverrides,
    fontPairingId, setFontPairingId,
    colorSchemeId, setColorSchemeId,
  } = useTheme();

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {open && (
        <div className="mb-3 rounded-[var(--radius)] border border-border bg-card shadow-theme-lg p-4 w-80 max-h-[80vh] overflow-y-auto animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between mb-3">
            <span className="font-display text-sm font-semibold text-card-foreground">Design Studio</span>
            <button onClick={() => setOpen(false)} className="p-1 text-muted-foreground hover:text-foreground">
              <X size={16} />
            </button>
          </div>

          {/* Theme presets */}
          <div className="space-y-1.5 mb-4">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Presets</span>
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setThemeId(t.id)}
                className={`w-full text-left rounded-[var(--radius)] px-3 py-2 text-sm transition-colors ${
                  themeId === t.id ? "bg-primary/10 text-foreground font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <span className="mr-2">{t.emoji}</span>{t.name}
              </button>
            ))}
          </div>

          <div className="h-px bg-border mb-4" />

          {/* Color Schemes */}
          <div className="mb-4">
            <SectionLabel>Color Scheme</SectionLabel>
            <div className="grid grid-cols-2 gap-1.5">
              {colorSchemes.map((cs) => (
                <button
                  key={cs.id}
                  onClick={() => setColorSchemeId(cs.id)}
                  className={`flex items-center gap-2 px-2.5 py-2 rounded-[var(--radius)] text-xs transition-colors ${
                    colorSchemeId === cs.id
                      ? "bg-primary/10 text-foreground font-medium ring-1 ring-primary/30"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <div className="flex -space-x-1 shrink-0">
                    <span className="w-3.5 h-3.5 rounded-full border border-background" style={{ backgroundColor: cs.preview.primary }} />
                    <span className="w-3.5 h-3.5 rounded-full border border-background" style={{ backgroundColor: cs.preview.secondary }} />
                    <span className="w-3.5 h-3.5 rounded-full border border-background" style={{ backgroundColor: cs.preview.accent }} />
                  </div>
                  <span className="truncate">{cs.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-border mb-4" />

          {/* Font Selector */}
          <div className="mb-4">
            <SectionLabel>Typography</SectionLabel>
            <div className="space-y-1">
              {fontPairings.map((fp) => (
                <button
                  key={fp.id}
                  onClick={() => setFontPairingId(fp.id)}
                  className={`w-full text-left px-3 py-2 rounded-[var(--radius)] text-sm transition-colors ${
                    fontPairingId === fp.id
                      ? "bg-primary/10 text-foreground font-medium ring-1 ring-primary/30"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <span className="block text-sm" style={{ fontFamily: fp.display }}>{fp.name}</span>
                  <span className="block text-[10px] mt-0.5 opacity-60" style={{ fontFamily: fp.body }}>Body text preview</span>
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-border mb-4" />

          {/* Global styles */}
          <div className="space-y-3 mb-4">
            <SectionLabel>Global Styles</SectionLabel>
            <StyleRow label="Cards" options={cardOptions} value={cardStyle} onChange={(v) => setOverrides({ ...overrides, cardStyle: v })} />
            <StyleRow label="Images" options={imageOptions} value={imageStyle} onChange={(v) => setOverrides({ ...overrides, imageStyle: v })} />
            <StyleRow label="Buttons" options={buttonOptions} value={buttonStyle} onChange={(v) => setOverrides({ ...overrides, buttonStyle: v })} />
            <StyleRow label="Spacing" options={spacingOptions} value={sectionSpacing} onChange={(v) => setOverrides({ ...overrides, sectionSpacing: v })} />
          </div>

          <div className="h-px bg-border mb-4" />

          {/* Section layouts */}
          <div className="space-y-3">
            <SectionLabel>Section Layouts</SectionLabel>
            <StyleRow label="Hero Background" options={heroOptions} value={heroStyle} onChange={(v) => setOverrides({ ...overrides, heroStyle: v })} />
            <StyleRow label="Hero Layout" options={heroLayoutOptions} value={heroLayout} onChange={(v) => setOverrides({ ...overrides, heroLayout: v })} />
            <StyleRow label="About" options={aboutLayoutOptions} value={aboutLayout} onChange={(v) => setOverrides({ ...overrides, aboutLayout: v })} />
            <StyleRow label="Services Images" options={servicesOptions} value={servicesStyle} onChange={(v) => setOverrides({ ...overrides, servicesStyle: v })} />
            <StyleRow label="Services Layout" options={servicesLayoutOptions} value={servicesLayout} onChange={(v) => setOverrides({ ...overrides, servicesLayout: v })} />
            <StyleRow label="Process" options={processLayoutOptions} value={processLayout} onChange={(v) => setOverrides({ ...overrides, processLayout: v })} />
            <StyleRow label="FAQ" options={faqLayoutOptions} value={faqLayout} onChange={(v) => setOverrides({ ...overrides, faqLayout: v })} />
            <StyleRow label="Gallery" options={galleryOptions} value={galleryStyle} onChange={(v) => setOverrides({ ...overrides, galleryStyle: v })} />
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-theme-lg flex items-center justify-center hover:opacity-90 transition-opacity"
        aria-label="Design studio"
      >
        <Palette size={20} />
      </button>
    </div>
  );
}
