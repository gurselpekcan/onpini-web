import type { Lang } from "./langs";
import { pageUrl } from "./seo";

/** Where a page sits in the site, for search results. Home is always the first step. */
export const breadcrumbs = (lang: Lang, steps: [string, string][]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [["OnPini", ""], ...steps].map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: pageUrl(lang, path) })),
});

export const jsonLd = (data: unknown) => ({ __html: JSON.stringify(data).replace(/</g, "\\u003c") });
