import Home from "@/components/b/Home";
import { LANGS, type Lang } from "@/lib/langs";
import { meta } from "@/lib/seo";
import { contentFor, messagesFor } from "@/lib/siteContent";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang as Lang;
  const m = messagesFor(lang);
  return meta(lang, "", m.hero.metaTitle, m.how.metaDesc);
}

// What the page is, for search engines and AI assistants. Everything here is also on the site.
const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": "https://onpini.app/#org", name: "OnPini", legalName: "GPM Holding B.V.", url: "https://onpini.app", logo: "https://onpini.app/icon.svg", email: "hello@onpini.app", sameAs: ["https://www.instagram.com/onpini.app/", "https://www.tiktok.com/@onpini.app"], address: { "@type": "PostalAddress", addressLocality: "The Hague", addressCountry: "NL" } },
    { "@type": "WebSite", "@id": "https://onpini.app/#site", url: "https://onpini.app", name: "OnPini", inLanguage: LANGS, publisher: { "@id": "https://onpini.app/#org" } },
    { "@type": "WebApplication", name: "OnPini", url: "https://web.onpini.com", applicationCategory: "SocialNetworkingApplication", operatingSystem: "Any", browserRequirements: "Requires a modern web browser", description: "OnPini is the free social game you play with the people you know. You answer a deck of ten cards, send a link to one person or a group chat, and neither of you sees the other's answers until you have both answered. It has 61 decks and more than 5,000 questions, is for people aged 16 and over, is not a dating app and never matches strangers.", offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" }, publisher: { "@id": "https://onpini.app/#org" } },
  ],
};

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang as Lang;
  const c = contentFor(lang);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA).replace(/</g, "\\u003c") }} />
      <Home decks={c.team} cases={c.samples.cases} />
    </>
  );
}
