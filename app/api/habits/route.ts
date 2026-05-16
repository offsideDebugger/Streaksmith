import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const userId = "demo-user";
const habitSelect = {
  id: true,
  title: true,
  frequency: true,
  difficulty: true,
};

async function ensureDemoUser() {
  const existing = await prisma.user.findFirst({
    where: { id: userId },
    select: { id: true },
  });
  if (!existing) {
    await prisma.user.create({
      data: {
        id: userId,
        name: "Demo User",
        email: "demo@streaksmith.local",
      },
    });
  }
}

export async function GET() {
  await ensureDemoUser();
  const habits = await prisma.habit.findMany({
    where: { userId },
    orderBy: { id: "desc" },
    select: habitSelect,
  });
  return NextResponse.json({ habits });
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    title?: string;
    frequency?: string;
    difficulty?: string;
  };

  if (!body.title || !body.frequency || !body.difficulty) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await ensureDemoUser();
  const habit = await prisma.habit.create({
    data: {
      title: body.title,
      frequency: body.frequency,
      difficulty: body.difficulty,
      userId,
    },
    select: habitSelect,
  });

  return NextResponse.json({ habit }, { status: 201 });
}
