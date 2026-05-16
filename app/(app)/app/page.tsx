import { MainDashboard } from "@/components/dashboard/main-dashboard";
import { DbError } from "@/components/ui/db-error";
import { getDashboardData } from "@/lib/dashboard";
import { formatDbError } from "@/lib/db-error";

export default async function AppDashboardPage() {
  try {
    const data = await getDashboardData();

    return (
    <MainDashboard
      data={{
        user: data.user,
        streak: data.streak,
        freezeAvailable: data.freezeAvailable,
        missions: data.missions,
        badges: data.badges,
        rewards: data.rewards,
        heatmap: data.heatmap,
      }}
    />
    );
  } catch (error) {
    return (
      <section className="space-y-6">
        <header className="space-y-2">
          <h1 className="text-4xl font-semibold text-[color:var(--text-1)]">Dashboard</h1>
        </header>
        <DbError message={formatDbError(error)} />
      </section>
    );
  }
}
