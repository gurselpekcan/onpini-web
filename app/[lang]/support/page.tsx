import SupportPage from "@/components/b/SupportPage";
import type { Lang } from "@/lib/langs";
import { meta } from "@/lib/seo";
import { messagesFor } from "@/lib/siteContent";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang as Lang;
  const m = messagesFor(lang);
  return meta(lang, "/support", m.support.metaTitle, m.support.metaDesc);
}

export default function Page() {
  return <SupportPage />;
}
