import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type HabitCardProps = {
  title: string;
  frequency: string;
  difficulty: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onComplete?: () => void;
  isCompleted?: boolean;
};

export function HabitCard({
  title,
  frequency,
  difficulty,
  onEdit,
  onDelete,
  onComplete,
  isCompleted,
}: HabitCardProps) {
  const normalizedDifficulty = difficulty.toLowerCase();
  const badgeVariant =
    normalizedDifficulty === "easy"
      ? "success"
      : normalizedDifficulty === "medium"
      ? "warning"
      : "default";

  return (
    <Card className="transition hover:-translate-y-0.5 hover:border-[color:var(--accent)]/40 hover:shadow-md">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">{title}</CardTitle>
          <Badge variant={badgeVariant} className="capitalize">
            {difficulty}
          </Badge>
        </div>
        <p className="text-sm text-[color:var(--text-2)]">{frequency}</p>
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
        <Button size="sm" onClick={onComplete} disabled={isCompleted || !onComplete}>
          {isCompleted ? "Completed" : "Complete"}
        </Button>
      </CardContent>
    </Card>
  );
}
