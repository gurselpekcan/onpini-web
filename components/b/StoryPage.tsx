"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useI18n } from "@/lib/i18n";
import { Arrow, JoinBand, Pop } from "./Bits";
import Shell, { Footer } from "./Chrome";
import Emoji from "./Emoji";

const SPRING = { type: "spring", stiffness: 260, damping: 24 } as const;
const rise = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: SPRING } as const;
const Tag = ({ children }: { children: React.ReactNode }) => <p className="b-tag mb-3">{children}</p>;

function WhoWeAre() {
  const { t } = useI18n();
  return (
    <section className="relative z-10 bg-[#111] text-white px-5 sm:px-10 pt-24 sm:pt-32 pb-14 sm:pb-24 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-6" aria-hidden="true">
          <span className="rounded-full bg-[#fb923c] text-[#111] font-bold px-4 py-2">{t("story.who.nl")}</span>
          <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 0.25 }} className="h-[3px] w-10 sm:w-20 bg-white origin-center" />
          <span className="rounded-full bg-[#fde047] text-[#111] font-bold px-4 py-2">{t("story.who.de")}</span>
        </div>
        <h1 className="b-h b-rise text-[clamp(3.2rem,14.5vw,8rem)] leading-[.94]">{t("story.who.title")} <span className="block text-[#ea580c]">{t("story.who.accent")}</span></h1>
        <p className="b-rise text-[1.2rem] sm:text-2xl leading-snug mt-6 max-w-2xl" style={{ animationDelay: ".1s" }}>{t("story.who.line")}</p>
        <div className="mt-14 sm:mt-24">
          <Tag>{t("story.who.ruleTag")}</Tag>
          <p className="b-h text-[#fde047] text-[clamp(3.4rem,16vw,9rem)] leading-[.92]"><Pop text={t("story.who.rule")} /></p>
          <motion.p {...rise} className="text-[1.2rem] sm:text-2xl font-medium leading-snug mt-4">{t("story.who.ruleLine")}</motion.p>
        </div>
        <p className="b-h text-[clamp(2.1rem,8.8vw,4.4rem)] leading-[1] mt-14 sm:mt-24"><Pop text={t("story.who.one")} /><Pop text={t("story.who.two")} className="mt-2 text-[#fb923c]" /></p>
      </div>
    </section>
  );
}

const WHY_STYLE = [["#fde047", "1f440"], ["#fda4af", "1f60f"], ["#c4b5fd", "1f602"], ["#86efac", "2728"]];

function Value() {
  const { t, raw } = useI18n();
  const items = raw<{ t: string; d: string }[]>("story.why.items");
  return (
    <section className="relative z-10 bg-white py-12 sm:py-20">
      <h2 className="b-h text-[clamp(3rem,13vw,7rem)] leading-[.96] px-5 sm:px-10 max-w-6xl mx-auto"><Pop text={t("story.why.title")} /><Pop text={t("story.why.accent")} className="text-[#ea580c]" /></h2>
      <ul className="b-snap mt-6" tabIndex={0}>
        {items.map((r, i) => (
          <li key={r.t} style={{ background: WHY_STYLE[i][0] }} className="snap-center shrink-0 w-[82vw] max-w-[23rem] rounded-[26px] p-5 flex flex-col min-h-[17rem]">
            <Emoji code={WHY_STYLE[i][1]} size={56} />
            <h3 className="b-h text-[clamp(1.9rem,8vw,2.4rem)] leading-[1.03] mt-auto pt-4">{r.t}</h3>
            <p className="text-[1.05rem] leading-snug mt-2">{r.d}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Mission() {
  const { t } = useI18n();
  return (
    <section className="relative z-10 bg-[#f97316] px-5 sm:px-10 py-12 sm:py-20">
      <div className="max-w-5xl mx-auto">
        <Tag>{t("story.mission.tag")}</Tag>
        <h2 className="b-h text-[clamp(3rem,13vw,7rem)] leading-[.96]"><Pop text={t("story.mission.title")} /></h2>
        <motion.p {...rise} className="text-[1.2rem] sm:text-2xl leading-snug font-medium mt-6 max-w-3xl">{t("story.mission.line")}</motion.p>
      </div>
    </section>
  );
}

function Inside() {
  const { t, raw } = useI18n();
  return (
    <section className="relative z-10 bg-white px-4 sm:px-10 py-12 sm:py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="b-h text-[clamp(2.5rem,10.5vw,5.4rem)] leading-[.98] px-1"><Pop text={t("story.inside.title")} /></h2>
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 mt-6">
          {raw<{ n: string; l: string }[]>("story.inside.stats").map((s) => (
            <motion.li key={s.l} {...rise} className="rounded-[24px] bg-[#fde047] p-4 sm:p-6">
              <span className="b-h block text-[clamp(2.4rem,11vw,4.2rem)] leading-none" dir="ltr">{s.n}</span>
              <span className="block font-semibold mt-1.5">{s.l}</span>
            </motion.li>
          ))}
        </ul>
        <p id="credits" className="text-sm text-[#525252] mt-4 px-1">{t("story.note")} {t("story.credit")}</p>
      </div>
    </section>
  );
}

function Investors() {
  const { t, href } = useI18n();
  return (
    <section className="relative z-10 bg-[#111] text-white px-5 sm:px-10 py-12 sm:py-20">
      <div className="max-w-5xl mx-auto">
        <Tag>{t("story.invest.tag")}</Tag>
        <h2 className="b-h text-[clamp(3rem,13vw,7rem)] leading-[.96]"><Pop text={t("story.invest.title")} /></h2>
        <motion.p {...rise} className="text-[1.15rem] sm:text-2xl leading-snug mt-4 max-w-3xl">{t("story.invest.line")}</motion.p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6">
          <a href="mailto:hello@onpini.app?subject=Investing%20in%20OnPini" className="inline-flex items-center gap-2 min-h-[60px] rounded-full bg-[#fde047] text-[#111] font-bold px-7">{t("story.invest.cta")} <Arrow /></a>
          <Link href={href("/investors")} className="inline-flex items-center min-h-11 font-semibold underline underline-offset-4">{t("story.invest.more")}</Link>
        </div>
      </div>
    </section>
  );
}

export default function StoryPage() {
  return (
    <Shell>
      <main>
        <WhoWeAre />
        <Value />
        <Mission />
        <Inside />
        <Investors />
        <JoinBand medium="b_story" />
      </main>
      <Footer />
    </Shell>
  );
}
