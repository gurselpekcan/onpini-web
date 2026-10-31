import { forwardGet } from "@/lib/backend";

export const dynamic = "force-dynamic";
export const GET = () => forwardGet("/api/v1/creator-claims/spots");
