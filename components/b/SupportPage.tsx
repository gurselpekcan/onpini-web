"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useI18n } from "@/lib/i18n";
import { PageHead } from "./Bits";
import { goldBurst } from "./burst";
import Shell, { Footer } from "./Chrome";
import { haptic } from "./haptic";

// The ticket API goes live with the next app release. Until then the form opens an email to us.
const TICKETS_LIVE = process.env.NEXT_PUBLIC_TICKETS_LIVE === "1";
const INBOX = "hello@onpini.app";

const CATEGORIES = ["account", "bug", "safety", "privacy", "feedback", "other"];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const field = "w-full min-h-[56px] rounded-2xl bg-white px-4 py-3 text-[16px] shadow-[inset_0_0_0_1.5px_#111] focus:shadow-[inset_0_0_0_2.5px_#f97316] outline-none";

function TicketForm() {
  const { t, lang } = useI18n();
  const [category, setCategory] = useState("account");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // A hidden field only bots fill in.
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const [mailed, setMailed] = useState(false);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    if (!EMAIL.test(email.trim())) return setError(t("support.errEmail"));
    if (message.trim().length < 10) return setError(t("support.errMessage"));
    if (!TICKETS_LIVE) {
      const body = `${message.trim()}\n\n${name.trim()}\n${email.trim()}`;
      window.location.href = `mailto:${INBOX}?subject=${encodeURIComponent(`OnPini: ${t(`support.categories.${category}`)}`)}&body=${encodeURIComponent(body)}`;
      setError("");
      setMailed(true);
      return;
    }
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, name: name.trim() || undefined, email: email.trim(), message: message.trim(), language: lang, page: window.location.pathname, website }),
      });
      if (res.status === 429) return setError(t("support.errLimit"));
      if (!res.ok) return setError(t("support.errServer"));
      const data = await res.json();
      setReference(data.reference);
      haptic(20);
      goldBurst(0.5, 0.4);
    } catch {
      setError(t("support.errServer"));
    } finally {
      setBusy(false);
    }
  };

  if (mailed) {
    return (
      <div className="rounded-[28px] bg-[#f97316] p-6 sm:p-8" aria-live="polite">
        <h2 className="b-h text-[clamp(3rem,13vw,5rem)]">{t("support.mailedTitle")}</h2>
        <p className="text-lg mt-2">{t("support.mailedLine")} <a href={`mailto:${INBOX}`} className="font-bold underline underline-offset-4" dir="ltr">{INBOX}</a></p>
      </div>
    );
  }

  if (reference) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.94, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: "spring", stiffness: 260, damping: 20 }} className="rounded-[28px] bg-[#f97316] p-6 sm:p-8" aria-live="polite">
        <h2 className="b-h text-[clamp(3rem,13vw,5rem)]">{t("support.doneTitle")}</h2>
        <p className="text-lg mt-2">{t("support.doneLine")}</p>
        <p className="b-h text-[clamp(1.9rem,8.4vw,3rem)] mt-1 select-all" dir="ltr">{reference}</p>
        <p className="mt-2">{t("support.doneKeep")}</p>
        <button type="button" onClick={() => { setReference(""); setMessage(""); }} className="mt-4 min-h-11 font-bold underline underline-offset-4">{t("support.another")}</button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={send} noValidate className="grid gap-4">
      <fieldset>
        <legend className="font-bold mb-2">{t("support.category")}</legend>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((c) => (
            <button key={c} type="button" aria-pressed={c === category} onClick={() => setCategory(c)} className={`min-h-[46px] px-4 rounded-full font-semibold text-[15px] transition-colors ${c === category ? "bg-[#111] text-white" : "bg-white shadow-[inset_0_0_0_1.5px_#111]"}`}>{t(`support.categories.${c}`)}</button>
          ))}
        </div>
      </fieldset>
      <label className="grid gap-1.5 font-bold">{t("support.email")}
        <input type="email" inputMode="email" autoComplete="email" dir="ltr" value={email} onChange={(e) => setEmail(e.target.value)} className={`${field} font-normal text-start`} required />
      </label>
      <label className="grid gap-1.5 font-bold">{t("support.name")}
        <input type="text" autoComplete="name" maxLength={100} value={name} onChange={(e) => setName(e.target.value)} className={`${field} font-normal`} />
      </label>
      <label className="grid gap-1.5 font-bold">{t("support.message")}
        <textarea rows={5} maxLength={5000} value={message} onChange={(e) => setMessage(e.target.value)} className={`${field} font-normal resize-y`} required />
        <span className="font-normal text-sm text-[#525252]">{t("support.messageHint")}</span>
      </label>
      <label className="absolute w-px h-px overflow-hidden opacity-0" aria-hidden="true" tabIndex={-1}>Website
        <input type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </label>
      <AnimatePresence>
        {error && <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="alert" className="rounded-2xl bg-[#fee2e2] px-4 py-3 font-semibold">{error}</motion.p>}
      </AnimatePresence>
      <motion.button type="submit" disabled={busy} whileTap={{ scale: 0.97 }} className="b-cta w-full !min-h-[68px] !text-[1.15rem] disabled:opacity-60">{busy ? t("support.sending") : t("support.send")}</motion.button>
    </form>
  );
}

function CheckTicket() {
  const { t } = useI18n();
  const [reference, setReference] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState("");
  const check = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy || !reference.trim() || !email.trim()) return;
    setBusy(true);
    setResult("");
    try {
      const res = await fetch("/api/support/status", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ reference: reference.trim(), email: email.trim() }) });
      if (res.status === 429) return setResult(t("support.errLimit"));
      if (!res.ok) return setResult(res.status === 404 ? t("support.notFound") : t("support.errServer"));
      const data = await res.json();
      setResult(`${t("support.statusLabel")} ${t(`support.status.${data.status}`)}`);
    } catch {
      setResult(t("support.errServer"));
    } finally {
      setBusy(false);
    }
  };
  return (
    <form onSubmit={check} className="rounded-[24px] bg-[#f4f4f1] p-5 grid gap-3 mt-6">
      <h2 className="b-h text-[1.9rem]">{t("support.checkTitle")}</h2>
      <label className="grid gap-1.5 font-semibold">{t("support.ticket")}
        <input value={reference} onChange={(e) => setReference(e.target.value)} dir="ltr" placeholder="OP-XXXXXXXX" className={`${field} font-normal text-start`} />
      </label>
      <label className="grid gap-1.5 font-semibold">{t("support.email")}
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} dir="ltr" className={`${field} font-normal text-start`} />
      </label>
      <button type="submit" disabled={busy} className="min-h-[56px] rounded-full bg-white shadow-[inset_0_0_0_2px_#111] font-bold disabled:opacity-60">{busy ? t("support.checking") : t("support.check")}</button>
      {result && <p role="status" className="font-semibold">{result}</p>}
    </form>
  );
}

export default function SupportPage() {
  const { t } = useI18n();
  return (
    <Shell>
      <main>
        <PageHead title={t("support.title")} line={t("support.line")} />
        <section className="px-5 sm:px-10 pb-8 max-w-2xl mx-auto relative">
          <TicketForm />
          {TICKETS_LIVE && <CheckTicket />}
        </section>
      </main>
      <Footer />
    </Shell>
  );
}
