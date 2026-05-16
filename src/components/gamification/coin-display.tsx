"use client";

import { AnimatedCounter } from "@/components/ui/animated-counter";
import { cn } from "@/lib/utils";

type CoinDisplayProps = {
  coins: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  pulse?: boolean;
};

const sizeClasses = {
  sm: "text-sm",
  md: "text-xl",
  lg: "text-3xl",
};

export function CoinDisplay({
  coins,
  size = "md",
  className,
  pulse,
}: CoinDisplayProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border border-[color:var(--border-1)] bg-[color:var(--surface-2)] px-3 py-1.5",
        pulse && "animate-coin-pulse",
        className
      )}
    >
      <span className="text-base" aria-hidden>
        🪙
      </span>
      <AnimatedCounter
        value={coins}
        className={cn("font-semibold text-[color:var(--warning)]", sizeClasses[size])}
      />
    </div>
  );
}
