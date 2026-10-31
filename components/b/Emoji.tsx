"use client";

import { useEffect, useRef } from "react";
import type { AnimationItem } from "lottie-web";

// The app's own living emoji (Noto Animated Emoji). The still shows at once; the
// player only loads when one scrolls into view, and it rests off screen.
export default function Emoji({ code, size = 96, className = "" }: { code: string; size?: number; className?: string }) {
  const box = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let anim: AnimationItem | null = null;
    let loading = false;
    let gone = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          anim?.pause();
          return;
        }
        if (anim) {
          anim.play();
          return;
        }
        if (loading) return;
        loading = true;
        import("lottie-web/build/player/lottie_light").then(({ default: lottie }) => {
          if (gone) return;
          anim = lottie.loadAnimation({ container: el, renderer: "svg", loop: true, autoplay: true, path: `/emoji/${code}.json` });
          anim.addEventListener("DOMLoaded", () => el.querySelector("img")?.remove());
        });
      },
      { rootMargin: "120px" },
    );
    io.observe(el);
    return () => {
      gone = true;
      io.disconnect();
      anim?.destroy();
    };
  }, [code]);

  return (
    <span ref={box} className={`inline-block ${className}`} style={{ width: size, height: size }} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/emoji/${code}.svg`} alt="" width={size} height={size} loading="lazy" decoding="async" />
    </span>
  );
}
