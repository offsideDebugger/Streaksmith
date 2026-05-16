import { HabitDashboard } from "@/components/habits/habit-dashboard";
import { DbError } from "@/components/ui/db-error";
import { getDashboardData } from "@/lib/dashboard";
import { formatDbError } from "@/lib/db-error";

export default async function HabitsPage() {
  try {
    const dashboard = await getDashboardData();

    return (
      <HabitDashboard habits={dashboard.habits} coins={dashboard.user.coins} />
    );
  } catch (error) {
    return (
      <section className="space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold text-[color:var(--text-1)]">
            Habit dashboard
          </h1>
        </header>
        <DbError message={formatDbError(error)} />
      </section>
    );
  }
}
