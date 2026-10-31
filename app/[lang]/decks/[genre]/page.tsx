import { notFound } from "next/navigation";
import { GenrePage } from "@/components/b/Sub";
import { LANGS, type Lang } from "@/lib/langs";
import { breadcrumbs, jsonLd } from "@/lib/schema";
import { meta } from "@/lib/seo";
import { contentFor, messagesFor } from "@/lib/siteContent";

export const dynamicParams = false;
export const generateStaticParams = () => LANGS.flatMap((lang) => contentFor(lang).genres.map((g) => ({ lang, genre: g.slug })));

export async function generateMetadata({ params }: { params: Promise<{ lang: string; genre: string }> }) {
  const { lang, genre } = await params;
  const g = messagesFor(lang as Lang).genres[genre];
  return g ? meta(lang as Lang, `/decks/${genre}`, `${g.seo} | OnPini`, g.intro) : {};
}

export default async function Page({ params }: { params: Promise<{ lang: string; genre: string }> }) {
  const { lang, genre: slug } = await params;
  const c = contentFor(lang as Lang);
  const genre = c.genres.find((g) => g.slug === slug);
  if (!genre) notFound();
  const deck = c.team.find((d) => d.id === genre.playDeck);
  const m = messagesFor(lang as Lang);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbs(lang as Lang, [[m.nav.decks, "/decks"], [m.genres[slug].name, `/decks/${slug}`]]))} />
      <GenrePage genre={genre} playable={deck ? { id: deck.id, title: deck.title } : null} pageLinks={genre.questionPages} />
    </>
  );
}
