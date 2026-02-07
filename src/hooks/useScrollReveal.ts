import { useEffect, useRef } from "react";

export function useScrollReveal(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null!);
  const revealed = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If already revealed, just re-apply visible class (handles re-renders)
    if (revealed.current) {
      el.querySelectorAll(".reveal").forEach((child) => {
        child.classList.add("visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          revealed.current = true;
          el.querySelectorAll(".reveal").forEach((child) => {
            child.classList.add("visible");
          });
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
