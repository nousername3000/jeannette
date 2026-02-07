import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { themes, ThemePreset } from "@/lib/themes";

interface ThemeContextValue {
  themeId: string;
  setThemeId: (id: string) => void;
  theme: ThemePreset;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState("warm");
  const theme = themes.find((t) => t.id === themeId) ?? themes[0];

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(theme.variables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ themeId, setThemeId, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
