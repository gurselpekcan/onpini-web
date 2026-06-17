"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Mounted once in the layout. Reveals any element with the `reveal` class as it
 * scrolls into view (IntersectionObserver, no deps). Re-scans on route change.
 *
 * Safe by design: the hidden state lives under `.js-anim` (added here on mount),
 * so without JS, or before this runs, content renders fully visible. Honors
 * prefers-reduced-motion by simply not arming the effect.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    document.documentElement.classList.add("js-anim");

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    els.forEach((el) => {
      // Anything already in view on load reveals immediately (no fade-in flash
      // for above-the-fold content).
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9) el.classList.add("is-visible");
      else io.observe(el);
    });

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
