import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HabitsPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-3)]">
          Habits
        </p>
        <h1 className="text-3xl font-semibold text-[color:var(--text-1)]">Habit library</h1>
        <p className="max-w-2xl text-sm text-[color:var(--text-2)]">
          Manage active habits, frequency, and difficulty tags.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming layout</CardTitle>
          <CardDescription>
            This area will hold habit groups, schedules, and streak summaries.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-[color:var(--text-3)]">
          Placeholder content for now.
        </CardContent>
      </Card>
    </div>
  );
}
