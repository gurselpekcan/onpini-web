"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useI18n } from "@/lib/i18n";
import { Pop } from "./Bits";
import Shell, { Footer } from "./Chrome";
import Emoji from "./Emoji";

const SPRING = { type: "spring", stiffness: 240, damping: 24 } as const;
const rise = { initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.25 }, transition: SPRING } as const;
const STAR = "M12 1.6l3.2 6.9 7.5.9-5.6 5.1 1.5 7.4L12 18.2l-6.6 3.7 1.5-7.4-5.6-5.1 7.5-.9z";

const Star = ({ className = "", on = true }: { className?: string; on?: boolean }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
    <path d={STAR} fill={on ? "#fde047" : "none"} stroke={on ? "#fde047" : "rgb(255 255 255 / .35)"} strokeWidth="1.1" strokeLinejoin="round" />
  </svg>
);

// No forms and nothing to run: creators apply where they already live, in the DMs.
const INSTAGRAM_DM = "https://ig.me/m/onpini.app";
const MAIL = "mailto:hello@onpini.app?subject=STAR";

const InstagramGlyph = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
);

/** Every button on this page does the same one thing. */
const DmButton = ({ className }: { className: string }) => {
  const { t } = useI18n();
  return <a href={INSTAGRAM_DM} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2.5 rounded-full font-bold ${className}`}><InstagramGlyph /> {t("creators.cta")}</a>;
};

function Hero() {
  const { t } = useI18n();
  return (
    <section className="relative bg-[#0a0a0a] text-white px-5 sm:px-10 pt-24 sm:pt-32 pb-12 sm:pb-20 overflow-hidden">
      <span aria-hidden="true" className="b-beam b-beam-a" />
      <span aria-hidden="true" className="b-beam b-beam-b" />
      <div className="relative max-w-6xl mx-auto">
        <p className="b-tag b-rise text-[#fde047] mb-4 flex items-center gap-2"><Star className="w-4 h-4" /> {t("creators.tag")}</p>
        <h1 className="b-h b-rise text-[clamp(3.3rem,12.4vw,9rem)] leading-[.93]">{t("creators.title")}<span className="block text-[#fde047]">{t("creators.accent")}</span></h1>
        <p className="b-rise text-[1.2rem] sm:text-2xl leading-snug mt-6 max-w-2xl" style={{ animationDelay: ".12s" }}>{t("creators.line")}</p>
        <div className="b-rise flex flex-wrap items-center gap-x-6 gap-y-2 mt-7" style={{ animationDelay: ".22s" }}>
          <DmButton className="min-h-[64px] bg-[#fde047] text-[#111] text-[1.1rem] px-8" />
        </div>
      </div>
    </section>
  );
}

/** Their name on the door: once it's theirs, they don't want to lose it. */
function Door({ name, setName }: { name: string; setName: (v: string) => void }) {
  const { t } = useI18n();
  const who = name.trim();
  return (
    <section className="relative bg-[#0a0a0a] text-white px-5 sm:px-10 pb-16 sm:pb-28">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <div>
          <h2 className="b-h text-[clamp(2.8rem,9vw,5.6rem)] leading-[.98]"><Pop text={t("creators.door.title")} /></h2>
          <label className="block font-bold mt-6 mb-2" htmlFor="door-name">{t("creators.door.ask")}</label>
          <input id="door-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={28} dir="auto" autoComplete="off" placeholder={t("creators.door.placeholder")} className="w-full min-h-[64px] rounded-2xl bg-white text-[#111] px-5 text-[1.2rem] font-bold outline-none shadow-[inset_0_0_0_2px_#fde047] placeholder:text-[#737373] placeholder:font-semibold" />
          <p className="text-[1.05rem] leading-snug mt-3 text-white/80">{t("creators.door.note")}</p>
        </div>
        <motion.div {...rise} className="b-bulbs">
          <div className="rounded-[18px] bg-[#171717] px-5 py-9 sm:py-12 text-center">
            <Star className="w-16 h-16 sm:w-20 sm:h-20 mx-auto" />
            <p className="b-tag text-[#fde047] mt-4">{t("creators.door.reserved")}</p>
            <p dir="auto" className="b-h text-[clamp(2.4rem,10vw,4.2rem)] leading-[1.02] mt-2 break-words">{who ? t("creators.door.deck", { name: who }) : t("creators.door.yours")}</p>
            <DmButton className="min-h-[58px] bg-[#fde047] text-[#111] px-7 mt-6" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Effort() {
  const { t, raw } = useI18n();
  return (
    <section className="bg-[#fde047] text-[#111] px-5 sm:px-10 py-16 sm:py-28">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16">
        <h2 className="b-h text-[clamp(3rem,10.5vw,6.8rem)] leading-[.94]"><Pop text={t("creators.effort.title")} /><Pop text={t("creators.effort.accent")} className="mt-2 text-[#c2410c]" /></h2>
        <ul className="border-t-2 border-[#111]">
          {raw<string[]>("creators.effort.items").map((x, i) => (
            <motion.li key={x} {...rise} transition={{ ...SPRING, delay: i * 0.05 }} className="flex items-start gap-3 py-4 border-b-2 border-[#111]">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-7 h-7 shrink-0 mt-0.5"><path d={STAR} fill="#111" /></svg>
              <span className="b-h text-[clamp(1.5rem,4.8vw,2.1rem)] leading-[1.08]">{x}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const WHY_EMOJI = ["1f525", "1faf6", "1f440"];

/** One comparison, same unit on both sides: what one fan gives you. */
function Numbers() {
  const { t, raw } = useI18n();
  return (
    <section id="engagement" className="bg-[#fff7df] text-[#111] px-4 sm:px-10 py-16 sm:py-28">
      <div className="max-w-6xl mx-auto">
        <h2 className="b-h text-[clamp(3rem,10.4vw,7rem)] leading-[.94] px-1"><Pop text={t("creators.video.title")} /><Pop text={t("creators.video.accent")} className="text-[#ea580c]" /></h2>
        <div className="grid grid-cols-2 gap-2.5 mt-8 sm:mt-12">
          <motion.div {...rise} className="rounded-[30px] bg-white p-5 sm:p-10">
            <p className="b-h text-[clamp(6rem,24vw,15rem)] leading-[.85] text-[#a3a3a3]" dir="ltr">1</p>
            <p className="b-h text-[clamp(1.9rem,6vw,3.6rem)] leading-[1] mt-4">{t("creators.video.likeT")}</p>
            <p className="text-[1.05rem] sm:text-xl leading-snug mt-2">{t("creators.video.likeD")}</p>
          </motion.div>
          <motion.div {...rise} transition={{ ...SPRING, delay: 0.1 }} className="rounded-[30px] bg-[#0a0a0a] text-white p-5 sm:p-10">
            <p className="b-h text-[clamp(6rem,24vw,15rem)] leading-[.85] text-[#fde047]" dir="ltr">10</p>
            <p className="b-h text-[clamp(1.9rem,6vw,3.6rem)] leading-[1] mt-4">{t("creators.video.answersT")}</p>
            <p className="text-[1.05rem] sm:text-xl leading-snug mt-2 text-white/85">{t("creators.video.answersD")}</p>
          </motion.div>
        </div>
        <ul className="grid sm:grid-cols-3 gap-5 sm:gap-8 mt-10 sm:mt-14 px-1">
          {raw<{ t: string; d: string }[]>("creators.video.why").map((w, i) => (
            <motion.li key={w.t} {...rise} transition={{ ...SPRING, delay: i * 0.07 }} className="flex sm:block items-center gap-4">
              <Emoji code={WHY_EMOJI[i]} size={56} className="shrink-0" />
              <span className="block sm:mt-3">
                <span className="b-h block text-[clamp(1.9rem,3.6vw,2.6rem)] leading-[1.02]">{w.t}</span>
                <span className="block text-[1.08rem] leading-snug mt-1">{w.d}</span>
              </span>
            </motion.li>
          ))}
        </ul>
        <DmButton className="min-h-[64px] bg-[#111] text-white text-[1.1rem] px-8 mt-10 mx-1" />
      </div>
    </section>
  );
}

/** One star per niche, and the whole application is one word in their DMs. */
function OneWord({ name }: { name: string }) {
  const { t, raw } = useI18n();
  const who = name.trim() || t("creators.dm.me");
  return (
    <section id="star" className="relative bg-[#0a0a0a] text-white px-5 sm:px-10 py-16 sm:py-28 overflow-hidden scroll-mt-16">
      <span aria-hidden="true" className="b-beam b-beam-a" />
      <div className="relative max-w-6xl mx-auto">
        <h2 className="b-h text-[clamp(3rem,11vw,7.4rem)] leading-[.94]"><Pop text={t("creators.wall.title")} /><Pop text={t("creators.wall.accent")} className="text-[#fde047]" /></h2>
        <motion.p {...rise} className="text-[1.2rem] sm:text-2xl font-medium leading-snug mt-5 max-w-3xl">{t("creators.wall.line")}</motion.p>
        <ul className="flex flex-wrap gap-2 mt-8">
          {raw<string[]>("creators.wall.niches").map((n) => <li key={n} className="rounded-full bg-white/[.09] font-bold px-4 py-2.5 flex items-center gap-2"><Star className="w-4 h-4" /> {n}</li>)}
        </ul>
        <p className="font-medium text-white/80 mt-4">{t("creators.wall.more")}</p>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mt-14 sm:mt-24">
          <div>
            <h3 className="b-h text-[clamp(2.8rem,10vw,6rem)] leading-[.96]"><Pop text={t("creators.dm.title")} /><Pop text={t("creators.dm.accent")} className="text-[#fde047]" /></h3>
            <motion.p {...rise} className="text-[1.2rem] sm:text-2xl font-medium leading-snug mt-5">{t("creators.dm.line")}</motion.p>
          </div>
          <motion.div {...rise} className="b-bulbs">
            <div className="rounded-[18px] bg-[#171717] p-5 sm:p-8 flex flex-col items-end gap-2" aria-hidden="true">
              <motion.p initial={{ opacity: 0, scale: 0.6, y: 14 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={SPRING} className="rounded-[22px] rounded-ee-md bg-[#fde047] text-[#111] b-h text-[clamp(2.6rem,10vw,3.8rem)] leading-none px-6 py-4 origin-bottom-right rtl:origin-bottom-left" dir="ltr">STAR</motion.p>
              <motion.p initial={{ opacity: 0, scale: 0.6, y: 14 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ ...SPRING, delay: 0.25 }} className="rounded-[22px] rounded-ee-md bg-white text-[#111] font-bold text-[1.1rem] leading-snug px-5 py-3 max-w-full break-words origin-bottom-right rtl:origin-bottom-left">{t("creators.dm.sample", { name: who })}</motion.p>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-10">
          <DmButton className="min-h-[68px] bg-[#fde047] text-[#111] text-[1.1rem] px-8" />
          <a href={MAIL} className="inline-flex items-center min-h-11 font-semibold underline underline-offset-4">{t("creators.dm.mail")}</a>
        </div>
        <p className="text-sm text-white/70 mt-4">{t("creators.dm.confirm")}</p>
        <motion.p {...rise} className="b-h text-[clamp(2rem,6vw,3.6rem)] leading-[1.03] mt-10 text-[#fb923c]">{t("creators.wall.first")}</motion.p>
      </div>
    </section>
  );
}

function Close() {
  const { t } = useI18n();
  return (
    <section className="bg-[#f97316] text-[#111] px-5 sm:px-10 py-16 sm:py-28 text-center">
      <h2 className="b-h text-[clamp(3.4rem,14vw,10rem)] leading-[.92] max-w-5xl mx-auto"><Pop text={t("creators.close.title")} /></h2>
      <p className="text-xl sm:text-3xl font-medium mt-3">{t("creators.close.line")}</p>
      <DmButton className="min-h-[72px] bg-[#111] text-white text-[1.2rem] px-9 mt-7" />
      <p className="text-sm font-medium mt-6">{t("creators.close.note")}</p>
    </section>
  );
}

export default function CreatorsPage() {
  const [name, setName] = useState("");
  return (
    <Shell>
      <main>
        <Hero />
        <Door name={name} setName={setName} />
        <Effort />
        <Numbers />
        <OneWord name={name} />
        <Close />
      </main>
      <Footer />
    </Shell>
  );
}
