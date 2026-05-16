import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireApiUser } from "@/lib/api-auth";
import { getHabitsWithStatus } from "@/lib/habit-completion";

const habitSelect = {
  id: true,
  title: true,
  frequency: true,
  difficulty: true,
};

export async function GET() {
  const auth = await requireApiUser();
  if (auth.response) return auth.response;

  const habits = await getHabitsWithStatus(auth.user.id);
  return NextResponse.json({ habits });
}

export async function POST(request: Request) {
  const auth = await requireApiUser();
  if (auth.response) return auth.response;

  const body = (await request.json()) as {
    title?: string;
    frequency?: string;
    difficulty?: string;
  };

  if (!body.title || !body.frequency || !body.difficulty) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const habit = await prisma.habit.create({
    data: {
      title: body.title,
      frequency: body.frequency,
      difficulty: body.difficulty,
      userId: auth.user.id,
    },
    select: habitSelect,
  });

  return NextResponse.json(
    {
      habit: {
        ...habit,
        isCompleted: false,
        currentStreak: 0,
        longestStreak: 0,
      },
    },
    { status: 201 }
  );
}
