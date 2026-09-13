import { type NextRequest } from "next/server";
import { updateSession } from "@/Lib/SupabaseProxy";

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: ["/Dashboard/:path*"],
};