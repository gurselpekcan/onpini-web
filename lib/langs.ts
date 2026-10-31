// Shared by server and browser.
export const LANGS = ["en", "nl", "de", "es", "ar"] as const;
export type Lang = (typeof LANGS)[number];
export const LANG_NAMES: Record<Lang, string> = { en: "English", nl: "Nederlands", de: "Deutsch", es: "Español", ar: "العربية" };

/** The app's signup and sign-in screens, opening in the language they were reading. */
export const appLink = (screen: "signup" | "login", lang: string, medium: string) =>
  `https://web.onpini.com/${screen}?lang=${lang}&utm_source=site&utm_medium=${medium}`;
