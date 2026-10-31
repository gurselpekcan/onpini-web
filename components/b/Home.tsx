"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { appLink, useI18n } from "@/lib/i18n";
import type { TeamDeck } from "@/lib/siteContent";
import { Arrow, JoinBig, Pop, StoreBadges, pressJoin } from "./Bits";
import Shell, { Footer } from "./Chrome";
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

const TABS = [
  { id: "friends", c: "#c4b5fd", e: "1faf6" }, { id: "crushes", c: "#fb923c", e: "1f633" }, { id: "loves", c: "#fda4af", e: "1f60d" }, { id: "family", c: "#fde047", e: "1f979" },
  { id: "group", c: "#7dd3fc", e: "1f602" }, { id: "communities", c: "#86efac", e: "1f525" }, { id: "idols", c: "#f9a8d4", e: "1f92f" },
];

function YourPeople({ tabDecks }: { tabDecks: Record<string, string[]> }) {
  const { t } = useI18n();
  const played = usePlayed();
  const [tab, setTab] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const tabs = useRef<HTMLDivElement>(null);
  // While a tap is scrolling the cards, the cards it passes shouldn't move the tabs.
  const tapLock = useRef<ReturnType<typeof setTimeout> | null>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);

  // Measured on screen, so it works the same left to right and right to left.
  const offCentre = (el: HTMLElement, box: HTMLElement) => {
    const a = el.getBoundingClientRect();
    const b = box.getBoundingClientRect();
    return a.left + a.width / 2 - (b.left + b.width / 2);
  };
  const showTab = (i: number) => {
    const strip = tabs.current;
    const button = strip?.children[i] as HTMLElement | undefined;
    if (strip && button) strip.scrollBy({ left: offCentre(button, strip), behavior: "smooth" });
  };
  const nearest = () => {
    const el = track.current;
    if (!el) return 0;
    let best = 0;
    let gap = Infinity;
    Array.from(el.children).forEach((card, i) => {
      const d = Math.abs(offCentre(card as HTMLElement, el));
      if (d < gap) { gap = d; best = i; }
    });
    return best;
  };
  const goTo = (i: number) => {
    const el = track.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (!el || !card) return;
    if (tapLock.current) clearTimeout(tapLock.current);
    tapLock.current = setTimeout(() => { tapLock.current = null; }, 650);
    setTab(i);
    showTab(i);
    el.scrollBy({ left: offCentre(card, el), behavior: "smooth" });
  };
  const onScroll = () => {
    if (tapLock.current) return;
    const i = nearest();
    if (i !== tab) {
      setTab(i);
      showTab(i);
    }
  };
  const onDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !track.current) return;
    drag.current = { x: e.clientX, left: track.current.scrollLeft };
    track.current.classList.add("b-dragging");
    track.current.setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (drag.current && track.current) track.current.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
  };
  const onUp = () => {
    if (!drag.current || !track.current) return;
    drag.current = null;
    track.current.classList.remove("b-dragging");
    goTo(nearest());
  };
  useEffect(() => () => {
    if (tapLock.current) clearTimeout(tapLock.current);
  }, []);

  return (
    <section id="people" className="relative z-10 bg-white pt-14 sm:pt-24 pb-16 sm:pb-28 scroll-mt-4 overflow-hidden">
      <div className="px-5 sm:px-10 max-w-6xl mx-auto">
        {played && <p className="inline-block rounded-full bg-[#111] text-white text-sm font-semibold px-4 py-2 mb-5">{t("people.back", { same: played.same, total: played.total })}</p>}
        <h2 className="b-h text-[clamp(2.7rem,11.4vw,6.2rem)] leading-[.98]"><Pop text={t("people.title")} /><Pop text={t("people.accent")} className="mt-2 text-[#f97316]" /></h2>
      </div>
      <div ref={tabs} className="b-snap b-snap-tight mt-6 lg:!justify-center" role="tablist">
        {TABS.map((p, i) => (
          <button key={p.id} type="button" role="tab" id={`people-tab-${i}`} aria-selected={i === tab} aria-controls={`people-card-${i}`} onClick={() => goTo(i)} className="relative shrink-0 min-h-[48px] px-4 rounded-full font-semibold text-[15px]">
            {i === tab && <motion.span layoutId="people-tab" className="absolute inset-0 rounded-full bg-[#111]" transition={{ type: "spring", stiffness: 480, damping: 34 }} />}
            <span className={`relative ${i === tab ? "text-white" : ""}`}>{t(`people.tabs.${p.id}.id`)}</span>
          </button>
        ))}
      </div>
      <div ref={track} onScroll={onScroll} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} className="b-people mt-3" tabIndex={0}>
        {TABS.map((p, i) => (
          <motion.article key={p.id} id={`people-card-${i}`} role="tabpanel" aria-labelledby={`people-tab-${i}`} animate={{ scale: i === tab ? 1 : 0.96, opacity: i === tab ? 1 : 0.72 }} transition={{ type: "spring", stiffness: 260, damping: 26 }} style={{ background: p.c }} className="b-people-card">
            <Emoji code={p.e} size={72} />
            <h3 className="b-h text-[clamp(2.2rem,9.4vw,4.2rem)] mt-3 text-balance">{t(`people.tabs.${p.id}.title`)}</h3>
            <p className="text-[1.1rem] sm:text-xl leading-snug mt-3 max-w-xl">{t(`people.tabs.${p.id}.line`)}</p>
            <ul className="flex flex-wrap gap-1.5 mt-auto pt-6">
              {(tabDecks[p.id] ?? []).map((d) => <li key={d} className="rounded-full bg-white/70 px-3.5 py-2 text-sm font-semibold">{d}</li>)}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

/** "Asking is awkward." A flame circle grows from the middle and turns the page over. */
function Wipe() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const clip = useTransform(p, [0.1, 0.72], ["circle(0% at 50% 50%)", "circle(120% at 50% 50%)"]);
  const out = useTransform(p, [0, 0.4], [1, 0.8]);
  const emoji = useTransform(p, [0.66, 0.82], [0, 1]);
  const riseY = useTransform(p, [0.66, 0.82], [18, 0]);
  return (
    <section ref={ref} className="relative scrolly" style={{ height: "190vh" }}>
      <div className="b-stage bg-white">
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
      </div>
    </section>
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

function UseCases({ cards }: { cards: string[] }) {
  const { t, raw, href } = useI18n();
  const items = raw<{ who: string; pain: string; win: string }[]>("cases.items");
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
    <motion.section animate={{ backgroundColor: CASES[on].color }} initial={false} transition={{ duration: 0.35 }} className="relative z-10 pt-14 sm:pt-24 pb-8 sm:pb-14 overflow-hidden">
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
                <Emoji code={CASES[i].emoji} size={84} className="block mb-2 lg:mb-4" />
                <p className="b-h text-[clamp(2.7rem,11.5vw,5.8rem)] leading-[.98]">{c.pain}</p>
              </div>
              <div>
                <div className={`rounded-[26px] bg-white p-5 sm:p-7 shadow-[0_18px_44px_rgba(0,0,0,.16)] ${i % 2 ? "rotate-[1.5deg]" : "rotate-[-1.5deg]"}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/icon.svg" alt="" width={36} height={36} loading="lazy" className="w-9 h-9 mb-3" />
                  <p className="b-h text-[clamp(1.5rem,6vw,2.1rem)] leading-[1.08]">{cards[i]}</p>
                </div>
                <p className="b-h text-[clamp(1.5rem,6.2vw,2.2rem)] leading-[1.05] mt-5">{c.win}</p>
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

export default function Home({ decks, tabDecks, cases }: { decks: TeamDeck[]; tabDecks: Record<string, string[]>; cases: string[] }) {
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
      <YourPeople tabDecks={tabDecks} />
      <UseCases cards={cases} />
      <Wipe />
      <Footer />
    </Shell>
  );
}
