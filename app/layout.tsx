import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: "OnPini — your takes, your network",
  description: "The social network where your opinions are your profile. Swipe minds, not faces.",
  metadataBase: new URL("https://onpini.com"),
  openGraph: {
    title: "OnPini — your takes, your network",
    description: "The social network where your opinions are your profile.",
    url: "https://onpini.com",
    siteName: "OnPini",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OnPini — your takes, your network",
    description: "The social network where your opinions are your profile.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen flex flex-col bg-cream text-ink font-[var(--font-inter)]">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollReveal />
      </body>
    </html>
  );
}
