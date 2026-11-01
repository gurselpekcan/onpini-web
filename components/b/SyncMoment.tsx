"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useI18n } from "@/lib/i18n";
import type { TeamDeck } from "@/lib/siteContent";
import { Pop } from "./Bits";

const SPRING = { type: "spring", stiffness: 300, damping: 26 } as const;
const HOLD = [2500, 2300, 2900, 4600];
const STEPS = ["land", "tap", "answer", "reveal"];

function Page({ decks, step }: { decks: TeamDeck[]; step: number }) {
  const { t } = useI18n();
  const shelf = decks.slice(0, 3);
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-3">
        <span className="grid place-items-center w-14 h-14 rounded-full bg-[#c4b5fd] b-h text-2xl" aria-hidden="true">{t("moment.name").slice(0, 1)}</span>
        <p className="b-h text-[1.8rem] leading-none">{t("moment.name")}</p>
      </div>
      <ul className="grid gap-2 mt-5">
        {shelf.map((d, i) => (
          <motion.li key={d.id} animate={{ scale: step === 1 && i === 0 ? 1.04 : 1, opacity: step === 1 && i > 0 ? 0.35 : 1 }} transition={SPRING} style={{ background: d.color }} className="rounded-2xl px-4 py-3 font-bold leading-tight">{d.title}</motion.li>
        ))}
      </ul>
      <motion.p animate={{ scale: step === 1 ? [1, 0.93, 1] : 1 }} transition={{ delay: 0.9, duration: 0.4 }} className="mt-auto flex items-center justify-center min-h-[54px] rounded-full bg-[#111] text-white font-bold">{t("moment.sync")}</motion.p>
    </div>
  );
}

function Answer({ deck }: { deck: TeamDeck }) {
  const { t } = useI18n();
  const card = deck.cards[0];
  return (
    <div className="h-full flex flex-col">
      <p className="font-bold text-sm">{deck.title}</p>
      <p className="b-h text-[clamp(1.35rem,4svh,1.7rem)] leading-[1.08] mt-3">{card.q}</p>
      <p className="text-sm font-semibold mt-3 text-[#525252]">{t("moment.sealed")}</p>
      <div className="grid gap-2 mt-auto">
        <motion.p initial={{ backgroundColor: "#f5f5f5", color: "#111111" }} animate={{ backgroundColor: "#111111", color: "#ffffff" }} transition={{ delay: 1.2, duration: 0.2 }} className="flex items-center justify-center text-center min-h-[54px] rounded-2xl px-3 py-2 font-bold leading-tight">{card.a}</motion.p>
        <p className="flex items-center justify-center text-center min-h-[54px] rounded-2xl px-3 py-2 font-bold leading-tight bg-[#f5f5f5]">{card.b}</p>
      </div>
    </div>
  );
}

function Reveal({ deck }: { deck: TeamDeck }) {
  const { t } = useI18n();
  const card = deck.cards[0];
  return (
    <div className="h-full flex flex-col">
      <p className="b-h text-[clamp(1.2rem,3.4svh,1.45rem)] leading-[1.08]">{card.q}</p>
      <div className="grid gap-2 mt-4">
        <motion.p initial={{ opacity: 0, x: -36 }} animate={{ opacity: 1, x: 0 }} transition={SPRING} className="rounded-2xl bg-[#c4b5fd] px-4 py-3 font-bold leading-tight"><span className="b-tag block mb-1">{t("playPage.you")}</span>{card.a}</motion.p>
        <motion.p initial={{ opacity: 0, x: 36 }} animate={{ opacity: 1, x: 0 }} transition={{ ...SPRING, delay: 0.25 }} className="rounded-2xl bg-[#86efac] px-4 py-3 font-bold leading-tight"><span className="b-tag block mb-1">{t("moment.name")}</span>{card.b}</motion.p>
      </div>
      <motion.p initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ ...SPRING, delay: 0.6 }} className="b-h text-[2.3rem] leading-none text-[#ea580c] mt-auto text-center">{t("playPage.split")}</motion.p>
    </div>
  );
}

/** Why we exist and what playing pays back, told as one Sync on someone's page. It plays by itself and never holds the scroll. */
export default function SyncMoment({ deck, decks }: { deck: TeamDeck; decks: TeamDeck[] }) {
  const { t } = useI18n();
  const calm = useReducedMotion();
  const phone = useRef<HTMLDivElement>(null);
  const seen = useInView(phone, { amount: 0.5 });
  const [step, setStep] = useState(0);
  const now = calm ? 3 : step;
  useEffect(() => {
    if (!seen || calm) return;
    const timer = setTimeout(() => setStep((s) => (s + 1) % STEPS.length), HOLD[step]);
    return () => clearTimeout(timer);
  }, [seen, calm, step]);
  const shelf = [deck, ...decks.filter((d) => d.id !== deck.id)];
  return (
    <section className="relative z-10 bg-[#111] text-white px-5 sm:px-10 pt-14 pb-16 sm:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="b-h text-[clamp(2.9rem,12.5vw,6.4rem)] leading-[.96]"><Pop text={t("story.title")} /><Pop text={t("story.accent")} className="text-[#fb923c]" /></h2>
        <div className="grid lg:grid-cols-2 gap-x-14 items-center mt-9 sm:mt-14">
          <div>
            <p className="b-tag text-center mb-3 lg:text-start">{t("moment.tag")}</p>
            <div className="min-h-[4.6rem] sm:min-h-[4rem] mb-3" aria-hidden="true">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p key={STEPS[now]} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="text-[1.2rem] sm:text-2xl font-semibold leading-snug text-center lg:text-start">{t(`moment.${STEPS[now]}`)}</motion.p>
              </AnimatePresence>
            </div>
            <div ref={phone} aria-hidden="true" className="relative mx-auto lg:mx-0 w-[min(82vw,21rem)] h-[min(27rem,62svh)] min-h-[23rem] rounded-[34px] bg-white text-[#111] p-5 shadow-[0_24px_60px_rgb(0_0_0_/_.5)]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={now < 2 ? "page" : STEPS[now]} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.22 }} className="h-full">
                  {now < 2 ? <Page decks={shelf} step={now} /> : now === 2 ? <Answer deck={deck} /> : <Reveal deck={deck} />}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex justify-center lg:justify-start gap-1.5 mt-4" aria-hidden="true">
              {STEPS.map((s, i) => <span key={s} className={`h-1.5 rounded-full transition-all ${i === now ? "w-6 bg-[#fb923c]" : "w-1.5 bg-white/30"}`} />)}
            </div>
            <ol className="sr-only">{STEPS.map((s) => <li key={s}>{t(`moment.${s}`)}</li>)}</ol>
          </div>
          <div className="mt-8 lg:mt-0">
            <p className="b-h text-[#fde047] text-[clamp(2.7rem,11.5vw,5.4rem)] leading-[.98]"><Pop text={t("story.keep.title")} /></p>
            <p className="b-h text-[clamp(1.7rem,7vw,2.8rem)] leading-[1.04] mt-5">{t("story.keep.title2")}</p>
            <p className="text-lg sm:text-2xl leading-snug mt-3">{t("story.keep.line2")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
