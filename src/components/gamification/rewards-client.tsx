"use client";

import { CoinDisplay } from "@/components/gamification/coin-display";
import {
  RewardMarketplace,
  type RewardItem,
} from "@/components/gamification/reward-marketplace";
import { useState } from "react";

type RewardsClientProps = {
  initialCoins: number;
  rewards: RewardItem[];
};

export function RewardsClient({ initialCoins, rewards }: RewardsClientProps) {
  const [coins, setCoins] = useState(initialCoins);

  const redeem = async (rewardId: string) => {
    const res = await fetch(`/api/rewards/${rewardId}/redeem`, { method: "POST" });
    if (!res.ok) return { ok: false };
    const body = (await res.json()) as { coins: number };
    setCoins(body.coins);
    return { ok: true, coins: body.coins };
  };

  return (
    <div className="space-y-6">
      <CoinDisplay coins={coins} size="lg" />
      <RewardMarketplace rewards={rewards} coins={coins} onRedeem={redeem} />
    </div>
  );
}
