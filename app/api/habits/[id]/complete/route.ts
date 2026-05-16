import { NextResponse } from "next/server";
import { completeHabit } from "@/lib/habit-completion";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function POST(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const body = (await request.json().catch(() => ({}))) as {
    useFreeze?: boolean;
    forceWithoutFreeze?: boolean;
  };

  const result = await completeHabit(id, {
    useFreeze: body.useFreeze,
    forceWithoutFreeze: body.forceWithoutFreeze,
  });

  if (!result.ok) {
    return NextResponse.json(
      {
        error: result.error,
        ...("needsFreeze" in result && result.needsFreeze
          ? { needsFreeze: true }
          : {}),
      },
      { status: result.status }
    );
  }

  return NextResponse.json(result);
}
