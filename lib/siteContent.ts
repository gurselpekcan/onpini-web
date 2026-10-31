import type { Lang } from "./langs";
import ar from "./content/ar.json";
import de from "./content/de.json";
import en from "./content/en.json";
import es from "./content/es.json";
import nl from "./content/nl.json";
import mAr from "../messages/ar.json";
import mDe from "../messages/de.json";
import mEn from "../messages/en.json";
import mEs from "../messages/es.json";
import mNl from "../messages/nl.json";

// Server side only, so a page sends just its own language and the cards it needs.
export interface Card { q: string; a: string; b: string }
export interface TeamCard extends Card { team: "a" | "b"; why: string }
export interface TeamDeck { id: string; tag: string; color: string; emoji: string; title: string; cards: TeamCard[] }
export interface QuestionPage { slug: string; playDeck: string | null; q: Card[] }
export interface GenreDeck { id: string; title: string; cards: number; q: string }
export interface Genre { slug: string; playDeck: string | null; emoji: string; color: string; questionPages: string[]; decks: GenreDeck[] }
export interface Content {
  team: TeamDeck[];
  questions: QuestionPage[];
  genres: Genre[];
  tabDecks: Record<string, string[]>;
  samples: { forgive: Card; met: Card; poll: Card; deal: string[]; opinion: Card; cases: string[] };
  marquee: string[];
}

const CONTENT = { en, nl, de, es, ar } as unknown as Record<Lang, Content>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MESSAGES = { en: mEn, nl: mNl, de: mDe, es: mEs, ar: mAr } as Record<Lang, any>;

export const contentFor = (lang: Lang): Content => CONTENT[lang] ?? CONTENT.en;
export const messagesFor = (lang: Lang) => MESSAGES[lang] ?? MESSAGES.en;
