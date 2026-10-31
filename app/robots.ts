import type { MetadataRoute } from "next";

// Only a preview build stays out of search.
export default function robots(): MetadataRoute.Robots {
  if (process.env.SITE_PREVIEW === "1") return { rules: { userAgent: "*", disallow: "/" } };
  // Every crawler is welcome on the marketing site: search, AI and app-store bots alike (founder, 2026-10-31).
  return { rules: { userAgent: "*", allow: "/", disallow: "/api/" }, sitemap: "https://onpini.app/sitemap.xml", host: "https://onpini.app" };
}
