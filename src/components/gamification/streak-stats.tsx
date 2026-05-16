"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type StreakStatsProps = {
  current: number;
  longest: number;
  animate?: boolean;
  className?: string;
};

export function StreakStats({
  current,
  longest,
  animate,
  className,
}: StreakStatsProps) {
  const [bump, setBump] = useState(false);

  useEffect(() => {
    if (!animate) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 400);
    return () => clearTimeout(t);
  }, [current, animate]);

  return (
    <div className={cn("grid grid-cols-2 gap-3", className)}>
      <StreakStat
        emoji="🔥"
        label="Current streak"
        value={current}
        bump={bump}
      />
      <StreakStat
        emoji="🏆"
        label="Longest streak"
        value={longest}
      />
    </div>
  );
}

function StreakStat({
  emoji,
  label,
  value,
  bump,
}: {
  emoji: string;
  label: string;
  value: number;
  bump?: boolean;
}) {
  return (
    <div className="rounded-lg border border-[color:var(--border-1)] bg-[color:var(--surface-2)] px-4 py-3">
      <p className="text-xs text-[color:var(--text-3)]">{label}</p>
      <p
        className={cn(
          "mt-1 flex items-center gap-2 text-2xl font-semibold text-[color:var(--text-1)] transition-transform duration-300",
          bump && "scale-105"
        )}
      >
        <span>{emoji}</span>
        <span className="tabular-nums">{value}</span>
      </p>
    </div>
  );
}
