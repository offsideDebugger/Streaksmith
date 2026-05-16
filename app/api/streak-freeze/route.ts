import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireApiUser } from "@/lib/api-auth";
import { getAvailableFreezeCount } from "@/lib/badges";

export async function GET() {
  const auth = await requireApiUser();
  if (auth.response) return auth.response;

  const available = await getAvailableFreezeCount(prisma, auth.user.id);
  return NextResponse.json({ available });
}
