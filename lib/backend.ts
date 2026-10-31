// The form talks to this site's server, which talks to the API, so the API address and
// the visitor's real IP handling stay on the server.
const API = process.env.ONPINI_API_URL || "https://api.onpini.com";

export const forward = async (req: Request, path: string) => {
  try {
    const body = await req.text();
    const res = await fetch(`${API}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Forwarded-For": req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for") || "" },
      body,
      cache: "no-store",
    });
    return new Response(await res.text(), { status: res.status, headers: { "Content-Type": "application/json" } });
  } catch {
    return Response.json({ detail: "unavailable" }, { status: 503 });
  }
};

const read = async (path: string) => {
  const res = await fetch(`${API}${path}`, { cache: "no-store" });
  return new Response(await res.text(), { status: res.status, headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=60" } });
};

export const forwardGet = (path: string) => read(path).catch(() => Response.json({ detail: "unavailable" }, { status: 503 }));

// A form on this site shares one address towards the API, so the per-visitor limit lives here.
const WINDOW_MS = 60 * 60 * 1000;
const hits = new Map<string, number[]>();

export const overLimit = (req: Request, max: number): boolean => {
  const ip = req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.size > 5000) hits.clear();
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > max;
};
