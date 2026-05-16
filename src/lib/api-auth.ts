import { NextResponse } from "next/server";
import { bootstrapAppApi } from "@/lib/bootstrap";

export async function requireApiUser() {
  const user = await bootstrapAppApi();
  if (!user) {
    return {
      user: null,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  return { user, response: null };
}
