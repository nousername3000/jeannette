import { useEffect, useRef, useState, useCallback } from "react";

export function useScrollReveal(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null!);
  const [isVisible, setIsVisible] = useState(false);

  // Once visible, keep marking .reveal children as visible on every render
  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      (ref as any).current = node;
      if (node && isVisible) {
        node.querySelectorAll(".reveal").forEach((child) => {
          child.classList.add("visible");
        });
      }
    },
    [isVisible]
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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
  }, [threshold, isVisible]);

  return { ref: setRef, isVisible };
}
