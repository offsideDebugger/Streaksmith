import { prisma } from "@/lib/prisma";
import { bootstrapApp } from "@/lib/bootstrap";
import { getHabitsWithStatus } from "@/lib/habit-completion";
import { ensureDailyMissions } from "@/lib/missions";
import { getAvailableFreezeCount } from "@/lib/badges";
import { startOfDay } from "@/lib/date";

export async function getDashboardData(userId?: string) {
  const demoUser = await bootstrapApp();
  const resolvedUserId = userId ?? demoUser.id;

  const [user, habits, missions, badges, rewards, heatmapLogs] =
    await Promise.all([
      prisma.user.findUniqueOrThrow({
        where: { id: resolvedUserId },
        select: { coins: true, name: true },
      }),
      getHabitsWithStatus(resolvedUserId),
      ensureDailyMissions(resolvedUserId),
      prisma.badge.findMany({
        orderBy: { slug: "asc" },
        include: {
          userBadges: {
            where: { userId: resolvedUserId },
            orderBy: { earnedAt: "desc" },
          },
        },
      }),
      prisma.reward.findMany({ orderBy: { cost: "asc" } }),
      prisma.habitLog.findMany({
        where: { habit: { userId: resolvedUserId } },
        select: { completedAt: true },
        orderBy: { completedAt: "desc" },
        take: 365,
      }),
    ]);

  const freezeAvailable = await getAvailableFreezeCount(prisma, resolvedUserId);

  const aggregateStreak = habits.reduce(
    (acc, h) => ({
      current: Math.max(acc.current, h.currentStreak),
      longest: Math.max(acc.longest, h.longestStreak),
    }),
    { current: 0, longest: 0 }
  );

  const heatmap = buildHeatmap(heatmapLogs.map((l) => l.completedAt));

  const earnedBadgeSlugs = new Set(
    badges
      .filter((b) => b.userBadges.length > 0)
      .map((b) => b.slug)
  );

  return {
    user: { coins: user.coins, name: user.name },
    habits,
    streak: aggregateStreak,
    freezeAvailable,
    missions: missions.map((m) => ({
      id: m.id,
      title: m.title,
      completed: m.completed,
      slot: m.slot,
    })),
    badges: badges.map((b) => ({
      id: b.id,
      slug: b.slug,
      title: b.title,
      description: b.description,
      type: b.type,
      rarity: b.rarity,
      earned: earnedBadgeSlugs.has(b.slug),
      count: b.userBadges.length,
      availableFreezes:
        b.slug === "streak-freeze"
          ? b.userBadges.filter((ub) => !ub.consumedAt).length
          : 0,
    })),
    rewards: rewards.map((r) => ({
      id: r.id,
      slug: r.slug,
      title: r.title,
      description: r.description,
      cost: r.cost,
    })),
    heatmap,
  };
}

function buildHeatmap(dates: Date[]) {
  const counts = new Map<string, number>();
  for (const d of dates) {
    const key = startOfDay(d).toISOString().slice(0, 10);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  const days: { date: string; count: number }[] = [];
  const today = startOfDay();
  for (let i = 83; i >= 0; i -= 1) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    days.push({ date: key, count: counts.get(key) ?? 0 });
  }

  return days;
}
