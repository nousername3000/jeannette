import { useEffect, useRef, useState } from "react";

export function useScrollReveal(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null!);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Add 'visible' class to all .reveal children when section enters viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Immediately mark all reveal elements as visible
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
  }, [threshold]);

  return { ref, isVisible };
}
