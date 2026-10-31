import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Bricolage_Grotesque, IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import { LangProvider } from "@/lib/i18n";
import { LANGS, type Lang } from "@/lib/langs";
import { messagesFor } from "@/lib/siteContent";
import "../globals.css";
import "./b.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], axes: ["wdth"], variable: "--font-b-display" });
const sans = Inter({ subsets: ["latin"], variable: "--font-b-sans" });
const arabic = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "600", "700"], variable: "--font-b-arabic", preload: false });

export const metadata: Metadata = {
  title: "OnPini",
  metadataBase: new URL("https://onpini.app"),
  icons: { icon: [{ url: "/favicon.ico", sizes: "256x256" }, { url: "/icon.svg", type: "image/svg+xml" }] },
  // Only a preview build stays out of search. The real site never sets this.
  ...(process.env.SITE_PREVIEW === "1" ? { robots: { index: false, follow: false } } : {}),
};

export const dynamicParams = false;
export const generateStaticParams = () => LANGS.map((lang) => ({ lang }));

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!LANGS.includes(lang as Lang)) notFound();
  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} className={`${display.variable} ${sans.variable} ${lang === "ar" ? arabic.variable : ""}`}>
      <body>
        <LangProvider lang={lang as Lang} messages={messagesFor(lang as Lang)}>{children}</LangProvider>
      </body>
    </html>
  );
}
