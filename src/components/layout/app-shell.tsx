"use client";

import { CoinDisplay } from "@/components/gamification/coin-display";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";

type AppShellProps = {
  children: React.ReactNode;
  user: { id: string; name: string; email: string; coins: number };
};

export function AppShell({ children, user }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [coins, setCoins] = useState(user.coins);

  const navItems = [
    { label: "Dashboard", href: "/app" },
    { label: "Habits", href: "/habits" },
    { label: "Rewards", href: "/rewards" },
    { label: "Insights", href: "/insights" },
  ];

  useEffect(() => {
    setCoins(user.coins);
  }, [user.coins]);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { user?: { coins: number } } | null) => {
        if (d?.user) setCoins(d.user.coins);
      })
      .catch(() => undefined);
  }, [pathname]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen flex-col bg-[color:var(--background)]">
      <header className="border-b border-[color:var(--border-1)] bg-[color:var(--surface-1)]">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/app" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[color:var(--surface-2)]">
              <span className="text-sm font-semibold text-[color:var(--accent)]">S</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-[color:var(--text-1)]">Streaksmith</p>
              <p className="text-xs text-[color:var(--text-3)]">{user.name}</p>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <CoinDisplay coins={coins} size="sm" />
            <Link href="/habits">
              <Button size="sm" variant="outline">
                New habit
              </Button>
            </Link>
            <Button size="sm" variant="ghost" onClick={handleLogout}>
              Log out
            </Button>
          </div>
        </div>
      </header>
      <div className="mx-auto flex w-full max-w-6xl flex-1 gap-6 px-6 py-6">
        <aside className="hidden w-56 flex-col gap-2 rounded-xl border border-[color:var(--border-1)] bg-[color:var(--surface-1)] p-4 text-sm text-[color:var(--text-2)] lg:flex">
          {navItems.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/app" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.label}
                href={item.href}
                className={
                  active
                    ? "rounded-lg bg-[color:var(--surface-2)] px-3 py-2 font-medium text-[color:var(--text-1)]"
                    : "rounded-lg px-3 py-2 transition hover:bg-[color:var(--surface-2)] hover:text-[color:var(--text-1)]"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </aside>
        <main className="flex flex-1 flex-col gap-6">{children}</main>
      </div>
    </div>
  );
}
