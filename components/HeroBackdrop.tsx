"use client";

import { useEffect, useRef } from "react";

/**
 * The hero's decorative orbs, with a subtle scroll parallax. rAF-throttled,
 * disabled under prefers-reduced-motion. Replaces the static background divs.
 */
export default function HeroBackdrop() {
  const sunRef = useRef<HTMLDivElement>(null);
  const peachRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (sunRef.current) sunRef.current.style.transform = `translateY(${y * 0.18}px)`;
        if (peachRef.current) peachRef.current.style.transform = `translateY(${y * -0.08}px)`;
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      <div
        ref={sunRef}
        className="absolute top-[-80px] right-[-80px] w-96 h-96 rounded-full opacity-60 will-change-transform"
        style={{ background: "radial-gradient(circle at 30% 30%, #fff, #fbbf24 40%, #f97316 80%)" }}
      />
      <div
        ref={peachRef}
        className="absolute bottom-[-60px] left-[-60px] w-64 h-64 rounded-full bg-peach opacity-50 will-change-transform"
      />
    </div>
  );
}
