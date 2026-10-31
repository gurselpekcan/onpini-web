"use client";

import { motion } from "motion/react";
import { useI18n } from "@/lib/i18n";
import { Arrow, PageHead } from "./Bits";
import Shell, { Footer } from "./Chrome";
import Emoji from "./Emoji";

const INBOX = "hello@onpini.app";
const TILES = [
  ["account", "#fde047", "1f979"],
  ["bug", "#fda4af", "1f92f"],
  ["safety", "#fb923c", "1f440"],
  ["privacy", "#c4b5fd", "1f633"],
  ["feedback", "#86efac", "2728"],
  ["other", "#7dd3fc", "1f914"],
];

/** No form and no tickets: each tile opens their own mail, already addressed and started. */
export default function SupportPage() {
  const { t } = useI18n();
  const mail = (category: string) => `mailto:${INBOX}?subject=${encodeURIComponent(`OnPini: ${t(`support.categories.${category}`)}`)}&body=${encodeURIComponent(`${t("support.hi")}\n\n`)}`;
  return (
    <Shell>
      <main>
        <PageHead title={t("support.title")} line={t("support.line")} />
        <section className="px-4 sm:px-10 pb-12 max-w-4xl mx-auto relative">
          <ul className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
            {TILES.map(([id, color, emoji], i) => (
              <motion.li key={id} initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 260, damping: 22, delay: i * 0.05 }}>
                <motion.a href={mail(id)} whileTap={{ scale: 0.96 }} style={{ background: color }} className="h-full min-h-[10.5rem] sm:min-h-[12.5rem] rounded-[26px] p-3.5 sm:p-5 flex flex-col justify-between gap-4 text-[#111]">
                  <Emoji code={emoji} size={52} />
                  <span className="b-h text-[clamp(1.4rem,6vw,2.3rem)] leading-[1.03] break-words min-w-0">{t(`support.categories.${id}`)} <Arrow /></span>
                </motion.a>
              </motion.li>
            ))}
          </ul>
          <p className="b-h text-[clamp(1.9rem,7vw,3rem)] leading-[1.04] mt-9">{t("support.who")}</p>
          <p className="text-[1.1rem] mt-4">
            <a href="https://ig.me/m/onpini.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-11 font-bold underline underline-offset-4">{t("support.dm")}</a>
          </p>
          <p className="text-[1.05rem] text-[#525252]">{t("support.noMail")} <a href={`mailto:${INBOX}`} dir="ltr" className="inline-flex items-center min-h-11 font-semibold text-[#111] underline underline-offset-4">{INBOX}</a></p>
        </section>
      </main>
      <Footer />
    </Shell>
  );
}
