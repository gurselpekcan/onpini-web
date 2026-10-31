import type { MetadataRoute } from "next";
import { LANGS } from "@/lib/langs";
import { pageUrl } from "@/lib/seo";
import { contentFor } from "@/lib/siteContent";

export default function sitemap(): MetadataRoute.Sitemap {
  const c = contentFor("en");
  const paths = [
    "",
    "/how-it-works",
    "/story",
    "/decks",
    ...c.genres.map((g) => `/decks/${g.slug}`),
    "/questions",
    ...c.questions.map((p) => `/questions/${p.slug}`),
    "/play",
    "/support",
  ];
  return paths.flatMap((path) => LANGS.map((lang) => ({
    url: pageUrl(lang, path),
    alternates: { languages: { ...Object.fromEntries(LANGS.map((l) => [l, pageUrl(l, path)])), "x-default": pageUrl("en", path) } },
  })));
}
