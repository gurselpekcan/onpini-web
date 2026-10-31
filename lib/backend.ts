// The form talks to this site's server, which talks to the API, so the API address and
// the visitor's real IP handling stay on the server.
const API = process.env.ONPINI_API_URL || "http://127.0.0.1:8000";

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
