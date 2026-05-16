import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Stat } from "@/components/ui/stat";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-3)]">
          Welcome back
        </p>
        <h1 className="text-3xl font-semibold text-[color:var(--text-1)]">
          Your daily momentum
        </h1>
        <p className="max-w-2xl text-sm text-[color:var(--text-2)]">
          Overview of active habits, streak health, and rewards progress.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <Stat label="Active Habits" value="8" />
        <Stat label="Longest Streak" value="18 days" tone="success" />
        <Stat label="Coins Available" value="320" tone="warning" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Habit focus</CardTitle>
            <CardDescription>Priority routines for today.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { title: "Morning review", detail: "Daily - Easy" },
              { title: "Workout", detail: "4x weekly - Medium" },
              { title: "Read", detail: "Daily - Easy" },
            ].map((habit) => (
              <div
                key={habit.title}
                className="flex items-center justify-between rounded-lg border border-[color:var(--border-1)] bg-[color:var(--surface-2)] px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-[color:var(--text-1)]">{habit.title}</p>
                  <p className="text-xs text-[color:var(--text-3)]">{habit.detail}</p>
                </div>
                <span className="text-xs font-medium text-[color:var(--accent)]">In queue</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Streak health</CardTitle>
            <CardDescription>Consistency in the last 14 days.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"].map(
              (day, index) => (
                <div
                  key={`${day}-${index}`}
                  className="flex items-center justify-between rounded-lg border border-[color:var(--border-1)] bg-[color:var(--surface-2)] px-3 py-3"
                >
                  <span className="text-xs text-[color:var(--text-3)]">{day}</span>
                  <span className="text-sm font-semibold text-[color:var(--success)]">o</span>
                </div>
              )
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
