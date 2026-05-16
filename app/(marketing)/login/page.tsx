import { AuthForm } from "@/components/auth/auth-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="surface-grid flex min-h-screen flex-col">
      <header className="mx-auto flex w-full max-w-md items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[color:var(--surface-2)]">
            <span className="text-sm font-semibold text-[color:var(--accent)]">S</span>
          </div>
          <span className="text-sm font-semibold text-[color:var(--text-1)]">Streaksmith</span>
        </Link>
      </header>

      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 pb-16">
        <div className="animate-fade-in rounded-xl border border-[color:var(--border-1)] bg-[color:var(--surface-1)] p-8 shadow-sm">
          <div className="mb-8 space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--text-3)]">
              Welcome back
            </p>
            <h1 className="text-3xl font-semibold text-[color:var(--text-1)]">
              Sign in
            </h1>
            <p className="text-sm text-[color:var(--text-2)]">
              Continue your streaks and daily missions.
            </p>
          </div>
          <AuthForm mode="login" />
        </div>
      </main>
    </div>
  );
}
