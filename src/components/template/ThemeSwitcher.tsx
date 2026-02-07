import { useState } from "react";
import { Palette, X } from "lucide-react";
import { themes, CardStyle, ImageStyle, ButtonStyle, SectionSpacing } from "@/lib/themes";
import { useTheme } from "@/contexts/ThemeContext";

const cardOptions: { value: CardStyle; label: string }[] = [
  { value: "flat", label: "Flat" },
  { value: "bordered", label: "Bordered" },
  { value: "elevated", label: "Elevated" },
  { value: "glass", label: "Glass" },
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

function StyleRow<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="space-y-1.5">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
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

export function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const { themeId, setThemeId, cardStyle, imageStyle, buttonStyle, sectionSpacing, overrides, setOverrides } = useTheme();

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {open && (
        <div className="mb-3 rounded-[var(--radius)] border border-border bg-card shadow-theme-lg p-4 w-72 max-h-[80vh] overflow-y-auto animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between mb-3">
            <span className="font-display text-sm font-semibold text-card-foreground">
              Design Studio
            </span>
            <button
              onClick={() => setOpen(false)}
              className="p-1 text-muted-foreground hover:text-foreground"
            >
              <X size={16} />
            </button>
          </div>

          {/* Theme presets */}
          <div className="space-y-1.5 mb-4">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Presets
            </span>
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setThemeId(t.id)}
                className={`w-full text-left rounded-[var(--radius)] px-3 py-2 text-sm transition-colors ${
                  themeId === t.id
                    ? "bg-primary/10 text-foreground font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <span className="mr-2">{t.emoji}</span>
                {t.name}
              </button>
            ))}
          </div>

          <div className="h-px bg-border mb-4" />

          {/* Style overrides */}
          <div className="space-y-3">
            <StyleRow
              label="Cards"
              options={cardOptions}
              value={cardStyle}
              onChange={(v) => setOverrides({ ...overrides, cardStyle: v })}
            />
            <StyleRow
              label="Images"
              options={imageOptions}
              value={imageStyle}
              onChange={(v) => setOverrides({ ...overrides, imageStyle: v })}
            />
            <StyleRow
              label="Buttons"
              options={buttonOptions}
              value={buttonStyle}
              onChange={(v) => setOverrides({ ...overrides, buttonStyle: v })}
            />
            <StyleRow
              label="Spacing"
              options={spacingOptions}
              value={sectionSpacing}
              onChange={(v) => setOverrides({ ...overrides, sectionSpacing: v })}
            />
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
