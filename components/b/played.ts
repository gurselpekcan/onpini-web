import { useEffect, useState } from "react";

// What happened on the play page, so the site can pick up where they left off.
// Lives in this tab only, and nothing leaves the browser.
export interface Played {
  same: number;
  total: number;
  who: string | null;
}

const KEY = "onpini-site-played";

export const savePlayed = (played: Played) => {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(played));
  } catch {
    /* private mode: the site just reads as if they hadn't played */
  }
};

export const usePlayed = (): Played | null => {
  const [played, setPlayed] = useState<Played | null>(null);
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(KEY);
      if (raw) setPlayed(JSON.parse(raw) as Played);
    } catch {
      /* nothing to pick up */
    }
  }, []);
  return played;
};
