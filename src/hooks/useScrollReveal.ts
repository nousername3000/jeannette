import { useEffect, useRef } from "react";

function markRevealed(el: HTMLElement) {
  // Mark the element itself if it has .reveal
  if (el.classList.contains("reveal")) {
    el.classList.add("visible");
  }
  // Mark all .reveal descendants
  el.querySelectorAll(".reveal").forEach((child) => {
    child.classList.add("visible");
  });
}

export function useScrollReveal(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null!);
  const revealed = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (revealed.current) {
      markRevealed(el);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          revealed.current = true;
          markRevealed(el);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  });

  return { ref };
}
