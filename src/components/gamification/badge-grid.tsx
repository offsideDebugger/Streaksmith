"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

export type BadgeItem = {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: string;
  rarity: string;
  earned: boolean;
  availableFreezes?: number;
};

const rarityStyles: Record<string, string> = {
  common: "border-[color:var(--border-1)]",
  uncommon: "border-emerald-500/40",
  rare: "border-sky-500/50",
  legendary: "border-amber-500/50",
};

type BadgeGridProps = {
  badges: BadgeItem[];
  compact?: boolean;
};

export function BadgeGrid({ badges, compact }: BadgeGridProps) {
  return (
    <div
      className={cn(
        "grid gap-3",
        compact ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      )}
    >
      {badges.map((badge) => (
        <BadgeCard key={badge.id} badge={badge} />
      ))}
    </div>
  );
}

function BadgeCard({ badge }: { badge: BadgeItem }) {
  const [justEarned, setJustEarned] = useState(false);

  return (
    <div
      className={cn(
        "group relative rounded-xl border bg-[color:var(--surface-2)] p-4 transition duration-200",
        rarityStyles[badge.rarity] ?? rarityStyles.common,
        badge.earned
          ? "hover:-translate-y-0.5 hover:shadow-md"
          : "opacity-60 grayscale",
        justEarned && "animate-badge-earn"
      )}
      onMouseEnter={() => badge.earned && setJustEarned(false)}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-[color:var(--text-1)]">
            {badge.title}
          </p>
          <p className="mt-1 text-xs capitalize text-[color:var(--text-3)]">
            {badge.rarity} · {badge.type}
          </p>
        </div>
        {badge.earned ? (
          <span className="text-xs text-[color:var(--success)]">Earned</span>
        ) : (
          <span className="text-xs text-[color:var(--text-3)]">Locked</span>
        )}
      </div>
      <p className="mt-2 text-xs text-[color:var(--text-2)]">{badge.description}</p>
      {badge.slug === "streak-freeze" && badge.availableFreezes ? (
        <p className="mt-2 text-xs text-[color:var(--accent)]">
          {badge.availableFreezes} available
        </p>
      ) : null}
    </div>
  );
}
