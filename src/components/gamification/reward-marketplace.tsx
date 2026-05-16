"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";

export type RewardItem = {
  id: string;
  title: string;
  description: string;
  cost: number;
};

type RewardMarketplaceProps = {
  rewards: RewardItem[];
  coins: number;
  onRedeem?: (rewardId: string) => Promise<{ ok: boolean; coins?: number }>;
};

export function RewardMarketplace({
  rewards,
  coins,
  onRedeem,
}: RewardMarketplaceProps) {
  const [balance, setBalance] = useState(coins);
  const [redeeming, setRedeeming] = useState<string | null>(null);

  const handleRedeem = async (reward: RewardItem) => {
    if (!onRedeem || balance < reward.cost || redeeming) return;
    setRedeeming(reward.id);
    const result = await onRedeem(reward.id);
    if (result.ok && result.coins !== undefined) {
      setBalance(result.coins);
    }
    setRedeeming(null);
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {rewards.map((reward) => {
        const canAfford = balance >= reward.cost;
        return (
          <Card
            key={reward.id}
            className={cn(
              "transition hover:-translate-y-0.5",
              !canAfford && "opacity-75"
            )}
          >
            <CardHeader>
              <CardTitle className="text-lg">{reward.title}</CardTitle>
              <CardDescription>{reward.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-sm font-semibold text-[color:var(--warning)]">
                {reward.cost} coins
              </span>
              <Button
                size="sm"
                disabled={!canAfford || redeeming === reward.id}
                onClick={() => handleRedeem(reward)}
              >
                {redeeming === reward.id
                  ? "Redeeming..."
                  : canAfford
                  ? "Redeem"
                  : "Need more coins"}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
