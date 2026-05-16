import { Button } from "@/components/ui/button";

type HabitDashboardHeaderProps = {
  onCreate: () => void;
  onRefresh: () => void;
  isBusy?: boolean;
};

export function HabitDashboardHeader({
  onCreate,
  onRefresh,
  isBusy,
}: HabitDashboardHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 className="text-xl font-semibold text-[color:var(--text-1)]">Your habits</h2>
        <p className="text-sm text-[color:var(--text-2)]">
          Keep your routine in focus. Edit or complete as needed.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={onRefresh} disabled={isBusy}>
          Refresh
        </Button>
        <Button onClick={onCreate} disabled={isBusy}>
          New habit
        </Button>
      </div>
    </div>
  );
}
