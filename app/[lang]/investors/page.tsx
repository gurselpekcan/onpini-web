import InvestorsPage from "@/components/b/InvestorsPage";
import type { Lang } from "@/lib/langs";
import { meta } from "@/lib/seo";
import { messagesFor } from "@/lib/siteContent";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang as Lang;
  const m = messagesFor(lang);
  return meta(lang, "/investors", m.investors.metaTitle, m.investors.line);
}

export default function Page() {
  return <InvestorsPage />;
}
