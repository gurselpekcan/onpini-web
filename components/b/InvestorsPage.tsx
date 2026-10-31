"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { Arrow } from "./Bits";
import Shell, { Footer } from "./Chrome";

const INTRO = "mailto:hello@onpini.app?subject=Investing%20in%20OnPini";

export default function InvestorsPage() {
  const { t, href } = useI18n();
  return (
    <Shell>
      <main>
        <section className="min-h-[100svh] flex flex-col justify-center px-5 sm:px-10 pt-24 pb-14 max-w-7xl mx-auto">
          <p className="b-tag text-[#c2410c] mb-5 b-rise">{t("investors.tag")}</p>
          <h1 className="b-h text-[clamp(3rem,10.5vw,8.4rem)] leading-[.94]">
            <span className="block b-rise">{t("investors.one")}</span>
            <span className="block b-rise text-[#ea580c]" style={{ animationDelay: ".2s" }}>{t("investors.two")}</span>
          </h1>
          <p className="b-rise text-xl sm:text-2xl leading-snug mt-7 max-w-2xl" style={{ animationDelay: ".4s" }}>{t("investors.line")}</p>
          <p className="b-rise text-lg leading-snug mt-3 max-w-2xl text-[#525252]" style={{ animationDelay: ".48s" }}>{t("investors.who")}</p>
          <div className="b-rise flex flex-wrap items-center gap-x-6 gap-y-3 mt-8" style={{ animationDelay: ".55s" }}>
            <a href={INTRO} className="b-cta b-cta-lift">{t("investors.cta")} <Arrow /></a>
            <Link href={href("/play")} className="font-semibold underline underline-offset-4 min-h-11 inline-flex items-center">{t("investors.playFirst")}</Link>
          </div>
          <p className="b-rise b-h text-[clamp(1.9rem,6vw,3.2rem)] leading-[1.02] mt-10 max-w-3xl" style={{ animationDelay: ".65s" }}>{t("investors.close")}</p>
        </section>
      </main>
      <Footer />
    </Shell>
  );
}
