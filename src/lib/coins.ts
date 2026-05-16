export const DIFFICULTY_COINS: Record<string, number> = {
  easy: 5,
  medium: 10,
  hard: 20,
};

export const STREAK_BONUSES: Record<number, number> = {
  3: 20,
  7: 50,
  30: 300,
};

export const MISSION_REWARD = 50;

export function coinsForDifficulty(difficulty: string) {
  return DIFFICULTY_COINS[difficulty.toLowerCase()] ?? 5;
}

export function streakBonusFor(streak: number) {
  return STREAK_BONUSES[streak] ?? 0;
}
