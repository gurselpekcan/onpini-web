import { forward, overLimit } from "@/lib/backend";

export const POST = (req: Request) =>
  overLimit(req, 5) ? Response.json({ detail: "too_many" }, { status: 429 }) : forward(req, "/api/v1/creator-claims");
