# Template System — Complete Technical Documentation

> **Purpose**: This document describes the architecture, file structure, and design system of a **single-page website template** built with React + Vite + Tailwind CSS + TypeScript. The template is designed for small niche businesses (therapists, coaches, consultants) and features a **Design Studio** UI that allows real-time switching of visual styles, layouts, colors, and typography — all without changing content or structure.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [File Map & Responsibilities](#2-file-map--responsibilities)
3. [The Design Studio (ThemeSwitcher)](#3-the-design-studio-themeswitcher)
4. [Theme Context — The Central State Machine](#4-theme-context--the-central-state-machine)
5. [Style Levers — All Switchable Dimensions](#5-style-levers--all-switchable-dimensions)
6. [How Styles Are Applied in Components](#6-how-styles-are-applied-in-components)
7. [Color System](#7-color-system)
8. [Typography System](#8-typography-system)
9. [Section Components & Their Layout Variants](#9-section-components--their-layout-variants)
10. [CSS Variable Architecture](#10-css-variable-architecture)
11. [Utility Functions (themeStyles.ts)](#11-utility-functions-themestylests)
12. [Scroll Reveal Animation System](#12-scroll-reveal-animation-system)
13. [Assets & Images](#13-assets--images)
14. [How to Integrate This Template Into a Generator](#14-how-to-integrate-this-template-into-a-generator)

---

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    ThemeProvider                         │
│  (React Context wrapping entire app)                    │
│                                                         │
│  State:                                                 │
│  ├── themeId (preset: "warm" | "clean" | "luxe")       │
│  ├── colorSchemeId (8 palettes)                         │
│  ├── fontPairingId (11 pairings)                        │
│  ├── overrides {                                        │
│  │     cardStyle, imageStyle, buttonStyle,              │
│  │     sectionSpacing, heroStyle, heroLayout,           │
│  │     galleryStyle, servicesStyle, servicesLayout,     │
│  │     faqLayout, processLayout, aboutLayout,           │
│  │     navLogoMode                                      │
│  │   }                                                  │
│  │                                                      │
│  Effects:                                               │
│  ├── Writes color CSS vars to :root (from colorScheme)  │
│  ├── Writes font CSS vars to :root (from fontPairing)   │
│  └── Writes non-color/font vars from preset             │
│                                                         │
│  Resolved values (override ?? preset default):          │
│  └── cardStyle, imageStyle, buttonStyle, ...            │
└─────────────────┬───────────────────────────────────────┘
                  │
    ┌─────────────┼─────────────────────┐
    │             │                     │
    ▼             ▼                     ▼
┌────────┐  ┌──────────┐        ┌──────────────┐
│ Navbar │  │   Hero   │  ...   │ ThemeSwitcher│
│        │  │          │        │ (Design      │
│ reads: │  │ reads:   │        │  Studio UI)  │
│ button │  │ heroStyle│        │              │
│ Style, │  │ heroLay- │        │ writes to:   │
│ navLogo│  │ out,     │        │ setThemeId,  │
│ Mode   │  │ button   │        │ setOverrides,│
│        │  │ Style    │        │ setColorSch.,│
└────────┘  └──────────┘        │ setFontPair. │
                                └──────────────┘
```

**Key principle**: Every section component **reads** from ThemeContext via `useTheme()` and maps the received style tokens to Tailwind classes using utility functions. **No component ever stores its own style state.** The Design Studio UI **writes** to ThemeContext, and all sections reactively re-render.

---

## 2. File Map & Responsibilities

### Core Architecture Files

| File | Purpose |
|------|---------|
| `src/contexts/ThemeContext.tsx` | Central React context. Holds all style state, resolves overrides vs. preset defaults, writes CSS variables to `:root` |
| `src/lib/themes.ts` | TypeScript types for all style levers + 3 theme presets ("warm", "clean", "luxe") with default values for every lever |
| `src/lib/colorSchemes.ts` | 8 color palettes, each defining HSL values for all CSS variables (background, foreground, primary, etc.) |
| `src/lib/fontPairings.ts` | 11 typography pairings, each with a display and body font family string |
| `src/lib/themeStyles.ts` | Pure utility functions that map style enum values to Tailwind class strings |
| `src/index.css` | Base CSS variables (fallback/initial values), Tailwind layers, custom utilities (`.shadow-theme-*`, `.font-display`, `.font-body`), reveal animation classes |
| `tailwind.config.ts` | Extends Tailwind with `font-display`/`font-body` families (from CSS vars), semantic color tokens (`hsl(var(--primary))` etc.), custom animations |

### Section Components (all in `src/components/template/`)

| Component | Layout Variants | Style Levers Used |
|-----------|----------------|-------------------|
| `Navbar.tsx` | — | `buttonStyle`, `navLogoMode` |
| `Hero.tsx` | `centered`, `split`, `minimal`, `bold`, `compact` | `heroStyle`, `heroLayout`, `buttonStyle` |
| `About.tsx` | `split`, `centered`, `cards`, `full-width` | `aboutLayout`, `imageStyle`, `cardStyle`, `sectionSpacing` |
| `Services.tsx` | `cards`, `horizontal`, `minimal`, `overlay` | `servicesLayout`, `servicesStyle`, `cardStyle`, `imageStyle`, `sectionSpacing` |
| `Process.tsx` | `grid`, `timeline`, `cards`, `minimal` | `processLayout`, `cardStyle`, `sectionSpacing` |
| `FAQ.tsx` | `accordion`, `grid`, `two-column`, `flat` | `faqLayout`, `cardStyle`, `sectionSpacing` |
| `Gallery.tsx` | `masonry`, `grid` | `galleryStyle`, `imageStyle`, `sectionSpacing` |
| `Testimonials.tsx` | — | `cardStyle`, `sectionSpacing` |
| `Contact.tsx` | — | `cardStyle`, `buttonStyle`, `sectionSpacing` |
| `CTABand.tsx` | — | `buttonStyle` |
| `ParallaxBand.tsx` | — | `sectionSpacing` |
| `LogoTicker.tsx` | — | `sectionSpacing` |
| `Footer.tsx` | — | — (static, uses CSS var tokens) |
| `ThemeSwitcher.tsx` | — | Writes all levers (Design Studio UI) |

### Page Assembly

| File | Purpose |
|------|---------|
| `src/pages/Index.tsx` | Composes all sections in order: Navbar → Hero → About → Services → LogoTicker → Process → ParallaxBand → Testimonials → Gallery → FAQ → CTABand → Contact → Footer → ThemeSwitcher |
| `src/App.tsx` | Wraps everything in `<ThemeProvider>` and React Router |

---

## 3. The Design Studio (ThemeSwitcher)

**File**: `src/components/template/ThemeSwitcher.tsx`

This is a floating UI panel (fixed bottom-right, z-100) that provides real-time controls for every style lever. It is organized into sections:

### UI Sections

1. **Presets** — Three high-level theme presets (Warm, Clean, Luxe). Clicking one resets all overrides and applies that preset's defaults.
2. **Color Scheme** — Grid of 8 color palettes with circular preview swatches. Independent of presets.
3. **Typography** — List of 11 font pairings with live preview text.
4. **Global Styles** — Pill-button rows for: Cards, Images, Buttons, Spacing, Nav Logo.
5. **Section Layouts** — Pill-button rows for: Hero Background, Hero Layout, About, Services Images, Services Layout, Process, FAQ, Gallery.

### How It Writes State

```tsx
// Preset selection — resets overrides
const { setThemeId } = useTheme();
setThemeId("clean"); // clears overrides, sets matching color/font defaults

// Individual lever override
const { overrides, setOverrides } = useTheme();
setOverrides({ ...overrides, heroLayout: "split" });

// Color/font — independent
const { setColorSchemeId, setFontPairingId } = useTheme();
setColorSchemeId("burgundy-cream");
setFontPairingId("playfair-dm");
```

### `StyleRow<T>` — Generic Button Group Component

A reusable component that renders a labeled row of pill buttons for any enum type:

```tsx
function StyleRow<T extends string>({
  label, options, value, onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) { ... }
```

---

## 4. Theme Context — The Central State Machine

**File**: `src/contexts/ThemeContext.tsx`

### State Shape

```typescript
interface StyleOverrides {
  cardStyle?: CardStyle;       // "bordered" | "elevated" | "glass" | "flat" | "squared"
  imageStyle?: ImageStyle;     // "rounded" | "square" | "circle"
  buttonStyle?: ButtonStyle;   // "solid" | "pill" | "soft"
  sectionSpacing?: SectionSpacing; // "compact" | "comfortable" | "spacious"
  heroStyle?: HeroStyle;       // "image" | "animated" | "gradient"
  heroLayout?: HeroLayout;     // "centered" | "split" | "minimal" | "bold" | "compact"
  galleryStyle?: GalleryStyle; // "masonry" | "grid"
  servicesStyle?: ServicesStyle; // "icons-only" | "with-images"
  servicesLayout?: ServicesLayout; // "cards" | "horizontal" | "minimal" | "overlay"
  faqLayout?: FAQLayout;       // "accordion" | "grid" | "two-column" | "flat"
  processLayout?: ProcessLayout; // "grid" | "timeline" | "cards" | "minimal"
  aboutLayout?: AboutLayout;   // "split" | "centered" | "cards" | "full-width"
  navLogoMode?: NavLogoMode;   // "text" | "logo"
}
```

### Resolution Logic

Every resolved style value follows the pattern:

```typescript
const cardStyle = overrides.cardStyle ?? theme.cardStyle;
```

If an override exists, it wins. Otherwise, the active preset's default is used.

### CSS Variable Application (3 `useEffect` hooks)

1. **Color scheme effect**: Writes all color + shadow variables from the selected `colorScheme.variables` to `:root`
2. **Font effect**: Writes `--font-display` and `--font-body` from the selected `fontPairing`
3. **Theme preset effect**: Writes non-color, non-font variables from the preset (e.g., `--radius`). Skips all color/font/shadow vars to avoid overriding the independent color scheme.

### Default State (hardcoded initial values)

```typescript
const [themeId, setThemeIdState] = useState("warm");
const [overrides, setOverrides] = useState<StyleOverrides>({
  heroLayout: "split",
  navLogoMode: "logo",
  servicesStyle: "with-images",
  servicesLayout: "overlay",
  processLayout: "minimal",
  faqLayout: "flat",
  galleryStyle: "grid",
  aboutLayout: "split",
});
const [fontPairingId, setFontPairingId] = useState("playfair-dm");
const [colorSchemeId, setColorSchemeId] = useState("burgundy-cream");
```

**To change the default look**: modify these `useState` initial values.

---

## 5. Style Levers — All Switchable Dimensions

### Global Levers (affect multiple sections)

| Lever | Type | Options | Affects |
|-------|------|---------|---------|
| `cardStyle` | `CardStyle` | `flat`, `bordered`, `elevated`, `glass`, `squared` | All card-based UI (Services, FAQ, Testimonials, Contact, Process) |
| `imageStyle` | `ImageStyle` | `rounded`, `square`, `circle` | Gallery, About photo, Services images |
| `buttonStyle` | `ButtonStyle` | `solid`, `pill`, `soft` | All CTA buttons (Hero, Navbar, Contact, CTABand) |
| `sectionSpacing` | `SectionSpacing` | `compact`, `comfortable`, `spacious` | Vertical padding of every section |
| `navLogoMode` | `NavLogoMode` | `text`, `logo` | Navbar brand area (text name vs. logo image) |

### Section-Specific Levers

| Lever | Type | Options | Section |
|-------|------|---------|---------|
| `heroStyle` | `HeroStyle` | `image`, `animated`, `gradient` | Hero background |
| `heroLayout` | `HeroLayout` | `centered`, `split`, `minimal`, `bold`, `compact` | Hero content layout |
| `servicesStyle` | `ServicesStyle` | `icons-only`, `with-images` | Services (show/hide photos) |
| `servicesLayout` | `ServicesLayout` | `cards`, `horizontal`, `minimal`, `overlay` | Services grid arrangement |
| `aboutLayout` | `AboutLayout` | `split`, `centered`, `cards`, `full-width` | About section layout |
| `processLayout` | `ProcessLayout` | `grid`, `timeline`, `cards`, `minimal` | Process steps layout |
| `faqLayout` | `FAQLayout` | `accordion`, `grid`, `two-column`, `flat` | FAQ section layout |
| `galleryStyle` | `GalleryStyle` | `masonry`, `grid` | Gallery image grid |

---

## 6. How Styles Are Applied in Components

### Pattern: Read from context → Map to Tailwind classes

Every section follows the same pattern:

```tsx
// 1. Read the relevant levers
const { cardStyle, sectionSpacing, servicesLayout, imageStyle } = useTheme();

// 2. Use utility functions to get Tailwind classes
import { getCardClasses, getSectionPadding, getImageClasses } from "@/lib/themeStyles";

// 3. Apply to JSX
<section className={getSectionPadding(sectionSpacing)}>
  <div className={getCardClasses(cardStyle)}>
    <img className={getImageClasses(imageStyle)} />
  </div>
</section>
```

### Pattern: Layout switching via internal sub-components

Sections with multiple layout variants use a switch/map pattern:

```tsx
// Hero.tsx example
const layouts: Record<HeroLayout, React.FC<{ buttonStyle: string }>> = {
  centered: LayoutCentered,
  split: LayoutSplit,
  minimal: LayoutMinimal,
  bold: LayoutBold,
  compact: LayoutCompact,
};

export function Hero() {
  const { heroLayout, heroStyle, buttonStyle } = useTheme();
  const Layout = layouts[heroLayout];
  const Background = backgrounds[heroStyle];

  return (
    <section>
      <Background />
      <Layout buttonStyle={buttonStyle} />
    </section>
  );
}
```

Each layout variant is a **separate function component** within the same file, keeping all related code colocated.

---

## 7. Color System

**File**: `src/lib/colorSchemes.ts`

### Available Color Schemes (8 total)

| ID | Name | Character |
|----|------|-----------|
| `terracotta` | Terracotta & Sage | Warm earthy tones, light background |
| `ocean` | Ocean Breeze | Cool blues, white cards |
| `navy-gold` | Navy & Gold | Dark mode, gold accents |
| `rose-blush` | Rose & Blush | Soft pinks, feminine |
| `forest` | Forest & Moss | Natural greens |
| `lavender` | Lavender & Dusk | Purple tones |
| `charcoal-amber` | Charcoal & Amber | Dark mode, warm amber |
| `burgundy-cream` | Burgundy & Cream | Deep red on warm cream |

### Variable Structure

Every color scheme defines these HSL CSS variables:

```typescript
variables: {
  "--background": "30 25% 95%",     // Page background
  "--foreground": "350 30% 15%",     // Default text
  "--primary": "345 60% 26%",        // Brand/accent color
  "--primary-foreground": "30 30% 97%", // Text on primary
  "--secondary": "30 18% 92%",       // Secondary surfaces
  "--secondary-foreground": "350 25% 22%",
  "--accent": "0 40% 38%",           // Accent highlights
  "--accent-foreground": "30 30% 97%",
  "--muted": "30 12% 90%",           // Muted backgrounds
  "--muted-foreground": "350 10% 42%", // Muted text
  "--card": "30 20% 97%",            // Card backgrounds
  "--card-foreground": "350 30% 15%",
  "--border": "30 12% 85%",
  "--input": "30 12% 85%",
  "--ring": "345 60% 26%",           // Focus rings
  "--shadow-sm": "...",              // Box shadows (full CSS value)
  "--shadow-md": "...",
  "--shadow-lg": "...",
}
```

### How Colors Are Used

Colors are **never hardcoded** in components. They flow through:

1. CSS variables set on `:root` by ThemeContext
2. Tailwind config maps them: `primary: "hsl(var(--primary))"`
3. Components use Tailwind classes: `text-primary`, `bg-card`, `border-border`
4. Shadows use custom utilities: `shadow-theme-sm`, `shadow-theme`, `shadow-theme-lg`

---

## 8. Typography System

**File**: `src/lib/fontPairings.ts`

### Available Font Pairings (11 total)

| ID | Display Font | Body Font |
|----|-------------|-----------|
| `playfair-dm` | Playfair Display (serif) | DM Sans |
| `cormorant-montserrat` | Cormorant Garamond (serif) | Montserrat |
| `inter-inter` | Inter | Inter |
| `lora-source` | Lora (serif) | Source Sans 3 |
| `merriweather-nunito` | Merriweather (serif) | Nunito |
| `libre-raleway` | Libre Baskerville (serif) | Raleway |
| `crimson-work` | Crimson Pro (serif) | Work Sans |
| `space-grotesk` | Space Grotesk | Outfit |
| `sora-dm` | Sora | DM Sans |
| `cabinet-satoshi` | Urbanist | Manrope |
| `poppins-karla` | Poppins | Karla |

### How Fonts Are Applied

1. ThemeContext sets `--font-display` and `--font-body` CSS vars on `:root`
2. `tailwind.config.ts` defines: `fontFamily: { display: ["var(--font-display)"], body: ["var(--font-body)"] }`
3. `index.css` sets: `body { font-family: var(--font-body); }`
4. Components use: `className="font-display"` for headings, body text inherits

**Important**: The actual font files must be loaded via `<link>` tags in `index.html` (Google Fonts) or via `@font-face` declarations. The CSS variable only sets the `font-family` string.

---

## 9. Section Components & Their Layout Variants

### Hero (`Hero.tsx`)

**Background variants** (controlled by `heroStyle`):
- `image` — Full-bleed photo with overlay
- `animated` — Floating gradient orbs with CSS animations
- `gradient` — Subtle gradient (primary → accent)

**Layout variants** (controlled by `heroLayout`):
- `centered` — Classic centered text, full-width
- `split` — Text left, photo right (2-column grid)
- `minimal` — Ultra-simple, large text, lots of whitespace
- `bold` — Oversized display text, asymmetric
- `compact` — Shorter hero with photo background

Special case: `compact` layout always uses the photo background regardless of `heroStyle`.

### About (`About.tsx`)

- `split` — Photo left, text right (2-column)
- `centered` — Photo above, centered text
- `cards` — Credential cards in 3-column grid
- `full-width` — Full-width gradient background with blockquote

### Services (`Services.tsx`)

**Image toggle** (`servicesStyle`): `icons-only` vs `with-images`

**Layout variants** (`servicesLayout`):
- `cards` — 3-column card grid
- `horizontal` — 2-column, image left / text right
- `minimal` — Single-column clean list
- `overlay` — Image background cards with gradient text overlay

### Process (`Process.tsx`)

- `grid` — 4-column number grid
- `timeline` — Vertical timeline with alternating sides
- `cards` — 2-column styled cards
- `minimal` — Clean numbered list

### FAQ (`FAQ.tsx`)

- `accordion` — Collapsible with chevron animation
- `grid` — 2-column Q&A cards
- `two-column` — Split accordion columns
- `flat` — All answers visible, no collapse

### Gallery (`Gallery.tsx`)

- `masonry` — CSS columns masonry layout
- `grid` — Uniform 3-column grid with fixed aspect ratio

Includes lightbox with keyboard navigation (Escape, Arrow keys).

---

## 10. CSS Variable Architecture

### index.css — Base Layer

```css
:root {
  /* Colors (HSL values only, no hsl() wrapper) */
  --background: 35 40% 95%;
  --foreground: 25 30% 15%;
  --primary: 15 55% 48%;
  /* ... all semantic color tokens ... */

  /* Border radius */
  --radius: 1rem;

  /* Typography */
  --font-display: 'Playfair Display', serif;
  --font-body: 'DM Sans', sans-serif;

  /* Shadows (full CSS shadow values) */
  --shadow-sm: 0 2px 8px -2px hsl(25 30% 15% / 0.08);
  --shadow-md: 0 4px 20px -4px hsl(25 30% 15% / 0.12);
  --shadow-lg: 0 10px 40px -8px hsl(25 30% 15% / 0.15);
}
```

### Custom Utility Classes (index.css)

```css
.shadow-theme-sm { box-shadow: var(--shadow-sm); }
.shadow-theme    { box-shadow: var(--shadow-md); }
.shadow-theme-lg { box-shadow: var(--shadow-lg); }
.font-display    { font-family: var(--font-display); }
.font-body       { font-family: var(--font-body); }
```

### Tailwind Config Color Mapping

```typescript
colors: {
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  primary: {
    DEFAULT: "hsl(var(--primary))",
    foreground: "hsl(var(--primary-foreground))",
  },
  // ... same pattern for secondary, muted, accent, card, border, etc.
}
```

---

## 11. Utility Functions (themeStyles.ts)

**File**: `src/lib/themeStyles.ts`

These pure functions map enum values to Tailwind class strings. Components never contain style switch logic — they delegate to these:

```typescript
// Card styles — determines background, border, rounding, shadow
getCardClasses(style: CardStyle): string
// "flat" → "bg-card text-card-foreground rounded-[var(--radius)]"
// "glass" → "bg-card/60 text-card-foreground rounded-[var(--radius)] border border-border/50 backdrop-blur-md"
// "squared" → "bg-card text-card-foreground rounded-none border border-border"

// Card hover effects
getCardHoverClasses(style: CardStyle): string

// Image rounding
getImageClasses(style: ImageStyle): string
// "rounded" → "rounded-[var(--radius)] overflow-hidden"
// "circle" → "rounded-full overflow-hidden"

// Primary button styling
getButtonClasses(style: ButtonStyle): string
// "solid" → "rounded-[var(--radius)] bg-primary text-primary-foreground ..."
// "pill" → "rounded-full bg-primary text-primary-foreground ..."
// "soft" → "... bg-primary/15 text-primary border border-primary/30 ..."

// Secondary/outline button
getOutlineButtonClasses(style: ButtonStyle): string

// Section vertical padding
getSectionPadding(spacing: SectionSpacing): string
// "compact" → "py-16 md:py-20"
// "comfortable" → "py-24 md:py-32"
// "spacious" → "py-32 md:py-40"

// Icon container (used inside cards)
getIconContainerClasses(style: CardStyle): string
```

---

## 12. Scroll Reveal Animation System

**File**: `src/hooks/useScrollReveal.ts`

Uses IntersectionObserver for one-time reveal-on-scroll animations.

```typescript
export function useScrollReveal(threshold = 0.05) {
  // Returns { ref, revealed }
  // ref → attach to container element
  // revealed → boolean, true once container enters viewport
}
```

**CSS classes** (in `index.css`):

```css
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease-out, transform 0.7s ease-out;
}
.revealed .reveal {
  opacity: 1;
  transform: translateY(0);
}
.reveal-delay-1 { transition-delay: 0.1s; }
/* ... up to reveal-delay-5 */
```

**Usage in sections**:

```tsx
const { ref, revealed } = useScrollReveal();
<div ref={ref} className={revealed ? "revealed" : ""}>
  <h2 className="reveal">Title</h2>
  <div className="reveal reveal-delay-1">Card 1</div>
  <div className="reveal reveal-delay-2">Card 2</div>
</div>
```

---

## 13. Assets & Images

### Asset Directories

```
src/assets/
├── hero-bg.jpg              # Hero background (centered/minimal/bold layouts)
├── hero-compact-bg.jpg       # Hero background (compact layout)
├── hero-split-photo.png      # Hero split layout photo (landscape, transparent/cropped)
├── about-photo.jpg           # About section portrait
├── parallax-bg.jpg           # Parallax band background
├── logo-placeholder.svg      # Navbar logo (used when navLogoMode="logo")
├── gallery/
│   ├── gallery-1.jpg ... gallery-6.jpg
├── services/
│   ├── anxiety-relief.jpg ... weight-management.jpg  (6 service images)
└── logos/
    ├── cert-1.png ... cert-6.png  (certification/trust badges)
```

All images are imported as ES6 modules in their respective components (Vite handles bundling/hashing).

---

## 14. How to Integrate This Template Into a Generator

### What Your Generator Needs to Control

To turn this template into a generator output, your system needs to be able to:

#### A. Set the Default Design Configuration

Modify the `useState` initial values in `src/contexts/ThemeContext.tsx`:

```typescript
// These 4 values define the entire visual identity:
const [themeId] = useState("warm");           // Preset base
const [colorSchemeId] = useState("burgundy-cream"); // Color palette
const [fontPairingId] = useState("playfair-dm");    // Typography
const [overrides] = useState<StyleOverrides>({
  heroLayout: "split",
  navLogoMode: "logo",
  servicesStyle: "with-images",
  servicesLayout: "overlay",
  processLayout: "minimal",
  faqLayout: "flat",
  galleryStyle: "grid",
  aboutLayout: "split",
});
```

#### B. Replace Content

Content is hardcoded as constants at the top of each section component. To customize:

| Section | File | Content Location |
|---------|------|-----------------|
| Navbar links | `Navbar.tsx` | `navLinks` array (line 7-14) |
| Hero text | `Hero.tsx` | Inline strings in each Layout* component |
| About bio | `About.tsx` | `bioShort`, `bioLong`, `bioApproach` constants + `credentials` array |
| Services | `Services.tsx` | `services` array (line 22-59) |
| Process steps | `Process.tsx` | `steps` array (line 6-27) |
| FAQ items | `FAQ.tsx` | `faqs` array (line 8-33) |
| Testimonials | `Testimonials.tsx` | `testimonials` array (line 6-28) |
| Contact info | `Contact.tsx` | Inline (form labels, address data) |
| Footer | `Footer.tsx` | Inline (brand name, links, contact) |
| CTA text | `CTABand.tsx` | Inline strings |
| Parallax quote | `ParallaxBand.tsx` | Inline quote text |
| Logo ticker | `LogoTicker.tsx` | `logos` array + heading text |
| Gallery captions | `Gallery.tsx` | `images` array |

#### C. Replace Images

Replace the files in `src/assets/` with the client's photos. The import paths in components will resolve automatically as long as filenames match.

#### D. Add New Color Schemes

Add entries to the `colorSchemes` array in `src/lib/colorSchemes.ts`:

```typescript
{
  id: "my-custom",
  name: "My Custom Palette",
  preview: { primary: "#hex", secondary: "#hex", accent: "#hex" },
  variables: {
    "--background": "H S% L%",
    "--foreground": "H S% L%",
    // ... all 16 variables
  },
}
```

#### E. Add New Font Pairings

Add entries to `fontPairings` array in `src/lib/fontPairings.ts` AND ensure the fonts are loaded (Google Fonts link in `index.html`).

#### F. Remove the Design Studio for Production

Simply remove `<ThemeSwitcher />` from `src/pages/Index.tsx` (line 33). The hardcoded defaults will be used.

#### G. Add New Section Layout Variants

1. Define the new type value in `src/lib/themes.ts` (e.g., add `"stacked"` to `ServicesLayout`)
2. Add the variant to the preset defaults in the `themes` array
3. Create the layout component inside the section file
4. Add it to the switch/map in the section's content dispatcher
5. Add the option to ThemeSwitcher's options array

### Configuration Object Summary

The complete visual identity of a generated site is defined by this configuration:

```typescript
interface SiteDesignConfig {
  // Base preset (provides defaults for all levers)
  themeId: "warm" | "clean" | "luxe";

  // Independent overrides
  colorSchemeId: string;  // from colorSchemes array
  fontPairingId: string;  // from fontPairings array

  // Style overrides (each optional — falls back to preset)
  cardStyle?: "flat" | "bordered" | "elevated" | "glass" | "squared";
  imageStyle?: "rounded" | "square" | "circle";
  buttonStyle?: "solid" | "pill" | "soft";
  sectionSpacing?: "compact" | "comfortable" | "spacious";
  heroStyle?: "image" | "animated" | "gradient";
  heroLayout?: "centered" | "split" | "minimal" | "bold" | "compact";
  navLogoMode?: "text" | "logo";
  servicesStyle?: "icons-only" | "with-images";
  servicesLayout?: "cards" | "horizontal" | "minimal" | "overlay";
  aboutLayout?: "split" | "centered" | "cards" | "full-width";
  processLayout?: "grid" | "timeline" | "cards" | "minimal";
  faqLayout?: "accordion" | "grid" | "two-column" | "flat";
  galleryStyle?: "masonry" | "grid";
}
```

This single object fully describes the visual output. Your generator can produce this config, inject it into ThemeContext's initial state, and the template will render accordingly.

---

## Appendix: Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3 | UI framework |
| Vite | — | Build tool |
| TypeScript | — | Type safety |
| Tailwind CSS | — | Utility-first CSS |
| tailwindcss-animate | — | Animation utilities |
| Framer Motion | 12.33 | (Available but currently unused in sections) |
| Lucide React | — | Icon library |
| shadcn/ui | — | UI component primitives (accordion, dialog, etc.) |
