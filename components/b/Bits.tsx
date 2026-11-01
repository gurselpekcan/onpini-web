"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { appLink, useI18n } from "@/lib/i18n";
import { goldBurst } from "./burst";
import { haptic } from "./haptic";
import { STORE, joinHref } from "./join";

const SPRING = { type: "spring", stiffness: 300, damping: 22 } as const;

/** Points forward in the reading direction. */
export const Arrow = ({ down = false }: { down?: boolean }) => <span aria-hidden="true" className={down ? "" : "b-arrow"}>{down ? "↓" : "→"}</span>;

/** Words pop in as the block scrolls into view. */
export function Pop({ text, className = "" }: { text: string; className?: string }) {
  return (
    <motion.span className={`block ${className}`} initial="off" whileInView="on" viewport={{ once: true, amount: 0.4 }} transition={{ staggerChildren: 0.06 }}>
      {text.split(" ").map((word, i) => (
        <motion.span key={i} className="inline-block whitespace-pre" variants={{ off: { y: "60%", opacity: 0, rotate: 5 }, on: { y: 0, opacity: 1, rotate: 0 } }} transition={SPRING}>
          {word}{" "}
        </motion.span>
      ))}
    </motion.span>
  );
}

export const pressJoin = (e: React.MouseEvent<HTMLAnchorElement>, onPress?: () => void) => {
  // Ctrl or cmd click still opens a new tab, as a link should.
  if (e.metaKey || e.ctrlKey || e.shiftKey) return;
  e.preventDefault();
  const url = e.currentTarget.href;
  const r = e.currentTarget.getBoundingClientRect();
  haptic(20);
  onPress?.();
  goldBurst((r.left + r.width / 2) / window.innerWidth, (r.top + r.height / 2) / window.innerHeight);
  setTimeout(() => window.location.assign(url), window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 420);
};

/** The big ending button: a sweep of light and an arrow that wants to go, and a payoff when pressed. */
export function JoinBig({ medium }: { medium: string }) {
  const { lang, t } = useI18n();
  const [store, setStore] = useState("");
  const [pressed, setPressed] = useState(false);
  useEffect(() => setStore(joinHref(navigator.userAgent)), []);
  return (
    <span className="inline-block mt-5">
      <motion.a
        href={store || appLink("signup", lang, medium)}
        onClick={(e) => pressJoin(e, () => setPressed(true))}
        whileTap={{ scale: 0.93 }}
        animate={pressed ? { scale: [1, 0.9, 1.14, 1] } : undefined}
        transition={{ type: "spring", stiffness: 420, damping: 16 }}
        className="b-join"
      >
        <span className="b-join-shine" aria-hidden="true" />
        <span className="relative">{store ? t("join.app") : t("join.label")}</span>
        <span className="b-join-arrow" aria-hidden="true"><span className="b-arrow">→</span></span>
      </motion.a>
    </span>
  );
}

function Badge({ href, logo, top, bottom }: { href: string; logo: React.ReactNode; top: string; bottom: string }) {
  const { t } = useI18n();
  const body = (
    <>
      {logo}
      <span className="flex flex-col leading-none text-start">
        <span className="text-[10px] font-semibold opacity-85">{href ? top : t("join.soon")}</span>
        <span className="text-[1.15rem] font-bold mt-0.5" dir="ltr">{bottom}</span>
      </span>
    </>
  );
  return href ? <a href={href} target="_blank" rel="noopener noreferrer" className="b-store">{body}</a> : <div className="b-store b-store-soon">{body}</div>;
}

/** The production badges. No listing yet means "Coming soon on" and nothing to tap. */
export function StoreBadges({ className = "" }: { className?: string }) {
  const { t } = useI18n();
  return (
    <>
      {!(STORE.ios && STORE.android) && <p className="text-center text-sm font-semibold mb-2">{t("join.web")}</p>}
      <div className={`flex flex-wrap gap-2.5 ${className}`}>
      <Badge
        href={STORE.ios}
        top={t("join.download")}
        bottom="App Store"
        logo={<svg viewBox="0 0 24 24" className="w-7 h-7 fill-white shrink-0" aria-hidden="true"><path d="M17.05 12.54c-.03-2.6 2.12-3.85 2.22-3.91-1.21-1.77-3.09-2.01-3.76-2.04-1.6-.16-3.12.94-3.93.94-.81 0-2.06-.92-3.39-.89-1.74.03-3.35 1.01-4.25 2.57-1.81 3.14-.46 7.79 1.3 10.34.86 1.25 1.89 2.65 3.24 2.6 1.3-.05 1.79-.84 3.36-.84 1.57 0 2.01.84 3.39.81 1.4-.02 2.28-1.27 3.14-2.53.99-1.45 1.4-2.85 1.42-2.92-.03-.01-2.72-1.04-2.74-4.13ZM14.46 4.9c.72-.87 1.2-2.08 1.07-3.28-1.03.04-2.28.69-3.02 1.56-.66.77-1.24 2-1.09 3.18 1.15.09 2.32-.59 3.04-1.46Z" /></svg>}
      />
      <Badge
        href={STORE.android}
        top={t("join.getIt")}
        bottom="Google Play"
        logo={<svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0" aria-hidden="true"><path d="M3.6 2.1c-.3.16-.5.46-.5.85v18.1c0 .39.2.69.5.85L13.8 12 3.6 2.1Z" fill="#00C3FF" /><path d="M17 8.9 14.2 7.3 5.2 2.5 13.8 12 17 8.9Z" fill="#00E676" /><path d="M17 15.1 13.8 12l-8.6 9.5 9-4.8 2.8-1.6Z" fill="#FF3D00" /><path d="m20.6 10.9-3.6-2L13.8 12l3.2 3.1 3.6-2c.8-.5.8-1.7 0-2.2Z" fill="#FFD600" /></svg>}
      />
    </div>
    </>
  );
}

/** The end of every page: one person in mind, one button. */
export function JoinBand({ medium, title, line }: { medium: string; title?: string; line?: string }) {
  const { t } = useI18n();
  return (
    <section className="relative z-10 bg-[#f97316] px-5 sm:px-10 py-16 sm:py-24 text-center">
      <h2 className="b-h text-[clamp(3.2rem,14vw,8rem)] leading-[.94]"><Pop text={title ?? t("end.title")} /></h2>
      <p className="text-xl sm:text-3xl font-medium mt-3">{line ?? t("end.line")}</p>
      <JoinBig medium={medium} />
    </section>
  );
}

export function PageHead({ title, line, accent, eyebrow, overCurtain = false }: { title: string; line: string; accent?: string; eyebrow?: string; overCurtain?: boolean }) {
  return (
    <header className={`relative z-[6] px-5 sm:px-10 pt-24 sm:pt-32 ${overCurtain ? "pb-20 sm:pb-28" : "pb-8"} max-w-6xl mx-auto pointer-events-none`}>
      <h1 className="b-h b-rise text-[clamp(3rem,13vw,7rem)] leading-[.96]">{eyebrow && <span className="block font-[family-name:var(--font-b-sans)] font-semibold text-lg sm:text-2xl tracking-normal leading-tight mb-2 text-[#525252]">{eyebrow}</span>}{title}{accent && <span className="block text-[#ea580c]">{accent}</span>}</h1>
      <p className="b-rise text-[1.15rem] sm:text-2xl leading-snug mt-4 max-w-2xl" style={{ animationDelay: ".12s" }}>{line}</p>
    </header>
  );
}
