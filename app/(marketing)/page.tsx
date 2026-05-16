import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stat } from "@/components/ui/stat";

export default function MarketingPage() {
  return (
    <div className="surface-grid flex flex-1 flex-col">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--surface-2)] shadow-sm">
            <span className="text-lg font-semibold text-[color:var(--accent)]">S</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-[color:var(--text-1)]">Streaksmith</p>
            <p className="text-xs text-[color:var(--text-3)]">Habit OS</p>
          </div>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-[color:var(--text-2)] md:flex">
          <a className="transition hover:text-[color:var(--text-1)]" href="#overview">
            Overview
          </a>
          <a className="transition hover:text-[color:var(--text-1)]" href="#habits">
            Habits
          </a>
          <a className="transition hover:text-[color:var(--text-1)]" href="#rewards">
            Rewards
          </a>
        </nav>
        <Button size="sm" variant="outline">
          Sign In
        </Button>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-6 pb-16">
        <section className="grid gap-10 pt-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col gap-6">
            <Badge className="w-fit" variant="success">
              Daily momentum
            </Badge>
            <h1 className="text-balance text-4xl font-semibold leading-tight text-[color:var(--text-1)] sm:text-5xl">
              Build streaks, earn rewards, and turn habits into a game you can win.
            </h1>
            <p className="max-w-xl text-base leading-7 text-[color:var(--text-2)]">
              Streaksmith pairs focus-friendly routines with lightweight game mechanics. Track
              progress, collect coins, and stay consistent with a clean dashboard made for daily
              check-ins.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg">Create your first habit</Button>
              <Button size="lg" variant="ghost">
                See live preview
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <Stat label="Weekly Completion" value="86%" />
              <Stat label="Streak Avg" value="12 days" tone="success" />
              <Stat label="Coins Earned" value="240" tone="warning" />
            </div>
          </div>
          <Card className="self-start">
            <CardHeader>
              <CardTitle>Today at a glance</CardTitle>
              <CardDescription>Next actions from your habit queue.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: "Hydrate", detail: "8 cups", badge: "Daily" },
                { title: "Deep work", detail: "2 x 50 min", badge: "Focus" },
                { title: "Mobility", detail: "15 min", badge: "Wellness" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between rounded-lg border border-[color:var(--border-1)] bg-[color:var(--surface-2)] px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-[color:var(--text-1)]">
                      {item.title}
                    </p>
                    <p className="text-xs text-[color:var(--text-3)]">{item.detail}</p>
                  </div>
                  <Badge>{item.badge}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section id="overview" className="grid gap-6 lg:grid-cols-3">
          {["Rituals", "Insights", "Rewards"].map((title, index) => (
            <Card key={title}>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                  {index === 0
                    ? "Design daily habits with clear frequency and difficulty tags."
                    : index === 1
                    ? "Track streaks, completion rates, and momentum over time."
                    : "Redeem coins for perks and celebrate progress."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" size="sm">
                  Learn more
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>

        <section id="habits" className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle>Habit stack</CardTitle>
              <CardDescription>Visualize difficulty and pacing at a glance.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: "Morning review", detail: "Daily - Easy", status: "Active" },
                { title: "Workout", detail: "4x weekly - Medium", status: "Focus" },
                { title: "Read", detail: "Daily - Easy", status: "Building" },
              ].map((habit) => (
                <div
                  key={habit.title}
                  className="flex items-center justify-between rounded-lg border border-[color:var(--border-1)] bg-[color:var(--surface-2)] px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-[color:var(--text-1)]">
                      {habit.title}
                    </p>
                    <p className="text-xs text-[color:var(--text-3)]">{habit.detail}</p>
                  </div>
                  <Badge variant="warning">{habit.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Streak radar</CardTitle>
              <CardDescription>Consistency highlights for the past month.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {["Mon", "Wed", "Fri", "Sat", "Sun", "Tue"].map((day) => (
                  <div
                    key={day}
                    className="flex flex-col items-center gap-2 rounded-lg border border-[color:var(--border-1)] bg-[color:var(--surface-2)] px-3 py-3"
                  >
                    <span className="text-xs text-[color:var(--text-3)]">{day}</span>
                    <span className="text-lg font-semibold text-[color:var(--accent)]">o</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[color:var(--text-3)]">
                18 of 24 habits completed in the last 7 days.
              </p>
            </CardContent>
          </Card>
        </section>

        <section id="rewards" className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Rewards store</CardTitle>
              <CardDescription>Redeem coins for feel-good perks.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { title: "Coffee break", cost: "50 coins" },
                { title: "New book", cost: "200 coins" },
                { title: "Day trip", cost: "600 coins" },
              ].map((reward) => (
                <div
                  key={reward.title}
                  className="flex items-center justify-between rounded-lg border border-[color:var(--border-1)] bg-[color:var(--surface-2)] px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-[color:var(--text-1)]">
                      {reward.title}
                    </p>
                    <p className="text-xs text-[color:var(--text-3)]">{reward.cost}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Redeem
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Badge wall</CardTitle>
              <CardDescription>Celebrate milestone wins.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {["Consistency", "Momentum", "Explorer"].map((badge) => (
                <div
                  key={badge}
                  className="flex items-center justify-between rounded-lg border border-[color:var(--border-1)] bg-[color:var(--surface-2)] px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-[color:var(--text-1)]">{badge}</p>
                    <p className="text-xs text-[color:var(--text-3)]">Tier I</p>
                  </div>
                  <Badge variant="success">Unlocked</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Next up</CardTitle>
              <CardDescription>Preview unlocks based on streaks.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {["7-day streak", "30-day streak", "90-day streak"].map((tier) => (
                <div
                  key={tier}
                  className="rounded-lg border border-[color:var(--border-1)] bg-[color:var(--surface-2)] px-4 py-3 text-sm text-[color:var(--text-2)]"
                >
                  {tier}
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
