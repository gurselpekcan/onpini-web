import Link from "next/link";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import "./[lang]/b.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], axes: ["wdth"], variable: "--font-b-display" });
const sans = Inter({ subsets: ["latin"], variable: "--font-b-sans" });

export const metadata = { title: "Nothing here. Yet. | OnPini", robots: { index: false } };

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
    <main style={{ fontFamily: "var(--font-b-sans), system-ui, sans-serif" }} className={`${display.variable} ${sans.variable} min-h-[100svh] flex flex-col justify-center px-5 sm:px-10 bg-[#111] text-white`}>
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="b-h text-[clamp(3.2rem,14.5vw,8rem)] leading-[.94]">Nothing here. <span className="block text-[#f97316]">Yet.</span></h1>
        <p className="text-[1.2rem] sm:text-2xl leading-snug mt-5">This page doesn’t exist. Your people do.</p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-7">
          <Link href="/" className="inline-flex items-center min-h-[60px] rounded-full bg-[#fde047] text-[#111] font-bold px-7">Back to OnPini</Link>
          <Link href="/decks" className="inline-flex items-center min-h-11 font-semibold underline underline-offset-4">See the decks</Link>
        </div>
      </div>
    </main>
      </body>
    </html>
  );
}
