import { RewardsClient } from "@/components/gamification/rewards-client";
import { bootstrapApp } from "@/lib/bootstrap";
import { prisma } from "@/lib/prisma";

export default async function RewardsPage() {
  const user = await bootstrapApp();

  const rewards = await prisma.reward.findMany({ orderBy: { cost: "asc" } });

  return (
    <div className="animate-fade-in flex flex-col gap-6">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-3)]">
          Rewards
        </p>
        <h1 className="text-3xl font-semibold text-[color:var(--text-1)]">
          Reward marketplace
        </h1>
        <p className="max-w-2xl text-sm text-[color:var(--text-2)]">
          Spend coins on profile upgrades, themes, and more.
        </p>
      </header>
      <RewardsClient
        initialCoins={user.coins}
        rewards={rewards.map((r) => ({
          id: r.id,
          title: r.title,
          description: r.description,
          cost: r.cost,
        }))}
      />
    </div>
  );
}
