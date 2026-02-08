import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { getImageClasses, getSectionPadding } from "@/lib/themeStyles";
import { useScrollReveal } from "@/hooks/useScrollReveal";

import gallery1 from "@/assets/gallery/gallery-1.jpg";
import gallery2 from "@/assets/gallery/gallery-2.jpg";
import gallery3 from "@/assets/gallery/gallery-3.jpg";
import gallery4 from "@/assets/gallery/gallery-4.jpg";
import gallery5 from "@/assets/gallery/gallery-5.jpg";
import gallery6 from "@/assets/gallery/gallery-6.jpg";

const images = [
  { src: gallery1, alt: "Lerntherapie-Raum", caption: "Unser einladender Therapieraum" },
  { src: gallery2, alt: "Lernmaterialien", caption: "Kreative Lernmaterialien für jede Sitzung" },
  { src: gallery3, alt: "Kinder beim Lernen", caption: "Gemeinsam lernen macht Spaß" },
  { src: gallery4, alt: "Buchstaben lernen", caption: "Spielerisch Buchstaben entdecken" },
  { src: gallery5, alt: "Lernerfolg feiern", caption: "Erfolge gemeinsam feiern" },
  { src: gallery6, alt: "Wartebereich", caption: "Gemütlicher Wartebereich" },
];

function Lightbox({
  index,
  onClose,
  onPrev,
  onNext,
}: {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const image = images[index];

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [handleKey]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-foreground/90 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-background/70 hover:text-background transition-colors z-10"
        aria-label="Close lightbox"
      >
        <X size={28} />
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-background/60 hover:text-background transition-colors z-10"
        aria-label="Previous image"
      >
        <ChevronLeft size={36} />
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-background/60 hover:text-background transition-colors z-10"
        aria-label="Next image"
      >
        <ChevronRight size={36} />
      </button>

      {/* Image */}
      <div
        className="max-w-[90vw] max-h-[85vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.src}
          alt={image.alt}
          className="max-w-full max-h-[78vh] object-contain rounded-lg shadow-2xl"
        />
        <div className="mt-4 text-center">
          <p className="text-sm text-background/80">{image.caption}</p>
          <p className="text-xs text-background/50 mt-1">
            {index + 1} / {images.length}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Gallery() {
  const { ref: containerRef, revealed } = useScrollReveal();
  const { imageStyle, sectionSpacing, galleryStyle } = useTheme();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
  const next = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : null));

  return (
    <>
      <section id="gallery" className={`${getSectionPadding(sectionSpacing)} bg-background`}>
        <div className={`mx-auto max-w-6xl px-6 ${revealed ? "revealed" : ""}`} ref={containerRef}>
          <div className="text-center mb-12 reveal">
            <span className="text-sm font-medium text-primary tracking-widest uppercase">
              Galerie
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3">
              Einblicke in die Praxis
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
              Ein kleiner Blick in unsere Räume und die entspannte Atmosphäre,
              die Euch erwartet.
            </p>
          </div>

          {galleryStyle === "masonry" ? (
            /* Masonry layout */
            <div className="columns-2 md:columns-3 gap-4 space-y-4">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => openLightbox(i)}
                  className={`block w-full break-inside-avoid group cursor-pointer reveal reveal-delay-${Math.min(i + 1, 5)} ${getImageClasses(imageStyle)}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          ) : (
            /* Uniform grid layout */
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => openLightbox(i)}
                  className={`group cursor-pointer aspect-[4/3] reveal reveal-delay-${Math.min(i + 1, 5)} ${getImageClasses(imageStyle)}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
}
