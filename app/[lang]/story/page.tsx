import StoryPage from "@/components/b/StoryPage";
import type { Lang } from "@/lib/langs";
import { breadcrumbs, jsonLd } from "@/lib/schema";
import { meta, pageUrl } from "@/lib/seo";
import { messagesFor } from "@/lib/siteContent";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang as Lang;
  const m = messagesFor(lang);
  return meta(lang, "/story", m.story.metaTitle, m.story.metaDesc);
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang as Lang;
  const m = messagesFor(lang);
  const about = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: pageUrl(lang, "/story"),
    name: m.story.metaTitle,
    description: m.story.metaDesc,
    about: { "@id": "https://onpini.app/#org" },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(about)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbs(lang, [[m.nav.story, "/story"]]))} />
      <StoryPage />
    </>
  );
}
