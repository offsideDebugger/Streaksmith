import { Button } from "@/components/ui/button";
import type React from "react";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Habits", href: "/habits" },
    { label: "Rewards", href: "/rewards" },
    { label: "Insights", href: "/insights" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[color:var(--background)]">
      <header className="border-b border-[color:var(--border-1)] bg-[color:var(--surface-1)]">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[color:var(--surface-2)]">
              <span className="text-sm font-semibold text-[color:var(--accent)]">S</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-[color:var(--text-1)]">Streaksmith</p>
              <p className="text-xs text-[color:var(--text-3)]">Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button size="sm" variant="ghost">
              Today
            </Button>
            <Button size="sm" variant="outline">
              New Habit
            </Button>
          </div>
        </div>
      </header>
      <div className="mx-auto flex w-full max-w-6xl flex-1 gap-6 px-6 py-6">
        <aside className="hidden w-56 flex-col gap-2 rounded-xl border border-[color:var(--border-1)] bg-[color:var(--surface-1)] p-4 text-sm text-[color:var(--text-2)] lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              className="rounded-lg px-3 py-2 text-left transition hover:bg-[color:var(--surface-2)] hover:text-[color:var(--text-1)]"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </aside>
        <main className="flex flex-1 flex-col gap-6">{children}</main>
      </div>
    </div>
  );
}
