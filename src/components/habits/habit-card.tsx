"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type HabitCardProps = {
  title: string;
  frequency: string;
  difficulty: string;
  currentStreak?: number;
  longestStreak?: number;
  onEdit?: () => void;
  onDelete?: () => void;
  onComplete?: () => void;
  isCompleted?: boolean;
  isCompleting?: boolean;
  streakPulse?: boolean;
};

export function HabitCard({
  title,
  frequency,
  difficulty,
  currentStreak = 0,
  longestStreak = 0,
  onEdit,
  onDelete,
  onComplete,
  isCompleted,
  isCompleting,
  streakPulse,
}: HabitCardProps) {
  const normalizedDifficulty = difficulty.toLowerCase();
  const badgeVariant =
    normalizedDifficulty === "easy"
      ? "success"
      : normalizedDifficulty === "medium"
      ? "warning"
      : "default";

  return (
    <Card
      className={cn(
        "transition hover:-translate-y-0.5 hover:border-[color:var(--accent)]/40 hover:shadow-md",
        isCompleted && "border-[color:var(--success)]/30"
      )}
    >
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge variant={badgeVariant} className="capitalize">
            {difficulty}
          </Badge>
        </div>
        <p className="text-sm text-[color:var(--text-2)]">{frequency}</p>
        <div
          className={cn(
            "flex gap-4 text-xs text-[color:var(--text-3)] transition-transform duration-300",
            streakPulse && "scale-105"
          )}
        >
          <span>
            🔥 <span className="font-medium text-[color:var(--text-1)]">{currentStreak}</span>
          </span>
          <span>
            🏆 <span className="font-medium text-[color:var(--text-1)]">{longestStreak}</span>
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={onEdit} disabled={!onEdit}>
            Edit
          </Button>
          <Button size="sm" variant="ghost" onClick={onDelete} disabled={!onDelete}>
            Delete
          </Button>
        </div>
        <Button
          size="sm"
          onClick={onComplete}
          disabled={isCompleted || !onComplete || isCompleting}
          className={cn(isCompleted && "animate-success-flash")}
        >
          {isCompleting ? "Saving..." : isCompleted ? "Completed" : "Complete"}
        </Button>
      </CardContent>
    </Card>
  );
}
