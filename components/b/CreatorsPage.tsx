"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useI18n } from "@/lib/i18n";
import { Arrow, Pop } from "./Bits";
import Shell, { Footer } from "./Chrome";
import { goldBurst } from "./burst";
import Emoji from "./Emoji";
import { haptic } from "./haptic";

const SPRING = { type: "spring", stiffness: 240, damping: 24 } as const;
const rise = { initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.25 }, transition: SPRING } as const;
const STAR = "M12 1.6l3.2 6.9 7.5.9-5.6 5.1 1.5 7.4L12 18.2l-6.6 3.7 1.5-7.4-5.6-5.1 7.5-.9z";

const Star = ({ className = "", on = true }: { className?: string; on?: boolean }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
    <path d={STAR} fill={on ? "#fde047" : "none"} stroke={on ? "#fde047" : "rgb(255 255 255 / .35)"} strokeWidth="1.1" strokeLinejoin="round" />
  </svg>
);

const NICHES = ["couples", "friends", "podcasts", "students", "sports", "family", "reality", "film", "dating", "gaming"];
const COUNTRIES = ["NL", "BE", "DE", "AT", "CH", "GB", "IE", "US", "ES", "MX", "MA", "EG", "SA", "AE", "OTHER"];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FIELD = "w-full min-h-[60px] rounded-2xl bg-white text-[#111] px-4 text-[1.1rem] font-bold outline-none shadow-[inset_0_0_0_2px_#fde047] placeholder:text-[#737373] placeholder:font-semibold";

const scrollToClaim = (e: React.MouseEvent) => {
  e.preventDefault();
  document.getElementById("claim")?.scrollIntoView({ behavior: "smooth", block: "start" });
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
          <a href="#claim" onClick={scrollToClaim} className="inline-flex items-center gap-2 min-h-[64px] rounded-full bg-[#fde047] text-[#111] font-bold text-[1.1rem] px-8">{t("creators.cta")} <Arrow /></a>
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
            <a href="#claim" onClick={scrollToClaim} className="inline-flex items-center gap-2 min-h-[58px] rounded-full bg-[#fde047] text-[#111] font-bold px-7 mt-6">{t("creators.cta")} <Arrow /></a>
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
        <a href="#claim" onClick={scrollToClaim} className="inline-flex items-center gap-2 min-h-[64px] rounded-full bg-[#111] text-white font-bold text-[1.1rem] px-8 mt-10 mx-1">{t("creators.cta")} <Arrow /></a>
      </div>
    </section>
  );
}

/** The real claim: it lands in the staff queue, and only staff confirming it takes the spot. */
function Claim({ name, setName }: { name: string; setName: (v: string) => void }) {
  const { t, raw, lang } = useI18n();
  const [niche, setNiche] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");
  const [website, setWebsite] = useState(""); // Hidden: only a bot fills it in.
  const [taken, setTaken] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const nicheNames = raw<string[]>("creators.wall.niches");
  const countryNames = raw<string[]>("creators.wall.countries");
  const isTaken = (id: string) => taken.includes(`${id}:${country}`);

  useEffect(() => {
    fetch("/api/creators/spots").then((r) => (r.ok ? r.json() : null)).then((d) => {
      if (d?.taken) setTaken(d.taken.map((s: { niche: string; country: string }) => `${s.niche}:${s.country}`));
    }).catch(() => {});
  }, []);
  useEffect(() => {
    if (niche && taken.includes(`${niche}:${country}`)) setNiche("");
  }, [country, niche, taken]);

  // The form collapses into the confirmation: bring that into view, or they'd be left far below it.
  useEffect(() => {
    if (reference) document.getElementById("claim-done")?.scrollIntoView({ block: "center" });
  }, [reference]);

  const nicheName = nicheNames[NICHES.indexOf(niche)] ?? "";
  const countryName = countryNames[COUNTRIES.indexOf(country)] ?? "";
  const label = niche && country ? t("creators.wall.claimBoth", { niche: nicheName, country: countryName }) : t("creators.cta");

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    if (!country) return setError(t("creators.form.errCountry"));
    if (!niche) return setError(t("creators.form.errNiche"));
    if (!name.trim()) return setError(t("creators.form.errName"));
    if (!EMAIL.test(email.trim())) return setError(t("creators.form.errEmail"));
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/creators/claim", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: name.trim(), email: email.trim(), niche, country, language: lang, link: link.trim() || undefined, website: website || undefined }) });
      if (res.status === 409) {
        setTaken((list) => [...list, `${niche}:${country}`]);
        return setError(t("creators.form.errTaken"));
      }
      if (res.status === 429) return setError(t("creators.form.errLimit"));
      if (!res.ok) return setError(t("creators.form.errServer"));
      setReference((await res.json()).reference);
      haptic(20);
      goldBurst(0.5, 0.45);
    } catch {
      setError(t("creators.form.errServer"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <section id="claim" className="relative bg-[#0a0a0a] text-white px-5 sm:px-10 py-16 sm:py-28 overflow-hidden scroll-mt-16">
      <span aria-hidden="true" className="b-beam b-beam-a" />
      <div className="relative max-w-6xl mx-auto">
        <h2 className="b-h text-[clamp(3rem,11vw,7.4rem)] leading-[.94]"><Pop text={t("creators.wall.title")} /><Pop text={t("creators.wall.accent")} className="text-[#fde047]" /></h2>
        <motion.p {...rise} className="text-[1.2rem] sm:text-2xl font-medium leading-snug mt-5 max-w-3xl">{t("creators.wall.line")}</motion.p>
        {reference ? (
          <motion.div initial={{ opacity: 0, scale: 0.94, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={SPRING} id="claim-done" aria-live="polite" className="b-bulbs mt-9 max-w-2xl">
            <div className="rounded-[18px] bg-[#171717] p-6 sm:p-9 text-center">
              <Star className="w-16 h-16 mx-auto" />
              <p className="b-h text-[clamp(2.4rem,9vw,3.8rem)] leading-[1] mt-3">{t("creators.form.doneTitle")}</p>
              <p className="b-h text-[#fde047] text-[clamp(1.4rem,5vw,2rem)] leading-[1.1] mt-2">{nicheName}, {countryName}</p>
              <p className="text-[1.1rem] leading-snug mt-4">{t("creators.form.doneLine", { email: email.trim() })}</p>
              <p className="text-sm text-white/70 mt-3" dir="ltr">{reference}</p>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={send} noValidate className="mt-9">
            <label className="block font-bold mb-2" htmlFor="spot-country">{t("creators.wall.countryAsk")}</label>
            <select id="spot-country" value={country} onChange={(e) => setCountry(e.target.value)} className={`${FIELD} sm:max-w-sm`}>
              <option value="">{t("creators.wall.countryPick")}</option>
              {COUNTRIES.map((c, i) => <option key={c} value={c}>{countryNames[i]}</option>)}
            </select>
            <p className="font-bold mt-7 mb-2">{t("creators.wall.nicheAsk")}</p>
            <ul className="grid grid-cols-2 lg:grid-cols-5 gap-1.5 sm:gap-2.5">
              {NICHES.map((id, i) => {
                const on = id === niche;
                const gone = isTaken(id);
                return (
                  <li key={id}>
                    <button type="button" disabled={gone} aria-pressed={on} onClick={() => setNiche(on ? "" : id)} className={`w-full h-full min-h-[104px] rounded-2xl p-3 flex flex-col justify-between gap-2 text-start transition-colors ${on ? "bg-[#fde047] text-[#111]" : gone ? "bg-white/[.03] text-white/40" : "bg-white/[.07] text-white"}`}>
                      <span className="flex items-center justify-between gap-1"><svg viewBox="0 0 24 24" aria-hidden="true" className="w-7 h-7"><path d={STAR} fill={on ? "#111" : gone ? "rgb(255 255 255 / .4)" : "none"} stroke={on ? "#111" : gone ? "rgb(255 255 255 / .4)" : "#fde047"} strokeWidth="1.3" strokeLinejoin="round" /></svg><span className={`text-xs font-bold ${on || gone ? "" : "text-[#fde047]"}`}>{gone ? t("creators.wall.taken") : t("creators.wall.open")}</span></span>
                      <span className="b-h text-[1.3rem] sm:text-[1.45rem] leading-[1.05]">{nicheNames[i]}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="grid sm:grid-cols-2 gap-3 mt-7">
              <label className="grid gap-2 font-bold">{t("creators.form.name")}<input value={name} onChange={(e) => setName(e.target.value)} maxLength={120} dir="auto" autoComplete="name" className={FIELD} /></label>
              <label className="grid gap-2 font-bold">{t("creators.form.email")}<input type="email" inputMode="email" autoComplete="email" dir="ltr" value={email} onChange={(e) => setEmail(e.target.value)} className={`${FIELD} text-start`} /></label>
              <label className="grid gap-2 font-bold sm:col-span-2">{t("creators.form.link")}<input value={link} onChange={(e) => setLink(e.target.value)} maxLength={300} dir="ltr" inputMode="url" placeholder={t("creators.form.linkHint")} className={`${FIELD} text-start`} /></label>
            </div>
            <label className="absolute w-px h-px overflow-hidden opacity-0" aria-hidden="true" tabIndex={-1}>Website<input type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} /></label>
            {error && <p role="alert" className="rounded-2xl bg-[#fee2e2] text-[#111] px-4 py-3 font-semibold mt-5">{error}</p>}
            <motion.button type="submit" disabled={busy} whileTap={{ scale: 0.97 }} className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-[68px] rounded-full bg-[#fde047] text-[#111] font-bold text-[1.1rem] px-8 mt-6 disabled:opacity-60">{busy ? t("creators.form.sending") : label} {!busy && <Arrow />}</motion.button>
            <p className="text-sm text-white/70 mt-3 max-w-xl">{t("creators.form.note")} <a href={`https://web.onpini.com/privacy?lang=${lang}`} className="underline underline-offset-2">{t("footer.privacy")}</a></p>
          </form>
        )}
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
      <a href="#claim" onClick={scrollToClaim} className="inline-flex items-center gap-2 min-h-[72px] rounded-full bg-[#111] text-white font-bold text-[1.2rem] px-9 mt-7">{t("creators.cta")} <Arrow /></a>
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
        <Claim name={name} setName={setName} />
        <Close />
      </main>
      <Footer />
    </Shell>
  );
}
