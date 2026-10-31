import type { Metadata } from "next";
import { LANGS, type Lang } from "./langs";

// Real addresses once this replaces the live site; the preview itself stays out of search.
const SITE = "https://onpini.app";
export const pageUrl = (lang: Lang, path: string) => (lang === "en" ? `${SITE}${path}` : `${SITE}/${lang}${path}`) || SITE;
const OG_LOCALE: Record<Lang, string> = { en: "en_GB", nl: "nl_NL", de: "de_DE", es: "es_ES", ar: "ar_AR" };

export const meta = (lang: Lang, path: string, title: string, description: string, extra: Partial<Metadata> = {}): Metadata => ({
  title,
  description,
  alternates: {
    canonical: pageUrl(lang, path),
    languages: { ...Object.fromEntries(LANGS.map((l) => [l, pageUrl(l, path)])), "x-default": pageUrl("en", path) },
  },
  openGraph: { type: "website", siteName: "OnPini", title, description, url: pageUrl(lang, path), locale: OG_LOCALE[lang], images: [{ url: `${SITE}/og-${lang}.png`, width: 1200, height: 630, alt: "OnPini" }] },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE}/og-${lang}.png`] },
  ...extra,
});
