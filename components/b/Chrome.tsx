"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Lenis from "lenis";
import { AnimatePresence, MotionConfig, motion, useMotionValue, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import Logo from "@/components/Logo";
import { LANGS, LANG_NAMES, appLink, useI18n, type Lang } from "@/lib/i18n";
import { Arrow } from "./Bits";

const STORED = "onpini-site-lang";

const useMenu = () => {
  const { t, href } = useI18n();
  return [
    { href: href(""), label: t("nav.home") },
    { href: href("/decks"), label: t("nav.decks") },
    { href: href("/how-it-works"), label: t("nav.how") },
    { href: href("/story"), label: t("nav.story") },
  ];
};

/** Same page, other language. */
function LangSelect({ className = "" }: { className?: string }) {
  const { lang, t } = useI18n();
  const path = usePathname();
  const router = useRouter();
  const go = (next: Lang) => {
    try { localStorage.setItem(STORED, next); } catch { /* private mode */ }
    const rest = path.replace(/^\/(en|nl|de|es|ar)(?=\/|$)/, "");
    router.push(next === "en" ? rest || "/" : `/${next}${rest}`);
  };
  return (
    <label className={`items-center gap-1 text-sm font-semibold ${className || "inline-flex"}`}>
      <span className="sr-only">{t("nav.language")}</span>
      <span aria-hidden="true">🌐</span>
      <select value={lang} onChange={(e) => go(e.target.value as Lang)} className="appearance-none bg-transparent text-inherit font-semibold min-h-11 cursor-pointer underline underline-offset-4 outline-offset-2">
        {LANGS.map((l) => <option key={l} value={l} className="text-[#111]">{LANG_NAMES[l]}</option>)}
      </select>
    </label>
  );
}

/** On a first visit, open in the phone's language if we speak it. */
function FirstVisitLanguage() {
  const { lang } = useI18n();
  const path = usePathname();
  const router = useRouter();
  useEffect(() => {
    try {
      if (localStorage.getItem(STORED)) return;
      localStorage.setItem(STORED, lang);
      const wanted = (navigator.language || "").slice(0, 2) as Lang;
      if (lang === "en" && wanted !== "en" && LANGS.includes(wanted)) {
        router.replace(`/${wanted}${path === "/" ? "" : path}${window.location.search}`);
      }
    } catch { /* private mode */ }
  }, [lang, path, router]);
  return null;
}

function MenuSheet({ onClose }: { onClose: () => void }) {
  const { t, href, lang } = useI18n();
  const menu = useMenu();
  useEffect(() => {
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", key);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", key);
      document.documentElement.style.overflow = "";
    };
  }, [onClose]);
  return (
    <motion.div
      initial={{ clipPath: "circle(0% at 90% 0%)" }}
      animate={{ clipPath: "circle(150% at 90% 0%)" }}
      exit={{ clipPath: "circle(0% at 90% 0%)" }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 bg-[#f97316] flex flex-col px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]"
      role="dialog"
      aria-modal="true"
      aria-label={t("nav.menu")}
    >
      <div className="flex items-center justify-between">
        <Logo size={32} />
        <button type="button" onClick={onClose} className="min-h-11 px-3 font-bold" autoFocus>{t("nav.close")}</button>
      </div>
      <nav className="flex-1 flex flex-col justify-center gap-1" aria-label={t("nav.menu")}>
        {menu.map((m, i) => (
          <motion.div key={m.href} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.08 + i * 0.05 }}>
            <Link href={m.href} onClick={onClose} className="b-h block text-[clamp(2.7rem,13vw,4.6rem)] py-1.5">{m.label}</Link>
          </motion.div>
        ))}
      </nav>
      <a href={appLink("signup", lang, "b_menu")} className="b-cta w-full !min-h-[68px] !text-[1.15rem]">{t("join.label")} <Arrow /></a>
      <div className="flex flex-wrap justify-center items-center gap-x-5 mt-2 text-sm font-semibold">
        <LangSelect />
        <a href={appLink("login", lang, "b_menu")} className="min-h-11 inline-flex items-center">{t("nav.signin")}</a>
      </div>
    </motion.div>
  );
}

function Nav() {
  const { t, href, lang } = useI18n();
  const menu = useMenu();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (Math.abs(y - prev) > 4) setHidden(y > prev && y > 140);
  });
  return (
    <>
      <motion.header animate={{ y: hidden ? -90 : 0 }} transition={{ type: "spring", stiffness: 340, damping: 32 }} className="fixed z-40 top-2.5 inset-x-2.5 sm:top-4 flex justify-center pointer-events-none">
        <nav className="b-nav pointer-events-auto" aria-label={t("nav.menu")}>
          <Link href={href("")} aria-label="OnPini" className="me-auto lg:me-4"><Logo size={30} /></Link>
          {menu.map((m) => <Link key={m.href} href={m.href} className="hidden lg:inline-flex items-center min-h-11 px-2.5 text-sm font-semibold whitespace-nowrap hover:text-[#c2410c]">{m.label}</Link>)}
          <LangSelect className="hidden lg:inline-flex mx-1" />
          <button type="button" onClick={() => setOpen(true)} aria-expanded={open} className="lg:hidden min-h-11 px-3 text-sm font-bold">{t("nav.menu")}</button>
          <a href={appLink("signup", lang, "b_nav")} className="b-nav-play ms-1 lg:ms-auto">{t("nav.join")}</a>
        </nav>
      </motion.header>
      <AnimatePresence>{open && <MenuSheet onClose={close} />}</AnimatePresence>
    </>
  );
}

/** Mouse only: a dot that grows into a label over anything you can throw or drag. */
function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 900, damping: 50 });
  const sy = useSpring(y, { stiffness: 900, damping: 50 });
  const [label, setLabel] = useState("");
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setOn(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as HTMLElement | null)?.closest?.<HTMLElement>("[data-cursor]");
      setLabel(target?.dataset.cursor ?? "");
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);
  if (!on) return null;
  return (
    <motion.div style={{ x: sx, y: sy }} className="fixed left-0 top-0 z-50 pointer-events-none" aria-hidden="true">
      <motion.div
        animate={{ width: label ? 22 : 12, height: label ? 22 : 12, x: label ? -11 : -6, y: label ? -11 : -6 }}
        transition={{ type: "spring", stiffness: 420, damping: 30 }}
        className="rounded-full bg-[#f97316]"
      />
    </motion.div>
  );
}

/** FAQ lives behind one footer link. The answers stay in the page for search, hidden until opened. */
function FaqPopup({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, raw } = useI18n();
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", key);
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", key);
      document.documentElement.style.overflow = "";
    };
  }, [open, onClose]);
  return (
    <div hidden={!open} className="fixed inset-0 z-50">
      <div className="b-fade absolute inset-0 bg-black/55" onClick={onClose} aria-hidden="true" />
      <div role="dialog" aria-modal="true" aria-label={t("how.faqTitle")} data-lenis-prevent className="b-sheet absolute inset-x-0 bottom-0 sm:inset-auto sm:start-1/2 sm:top-1/2 sm:w-[40rem] max-h-[88svh] overflow-y-auto overscroll-contain bg-white text-[#111] rounded-t-[30px] sm:rounded-[30px] px-5 sm:px-8 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h2 className="b-h text-[clamp(2.2rem,9vw,3.4rem)] leading-[1]">{t("how.faqTitle")}</h2>
          <button ref={closeRef} type="button" onClick={onClose} className="min-h-11 px-2 font-bold shrink-0">{t("nav.close")}</button>
        </div>
        <div className="divide-y divide-[#111]/15">
          {raw<[string, string][]>("how.faq").map(([q, a]) => (
            <details key={q} className="b-faq group">
              <summary className="flex items-center justify-between gap-4 min-h-[60px] py-3 cursor-pointer list-none font-bold text-[1.08rem] leading-snug">
                {q}
                <span className="text-2xl leading-none transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="pb-4 text-[1.02rem] leading-relaxed text-[#404040]">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}

const footLink = "inline-flex items-center min-h-10 text-[#fef3c7]/80 hover:text-white transition-colors";

const socialLink = "grid place-items-center w-12 h-12 rounded-full bg-[#fef3c7]/10 text-[#fef3c7] transition-colors hover:bg-[#fef3c7] hover:text-[#111]";

const InstagramLogo = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5.5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.4" cy="6.6" r="1.25" fill="currentColor" stroke="none" />
  </svg>
);

const TikTokLogo = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

export function Footer() {
  const { t, href, lang } = useI18n();
  const [faq, setFaq] = useState(false);
  const closeFaq = useCallback(() => setFaq(false), []);
  const pages = [["", "nav.home"], ["/decks", "nav.decks"], ["/questions", "nav.questions"], ["/how-it-works", "nav.how"], ["/story", "nav.story"]];
  return (
    <footer id="footer" className="relative z-10 bg-[#111] text-[#fef3c7]">
      <div className="max-w-6xl mx-auto px-5 sm:px-10 pt-12 pb-8 grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-9">
        <div className="col-span-2 md:col-span-1">
          <Logo tone="cream" size={34} />
          <p className="text-[#fef3c7]/80 leading-relaxed mt-3 max-w-xs">{t("footer.tagline")}</p>
          <ul className="flex items-center gap-2 mt-4">
            <li><a href="https://www.instagram.com/onpini.app/" target="_blank" rel="noopener noreferrer" aria-label="OnPini on Instagram" className={socialLink}><InstagramLogo /></a></li>
            <li><a href="https://www.tiktok.com/@onpini.app" target="_blank" rel="noopener noreferrer" aria-label="OnPini on TikTok" className={socialLink}><TikTokLogo /></a></li>
          </ul>
        </div>
        <div>
          <p className="b-tag text-[#fef3c7]/70 mb-2">{t("footer.pages")}</p>
          <ul>{pages.map(([p, k]) => <li key={k}><Link href={href(p)} className={footLink}>{t(k)}</Link></li>)}</ul>
        </div>
        <div>
          <p className="b-tag text-[#fef3c7]/70 mb-2">{t("footer.connect")}</p>
          <ul>
            <li><button type="button" onClick={() => setFaq(true)} className={footLink}>{t("nav.faq")}</button></li>
            <li><Link href={href("/support")} className={footLink}>{t("nav.support")}</Link></li>
            <li><a href="mailto:hello@onpini.app" className={footLink} dir="ltr">hello@onpini.app</a></li>
            <li><a href="mailto:hello@onpini.app?subject=I%27d%20like%20to%20build%20OnPini" className={footLink}>{t("footer.careers")}</a></li>
            <li><LangSelect className="inline-flex text-[#fef3c7]/80 mt-1" /></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#fef3c7]/15">
        <div className="max-w-6xl mx-auto px-5 sm:px-10 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#fef3c7]/75 leading-relaxed">
          <span>© {new Date().getFullYear()} OnPini. {t("footer.rights")} · KVK 89817583</span>
          <span className="flex items-center gap-4 shrink-0">
            <a href={`https://web.onpini.com/privacy?lang=${lang}`} className="inline-flex items-center min-h-10 hover:text-white">{t("footer.privacy")}</a>
            <a href={`https://web.onpini.com/terms?lang=${lang}`} className="inline-flex items-center min-h-10 hover:text-white">{t("footer.terms")}</a>
            <Link href={`${href("/story")}#credits`} className="inline-flex items-center min-h-10 hover:text-white">{t("footer.credits")}</Link>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#f97316]" aria-hidden="true" />{t("footer.early")}</span>
          </span>
        </div>
      </div>
      <FaqPopup open={faq} onClose={closeFaq} />
    </footer>
  );
}

export default function Shell({ children, bare = false }: { children: React.ReactNode; bare?: boolean }) {
  const started = useRef(false);
  useEffect(() => {
    if (bare || started.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    started.current = true;
    // Smooth scrolling for mouse and trackpad; phones keep their own native scroll.
    const lenis = new Lenis({ lerp: 0.1, anchors: true });
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      started.current = false;
    };
  }, [bare]);
  return (
    <MotionConfig reducedMotion="user">
      <div className="b-root">
        <FirstVisitLanguage />
        {!bare && <Nav />}
        {!bare && <Cursor />}
        {children}
      </div>
    </MotionConfig>
  );
}
