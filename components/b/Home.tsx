"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { appLink, useI18n } from "@/lib/i18n";
import type { Card, TeamDeck } from "@/lib/siteContent";
import { Arrow, JoinBig, Pop, StoreBadges, pressJoin } from "./Bits";
import Shell, { Footer, scroller } from "./Chrome";
import Emoji from "./Emoji";
import { haptic } from "./haptic";
import Pit, { type PitItem } from "./Pit";
import { usePlayed } from "./played";

/** Keeps the longest single word on one line in every language. English stays at the full size. */
const wordFit = (text: string, base: string) => {
  const longest = Math.max(...text.split(/\s+/).map((w) => w.length));
  return `min(${base}, ${(92 / (longest * 0.54)).toFixed(2)}vw)`;
};

const size = (lines: string[], vw: number, cap: string, rtl: boolean) => {
  const longest = Math.max(...lines.map((l) => l.length));
  return `min(${(vw / (longest * (rtl ? 0.44 : 0.51))).toFixed(2)}vw, ${cap})`;
};

/** Letters spring up one by one (words in Arabic, whose letters must stay joined). CSS only, so it never waits for JavaScript. */
function Letters({ text, delay = 0 }: { text: string; delay?: number }) {
  const { rtl } = useI18n();
  const parts = rtl ? text.split(/(\s+)/) : text.split("");
  return (
    <span className="block whitespace-nowrap" role="img" aria-label={text}>
      {parts.map((ch, i) => <span key={i} aria-hidden="true" className="b-letter" style={{ animationDelay: `${delay + i * 0.024}s`, whiteSpace: "pre" }}>{ch}</span>)}
    </span>
  );
}

function Headline() {
  const { t, raw, rtl } = useI18n();
  const who = raw<string[]>("hero.who");
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setI((n) => (n + 1) % who.length), 1700);
    return () => clearInterval(timer);
  }, [who.length]);
  return (
    <>
      <h1 className="b-h">
        <span className="block leading-[1.02]" style={{ fontSize: size([t("hero.top"), t("hero.bottom"), ...who], 93, "6.8rem", rtl) }}>
          <Letters text={t("hero.top")} />
          <span className="block h-[1.06em] relative">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span key={who[i]} initial={{ y: "70%", opacity: 0, rotate: 5, scale: 0.6 }} animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }} exit={{ y: "-70%", opacity: 0, rotate: -5 }} transition={{ type: "spring", stiffness: 340, damping: 26 }} className="absolute inset-x-0 text-[#ea580c] whitespace-nowrap">
                {who[i]}
              </motion.span>
            </AnimatePresence>
          </span>
          <Letters text={t("hero.bottom")} delay={0.2} />
        </span>
      </h1>
      <p className="b-rise b-h text-[clamp(2rem,9vw,3.6rem)] text-[#111] mt-3" style={{ animationDelay: ".45s" }}>{t("hero.punch")}</p>
      <p className="b-rise text-[1.12rem] sm:text-2xl leading-snug mt-1.5 max-w-xl mx-auto" style={{ animationDelay: ".55s" }}>{t("hero.sub")}</p>
    </>
  );
}

/** The hero asks, the way the game does: a question and two answers. */
function HeroAsk() {
  const { t, lang } = useI18n();
  const [picked, setPicked] = useState(false);
  return (
    <div className="b-rise pointer-events-auto mt-4 max-w-md mx-auto" style={{ animationDelay: ".66s" }}>
      <p className="font-bold text-[1.05rem]">{t("hero.ask")}</p>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <motion.a
          href={appLink("signup", lang, "b_hero")}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => pressJoin(e, () => setPicked(true))}
          animate={{ backgroundColor: picked ? "#f97316" : "#111111", color: picked ? "#111111" : "#ffffff" }}
          className="flex items-center justify-center min-h-[64px] rounded-[20px] px-3 font-bold text-[1.08rem] leading-tight"
        >
          {t("hero.yes")}
        </motion.a>
        <motion.a href="#play" whileTap={{ scale: 0.95 }} onClick={() => haptic()} className="flex items-center justify-center min-h-[64px] rounded-[20px] px-3 font-bold text-[1.08rem] leading-tight bg-white shadow-[inset_0_0_0_2px_#111]">
          {t("hero.try")}
        </motion.a>
      </div>
    </div>
  );
}

function PlayBand({ decks }: { decks: TeamDeck[] }) {
  const { t, href } = useI18n();
  return (
    <section id="play" className="b-curtain relative z-10 bg-[#111] text-white pt-14 pb-14 sm:py-24 overflow-hidden">
      <div className="px-5 sm:px-10 max-w-6xl mx-auto">
        <h2 className="b-h text-[clamp(2.9rem,12.5vw,6.4rem)]"><Pop text={t("playBand.title")} /></h2>
        <p className="text-lg sm:text-2xl mt-3 leading-snug">{t("playBand.sub")}</p>
      </div>
      <ul className="b-snap mt-7 sm:mt-10">
        {decks.map((deck) => (
          <li key={deck.id} className="snap-center shrink-0 w-[74vw] max-w-[20rem]">
            <motion.div whileTap={{ scale: 0.97 }} whileHover={{ y: -8 }}>
              <Link href={`${href("/play")}?deck=${deck.id}`} style={{ background: deck.color }} className="flex flex-col justify-between h-[21rem] rounded-[28px] p-5 text-[#111]">
                <span className="flex items-start justify-between">
                  <span className="b-tag">{t(`playPage.tags.${deck.tag}`)}</span>
                  <Emoji code={deck.emoji} size={72} className="-mt-1" />
                </span>
                <span className="b-h text-[1.7rem] !font-semibold leading-[1.08] text-balance">‘{deck.cards[0].q}’</span>
                <span>
                  <span className="b-h text-[2.1rem] block leading-[1.02]">{deck.title}</span>
                  <span className="inline-flex items-center justify-center gap-1.5 w-full min-h-[52px] mt-3 rounded-full bg-[#111] text-white font-bold">{t("playBand.button")} <Arrow /></span>
                </span>
              </Link>
            </motion.div>
          </li>
        ))}
      </ul>
    </section>
  );
}

const band = (px: number) => 110 * (1 - Math.exp(-px / 220));

/**
 * The page ends on its last screen, so no fling can run past it: the browser stops by itself. Pushing
 * on makes the screen give and spring back. It takes two separate pushes after it has come to rest to
 * open the footer. Search and keyboards still find the footer in the page.
 */
function useSoftEnd(gate: React.RefObject<HTMLDivElement | null>) {
  const lift = useMotionValue(0);
  useEffect(() => {
    const box = gate.current;
    const root = document.documentElement;
    if (!box || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const maxY = () => root.scrollHeight - window.innerHeight;
    // Came back to a spot further down, the footer stays.
    if (window.scrollY > maxY() - box.offsetHeight + 2) return;
    box.setAttribute("data-shut", "");
    const off = new AbortController();
    const on = { signal: off.signal, passive: true };
    const atEnd = () => window.scrollY >= maxY() - 2;
    // One push counts for a quarter of a screen at most, however hard: opening takes two.
    const onePush = () => window.innerHeight * 0.25;
    const need = () => window.innerHeight * 0.45;
    let arrived = 0;
    let spent = 0;
    let lastY = window.scrollY;
    let lastT = performance.now();
    let finger = false;
    let fresh = false;
    let baseY = 0;
    let pull = 0;
    let wheelPull = 0;
    let lastWheel = 0;
    let given = 0;
    let settle = 0;
    const rested = () => arrived > 0 && performance.now() - arrived > 500;
    const spend = (px: number) => {
      spent += px;
      if (spent >= need()) open();
    };
    const onScroll = () => {
      const now = performance.now();
      const speed = Math.abs(window.scrollY - lastY) / Math.max(now - lastT, 1);
      lastY = window.scrollY;
      lastT = now;
      if (atEnd() && !arrived) {
        arrived = now;
        root.style.overscrollBehaviorY = "none";
        // A fling ends in a thud instead of a dead stop.
        if (!finger && speed > 0.8) {
          lift.set(-Math.min(70, speed * 26));
          window.setTimeout(() => lift.set(0), 90);
        }
      } else if (arrived && window.scrollY < maxY() - 40) {
        arrived = 0;
        spent = 0;
        root.style.overscrollBehaviorY = "";
      }
    };
    const onStart = (e: TouchEvent) => {
      finger = e.touches.length === 1;
      fresh = finger && atEnd() && rested();
      baseY = e.touches[0].clientY;
      pull = 0;
    };
    const onMove = (e: TouchEvent) => {
      if (!finger || e.touches.length !== 1) return;
      const y = e.touches[0].clientY;
      if (!atEnd()) baseY = y;
      pull = Math.max(baseY - y, 0);
      lift.set(-band(pull));
    };
    const onEnd = () => {
      if (!finger) return;
      finger = false;
      lift.set(0);
      if (fresh && pull > 0) spend(Math.min(pull, onePush()));
    };
    const onWheel = (e: WheelEvent) => {
      const now = performance.now();
      const gap = now - lastWheel;
      lastWheel = now;
      if (e.deltaY <= 0 || !atEnd()) return;
      const px = Math.min(e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY, 120);
      wheelPull += px;
      lift.set(-band(wheelPull));
      window.clearTimeout(settle);
      settle = window.setTimeout(() => { wheelPull = 0; lift.set(0); }, 130);
      // Trackpad momentum from the scroll that got here does not count, only a new push.
      if (gap > 220) {
        fresh = rested();
        given = 0;
      }
      if (fresh && given < onePush()) {
        const counted = Math.min(px, onePush() - given);
        given += counted;
        spend(counted);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if ([" ", "PageDown", "ArrowDown", "End"].includes(e.key) && atEnd() && rested()) open();
    };
    const reset = () => {
      off.abort();
      window.clearTimeout(settle);
      box.removeAttribute("data-shut");
      root.style.overscrollBehaviorY = "";
      lift.set(0);
      scroller.lenis?.resize();
    };
    function open() {
      reset();
      requestAnimationFrame(() => {
        if (scroller.lenis) scroller.lenis.scrollTo(maxY(), { duration: 0.9 });
        else window.scrollTo({ top: maxY(), behavior: "smooth" });
      });
    }
    window.addEventListener("scroll", onScroll, on);
    window.addEventListener("touchstart", onStart, on);
    window.addEventListener("touchmove", onMove, on);
    window.addEventListener("touchend", onEnd, on);
    window.addEventListener("touchcancel", onEnd, on);
    window.addEventListener("wheel", onWheel, on);
    window.addEventListener("keydown", onKey, on);
    box.addEventListener("focusin", reset, on);
    onScroll();
    return reset;
  }, [gate, lift]);
  return useSpring(lift, { stiffness: 380, damping: 26 });
}

function Wipe() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const gate = useRef<HTMLDivElement>(null);
  const y = useSoftEnd(gate);
  const under = useTransform(y, (v) => `${Math.max(-v, 0)}px`);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const clip = useTransform(p, [0.1, 0.72], ["circle(0% at 50% 50%)", "circle(120% at 50% 50%)"]);
  const out = useTransform(p, [0, 0.4], [1, 0.8]);
  const emoji = useTransform(p, [0.66, 0.82], [0, 1]);
  const riseY = useTransform(p, [0.66, 0.82], [18, 0]);
  // A phone's folded toolbar leaves a strip below the stage: it takes the stage's colour.
  const strip = useTransform(p, [0.6, 0.72], ["#ffffff", "#f97316"]);
  return (
    <>
      <motion.section ref={ref} className="relative scrolly" style={{ height: "190vh", background: strip }}>
        <motion.div style={{ y }} className="b-stage bg-white">
          <motion.h2 style={{ scale: out, fontSize: wordFit(t("wipe.awkward"), "clamp(3.6rem,17vw,13rem)") }} className="b-h text-center leading-[.92] px-3">{t("wipe.awkward")}</motion.h2>
          <motion.div style={{ clipPath: clip }} className="absolute inset-0 grid grid-rows-[minmax(0,1fr)_auto_minmax(auto,1fr)] justify-items-center bg-[#f97316] px-4">
            <div aria-hidden="true" />
            <div className="text-center">
              <motion.div style={{ scale: emoji, opacity: emoji }} className="mb-2"><Emoji code="1f60f" size={92} /></motion.div>
              <h2 className="b-h leading-[.92]" style={{ fontSize: wordFit(t("wipe.easy"), "clamp(3.6rem,17vw,13rem)") }}>{t("wipe.easy")}</h2>
              <p className="text-xl sm:text-3xl font-medium mt-4 max-w-2xl mx-auto leading-tight">{t("wipe.line")}</p>
              <motion.div style={{ opacity: emoji, y: riseY }}><JoinBig medium="b_wipe" /></motion.div>
            </div>
            {/* The badges sit halfway between the button and the bottom of the orange. */}
            <motion.div style={{ opacity: emoji, y: riseY }} className="self-center py-3">
              <StoreBadges className="justify-center !flex-nowrap" />
            </motion.div>
          </motion.div>
        </motion.div>
        {/* What the screen lifts off: the dark of the footer below it. */}
        <motion.div aria-hidden="true" style={{ height: under }} className="absolute inset-x-0 bottom-0 bg-[#111]" />
      </motion.section>
      <div ref={gate}><Footer /></div>
    </>
  );
}

// One person at a time, in their own colour. Every slide stays in the page and links to its own questions or decks.
const CASES: { color: string; emoji: string; to: string; label: string }[] = [
  { color: "#fb923c", emoji: "1f979", to: "/questions/mom", label: "qp.mom.link" },
  { color: "#7dd3fc", emoji: "1f914", to: "/questions/dad", label: "qp.dad.link" },
  { color: "#fda4af", emoji: "1f60d", to: "/questions/partner", label: "qp.partner.link" },
  { color: "#f9a8d4", emoji: "1f633", to: "/questions/crush", label: "qp.crush.link" },
  { color: "#fde047", emoji: "2728", to: "/decks/love", label: "genres.love.eyebrow" },
  { color: "#c4b5fd", emoji: "1faf6", to: "/decks/love", label: "genres.love.eyebrow" },
  { color: "#86efac", emoji: "1f602", to: "/questions/best-friend", label: "qp.best-friend.link" },
  { color: "#fde047", emoji: "1f92f", to: "/questions/group-chat", label: "qp.group-chat.link" },
  { color: "#c4b5fd", emoji: "1f644", to: "/questions/sibling", label: "qp.sibling.link" },
  { color: "#7dd3fc", emoji: "1f440", to: "/questions/classmates", label: "qp.classmates.link" },
  { color: "#86efac", emoji: "1f60f", to: "/decks/friends", label: "genres.friends.eyebrow" },
  { color: "#fb923c", emoji: "1f525", to: "/decks/sports", label: "genres.sports.eyebrow" },
];

function UseCases({ cards }: { cards: Card[] }) {
  const { t, raw, href } = useI18n();
  const items = raw<{ who: string; pain: string; win: string }[]>("cases.items");
  const played = usePlayed();
  const [on, setOn] = useState(0);
  const deck = useRef<HTMLUListElement>(null);
  const chips = useRef<HTMLDivElement>(null);
  const go = (i: number) => {
    const list = deck.current;
    const slide = list?.children[i] as HTMLElement | undefined;
    if (!list || !slide) return;
    haptic();
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({ left: slide.offsetLeft, behavior: calm ? "auto" : "smooth" });
  };
  useEffect(() => {
    const list = deck.current;
    if (!list) return;
    const seen = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setOn(Number((e.target as HTMLElement).dataset.i)); });
    }, { root: list, rootMargin: "0px -50% 0px -50%" });
    Array.from(list.children).forEach((c) => seen.observe(c));
    return () => seen.disconnect();
  }, []);
  useEffect(() => {
    const row = chips.current;
    const chip = row?.children[on] as HTMLElement | undefined;
    if (row && chip) row.scrollTo({ left: chip.offsetLeft - (row.clientWidth - chip.offsetWidth) / 2, behavior: "smooth" });
  }, [on]);
  return (
    <motion.section id="people" animate={{ backgroundColor: CASES[on].color }} initial={false} transition={{ duration: 0.35 }} className="relative z-10 pt-14 sm:pt-24 pb-8 sm:pb-14 overflow-hidden">
      {played && <p className="max-w-6xl mx-auto px-5 sm:px-10 mb-3"><span className="inline-block rounded-full bg-[#111] text-white text-sm font-semibold px-4 py-2">{t("people.back", { same: played.same, total: played.total })}</span></p>}
      <h2 className="b-h text-[clamp(1.9rem,8vw,3.6rem)] leading-[1] px-5 sm:px-10 max-w-6xl mx-auto">{t("cases.title")} {t("cases.accent")}</h2>
      <div ref={chips} className="b-snap b-snap-tight relative !gap-1.5 !px-5 sm:!px-10 mt-5 lg:!justify-start max-w-6xl mx-auto" role="group" aria-label={t("cases.accent")}>
        {items.map((c, i) => (
          <button key={c.who} type="button" onClick={() => go(i)} aria-pressed={i === on} className={`shrink-0 min-h-[44px] rounded-full px-4 font-bold text-[15px] whitespace-nowrap transition-colors ${i === on ? "bg-[#111] text-white" : "bg-white/70 text-[#111]"}`}>{c.who}</button>
        ))}
      </div>
      <ul ref={deck} tabIndex={0} className="b-cases relative mt-4 sm:mt-8">
        {items.map((c, i) => (
          <li key={c.who} data-i={i} className="b-case">
            <div className="max-w-6xl mx-auto px-5 sm:px-10 grid lg:grid-cols-[1.35fr_1fr] gap-5 lg:gap-14 items-center h-full">
              <div className="relative">
                <Emoji code={CASES[i].emoji} size={64} className="block mb-1.5 lg:mb-4" />
                <p className="b-h text-[clamp(2.4rem,10.4vw,5.4rem)] leading-[.98]">{c.pain}</p>
              </div>
              <div>
                <div className={`rounded-[26px] bg-white p-5 sm:p-7 shadow-[0_18px_44px_rgba(0,0,0,.16)] ${i % 2 ? "rotate-[1.5deg]" : "rotate-[-1.5deg]"}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/icon.svg" alt="" width={36} height={36} loading="lazy" className="w-9 h-9 mb-3" />
                  <p className="b-h text-[clamp(1.5rem,6vw,2.1rem)] leading-[1.08]">{cards[i].q}</p>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {(["a", "b"] as const).map((side) => (
                      <p key={side} style={{ background: CASES[i].color }} className="flex items-center justify-center text-center min-h-[58px] rounded-[16px] text-[#111] px-2.5 py-2 font-bold text-[15px] leading-tight">{cards[i][side]}</p>
                    ))}
                  </div>
                </div>
                <p className="b-h text-[clamp(1.5rem,6.2vw,2.2rem)] leading-[1.05] mt-4">{c.win}</p>
                <Link href={href(CASES[i].to)} className="inline-flex items-center gap-2 min-h-[52px] mt-3 rounded-full bg-[#111] text-white font-bold px-5 py-2 leading-tight">{t(CASES[i].label)} <Arrow /></Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-center gap-3 px-4 mt-3 sm:mt-6">
        <button type="button" onClick={() => go(Math.max(on - 1, 0))} disabled={on === 0} aria-label={t("questions.prev")} className="w-12 h-12 rounded-full bg-[#111] text-white text-xl disabled:opacity-25"><span aria-hidden="true" className="inline-block rtl:rotate-180">←</span></button>
        <div className="flex-1 max-w-[16rem] h-2 rounded-full bg-[#111]/15 overflow-hidden" aria-hidden="true">
          <motion.div className="h-full rounded-full bg-[#111]" initial={false} animate={{ width: `${((on + 1) / items.length) * 100}%` }} transition={{ duration: 0.25 }} />
        </div>
        <button type="button" onClick={() => go(Math.min(on + 1, items.length - 1))} disabled={on === items.length - 1} aria-label={t("questions.next")} className="w-12 h-12 rounded-full bg-[#111] text-white text-xl disabled:opacity-25"><span aria-hidden="true" className="inline-block rtl:rotate-180">→</span></button>
      </div>
    </motion.section>
  );
}

export default function Home({ decks, cases }: { decks: TeamDeck[]; cases: Card[] }) {
  const { raw } = useI18n();
  const { scrollY } = useScroll();
  const heroUp = useTransform(scrollY, [0, 600], [0, -70]);
  const pills = raw<string[]>("pit.hero");
  const colors: [string, string][] = [["#f97316", "#111"], ["#111", "#fff"], ["#fde047", "#111"], ["#fda4af", "#111"], ["#86efac", "#111"], ["#7dd3fc", "#111"], ["#c4b5fd", "#111"], ["#111", "#fff"], ["#f97316", "#111"], ["#fde047", "#111"], ["#c4b5fd", "#111"]];
  const emojis = ["1f633", "1f60f", "1f62d", "1f440", "1f92f"];
  const items: PitItem[] = [];
  pills.forEach((text, i) => {
    items.push({ t: text, c: colors[i % colors.length][0], f: colors[i % colors.length][1] });
    if (i % 2 === 0 && emojis[i / 2]) items.push({ emoji: emojis[i / 2] });
  });
  return (
    <Shell>
      <section id="top" className="relative h-[100svh] min-h-[640px] overflow-hidden flex flex-col">
        <motion.div style={{ y: heroUp }} className="relative z-10 text-center px-4 pt-[4.4rem] sm:pt-[6rem] pointer-events-none">
          <Headline />
          <HeroAsk />
        </motion.div>
        <Pit items={items} phoneCount={8} className="!bottom-9 sm:!bottom-14" />
      </section>
      <PlayBand decks={decks} />
      <UseCases cards={cases} />
      <Wipe />
    </Shell>
  );
}
