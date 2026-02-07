export interface FontPairing {
  id: string;
  name: string;
  display: string;
  body: string;
}

export const fontPairings: FontPairing[] = [
  {
    id: "playfair-dm",
    name: "Playfair + DM Sans",
    display: "'Playfair Display', serif",
    body: "'DM Sans', sans-serif",
  },
  {
    id: "cormorant-montserrat",
    name: "Cormorant + Montserrat",
    display: "'Cormorant Garamond', serif",
    body: "'Montserrat', sans-serif",
  },
  {
    id: "inter-inter",
    name: "Inter (Clean)",
    display: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
  },
  {
    id: "lora-source",
    name: "Lora + Source Sans",
    display: "'Lora', serif",
    body: "'Source Sans 3', sans-serif",
  },
  {
    id: "merriweather-nunito",
    name: "Merriweather + Nunito",
    display: "'Merriweather', serif",
    body: "'Nunito', sans-serif",
  },
  {
    id: "libre-raleway",
    name: "Libre Baskerville + Raleway",
    display: "'Libre Baskerville', serif",
    body: "'Raleway', sans-serif",
  },
  {
    id: "crimson-work",
    name: "Crimson Pro + Work Sans",
    display: "'Crimson Pro', serif",
    body: "'Work Sans', sans-serif",
  },
];
