import { forward } from "@/lib/backend";

export const POST = (req: Request) => forward(req, "/api/v1/support/tickets/status");
