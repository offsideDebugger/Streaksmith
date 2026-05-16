"use client";

import { BadgeGrid, type BadgeItem } from "@/components/gamification/badge-grid";
import { CoinDisplay } from "@/components/gamification/coin-display";
import { Heatmap } from "@/components/gamification/heatmap";
import { MissionList, type MissionItem } from "@/components/gamification/mission-list";
import { RewardMarketplace, type RewardItem } from "@/components/gamification/reward-marketplace";
import { StreakStats } from "@/components/gamification/streak-stats";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export type DashboardPayload = {
  user: { coins: number; name: string };
  streak: { current: number; longest: number };
  freezeAvailable: number;
  missions: MissionItem[];
  badges: BadgeItem[];
  rewards: RewardItem[];
  heatmap: { date: string; count: number }[];
};

export function MainDashboard({ data }: { data: DashboardPayload }) {
  const router = useRouter();
  const [coins, setCoins] = useState(data.user.coins);
  const [streak, setStreak] = useState(data.streak);
  const [missions, setMissions] = useState(data.missions);
  const [streakBump] = useState(false);

  const refresh = useCallback(() => router.refresh(), [router]);

  const completeMission = async (missionId: string) => {
    const res = await fetch("/api/missions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ missionId }),
    });
    if (!res.ok) return;
    const body = (await res.json()) as { coins: number };
    setCoins(body.coins);
    setMissions((prev) =>
      prev.map((m) => (m.id === missionId ? { ...m, completed: true } : m))
    );
  };

  const redeemReward = async (rewardId: string) => {
    const res = await fetch(`/api/rewards/${rewardId}/redeem`, { method: "POST" });
    if (!res.ok) return { ok: false };
    const body = (await res.json()) as { coins: number };
    setCoins(body.coins);
    return { ok: true, coins: body.coins };
  };

  const previewRewards = data.rewards.slice(0, 2);

  return (
    <div className="animate-fade-in space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-3)]">
            Dashboard
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-[color:var(--text-1)]">
            Welcome back
          </h1>
          <p className="text-sm text-[color:var(--text-2)]">
            Track streaks, earn coins, and stay consistent.
          </p>
        </div>
        <CoinDisplay coins={coins} size="lg" />
      </header>

      <StreakStats
        current={streak.current}
        longest={streak.longest}
        animate={streakBump}
      />

      {data.freezeAvailable > 0 ? (
        <p className="text-sm text-[color:var(--text-2)]">
          ❄️ {data.freezeAvailable} streak freeze{data.freezeAvailable > 1 ? "s" : ""} available
        </p>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl">Activity</CardTitle>
            <CardDescription>Your completion rhythm over the last 12 weeks</CardDescription>
          </CardHeader>
          <CardContent>
            <Heatmap days={data.heatmap} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Daily missions</CardTitle>
            <CardDescription>Complete all three for momentum</CardDescription>
          </CardHeader>
          <CardContent>
            <MissionList missions={missions} onComplete={completeMission} />
          </CardContent>
        </Card>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-[color:var(--text-1)]">Badges</h2>
          <Link href="/habits" className="text-sm text-[color:var(--accent)] hover:underline">
            Manage habits →
          </Link>
        </div>
        <BadgeGrid badges={data.badges} compact />
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-[color:var(--text-1)]">Rewards</h2>
          <Link href="/rewards" className="text-sm text-[color:var(--accent)] hover:underline">
            View marketplace →
          </Link>
        </div>
        <RewardMarketplace
          rewards={previewRewards}
          coins={coins}
          onRedeem={redeemReward}
        />
      </section>

      <div className="flex gap-3">
        <Link href="/habits">
          <Button>Go to habits</Button>
        </Link>
        <Button variant="outline" onClick={refresh}>
          Refresh
        </Button>
      </div>
    </div>
  );
}
