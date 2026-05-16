import { prisma } from "@/lib/prisma";
import { MISSION_REWARD } from "@/lib/coins";
import { startOfDay, toDateKey } from "@/lib/date";

const MISSION_POOL = [
  "Drink 8 glasses of water",
  "Read for 20 minutes",
  "Walk 5000 steps",
  "Meditate for 10 minutes",
  "Stretch for 5 minutes",
  "Journal one page",
  "No social media for 1 hour",
  "Eat a healthy breakfast",
  "Tidy your workspace",
  "Send a thank-you message",
] as const;

function hashSeed(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function pickMissions(userId: string, dateKey: string) {
  const seed = hashSeed(`${userId}:${dateKey}`);
  const indices = MISSION_POOL.map((_, i) => i);
  for (let i = indices.length - 1; i > 0; i -= 1) {
    const j = (seed + i * 17) % (i + 1);
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices.slice(0, 3).map((i) => MISSION_POOL[i]);
}

export async function ensureDailyMissions(userId: string, date = new Date()) {
  const missionDate = startOfDay(date);
  const dateKey = toDateKey(date);

  const existing = await prisma.dailyMission.findMany({
    where: { userId, missionDate },
    orderBy: { slot: "asc" },
  });

  if (existing.length >= 3) return existing;

  const titles = pickMissions(userId, dateKey);
  const missions = await Promise.all(
    titles.map((title, slot) =>
      prisma.dailyMission.upsert({
        where: {
          userId_missionDate_slot: { userId, missionDate, slot },
        },
        create: { userId, title, missionDate, slot },
        update: { title },
      })
    )
  );

  return missions;
}

export async function completeMission(userId: string, missionId: string) {
  const mission = await prisma.dailyMission.findFirst({
    where: { id: missionId, userId },
  });

  if (!mission || mission.completed) {
    return { ok: false as const, error: "Mission not found or already done" };
  }

  const result = await prisma.$transaction(async (tx) => {
    const updated = await tx.dailyMission.update({
      where: { id: missionId },
      data: { completed: true, completedAt: new Date() },
    });

    const user = await tx.user.update({
      where: { id: userId },
      data: { coins: { increment: MISSION_REWARD } },
      select: { coins: true },
    });

    return { mission: updated, coins: user.coins };
  });

  return { ok: true as const, ...result, coinsEarned: MISSION_REWARD };
}
