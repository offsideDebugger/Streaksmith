import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireApiUser } from "@/lib/api-auth";

const habitSelect = {
  id: true,
  title: true,
  frequency: true,
  difficulty: true,
};

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: RouteParams) {
  const auth = await requireApiUser();
  if (auth.response) return auth.response;

  const { id } = await params;
  const body = (await request.json()) as {
    title?: string;
    frequency?: string;
    difficulty?: string;
  };

  if (!body.title && !body.frequency && !body.difficulty) {
    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  }

  const existing = await prisma.habit.findFirst({
    where: { id, userId: auth.user.id },
    select: { id: true },
  });

  if (!existing) {
    return NextResponse.json({ error: "Habit not found" }, { status: 404 });
  }

  const habit = await prisma.habit.update({
    where: { id },
    data: {
      ...(body.title ? { title: body.title } : {}),
      ...(body.frequency ? { frequency: body.frequency } : {}),
      ...(body.difficulty ? { difficulty: body.difficulty } : {}),
    },
    select: habitSelect,
  });

  return NextResponse.json({ habit });
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const auth = await requireApiUser();
  if (auth.response) return auth.response;

  const { id } = await params;

  const existing = await prisma.habit.findFirst({
    where: { id, userId: auth.user.id },
    select: { id: true },
  });

  if (!existing) {
    return NextResponse.json({ error: "Habit not found" }, { status: 404 });
  }

  await prisma.habit.delete({
    where: { id },
  });

  return NextResponse.json({ ok: true });
}
