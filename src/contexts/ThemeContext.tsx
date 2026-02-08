import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { themes, ThemePreset, CardStyle, ImageStyle, ButtonStyle, SectionSpacing, HeroStyle, HeroLayout, GalleryStyle, ServicesStyle, ServicesLayout, FAQLayout, ProcessLayout, AboutLayout, NavLogoMode } from "@/lib/themes";
import { fontPairings, FontPairing } from "@/lib/fontPairings";
import { colorSchemes, ColorScheme } from "@/lib/colorSchemes";

interface StyleOverrides {
  cardStyle?: CardStyle;
  imageStyle?: ImageStyle;
  buttonStyle?: ButtonStyle;
  sectionSpacing?: SectionSpacing;
  heroStyle?: HeroStyle;
  heroLayout?: HeroLayout;
  galleryStyle?: GalleryStyle;
  servicesStyle?: ServicesStyle;
  servicesLayout?: ServicesLayout;
  faqLayout?: FAQLayout;
  processLayout?: ProcessLayout;
  aboutLayout?: AboutLayout;
  navLogoMode?: NavLogoMode;
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
  heroLayout: HeroLayout;
  galleryStyle: GalleryStyle;
  servicesStyle: ServicesStyle;
  servicesLayout: ServicesLayout;
  faqLayout: FAQLayout;
  processLayout: ProcessLayout;
  aboutLayout: AboutLayout;
  navLogoMode: NavLogoMode;
  overrides: StyleOverrides;
  setOverrides: (o: StyleOverrides) => void;
  fontPairingId: string;
  setFontPairingId: (id: string) => void;
  fontPairing: FontPairing;
  colorSchemeId: string;
  setColorSchemeId: (id: string) => void;
  colorScheme: ColorScheme;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeIdState] = useState("warm");
  const [overrides, setOverrides] = useState<StyleOverrides>({});
  const [fontPairingId, setFontPairingId] = useState("playfair-dm");
  const [colorSchemeId, setColorSchemeId] = useState("terracotta");
  const theme = themes.find((t) => t.id === themeId) ?? themes[0];
  const fontPairing = fontPairings.find((f) => f.id === fontPairingId) ?? fontPairings[0];
  const colorScheme = colorSchemes.find((c) => c.id === colorSchemeId) ?? colorSchemes[0];

  const setThemeId = (id: string) => {
    setThemeIdState(id);
    setOverrides({});
    const t = themes.find((t) => t.id === id);
    if (t) {
      if (id === "warm") { setColorSchemeId("terracotta"); setFontPairingId("playfair-dm"); }
      else if (id === "clean") { setColorSchemeId("ocean"); setFontPairingId("inter-inter"); }
      else if (id === "luxe") { setColorSchemeId("navy-gold"); setFontPairingId("cormorant-montserrat"); }
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(colorScheme.variables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [colorScheme]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--font-display", fontPairing.display);
    root.style.setProperty("--font-body", fontPairing.body);
  }, [fontPairing]);

  useEffect(() => {
    const root = document.documentElement;
    const skip = ["--font-display", "--font-body", "--shadow-sm", "--shadow-md", "--shadow-lg",
      "--background", "--foreground", "--primary", "--primary-foreground", "--secondary",
      "--secondary-foreground", "--accent", "--accent-foreground", "--muted", "--muted-foreground",
      "--card", "--card-foreground", "--border", "--input", "--ring"];
    Object.entries(theme.variables).forEach(([key, value]) => {
      if (!skip.includes(key)) {
        root.style.setProperty(key, value);
      }
    });
  }, [theme]);

  const cardStyle = overrides.cardStyle ?? theme.cardStyle;
  const imageStyle = overrides.imageStyle ?? theme.imageStyle;
  const buttonStyle = overrides.buttonStyle ?? theme.buttonStyle;
  const sectionSpacing = overrides.sectionSpacing ?? theme.sectionSpacing;
  const heroStyle = overrides.heroStyle ?? theme.heroStyle;
  const heroLayout = overrides.heroLayout ?? theme.heroLayout;
  const galleryStyle = overrides.galleryStyle ?? theme.galleryStyle;
  const servicesStyle = overrides.servicesStyle ?? theme.servicesStyle;
  const servicesLayout = overrides.servicesLayout ?? theme.servicesLayout;
  const faqLayout = overrides.faqLayout ?? theme.faqLayout;
  const processLayout = overrides.processLayout ?? theme.processLayout;
  const aboutLayout = overrides.aboutLayout ?? theme.aboutLayout;
  const navLogoMode = overrides.navLogoMode ?? theme.navLogoMode;

  return (
    <ThemeContext.Provider
      value={{
        themeId, setThemeId, theme,
        cardStyle, imageStyle, buttonStyle, sectionSpacing, heroStyle, heroLayout, galleryStyle, servicesStyle, servicesLayout, faqLayout, processLayout, aboutLayout, navLogoMode,
        overrides, setOverrides,
        fontPairingId, setFontPairingId, fontPairing,
        colorSchemeId, setColorSchemeId, colorScheme,
      }}
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
