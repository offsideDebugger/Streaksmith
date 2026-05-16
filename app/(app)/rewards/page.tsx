import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function RewardsPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-3)]">
          Rewards
        </p>
        <h1 className="text-3xl font-semibold text-[color:var(--text-1)]">Rewards hub</h1>
        <p className="max-w-2xl text-sm text-[color:var(--text-2)]">
          Track coins, redemptions, and reward inventory.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming layout</CardTitle>
          <CardDescription>
            This space will surface rewards, costs, and redemption history.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-[color:var(--text-3)]">
          Placeholder content for now.
        </CardContent>
      </Card>
    </div>
  );
}
