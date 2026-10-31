// Fill these in the day the listings are live: the badges become real links and the
// big Join button becomes "Get the app" on that phone. Until then it goes to signup.
export const STORE = { ios: "", android: "" };

export const joinHref = (userAgent: string): string =>
  /iPhone|iPad|iPod/.test(userAgent) ? STORE.ios : /Android/.test(userAgent) ? STORE.android : "";
