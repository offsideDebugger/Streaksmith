import { HabitCardSkeleton } from "@/components/habits/habit-card-skeleton";

export default function HabitsLoading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="h-4 w-24 animate-pulse rounded-md bg-[color:var(--surface-2)]" />
        <div className="h-8 w-64 animate-pulse rounded-md bg-[color:var(--surface-2)]" />
        <div className="h-4 w-96 max-w-full animate-pulse rounded-md bg-[color:var(--surface-2)]" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <HabitCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
