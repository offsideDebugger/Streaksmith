import type { Prisma, PrismaClient } from "@prisma/client";
import type { BadgeSlug } from "@/lib/catalog";

type Db = PrismaClient | Prisma.TransactionClient;

export async function awardBadge(
  db: Db,
  userId: string,
  slug: BadgeSlug
) {
  const badge = await db.badge.findUnique({ where: { slug } });
  if (!badge) return null;

  if (slug !== "streak-freeze") {
    const existing = await db.userBadge.findFirst({
      where: { userId, badgeId: badge.id },
    });
    if (existing) return null;
  }

  return db.userBadge.create({
    data: { userId, badgeId: badge.id },
    include: { badge: true },
  });
}

export async function awardStreakBadges(
  db: Db,
  userId: string,
  streak: number,
  isFirstCompletion: boolean
) {
  const earned: string[] = [];

  if (isFirstCompletion) {
    const row = await awardBadge(db, userId, "first-step");
    if (row) earned.push(row.badge.title);
  }

  if (streak === 3) {
    const row = await awardBadge(db, userId, "3-day-warrior");
    if (row) earned.push(row.badge.title);
  }

  if (streak === 7) {
    const row = await awardBadge(db, userId, "7-day-beast");
    if (row) earned.push(row.badge.title);
  }

  if (streak === 30) {
    const row = await awardBadge(db, userId, "30-day-machine");
    if (row) earned.push(row.badge.title);
  }

  if (streak > 0 && streak % 7 === 0) {
    const row = await awardBadge(db, userId, "streak-freeze");
    if (row) earned.push(row.badge.title);
  }

  return earned;
}

export async function getAvailableFreezeCount(db: Db, userId: string) {
  const badge = await db.badge.findUnique({
    where: { slug: "streak-freeze" },
  });
  if (!badge) return 0;

  return db.userBadge.count({
    where: {
      userId,
      badgeId: badge.id,
      consumedAt: null,
    },
  });
}

export async function consumeStreakFreeze(db: Db, userId: string) {
  const badge = await db.badge.findUnique({
    where: { slug: "streak-freeze" },
  });
  if (!badge) return false;

  const freeze = await db.userBadge.findFirst({
    where: { userId, badgeId: badge.id, consumedAt: null },
    orderBy: { earnedAt: "asc" },
  });

  if (!freeze) return false;

  await db.userBadge.update({
    where: { id: freeze.id },
    data: { consumedAt: new Date() },
  });

  return true;
}
