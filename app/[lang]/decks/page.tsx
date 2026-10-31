import { DecksIndex } from "@/components/b/Sub";
import type { Lang } from "@/lib/langs";
import { breadcrumbs, jsonLd } from "@/lib/schema";
import { meta } from "@/lib/seo";
import { contentFor, messagesFor } from "@/lib/siteContent";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang as Lang;
  const m = messagesFor(lang);
  return meta(lang, "/decks", m.decks.metaTitle, m.decks.metaDesc);
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang as Lang;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbs(lang, [[messagesFor(lang).nav.decks, "/decks"]]))} />
      <DecksIndex genres={contentFor(lang).genres} />
    </>
  );
}
