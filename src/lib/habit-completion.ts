import { prisma } from "@/lib/prisma";
import {
  awardStreakBadges,
  consumeStreakFreeze,
  getAvailableFreezeCount,
} from "@/lib/badges";
import { coinsForDifficulty, streakBonusFor } from "@/lib/coins";
import { endOfDay, startOfDay } from "@/lib/date";
import {
  computeNextStreak,
  isCompletedToday,
} from "@/lib/streak";
import { bootstrapApp } from "@/lib/bootstrap";

export async function completeHabit(
  habitId: string,
  options?: { useFreeze?: boolean; forceWithoutFreeze?: boolean }
) {
  const { id: userId } = await bootstrapApp();
  const useFreeze = options?.useFreeze ?? false;

  const habit = await prisma.habit.findFirst({
    where: { id: habitId, userId },
    include: { streak: true },
  });

  if (!habit) {
    return { ok: false as const, status: 404, error: "Habit not found" };
  }

  const todayStart = startOfDay();
  const todayEnd = endOfDay();

  const existingLog = await prisma.habitLog.findFirst({
    where: {
      habitId,
      completedAt: { gte: todayStart, lte: todayEnd },
    },
  });

  if (existingLog) {
    return {
      ok: false as const,
      status: 409,
      error: "Already completed today",
    };
  }

  const streakRow = habit.streak ?? {
    current: 0,
    longest: 0,
    lastCompleted: null,
  };

  const gap =
    streakRow.lastCompleted
      ? Math.round(
          (startOfDay().getTime() - startOfDay(streakRow.lastCompleted).getTime()) /
            (24 * 60 * 60 * 1000)
        )
      : 0;

  if (gap === 2 && !useFreeze && !options?.forceWithoutFreeze) {
    const available = await getAvailableFreezeCount(prisma, userId);
    if (available > 0) {
      return {
        ok: false as const,
        status: 422,
        error: "Missed yesterday — use a streak freeze?",
        needsFreeze: true,
      };
    }
  }

  let freezeUsed = false;
  if (useFreeze && gap === 2) {
    freezeUsed = await consumeStreakFreeze(prisma, userId);
    if (!freezeUsed) {
      return {
        ok: false as const,
        status: 400,
        error: "No streak freeze available",
      };
    }
  }

  const nextStreak = computeNextStreak(
    {
      current: streakRow.current,
      longest: streakRow.longest,
      lastCompleted: streakRow.lastCompleted,
    },
    new Date(),
    freezeUsed
  );

  const totalCompletions = await prisma.habitLog.count({
    where: { habit: { userId } },
  });
  const isFirstCompletion = totalCompletions === 0;

  const baseCoins = coinsForDifficulty(habit.difficulty);
  const bonusCoins = streakBonusFor(nextStreak.current);
  const coinsEarned = baseCoins + bonusCoins;

  const result = await prisma.$transaction(async (tx) => {
    await tx.habitLog.create({
      data: { habitId },
    });

    await tx.streak.upsert({
      where: { habitId },
      create: {
        habitId,
        current: nextStreak.current,
        longest: nextStreak.longest,
        lastCompleted: nextStreak.lastCompleted,
      },
      update: {
        current: nextStreak.current,
        longest: nextStreak.longest,
        lastCompleted: nextStreak.lastCompleted,
      },
    });

    const user = await tx.user.update({
      where: { id: userId },
      data: { coins: { increment: coinsEarned } },
      select: { coins: true },
    });

    const earnedBadges = await awardStreakBadges(
      tx,
      userId,
      nextStreak.current,
      isFirstCompletion
    );

    return { user, earnedBadges };
  });

  return {
    ok: true as const,
    habit: {
      id: habit.id,
      title: habit.title,
      frequency: habit.frequency,
      difficulty: habit.difficulty,
      isCompleted: true,
      currentStreak: nextStreak.current,
      longestStreak: nextStreak.longest,
    },
    streak: {
      current: nextStreak.current,
      longest: nextStreak.longest,
      increased: nextStreak.increased,
      reset: nextStreak.reset,
    },
    coinsEarned,
    coins: result.user.coins,
    earnedBadges: result.earnedBadges,
    freezeUsed,
  };
}

export async function getHabitsWithStatus(userId: string) {
  const todayStart = startOfDay();
  const todayEnd = endOfDay();

  const habits = await prisma.habit.findMany({
    where: { userId },
    orderBy: { id: "desc" },
    include: {
      streak: true,
      logs: {
        where: { completedAt: { gte: todayStart, lte: todayEnd } },
        take: 1,
      },
    },
  });

  return habits.map((habit) => ({
    id: habit.id,
    title: habit.title,
    frequency: habit.frequency,
    difficulty: habit.difficulty,
    isCompleted:
      habit.logs.length > 0 ||
      isCompletedToday(habit.streak?.lastCompleted ?? null),
    currentStreak: habit.streak?.current ?? 0,
    longestStreak: habit.streak?.longest ?? 0,
  }));
}
