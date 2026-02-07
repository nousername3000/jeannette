import { useState } from "react";
import { Palette, X } from "lucide-react";
import { themes } from "@/lib/themes";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const { themeId, setThemeId } = useTheme();

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {open && (
        <div className="mb-3 rounded-[var(--radius)] border border-border bg-card shadow-theme-lg p-4 w-64 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between mb-3">
            <span className="font-display text-sm font-semibold text-card-foreground">
              Theme Presets
            </span>
            <button
              onClick={() => setOpen(false)}
              className="p-1 text-muted-foreground hover:text-foreground"
            >
              <X size={16} />
            </button>
          </div>
          <div className="space-y-2">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setThemeId(t.id)}
                className={`w-full text-left rounded-[var(--radius)] px-3 py-2.5 text-sm transition-colors ${
                  themeId === t.id
                    ? "bg-primary/10 text-foreground font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <span className="mr-2">{t.emoji}</span>
                {t.name}
                <br />
                <span className="text-xs opacity-70">{t.description}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-theme-lg flex items-center justify-center hover:opacity-90 transition-opacity"
        aria-label="Switch theme"
      >
        <Palette size={20} />
      </button>
    </div>
  );
}
