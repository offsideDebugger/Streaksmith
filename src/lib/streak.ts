import { daysBetween, endOfDay, startOfDay } from "@/lib/date";

export type StreakUpdateInput = {
  current: number;
  longest: number;
  lastCompleted: Date | null;
};

export type StreakUpdateResult = StreakUpdateInput & {
  increased: boolean;
  reset: boolean;
};

export function computeNextStreak(
  streak: StreakUpdateInput,
  completedAt: Date,
  useFreeze: boolean
): StreakUpdateResult {
  const today = startOfDay(completedAt);

  if (!streak.lastCompleted) {
    const current = 1;
    return {
      current,
      longest: Math.max(streak.longest, current),
      lastCompleted: completedAt,
      increased: true,
      reset: false,
    };
  }

  const gap = daysBetween(streak.lastCompleted, completedAt);

  if (gap <= 0) {
    return { ...streak, increased: false, reset: false };
  }

  if (gap === 1) {
    const current = streak.current + 1;
    return {
      current,
      longest: Math.max(streak.longest, current),
      lastCompleted: completedAt,
      increased: true,
      reset: false,
    };
  }

  if (gap === 2 && useFreeze) {
    const current = streak.current + 1;
    return {
      current,
      longest: Math.max(streak.longest, current),
      lastCompleted: completedAt,
      increased: true,
      reset: false,
    };
  }

  const current = 1;
  return {
    current,
    longest: Math.max(streak.longest, current),
    lastCompleted: completedAt,
    increased: false,
    reset: true,
  };
}

export function isCompletedToday(lastCompleted: Date | null, now = new Date()) {
  if (!lastCompleted) return false;
  return (
    lastCompleted >= startOfDay(now) && lastCompleted <= endOfDay(now)
  );
}
