"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { animate, AnimatePresence, motion, useMotionValue, useTransform } from "motion/react";
import Logo from "@/components/Logo";
import { appLink, useI18n } from "@/lib/i18n";
import type { TeamDeck } from "@/lib/siteContent";
import { Arrow, pressJoin } from "./Bits";
import { goldBurst } from "./burst";
import Shell from "./Chrome";
import Emoji from "./Emoji";
import FlipCard from "./FlipCard";
import { haptic } from "./haptic";
import { savePlayed } from "./played";

const SPRING = { type: "spring", stiffness: 320, damping: 26 } as const;
const WHO = ["friend", "crush", "partner", "group", "classmate", "sibling", "mom", "dad"];
// Where each person sits in cases.items, for the line that goes with them.
const WIN: Record<string, number> = { mom: 0, dad: 1, partner: 2, crush: 3, friend: 6, group: 7, sibling: 8, classmate: 9 };

function Picker({ decks, onPick }: { decks: TeamDeck[]; onPick: (deck: TeamDeck) => void }) {
  const { t, href } = useI18n();
  return (
    <motion.div key="pick" exit={{ opacity: 0 }} className="b-play bg-white">
      <header className="flex items-center justify-between px-5 pt-3 pb-1">
        <Link href={href("")} aria-label="OnPini"><Logo size={30} /></Link>
        <Link href={href("")} className="text-sm font-semibold inline-flex items-center min-h-11">{t("playPage.close")}</Link>
      </header>
      <div className="px-5 pt-2 pb-4">
        <h1 className="b-h text-[clamp(2.5rem,11.5vw,4.4rem)]">{t("playPage.pick")}</h1>
        <p className="text-[1.05rem] leading-snug mt-1.5">{t("playPage.pickSub")}</p>
      </div>
      <ul className="flex-1 grid grid-cols-1 gap-2 px-3 pb-[max(.75rem,env(safe-area-inset-bottom))] min-h-0 max-w-xl w-full mx-auto auto-rows-fr">
        {decks.map((deck, i) => (
          <motion.li key={deck.id} initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ ...SPRING, delay: 0.05 + i * 0.05 }} className="min-h-0">
            <motion.button type="button" whileTap={{ scale: 0.97 }} onClick={() => onPick(deck)} style={{ background: deck.color }} className="w-full h-full min-h-[76px] rounded-[22px] px-4 py-2 flex items-center gap-3 text-start">
              <span className="flex-1 min-w-0">
                <span className="b-tag block opacity-80">{t(`playPage.tags.${deck.tag}`)}</span>
                <span className="b-h text-[clamp(1.3rem,6.2vw,1.55rem)] leading-[1.05] block mt-0.5">{deck.title}</span>
              </span>
              <Emoji code={deck.emoji} size={50} />
            </motion.button>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

function Cards({ deck, onDone, onExit }: { deck: TeamDeck; onDone: (answers: ("a" | "b")[]) => void; onExit: () => void }) {
  const { t } = useI18n();
  const [answers, setAnswers] = useState<("a" | "b")[]>([]);
  const [chosen, setChosen] = useState<"a" | "b" | null>(null);
  const step = answers.length;
  const card = deck.cards[Math.min(step, deck.cards.length - 1)];
  const answer = (side: "a" | "b") => {
    if (chosen) return;
    haptic();
    setChosen(side);
    setTimeout(() => {
      const next = [...answers, side];
      setChosen(null);
      if (next.length === deck.cards.length) onDone(next);
      else setAnswers(next);
    }, 240);
  };
  return (
    <motion.div key="cards" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="b-play" style={{ background: deck.color }}>
      <header className="px-4 pt-3">
        <div className="flex gap-1.5" role="progressbar" aria-valuemin={0} aria-valuemax={deck.cards.length} aria-valuenow={step + 1} aria-label={t("playPage.cardOf", { n: step + 1, total: deck.cards.length })}>
          {deck.cards.map((_, i) => (
            <span key={i} className="flex-1 h-1.5 rounded-full bg-[#111]/15 overflow-hidden">
              <motion.span className="block h-full bg-[#111] rounded-full" initial={false} animate={{ width: i <= step ? "100%" : "0%" }} transition={{ duration: 0.3 }} />
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-2.5 min-h-11">
          <span className="text-sm font-semibold">{deck.title}</span>
          <button type="button" onClick={onExit} className="text-sm font-semibold min-h-11 px-1">{t("playPage.change")}</button>
        </div>
      </header>
      <div className="flex-1 min-h-0 flex items-center px-5">
        <AnimatePresence mode="wait">
          <motion.h2 key={step} initial={{ opacity: 0, y: 34, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -28, scale: 0.98 }} transition={{ type: "spring", stiffness: 380, damping: 30 }} className="b-h text-[clamp(2.2rem,10.4vw,4rem)] leading-[1.02] text-balance max-w-2xl mx-auto w-full" aria-live="polite">
            {card.q}
          </motion.h2>
        </AnimatePresence>
      </div>
      {/* The thumb's end of the screen. */}
      <div className="px-3 pb-[max(1rem,env(safe-area-inset-bottom))] grid gap-2.5 max-w-xl w-full mx-auto">
        <p className="text-center text-sm font-semibold mb-0.5 flex items-center justify-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#b45309]" /> {t("playPage.sealed")}</p>
        {(["a", "b"] as const).map((side) => (
          <motion.button key={side} type="button" whileTap={{ scale: 0.97 }} onClick={() => answer(side)} animate={{ backgroundColor: chosen === side ? "#111111" : "#ffffff", color: chosen === side ? "#ffffff" : "#111111" }} transition={{ duration: 0.12 }} className="b-answer-big min-h-[72px] rounded-[22px] px-4 py-3 text-[1.15rem] font-bold leading-tight">
            {card[side]}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

/** The one big cinematic. It starts with their own tap, runs under a second, then rests. */
function Opening({ onDone }: { onDone: () => void }) {
  const { t } = useI18n();
  const [broken, setBroken] = useState(false);
  const open = () => {
    if (broken) return;
    haptic(20);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return onDone();
    setBroken(true);
    goldBurst(0.5, 0.42);
    setTimeout(onDone, 800);
  };
  return (
    <motion.div key="open" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="b-play bg-[#0c0c0c] text-white">
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center px-5">
        <motion.div animate={broken ? { scale: [1, 1.3, 0], rotate: [0, 8, 24], opacity: [1, 1, 0] } : { rotate: [-2, 2, -2], y: [0, -6, 0] }} transition={broken ? { duration: 0.6 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }} className="w-[50vw] max-w-[14rem] aspect-[3/4] rounded-[24px] b-flip-back relative overflow-hidden flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icon.svg" alt="OnPini" width={110} height={110} className="w-[48%] h-auto" />
          <span className="b-flip-sheen" />
        </motion.div>
        <motion.div animate={{ opacity: broken ? 0 : 1 }} className="text-center">
          <p className="b-h text-[2.4rem] mt-7">{t("playPage.bothIn")}</p>
          <p className="text-[1.05rem] mt-1 text-white/85">{t("playPage.notSeen")}</p>
        </motion.div>
      </div>
      <div className="px-3 pb-[max(1rem,env(safe-area-inset-bottom))] max-w-xl w-full mx-auto">
        <motion.button type="button" whileTap={{ scale: 0.97 }} onClick={open} className="w-full min-h-[72px] rounded-[22px] bg-gradient-to-r from-[#f59e0b] via-[#fde68a] to-[#f59e0b] text-[#111] font-bold text-[1.2rem]">{t("playPage.open")}</motion.button>
      </div>
    </motion.div>
  );
}

function Reveal({ deck, answers, onDone }: { deck: TeamDeck; answers: ("a" | "b")[]; onDone: () => void }) {
  const { t } = useI18n();
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);
  const card = deck.cards[i];
  const mine = answers[i];
  const same = mine === card.team;
  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 420);
    return () => clearTimeout(timer);
  }, [i]);
  const next = () => {
    if (i + 1 === deck.cards.length) return onDone();
    setOpen(false);
    setI(i + 1);
  };
  return (
    <motion.div key="reveal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="b-play bg-[#0c0c0c] text-white">
      <div className="flex gap-1.5 px-4 pt-3">{deck.cards.map((_, n) => <span key={n} className={`flex-1 h-1.5 rounded-full ${n <= i ? "bg-white" : "bg-white/20"}`} />)}</div>
      <div className="flex-1 min-h-0 flex flex-col justify-center px-5 max-w-2xl w-full mx-auto">
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={SPRING}>
            <h2 className="b-h text-[clamp(1.9rem,8.6vw,3.2rem)] leading-[1.04] text-balance mb-6">{card.q}</h2>
            <div className="grid grid-cols-2 gap-2.5" style={{ perspective: 900 }}>
              {[{ who: t("playPage.you"), text: card[mine] }, { who: t("playPage.team"), text: card[card.team] }].map((side, s) => (
                <FlipCard key={side.who} who={side.who} text={side.text} tone={same ? "#bbf7d0" : s === 0 ? "#fde047" : "#fb923c"} open={open} delay={s * 0.16} />
              ))}
            </div>
            <motion.div initial={false} animate={{ opacity: open ? 1 : 0, y: open ? 0 : 12 }} transition={{ delay: 0.5, duration: 0.35 }} className="mt-5 min-h-[6.5rem]">
              <p className="b-h text-[1.9rem]" style={{ color: same ? "#86efac" : "#fb923c" }}>{same ? t("playPage.same") : t("playPage.split")}</p>
              <p className="text-[1.05rem] leading-snug mt-1 text-white/90">{t("playPage.teamWhy")} {card.why}</p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="px-3 pb-[max(1rem,env(safe-area-inset-bottom))] max-w-xl w-full mx-auto">
        <motion.button type="button" whileTap={{ scale: 0.97 }} onClick={next} className="w-full min-h-[66px] rounded-[22px] bg-white text-[#111] font-bold text-[1.15rem]">{i + 1 === deck.cards.length ? t("playPage.seeEnd") : t("playPage.next")}</motion.button>
      </div>
    </motion.div>
  );
}

function End({ deck, answers, onAgain }: { deck: TeamDeck; answers: ("a" | "b")[]; onAgain: () => void }) {
  const { t, raw, href, lang } = useI18n();
  const wins = raw<{ win: string }[]>("cases.items");
  const same = deck.cards.filter((c, i) => c.team === answers[i]).length;
  const [who, setWho] = useState<string | null>(null);
  useEffect(() => { savePlayed({ same, total: deck.cards.length, who }); }, [same, deck, who]);
  return (
    <motion.div key="end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="b-play bg-[#f97316] overflow-y-auto">
      <div className="flex-[1_0_auto] flex flex-col justify-center px-5 pt-5 pb-3 max-w-xl w-full mx-auto">
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="font-bold text-[1.05rem]">{t("playPage.score", { same, total: deck.cards.length })}</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ ...SPRING, delay: 0.1 }} className="b-h text-[clamp(2.3rem,min(14.5vw,7.4svh),5rem)] leading-[.96] mt-2">{t("playPage.endTitle")}</motion.h2>
        <p className="font-semibold mt-4 mb-2">{t("playPage.who")}</p>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label={t("playPage.who")}>
          {WHO.map((p) => (
            <motion.button key={p} type="button" whileTap={{ scale: 0.94 }} aria-pressed={who === p} onClick={() => setWho(p)} className={`min-h-[42px] px-3.5 rounded-full font-semibold text-[15px] ${who === p ? "bg-[#111] text-white" : "bg-white/90 text-[#111]"}`}>{t(`chips.${p}`)}</motion.button>
          ))}
        </div>
        <div className="min-h-[2.4rem] mt-3" aria-live="polite">
          {who && <motion.p key={who} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="b-h text-[1.35rem] leading-[1.08]">{wins[WIN[who]].win}</motion.p>}
        </div>
      </div>
      {/* The ask stays on screen however tall the rest gets on a small phone. */}
      <div className="sticky bottom-0 bg-[#f97316] pt-2 px-3 pb-[max(.5rem,env(safe-area-inset-bottom))] grid gap-1 max-w-xl w-full mx-auto">
        <a href={`${appLink("signup", lang, "b_play_end")}${who ? `&utm_content=${who}` : ""}`} onClick={(e) => pressJoin(e)} className="b-cta w-full !min-h-[68px] !text-[1.08rem] text-center">{who ? t(`playPage.send.${who}`) : t("playPage.sendAny")} <Arrow /></a>
        <p className="text-center text-sm font-semibold">{t("playPage.sendNote")}</p>
        <div className="flex justify-center gap-5">
          <button type="button" onClick={onAgain} className="font-semibold min-h-11 underline underline-offset-4">{t("playPage.again")}</button>
          <Link href={`${href("")}#people`} className="font-semibold min-h-11 inline-flex items-center underline underline-offset-4">{t("playPage.next2")}</Link>
        </div>
      </div>
    </motion.div>
  );
}

type Stage = "pick" | "cards" | "open" | "reveal" | "end";

export default function PlayPage({ decks }: { decks: TeamDeck[] }) {
  const asked = useSearchParams().get("deck");
  const first = decks.find((d) => d.id === asked) ?? null;
  const [deck, setDeck] = useState<TeamDeck | null>(first);
  const [stage, setStage] = useState<Stage>(first ? "cards" : "pick");
  const [answers, setAnswers] = useState<("a" | "b")[]>([]);
  const reset = () => { setDeck(null); setAnswers([]); setStage("pick"); };
  return (
    <Shell bare>
      <main>
        <AnimatePresence mode="wait">
          {stage === "pick" && <Picker key="pick" decks={decks} onPick={(d) => { setDeck(d); setStage("cards"); }} />}
          {stage === "cards" && deck && <Cards key="cards" deck={deck} onExit={reset} onDone={(a) => { setAnswers(a); setStage("open"); }} />}
          {stage === "open" && <Opening key="open" onDone={() => setStage("reveal")} />}
          {stage === "reveal" && deck && <Reveal key="reveal" deck={deck} answers={answers} onDone={() => setStage("end")} />}
          {stage === "end" && deck && <End key="end" deck={deck} answers={answers} onAgain={reset} />}
        </AnimatePresence>
      </main>
    </Shell>
  );
}
