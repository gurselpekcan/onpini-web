"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { useI18n } from "@/lib/i18n";
import type { Card, Genre } from "@/lib/siteContent";
import { Arrow, JoinBand, PageHead, Pop } from "./Bits";
import { goldBurst } from "./burst";
import Shell, { Footer } from "./Chrome";
import Emoji from "./Emoji";
import FlipCard from "./FlipCard";
import { haptic } from "./haptic";
import Pit, { type PitItem } from "./Pit";
import { PeopleLinks } from "./Questions";

const SPRING = { type: "spring", stiffness: 300, damping: 24 } as const;
const rise = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.3 }, transition: SPRING } as const;

/* ---------- How it works ---------- */

/** A real screenshot of the app, in this language. */
function AppShot({ name, alt, tilt = 0 }: { name: string; alt: string; tilt?: number }) {
  const { lang } = useI18n();
  return (
    <motion.figure {...rise} style={{ rotate: tilt }} className="w-[min(19.5rem,74vw)] mx-auto">
      <div className="rounded-[34px] overflow-hidden bg-white shadow-[0_0_0_6px_#111,0_26px_60px_rgba(0,0,0,.35)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/shots/${lang}-${name}.webp`} alt={alt} width={640} height={1090} loading="lazy" decoding="async" className="block w-full h-auto" />
      </div>
    </motion.figure>
  );
}


/** Two sealed cards fly in, meet and flip open as you scroll. */
/** The whole idea in one tap: two sealed cards and one button. */
function RevealDemo({ card }: { card: Card }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  return (
    <section className="relative z-10 bg-[#0c0c0c] text-white px-4 sm:px-10 py-12 sm:py-20">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="b-h text-[clamp(2.4rem,10vw,4.4rem)] leading-[1]">{t("how.meet.title")} <span className="block text-[#f97316]">{t("how.meet.accent")}</span></h2>
        <p className="b-h text-[1.45rem] sm:text-3xl mt-4 mb-5 leading-[1.08] [text-wrap:balance]">{card.q}</p>
        <div className="grid grid-cols-2 gap-2.5 text-start" style={{ perspective: 900 }} dir="ltr">
          <FlipCard big who={t("how.meet.you")} text={card.b} tone="#fde047" open={open} delay={0} />
          <FlipCard big who={t("how.meet.them")} text={card.a} tone="#fb923c" open={open} delay={0.16} />
        </div>
        {open ? (
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-xl sm:text-2xl font-medium leading-tight mt-5 min-h-[72px] flex items-center justify-center">{t("how.meet.end")}</motion.p>
        ) : (
          <motion.button type="button" whileTap={{ scale: 0.97 }} onClick={() => { haptic(20); goldBurst(0.5, 0.55); setOpen(true); }} className="w-full min-h-[72px] rounded-[22px] mt-5 bg-gradient-to-r from-[#f59e0b] via-[#fde68a] to-[#f59e0b] text-[#111] font-bold text-[1.2rem]">{t("how.meet.open")}</motion.button>
        )}
      </div>
    </section>
  );
}

const WAY_STYLE = [["#fde047", "1f60f"], ["#fda4af", "1f525"], ["#86efac", "1f602"], ["#c4b5fd", "1faf6"], ["#7dd3fc", "1f92f"], ["#fb923c", "1f440"]];

function WaysToPlay() {
  const { t, raw } = useI18n();
  const items = raw<{ t: string; d: string }[]>("how.ways.items");
  return (
    <section className="relative z-10 bg-white px-4 sm:px-10 py-14 sm:py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="b-h text-[clamp(2.8rem,12vw,6.4rem)] leading-[.96] px-1"><Pop text={t("how.ways.title")} /><Pop text={t("how.ways.accent")} className="text-[#ea580c]" /></h2>
        <ul className="grid sm:grid-cols-3 gap-2 sm:gap-3 mt-7 sm:mt-10">
          {items.map((w, i) => (
            <motion.li key={w.t} {...rise} transition={{ ...SPRING, delay: (i % 3) * 0.05 }} whileHover={{ y: -6 }} style={{ background: WAY_STYLE[i][0] }} className="rounded-[24px] p-5 sm:p-6 flex flex-col min-h-[11rem]">
              <Emoji code={WAY_STYLE[i][1]} size={52} />
              <h3 className="b-h text-[clamp(1.55rem,6.4vw,2.4rem)] leading-[1.02] mt-auto pt-3">{w.t}</h3>
              <p className="text-[.98rem] sm:text-[1.08rem] leading-snug mt-1.5">{w.d}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProfilePlays() {
  const { t } = useI18n();
  return (
    <section className="relative z-10 bg-[#111] text-white px-5 sm:px-10 py-16 sm:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <h2 className="b-h text-[clamp(3rem,13vw,6.8rem)] leading-[.96]"><Pop text={t("how.profile.title")} /><Pop text={t("how.profile.accent")} className="text-[#ea580c]" /></h2>
          <p className="text-[1.2rem] sm:text-2xl leading-snug mt-5 max-w-lg">{t("how.profile.line")}</p>
          <p className="text-[1.05rem] sm:text-xl leading-snug mt-3 max-w-lg text-white/85">{t("how.profile.line2")}</p>
        </div>
        <AppShot name="profile" alt={t("how.profile.title") + " " + t("how.profile.accent")} tilt={2} />
      </div>
    </section>
  );
}

/** One question, one link. */
function Poll() {
  const { t, raw } = useI18n();
  return (
    <section className="relative z-10 bg-white px-5 sm:px-10 py-16 sm:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <h2 className="b-h text-[clamp(2.9rem,12vw,6.4rem)]"><Pop text={t("how.poll.title")} /><Pop text={t("how.poll.accent")} className="text-[#ea580c]" /></h2>
          <ol className="grid gap-1 mt-4 text-[1.12rem] sm:text-xl font-medium">
            {raw<string[]>("how.poll.steps").map((s, i) => <li key={s}><b>{i + 1}.</b> {s}</li>)}
          </ol>
        </div>
        <AppShot name="poll" alt={t("how.poll.title") + " " + t("how.poll.accent")} tilt={-2} />
      </div>
    </section>
  );
}

export function HowItWorks({ met }: { met: Card }) {
  const { t } = useI18n();
  return (
    <Shell>
      <main>
        <PageHead eyebrow={t("how.eyebrow")} title={t("how.title")} accent={t("how.accent")} line={t("how.line")} />
        <RevealDemo card={met} />
        <WaysToPlay />
        <ProfilePlays />
        <Poll />
        <JoinBand medium="b_how" />
      </main>
      <Footer />
    </Shell>
  );
}

/* ---------- Decks ---------- */

export function DecksIndex({ genres }: { genres: Genre[] }) {
  const { t, raw, href } = useI18n();
  const colors = ["#fda4af", "#f9a8d4", "#c4b5fd", "#fb923c", "#fde047", "#111", "#86efac", "#7dd3fc", "#111", "#c4b5fd", "#86efac", "#fb923c", "#7dd3fc"];
  const emojis: Record<number, string> = { 1: "1f60d", 5: "1f92f", 9: "1f60f" };
  const items: PitItem[] = [];
  raw<string[]>("pit.genres").forEach((text, i) => {
    items.push({ t: text, c: colors[i % colors.length], f: colors[i % colors.length] === "#111" ? "#fff" : "#111" });
    if (emojis[i]) items.push({ emoji: emojis[i] });
  });
  return (
    <Shell>
      <main>
        <section className="relative overflow-hidden min-h-[34rem] sm:min-h-[38rem]">
          <PageHead eyebrow={t("decks.eyebrow")} title={t("decks.title")} accent={t("decks.accent")} line={t("decks.line")} />
          <Pit items={items} phoneCount={8} />
        </section>
        <ul className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5 px-4 sm:px-10 pt-6 pb-14 max-w-6xl mx-auto">
          {genres.map((g) => (
            <motion.li key={g.slug} {...rise}>
              <motion.div whileTap={{ scale: 0.98 }} whileHover={{ y: -6 }}>
                <Link href={href(`/decks/${g.slug}`)} style={{ background: g.color }} className="flex flex-col justify-between min-h-[14rem] rounded-[26px] p-5">
                  <span className="flex items-start justify-between">
                    <span className="b-tag">{t(`genres.${g.slug}.name`)}</span>
                    <Emoji code={g.emoji} size={64} />
                  </span>
                  <span className="b-h text-[2.2rem] leading-[1.02] mt-4">{t(`genres.${g.slug}.h1`)} <Arrow /></span>
                </Link>
              </motion.div>
            </motion.li>
          ))}
          <motion.li {...rise} className="flex flex-col justify-between min-h-[14rem] rounded-[26px] p-5 bg-[#111] text-white">
            <span className="b-tag">{t("decks.more.name")}</span>
            <span><span className="b-h text-[2.2rem] leading-[1.02] block mt-4">{t("decks.more.title")}</span><span className="block font-semibold mt-2">{t("decks.more.line")}</span></span>
          </motion.li>
        </ul>
        <JoinBand medium="b_decks" title={t("decks.endTitle")} line={t("decks.endLine")} />
      </main>
      <Footer />
    </Shell>
  );
}

export function GenrePage({ genre, playable, pageLinks }: { genre: Genre; playable: { id: string; title: string } | null; pageLinks: string[] }) {
  const { t, raw, href } = useI18n();
  return (
    <Shell>
      <main>
        <PageHead eyebrow={t(`genres.${genre.slug}.eyebrow`)} title={t(`genres.${genre.slug}.h1`)} line={t(`genres.${genre.slug}.intro`)} />
        <section className="px-4 sm:px-10 pb-5 max-w-6xl mx-auto">
          <p className="font-bold px-1 mb-2">{t("decks.sendTo")}</p>
          <ul className="flex flex-wrap gap-1.5 px-1">
            {raw<string[]>(`genres.${genre.slug}.sendTo`).map((who) => <li key={who} style={{ background: genre.color }} className="rounded-full px-3.5 py-2 text-[15px] font-semibold">{who}</li>)}
          </ul>
        </section>
        {playable && (
          <section className="px-4 sm:px-10 pb-5 max-w-6xl mx-auto">
            <motion.div {...rise} className="rounded-[28px] bg-[#111] text-white p-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
              <span>
                <span className="font-bold text-sm block text-[#fdba74]">{t("decks.tryNow")}</span>
                <span className="b-h text-[2.3rem] block mt-1 leading-[1.02]">{playable.title}</span>
              </span>
              <Link href={`${href("/play")}?deck=${playable.id}`} className="inline-flex items-center justify-center gap-1.5 min-h-[60px] rounded-full bg-white text-[#111] font-bold px-6 shrink-0">{t("decks.playFive")} <Arrow /></Link>
            </motion.div>
          </section>
        )}
        <ul className="b-snap pb-6 max-w-6xl mx-auto">
          {genre.decks.map((d) => (
            <li key={d.id} className="snap-center shrink-0 w-[76vw] max-w-[20rem] rounded-[24px] bg-[#f4f4f1] p-5 flex flex-col min-h-[13rem]">
              <span className="text-sm font-semibold text-[#525252]">{t("decks.cards", { n: d.cards })}</span>
              <h2 className="b-h text-[1.8rem] mt-1 leading-[1.05]">{d.title}</h2>
              {d.q && <p className="text-[1.02rem] leading-snug mt-auto pt-3">‘{d.q}’</p>}
            </li>
          ))}
        </ul>
        {pageLinks.length > 0 && (
          <section className="px-4 sm:px-10 pb-12 max-w-6xl mx-auto">
            <h2 className="b-h text-[2rem] px-1 mb-3">{t("decks.lookingFor")}</h2>
            <PeopleLinks slugs={pageLinks} />
          </section>
        )}
        <JoinBand medium={`b_genre_${genre.slug}`} />
      </main>
      <Footer />
    </Shell>
  );
}
