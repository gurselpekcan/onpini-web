"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { appLink, useI18n } from "@/lib/i18n";
import type { QuestionPage } from "@/lib/siteContent";
import { Arrow, JoinBand, pressJoin } from "./Bits";
import Shell, { Footer } from "./Chrome";
import Emoji from "./Emoji";
import { joinHref } from "./join";

const PEOPLE: Record<string, { color: string; emoji: string }> = {
  crush: { color: "#f9a8d4", emoji: "1f633" },
  partner: { color: "#fda4af", emoji: "1f60d" },
  "best-friend": { color: "#fde047", emoji: "1faf6" },
  "group-chat": { color: "#86efac", emoji: "1f602" },
  classmates: { color: "#7dd3fc", emoji: "1f440" },
  sibling: { color: "#c4b5fd", emoji: "1f644" },
  mom: { color: "#fb923c", emoji: "1f979" },
  dad: { color: "#fdba74", emoji: "1f914" },
};
const person = (slug: string) => PEOPLE[slug] ?? { color: "#fde047", emoji: "2728" };

/** Links between the pages, for people and for search. */
export function PeopleLinks({ slugs }: { slugs: string[] }) {
  const { t, href } = useI18n();
  return (
    <ul className="flex flex-wrap gap-1.5">
      {slugs.map((slug) => (
        <li key={slug}>
          <Link href={href(`/questions/${slug}`)} style={{ background: person(slug).color }} className="inline-flex items-center gap-1.5 min-h-[52px] rounded-full px-4 py-2 font-semibold text-[15px] leading-tight">
            {t(`qp.${slug}.link`)} <Arrow />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function QuestionsIndex({ slugs }: { slugs: string[] }) {
  const { t, href } = useI18n();
  return (
    <Shell>
      <main>
        <header className="px-5 sm:px-10 pt-24 sm:pt-32 pb-8 max-w-6xl mx-auto">
          <h1 className="b-h b-rise text-[clamp(3rem,13vw,7rem)] leading-[.96]">{t("questions.title")}<span className="block text-[#ea580c]">{t("questions.accent")}</span></h1>
          <p className="b-rise text-[1.15rem] sm:text-2xl leading-snug mt-4 max-w-2xl" style={{ animationDelay: ".12s" }}>{t("questions.line")}</p>
        </header>
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 px-4 sm:px-10 pb-14 max-w-6xl mx-auto">
          {slugs.map((slug, i) => (
            <motion.li key={slug} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ type: "spring", stiffness: 260, damping: 24, delay: (i % 4) * 0.04 }} whileHover={{ y: -6, rotate: i % 2 ? 1 : -1 }} whileTap={{ scale: 0.97 }}>
              <Link href={href(`/questions/${slug}`)} style={{ background: person(slug).color }} className="flex flex-col justify-between h-full min-h-[13.5rem] sm:min-h-[17rem] rounded-[26px] p-4 sm:p-6">
                <Emoji code={person(slug).emoji} size={56} />
                <span className="block pt-4">
                  <span className="block text-sm font-semibold">{t("questions.toAsk")}</span>
                  <span className="b-h block text-[clamp(1.75rem,7.6vw,2.7rem)] leading-[1.02] mt-0.5">{t(`qp.${slug}.heading`)}</span>
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
        <JoinBand medium="b_questions_index" title={t("questions.endTitle")} line={t("questions.endLineIndex")} />
      </main>
      <Footer />
    </Shell>
  );
}

/** One card at a time, like the app. Every question stays in the page, so search reads them all. */
export function QuestionsPageView({ page, others }: { page: QuestionPage; others: string[] }) {
  const { t, lang } = useI18n();
  const { color, emoji } = person(page.slug);
  const heading = t(`qp.${page.slug}.heading`);
  const to = t(`qp.${page.slug}.to`);
  const total = page.q.length;
  const medium = `b_q_${page.slug}`;
  const deck = useRef<HTMLOListElement>(null);
  const [on, setOn] = useState(0);
  const [store, setStore] = useState("");
  const joinLink = store || appLink("signup", lang, medium);
  useEffect(() => setStore(joinHref(navigator.userAgent)), []);

  const go = useCallback((i: number) => {
    const list = deck.current;
    const card = list?.children[i] as HTMLElement | undefined;
    if (!list || !card) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({ left: card.offsetLeft - (list.clientWidth - card.offsetWidth) / 2, behavior: calm ? "auto" : "smooth" });
  }, []);

  useEffect(() => {
    const list = deck.current;
    if (!list) return;
    const seen = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setOn(Number((e.target as HTMLElement).dataset.i)); });
    }, { root: list, rootMargin: "0px -50% 0px -50%" }); // The card on the centre line, however many fit on the screen.
    Array.from(list.children).forEach((c) => seen.observe(c));
    return () => seen.disconnect();
  }, []);

  return (
    <Shell>
      <main>
        <section style={{ background: color }} className="relative pt-24 sm:pt-32 pb-8 overflow-hidden">
          <header className="px-5 sm:px-10 max-w-6xl mx-auto relative">
            <h1 className="b-rise">
              <span className="block font-semibold text-lg sm:text-2xl">{t("questions.toAsk")}</span>
              <span className="b-h block text-[clamp(3.2rem,15vw,8rem)] leading-[.95] pe-16 sm:pe-28">{heading}</span>
            </h1>
            <Emoji code={emoji} size={72} className="absolute end-5 sm:end-10 top-0" />
          </header>

          <ol ref={deck} className="b-qdeck relative mt-1" aria-label={t("questions.toAsk") + " " + heading}>
            {page.q.map((c, i) => (
              <li key={c.q} data-i={i} data-on={i === on} className="b-qcard bg-white" style={{ "--t": `${i % 2 ? 1.6 : -1.6}deg` } as React.CSSProperties}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#525252]" dir="ltr">{i + 1} / {total}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/icon.svg" alt="" width={32} height={32} loading="lazy" className="w-8 h-8" />
                </div>
                <h2 className="b-h text-[clamp(1.75rem,7.4vw,2.35rem)] leading-[1.06] mt-3 mb-5">{c.q}</h2>
                <div className="grid gap-2 mt-auto">
                  {(["a", "b"] as const).map((side) => (
                    <p key={side} style={{ background: color }} className="flex items-center justify-center text-center min-h-[60px] rounded-[18px] px-4 py-2.5 font-bold text-[1.05rem] leading-tight">{c[side]}</p>
                  ))}
                </div>
              </li>
            ))}
            <li data-i={total} data-on={on === total} className="b-qcard bg-[#111] text-white justify-between" style={{ "--t": "1.6deg" } as React.CSSProperties}>
              <p className="b-h text-[clamp(2.6rem,12vw,3.6rem)] leading-[.98]">{t("questions.endTitle")}</p>
              <div>
                <p className="text-lg leading-snug mb-4">{t("questions.endLine", { to })}</p>
                <a href={joinLink} onClick={(e) => pressJoin(e)} className="flex items-center justify-center gap-2 min-h-[64px] rounded-[18px] bg-[#fde047] text-[#111] font-bold text-[1.1rem]">{t("join.label")} <Arrow /></a>
              </div>
            </li>
          </ol>

          <div className="flex items-center justify-center gap-3 px-4">
            <button type="button" onClick={() => go(Math.max(on - 1, 0))} disabled={on === 0} aria-label={t("questions.prev")} className="w-12 h-12 rounded-full bg-[#111] text-white text-xl disabled:opacity-25"><span aria-hidden="true" className="inline-block rtl:rotate-180">←</span></button>
            <div className="flex-1 max-w-[16rem] h-2 rounded-full bg-[#111]/15 overflow-hidden" aria-hidden="true">
              <motion.div className="h-full rounded-full bg-[#111]" initial={false} animate={{ width: `${(Math.min(on + 1, total) / total) * 100}%` }} transition={{ duration: 0.25 }} />
            </div>
            <button type="button" onClick={() => go(Math.min(on + 1, total))} disabled={on === total} aria-label={t("questions.next")} className="w-12 h-12 rounded-full bg-[#111] text-white text-xl disabled:opacity-25"><span aria-hidden="true" className="inline-block rtl:rotate-180">→</span></button>
          </div>

          <div className="flex justify-center px-4 mt-4 min-h-[60px] items-center text-center">
            {on >= 3 ? (
              <motion.a key="nudge" href={joinLink} onClick={(e) => pressJoin(e)} initial={{ opacity: 0, y: 12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: "spring", stiffness: 320, damping: 22 }} className="inline-flex items-center gap-2 min-h-[56px] rounded-full bg-[#111] text-white font-bold px-5 py-2 leading-tight">
                {t("questions.endLine", { to })} <Arrow />
              </motion.a>
            ) : (
              <p className="font-semibold">{t("questions.tap")}</p>
            )}
          </div>
          <p className="px-5 text-center text-[1.05rem] sm:text-xl leading-snug mt-3 max-w-xl mx-auto">{t(`qp.${page.slug}.intro`)}</p>
        </section>

        <section className="px-4 sm:px-10 py-10 sm:py-14 max-w-6xl mx-auto">
          <h2 className="b-h text-[clamp(2.2rem,9vw,3.6rem)] mb-4 px-1">{t("questions.more")}</h2>
          <PeopleLinks slugs={others} />
        </section>
        <JoinBand medium={medium} title={t("questions.endTitle")} line={t("questions.endLine", { to })} />
      </main>
      <Footer />
    </Shell>
  );
}
