"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import Logo from "@/components/Logo";
import { useI18n } from "@/lib/i18n";
import type { Card } from "@/lib/siteContent";
import { Arrow, JoinBand, Pop } from "./Bits";
import Shell, { Footer } from "./Chrome";

const SPRING = { type: "spring", stiffness: 260, damping: 24 } as const;
const rise = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: SPRING } as const;

// One stage, the light changes as the story moves on.
const SCENES = [
  { bg: "#0a0a0a", fg: "#ffffff", acc: "#fb923c" },
  { bg: "#ffffff", fg: "#111111", acc: "#ea580c" },
  { bg: "#111111", fg: "#ffffff", acc: "#fde047" },
  { bg: "#fde047", fg: "#111111", acc: "#c2410c" },
  { bg: "#f97316", fg: "#111111", acc: "#ffffff" },
  { bg: "#0a0a0a", fg: "#ffffff", acc: "#fb923c" },
];
const PILLS = [["#ffffff", "#111"], ["#fda4af", "#111"], ["#111111", "#fff"], ["#c4b5fd", "#111"], ["#86efac", "#111"], ["#fb923c", "#111"]];
const TILT = [-5, 3, -2, 5, -4, 2];

function Word({ word, at, of, progress }: { word: string; at: number; of: number; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [at / of, (at + 1) / of], [0.16, 1]);
  return <motion.span style={{ opacity }}>{word} </motion.span>;
}

/** The narrator: the words light up as you read down, at your own speed. */
function Lit({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const calm = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 88%", "end 62%"] });
  if (calm) return <p className={className}>{text}</p>;
  const words = text.split(" ");
  return <p ref={ref} className={className}>{words.map((w, i) => <Word key={i} word={w} at={i} of={words.length} progress={scrollYProgress} />)}</p>;
}

/** What the old apps gave us, crossed out as you pass it. */
function Past({ word, line }: { word: string; line: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 78%", "start 42%"] });
  const dim = useTransform(scrollYProgress, [0.5, 1], [1, 0.38]);
  return (
    <div ref={ref}>
      <p className="b-h relative inline-block text-[clamp(3.5rem,17vw,10rem)] leading-[1]">
        <motion.span style={{ opacity: dim }}>{word}</motion.span>
        <motion.span aria-hidden="true" style={{ scaleX: scrollYProgress }} className="absolute -inset-x-[2%] top-[54%] h-[.085em] rounded-full bg-[var(--acc)] origin-left rtl:origin-right" />
      </p>
      <p className="text-[1.2rem] sm:text-2xl font-medium mt-1">{line}</p>
    </div>
  );
}

function Scene({ i, on, className = "", children }: { i: number; on: (i: number) => void; className?: string; children: React.ReactNode }) {
  return <motion.section onViewportEnter={() => on(i)} viewport={{ margin: "-49% 0px -49% 0px" }} className={`px-5 sm:px-10 ${className}`}><div className="max-w-5xl mx-auto">{children}</div></motion.section>;
}

function Reveal({ card }: { card: Card }) {
  const { t } = useI18n();
  return (
    <div className="mt-10 sm:mt-14 max-w-xl mx-auto">
      <motion.div {...rise} className="relative rounded-[28px] bg-white text-[#111] p-6 sm:p-8 -rotate-2 shadow-[0_24px_60px_rgb(0_0_0_/_.45)]">
        <Logo size={30} />
        <p className="b-h text-[clamp(2rem,8.8vw,3.3rem)] leading-[1.04] mt-5">{card.q}</p>
      </motion.div>
      <motion.p initial={{ opacity: 0, x: -44 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.9 }} transition={SPRING} className="relative rounded-2xl bg-[#c4b5fd] text-[#111] font-bold text-[1.15rem] px-5 py-4 mt-3 me-8 flex items-baseline gap-3">
        <span className="b-tag shrink-0">{t("story.rule.you")}</span> {card.a}
      </motion.p>
      <motion.p initial={{ opacity: 0, x: 44 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.9 }} transition={{ ...SPRING, delay: 0.18 }} className="relative rounded-2xl bg-[#86efac] text-[#111] font-bold text-[1.15rem] px-5 py-4 mt-2 ms-8 flex items-baseline gap-3">
        <span className="b-tag shrink-0">{t("story.rule.them")}</span> {card.b}
      </motion.p>
    </div>
  );
}

export default function StoryPage({ card, decks }: { card: Card; decks: string[] }) {
  const { t, raw } = useI18n();
  const [scene, setScene] = useState(0);
  const look = SCENES[scene];
  return (
    <Shell>
      <motion.main initial={false} animate={{ backgroundColor: look.bg, color: look.fg }} transition={{ duration: 0.45, ease: "easeInOut" }} style={{ "--acc": look.acc } as React.CSSProperties} className="relative z-10 overflow-hidden">
        <Scene i={0} on={setScene} className="pb-14 sm:pb-32">
          <div className="min-h-[100svh] flex flex-col justify-end pb-12 sm:pb-16">
            <p className="b-tag b-rise mb-4">{t("story.tag")}</p>
            <h1 className="b-h b-rise text-[clamp(3.3rem,14.5vw,8.6rem)] leading-[.94]">{t("story.title")} <span className="block text-[var(--acc)]">{t("story.accent")}</span></h1>
            <motion.p aria-hidden="true" animate={{ y: [0, 9, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} className="text-3xl mt-8"><Arrow down /></motion.p>
          </div>
          <div className="space-y-9 sm:space-y-20">
            {raw<{ w: string; l: string }[]>("story.past").map((p) => <Past key={p.w} word={p.w} line={p.l} />)}
          </div>
          <h2 className="b-h text-[#fde047] text-[clamp(3.8rem,18.5vw,11rem)] leading-[.94] mt-14 sm:mt-32"><Pop text={t("story.never")} /></h2>
          <motion.p {...rise} className="text-[1.35rem] sm:text-3xl font-medium leading-snug mt-5 max-w-3xl">{t("story.neverLine")}</motion.p>
        </Scene>

        <Scene i={1} on={setScene} className="py-14 sm:py-32">
          <div className="flex items-center gap-2 mb-8" aria-hidden="true">
            <span className="rounded-full bg-[#fb923c] text-[#111] font-bold px-4 py-2">{t("story.nl")}</span>
            <motion.span initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="h-[3px] w-10 sm:w-20 bg-current origin-center" />
            <span className="rounded-full bg-[#fde047] text-[#111] font-bold px-4 py-2">{t("story.de")}</span>
          </div>
          <Lit text={t("story.turn.one")} className="b-h text-[clamp(2.1rem,8.6vw,4.6rem)] leading-[1.04]" />
          <Lit text={t("story.turn.two")} className="b-h text-[clamp(2.1rem,8.6vw,4.6rem)] leading-[1.04] mt-10 sm:mt-16" />
          <h2 className="b-h text-[var(--acc)] text-[clamp(3.2rem,14vw,8rem)] leading-[.96] mt-12 sm:mt-20"><Pop text={t("story.turn.title")} /></h2>
        </Scene>

        <Scene i={2} on={setScene} className="py-14 sm:py-32">
          <p className="b-tag mb-3">{t("story.rule.tag")}</p>
          <h2 className="b-h text-[var(--acc)] text-[clamp(3.4rem,16vw,9rem)] leading-[.92]"><Pop text={t("story.rule.title")} /></h2>
          <motion.p {...rise} className="text-[1.2rem] sm:text-2xl font-medium leading-snug mt-4">{t("story.rule.line")}</motion.p>
          <Reveal card={card} />
          <p className="b-h text-[clamp(2.1rem,8.8vw,4.4rem)] leading-[1] mt-14 sm:mt-24"><Pop text={t("story.rule.one")} /><Pop text={t("story.rule.two")} className="mt-2 text-[#fb923c]" /></p>
        </Scene>

        <Scene i={3} on={setScene} className="py-14 sm:py-32">
          <h2 className="b-h text-[clamp(3.2rem,14.5vw,8.6rem)] leading-[.94]"><Pop text={t("story.keep.title")} /></h2>
          <motion.p {...rise} className="text-[1.2rem] sm:text-2xl font-medium leading-snug mt-5 max-w-2xl">{t("story.keep.line")}</motion.p>
          <ul className="flex flex-wrap gap-2 sm:gap-3 mt-9 sm:mt-14">
            {decks.map((d, i) => (
              <motion.li key={d} initial={{ opacity: 0, y: -70, rotate: 0 }} whileInView={{ opacity: 1, y: 0, rotate: TILT[i % TILT.length] }} viewport={{ once: true, amount: 0.6 }} transition={{ type: "spring", stiffness: 280, damping: 15, delay: i * 0.07 }} style={{ background: PILLS[i % PILLS.length][0], color: PILLS[i % PILLS.length][1] }} className="rounded-full font-bold text-[1.05rem] sm:text-xl px-5 py-3 shadow-[0_8px_20px_rgb(0_0_0_/_.14)]">
                {d}
              </motion.li>
            ))}
          </ul>
          <h3 className="b-h text-[clamp(2.5rem,10.5vw,5.8rem)] leading-[.98] mt-14 sm:mt-24"><Pop text={t("story.keep.title2")} /></h3>
          <motion.p {...rise} className="text-[1.2rem] sm:text-2xl font-medium leading-snug mt-4 max-w-2xl">{t("story.keep.line2")}</motion.p>
        </Scene>

        <Scene i={4} on={setScene} className="py-14 sm:py-32">
          <p className="b-tag mb-3">{t("story.mission.tag")}</p>
          <h2 className="b-h text-[clamp(3.2rem,14.5vw,8.6rem)] leading-[.94]"><Pop text={t("story.mission.title")} /></h2>
          <Lit text={t("story.mission.line")} className="text-[1.45rem] sm:text-[2.2rem] font-semibold leading-[1.22] mt-8 sm:mt-12 max-w-4xl" />
        </Scene>

        <Scene i={5} on={setScene} className="pt-14 sm:pt-32 pb-10 sm:pb-16">
          <h2 className="b-h text-[clamp(3.4rem,15.5vw,9rem)] leading-[.94]"><Pop text={t("story.end.title")} /><Pop text={t("story.end.accent")} className="text-[var(--acc)]" /></h2>
          <p className="text-[1.1rem] sm:text-xl font-medium mt-10 sm:mt-14">
            {t("story.end.door")} <a href="mailto:hello@onpini.app" dir="ltr" className="inline-flex items-center min-h-11 font-bold underline underline-offset-4">hello@onpini.app</a>
          </p>
        </Scene>
      </motion.main>
      <JoinBand medium="b_story" />
      <Footer />
    </Shell>
  );
}
