import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { themes, ThemePreset, CardStyle, ImageStyle, ButtonStyle, SectionSpacing, HeroStyle } from "@/lib/themes";

interface StyleOverrides {
  cardStyle?: CardStyle;
  imageStyle?: ImageStyle;
  buttonStyle?: ButtonStyle;
  sectionSpacing?: SectionSpacing;
  heroStyle?: HeroStyle;
}

interface ThemeContextValue {
  themeId: string;
  setThemeId: (id: string) => void;
  theme: ThemePreset;
  cardStyle: CardStyle;
  imageStyle: ImageStyle;
  buttonStyle: ButtonStyle;
  sectionSpacing: SectionSpacing;
  heroStyle: HeroStyle;
  overrides: StyleOverrides;
  setOverrides: (o: StyleOverrides) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeIdState] = useState("warm");
  const [overrides, setOverrides] = useState<StyleOverrides>({});
  const theme = themes.find((t) => t.id === themeId) ?? themes[0];

  const setThemeId = (id: string) => {
    setThemeIdState(id);
    setOverrides({});
  };

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(theme.variables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [theme]);

  const cardStyle = overrides.cardStyle ?? theme.cardStyle;
  const imageStyle = overrides.imageStyle ?? theme.imageStyle;
  const buttonStyle = overrides.buttonStyle ?? theme.buttonStyle;
  const sectionSpacing = overrides.sectionSpacing ?? theme.sectionSpacing;
  const heroStyle = overrides.heroStyle ?? theme.heroStyle;

  return (
    <ThemeContext.Provider
      value={{ themeId, setThemeId, theme, cardStyle, imageStyle, buttonStyle, sectionSpacing, heroStyle, overrides, setOverrides }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
