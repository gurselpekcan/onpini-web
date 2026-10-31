import { Suspense } from "react";
import PlayPage from "@/components/b/PlayPage";
import type { Lang } from "@/lib/langs";
import { meta } from "@/lib/seo";
import { contentFor, messagesFor } from "@/lib/siteContent";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang as Lang;
  const m = messagesFor(lang);
  return meta(lang, "/play", m.playPage.metaTitle, m.playPage.pickSub);
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang as Lang;
  return <Suspense><PlayPage decks={contentFor(lang).team} /></Suspense>;
}
