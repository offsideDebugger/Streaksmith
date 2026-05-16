"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useState } from "react";

export type MissionItem = {
  id: string;
  title: string;
  completed: boolean;
};

type MissionListProps = {
  missions: MissionItem[];
  onComplete?: (missionId: string) => Promise<void>;
  rewardCoins?: number;
};

export function MissionList({
  missions,
  onComplete,
  rewardCoins = 50,
}: MissionListProps) {
  const completed = missions.filter((m) => m.completed).length;
  const total = missions.length || 1;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-[color:var(--text-1)]">Daily missions</p>
        <p className="text-xs text-[color:var(--text-3)]">
          {completed}/{missions.length} · +{rewardCoins} each
        </p>
      </div>
      <Progress value={completed} max={total} />
      <ul className="space-y-2">
        {missions.map((mission) => (
          <MissionRow
            key={mission.id}
            mission={mission}
            onComplete={onComplete}
          />
        ))}
      </ul>
    </div>
  );
}

function MissionRow({
  mission,
  onComplete,
}: {
  mission: MissionItem;
  onComplete?: (id: string) => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleComplete = async () => {
    if (!onComplete || mission.completed || loading) return;
    setLoading(true);
    await onComplete(mission.id);
    setSuccess(true);
    setLoading(false);
    setTimeout(() => setSuccess(false), 600);
  };

  return (
    <li
      className={cn(
        "flex items-center justify-between gap-3 rounded-lg border border-[color:var(--border-1)] bg-[color:var(--surface-2)] px-4 py-3 transition",
        success && "animate-success-flash"
      )}
    >
      <span
        className={cn(
          "text-sm",
          mission.completed
            ? "text-[color:var(--text-3)] line-through"
            : "text-[color:var(--text-1)]"
        )}
      >
        {mission.title}
      </span>
      {mission.completed ? (
        <span className="text-xs text-[color:var(--success)]">Done</span>
      ) : (
        <Button size="sm" variant="outline" onClick={handleComplete} disabled={loading}>
          {loading ? "..." : "Complete"}
        </Button>
      )}
    </li>
  );
}
