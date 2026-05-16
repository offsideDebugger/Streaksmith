import { HabitList, type Habit } from "@/components/habits/habit-list";

type HabitDashboardProps = {
  habits: Habit[];
  coins?: number;
};

export function HabitDashboard({ habits, coins = 0 }: HabitDashboardProps) {
  return (
    <section className="animate-fade-in flex flex-col gap-6">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-3)]">
          Habits
        </p>
        <h1 className="text-3xl font-semibold text-[color:var(--text-1)]">
          Habit dashboard
        </h1>
        <p className="max-w-2xl text-sm text-[color:var(--text-2)]">
          Create habits, complete them daily, and build your streak.
        </p>
      </header>
      <HabitList initialHabits={habits} initialCoins={coins} />
    </section>
  );
}
