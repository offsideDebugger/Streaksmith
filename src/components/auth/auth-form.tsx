"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type AuthMode = "signup" | "login";

type AuthFormProps = {
  mode: AuthMode;
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isSignup = mode === "signup";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    };

    const endpoint = isSignup ? "/api/auth/signup" : "/api/auth/login";
    const body = isSignup
      ? payload
      : { email: payload.email, password: payload.password };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = (await response.json()) as { error?: string };

    if (!response.ok) {
      setError(data.error ?? "Something went wrong");
      setLoading(false);
      return;
    }

    router.push("/app");
    router.refresh();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {isSignup ? (
        <Input
          name="name"
          label="Name"
          placeholder="Alex"
          autoComplete="name"
          required
          disabled={loading}
        />
      ) : null}

      <Input
        name="email"
        type="email"
        label="Email"
        placeholder="you@example.com"
        autoComplete="email"
        required
        disabled={loading}
      />

      <Input
        name="password"
        type="password"
        label="Password"
        placeholder={isSignup ? "At least 8 characters" : "Your password"}
        autoComplete={isSignup ? "new-password" : "current-password"}
        minLength={isSignup ? 8 : undefined}
        required
        disabled={loading}
      />

      {error ? (
        <p className="text-sm text-[color:var(--warning)]">{error}</p>
      ) : null}

      <Button type="submit" className="w-full" size="lg" disabled={loading}>
        {loading ? "Please wait..." : isSignup ? "Create account" : "Sign in"}
      </Button>

      <p className="text-center text-sm text-[color:var(--text-3)]">
        {isSignup ? (
          <>
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[color:var(--accent)] hover:underline"
            >
              Sign in
            </Link>
          </>
        ) : (
          <>
            New here?{" "}
            <Link
              href="/signup"
              className="text-[color:var(--accent)] hover:underline"
            >
              Create an account
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
