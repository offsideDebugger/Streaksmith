import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function InsightsPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-3)]">
          Insights
        </p>
        <h1 className="text-3xl font-semibold text-[color:var(--text-1)]">Habit insights</h1>
        <p className="max-w-2xl text-sm text-[color:var(--text-2)]">
          Visualize completion trends, streak health, and engagement.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming layout</CardTitle>
          <CardDescription>
            Analytics, charts, and streak breakdowns will live here.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-[color:var(--text-3)]">
          Placeholder content for now.
        </CardContent>
      </Card>
    </div>
  );
}
