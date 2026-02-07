import type { CardStyle, ImageStyle, ButtonStyle, SectionSpacing } from "./themes";

export function getCardClasses(style: CardStyle): string {
  switch (style) {
    case "flat":
      return "bg-card text-card-foreground rounded-[var(--radius)]";
    case "bordered":
      return "bg-card text-card-foreground rounded-[var(--radius)] border border-border";
    case "elevated":
      return "bg-card text-card-foreground rounded-[var(--radius)] shadow-theme-lg";
    case "glass":
      return "bg-card/60 text-card-foreground rounded-[var(--radius)] border border-border/50 backdrop-blur-md";
  }
}

export function getCardHoverClasses(style: CardStyle): string {
  switch (style) {
    case "flat":
      return "hover:bg-muted/50 transition-colors";
    case "bordered":
      return "hover:shadow-theme-lg hover:-translate-y-1 transition-all duration-300";
    case "elevated":
      return "hover:shadow-theme hover:-translate-y-1 transition-all duration-300";
    case "glass":
      return "hover:bg-card/80 hover:border-primary/30 transition-all duration-300";
  }
}

export function getImageClasses(style: ImageStyle): string {
  switch (style) {
    case "rounded":
      return "rounded-[var(--radius)] overflow-hidden";
    case "square":
      return "rounded-none overflow-hidden";
    case "circle":
      return "rounded-full overflow-hidden";
  }
}

export function getButtonClasses(style: ButtonStyle): string {
  switch (style) {
    case "solid":
      return "rounded-[var(--radius)] bg-primary text-primary-foreground hover:opacity-90 transition-opacity";
    case "pill":
      return "rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity";
    case "soft":
      return "rounded-[var(--radius)] bg-primary/15 text-primary border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-colors";
  }
}

export function getOutlineButtonClasses(style: ButtonStyle): string {
  switch (style) {
    case "solid":
      return "rounded-[var(--radius)] border border-border bg-background/60 text-foreground hover:bg-muted transition-colors";
    case "pill":
      return "rounded-full border border-border bg-background/60 text-foreground hover:bg-muted transition-colors";
    case "soft":
      return "rounded-[var(--radius)] border border-border/50 bg-muted/40 text-foreground hover:bg-muted transition-colors";
  }
}

export function getSectionPadding(spacing: SectionSpacing): string {
  switch (spacing) {
    case "compact":
      return "py-16 md:py-20";
    case "comfortable":
      return "py-24 md:py-32";
    case "spacious":
      return "py-32 md:py-40";
  }
}

export function getIconContainerClasses(style: CardStyle): string {
  switch (style) {
    case "flat":
      return "bg-primary/10 text-primary rounded-[var(--radius)]";
    case "bordered":
      return "bg-primary/10 text-primary rounded-[var(--radius)]";
    case "elevated":
      return "bg-primary text-primary-foreground rounded-[var(--radius)] shadow-theme-sm";
    case "glass":
      return "bg-primary/20 text-primary rounded-full border border-primary/20";
  }
}
