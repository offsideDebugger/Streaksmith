import { prisma } from "@/lib/prisma";

const BADGES = [
  {
    slug: "first-step",
    title: "First Step",
    description: "Complete your first habit",
    type: "achievement",
    rarity: "common",
  },
  {
    slug: "3-day-warrior",
    title: "3 Day Warrior",
    description: "Reach a 3-day streak",
    type: "achievement",
    rarity: "uncommon",
  },
  {
    slug: "7-day-beast",
    title: "7 Day Beast",
    description: "Reach a 7-day streak",
    type: "achievement",
    rarity: "rare",
  },
  {
    slug: "30-day-machine",
    title: "30 Day Machine",
    description: "Reach a 30-day streak",
    type: "achievement",
    rarity: "legendary",
  },
  {
    slug: "streak-freeze",
    title: "Streak Freeze",
    description: "Protect your streak for one missed day",
    type: "utility",
    rarity: "rare",
  },
] as const;

const REWARDS = [
  {
    slug: "profile-badge",
    title: "Profile badge",
    description: "Unlock a profile badge for your account",
    cost: 150,
  },
  {
    slug: "theme-unlock",
    title: "Theme unlock",
    description: "Unlock an exclusive dashboard theme",
    cost: 300,
  },
  {
    slug: "mystery-reward",
    title: "Mystery reward",
    description: "A surprise reward — could be anything",
    cost: 500,
  },
  {
    slug: "amazon-voucher",
    title: "Amazon voucher",
    description: "Redeem for a $10 Amazon gift card",
    cost: 1000,
  },
] as const;

export async function ensureCatalog() {
  for (const badge of BADGES) {
    await prisma.badge.upsert({
      where: { slug: badge.slug },
      create: badge,
      update: {
        title: badge.title,
        description: badge.description,
        type: badge.type,
        rarity: badge.rarity,
      },
    });
  }

  for (const reward of REWARDS) {
    await prisma.reward.upsert({
      where: { slug: reward.slug },
      create: reward,
      update: {
        title: reward.title,
        description: reward.description,
        cost: reward.cost,
      },
    });
  }
}

export type BadgeSlug = (typeof BADGES)[number]["slug"];
