import { NextResponse } from "next/server";
import { requireApiUser } from "@/lib/api-auth";
import { ensureDailyMissions, completeMission } from "@/lib/missions";

export async function GET() {
  const auth = await requireApiUser();
  if (auth.response) return auth.response;

  const missions = await ensureDailyMissions(auth.user.id);
  return NextResponse.json({
    missions: missions.map((m) => ({
      id: m.id,
      title: m.title,
      completed: m.completed,
      slot: m.slot,
    })),
  });
}

export async function POST(request: Request) {
  const auth = await requireApiUser();
  if (auth.response) return auth.response;

  const body = (await request.json()) as { missionId?: string };

  if (!body.missionId) {
    return NextResponse.json({ error: "missionId required" }, { status: 400 });
  }

  const result = await completeMission(auth.user.id, body.missionId);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json(result);
}
