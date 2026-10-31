import { notFound } from "next/navigation";
import { QuestionsPageView } from "@/components/b/Questions";
import { LANGS, type Lang } from "@/lib/langs";
import { breadcrumbs, jsonLd } from "@/lib/schema";
import { meta } from "@/lib/seo";
import { contentFor, messagesFor } from "@/lib/siteContent";

export const dynamicParams = false;
export const generateStaticParams = () => LANGS.flatMap((lang) => contentFor(lang).questions.map((p) => ({ lang, slug: p.slug })));

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const q = messagesFor(lang as Lang).qp[slug];
  const page = contentFor(lang as Lang).questions.find((p) => p.slug === slug);
  return q && page ? meta(lang as Lang, `/questions/${slug}`, `${q.h1.replace("{n}", String(page.q.length))} | OnPini`, q.desc) : {};
}

export default async function Page({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const all = contentFor(lang as Lang).questions;
  const page = all.find((p) => p.slug === slug);
  if (!page) notFound();
  const list = { "@context": "https://schema.org", "@type": "ItemList", name: slug, itemListElement: page.q.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.q })) };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(list).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbs(lang as Lang, [[messagesFor(lang as Lang).nav.questions, "/questions"], [messagesFor(lang as Lang).qp[slug].link, `/questions/${slug}`]]))} />
      <QuestionsPageView page={page} others={all.filter((p) => p.slug !== slug).map((p) => p.slug)} />
    </>
  );
}
