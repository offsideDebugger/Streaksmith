import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireApiUser } from "@/lib/api-auth";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function POST(_request: Request, { params }: RouteParams) {
  const auth = await requireApiUser();
  if (auth.response) return auth.response;

  const { id: rewardId } = await params;

  const reward = await prisma.reward.findUnique({ where: { id: rewardId } });
  if (!reward) {
    return NextResponse.json({ error: "Reward not found" }, { status: 404 });
  }

  if (auth.user.coins < reward.cost) {
    return NextResponse.json(
      { error: "Not enough coins" },
      { status: 400 }
    );
  }

  const result = await prisma.$transaction(async (tx) => {
    const updated = await tx.user.update({
      where: { id: auth.user.id },
      data: { coins: { decrement: reward.cost } },
      select: { coins: true },
    });

    await tx.redemption.create({
      data: {
        userId: auth.user.id,
        rewardId: reward.id,
      },
    });

    return updated;
  });

  return NextResponse.json({
    ok: true,
    coins: result.coins,
    reward: {
      id: reward.id,
      title: reward.title,
      cost: reward.cost,
    },
  });
}
