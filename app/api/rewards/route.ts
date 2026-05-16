import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireApiUser } from "@/lib/api-auth";

export async function GET() {
  const auth = await requireApiUser();
  if (auth.response) return auth.response;

  const rewards = await prisma.reward.findMany({ orderBy: { cost: "asc" } });

  return NextResponse.json({
    coins: auth.user.coins,
    rewards: rewards.map((r) => ({
      id: r.id,
      title: r.title,
      description: r.description,
      cost: r.cost,
    })),
  });
}
