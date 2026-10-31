"use client";

import { createContext, useContext, useMemo } from "react";

import type { Lang } from "./langs";

export { LANGS, LANG_NAMES, appLink } from "./langs";
export type { Lang } from "./langs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Messages = Record<string, any>;

const Ctx = createContext<{ lang: Lang; messages: Messages }>({ lang: "en", messages: {} });

export function LangProvider({ lang, messages, children }: { lang: Lang; messages: Messages; children: React.ReactNode }) {
  const value = useMemo(() => ({ lang, messages }), [lang, messages]);
    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

const lookup = (messages: Messages, key: string): unknown => key.split(".").reduce<unknown>((o, k) => (o as Messages | undefined)?.[k], messages);

export function useI18n() {
  const { lang, messages } = useContext(Ctx);
  return useMemo(() => {
    const t = (key: string, vars?: Record<string, string | number>) => {
      const value = lookup(messages, key);
      const text = typeof value === "string" ? value : key;
      return vars ? text.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`)) : text;
    };
    /** Lists and objects from the messages. */
    const raw = <T,>(key: string) => lookup(messages, key) as T;
    /** The same page in the visitor's language. English has no prefix. */
    const href = (path: string) => (lang === "en" ? path : `/${lang}${path}`) || "/";
    return { lang, rtl: lang === "ar", t, raw, href };
  }, [lang, messages]);
}
