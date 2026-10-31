"use client";

import { useEffect } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";

/** One answer, gold side up until it opens. WebKit lets the back show through, mirrored, so each face is switched off at the halfway point. */
export default function FlipCard({ who, text, tone, open, delay, big = false }: { who: string; text: string; tone: string; open: boolean; delay: number; big?: boolean }) {
  const rotateY = useMotionValue(180);
  const frontOn = useTransform(rotateY, [89.9, 90], [1, 0]);
  const backOn = useTransform(rotateY, [89.9, 90], [0, 1]);
  useEffect(() => {
    const run = animate(rotateY, open ? 0 : 180, { type: "spring", stiffness: 170, damping: 19, delay });
    return () => run.stop();
  }, [open, delay, rotateY]);
  return (
    <motion.div style={{ rotateY }} className={`relative b-flip ${big ? "min-h-[12rem] sm:min-h-[14rem]" : "min-h-[8.2rem]"}`}>
      <motion.span className={`b-flip-face flex flex-col justify-between text-[#111] ${big ? "p-4 sm:p-6" : "p-3"}`} style={{ background: tone, opacity: frontOn }}>
        <span className={`flex items-center justify-between gap-2 font-bold ${big ? "text-sm" : "text-xs"}`}>{who}{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/icon.svg" alt="" width={24} height={24} className={big ? "w-7 h-7" : "w-6 h-6"} /></span>
        <span className={big ? "b-h text-[clamp(1.6rem,7vw,2.6rem)]" : "font-bold text-[1.1rem] leading-[1.15]"}>{text}</span>
      </motion.span>
      <motion.span className={`b-flip-face b-flip-back flex flex-col items-center justify-center overflow-hidden ${big ? "gap-2 p-3" : ""}`} style={{ opacity: backOn }}>
        <span className="b-flip-sheen" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icon.svg" alt="" width={56} height={56} className={`relative ${big ? "w-[38%] h-auto" : "w-14 h-14"}`} />
        {big && <span className="relative text-[#111] font-bold text-sm text-center leading-tight">{who}</span>}
      </motion.span>
    </motion.div>
  );
}
