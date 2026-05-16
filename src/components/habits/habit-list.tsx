"use client";

import { CoinDisplay } from "@/components/gamification/coin-display";
import { HabitCard } from "@/components/habits/habit-card";
import { HabitCardSkeleton } from "@/components/habits/habit-card-skeleton";
import { HabitDashboardHeader } from "@/components/habits/habit-dashboard-header";
import { HabitForm } from "@/components/habits/habit-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo, useState } from "react";

export type Habit = {
  id: string;
  title: string;
  frequency: string;
  difficulty: string;
  isCompleted?: boolean;
  currentStreak?: number;
  longestStreak?: number;
};

type HabitListProps = {
  initialHabits: Habit[];
  initialCoins?: number;
};

export function HabitList({ initialHabits, initialCoins = 0 }: HabitListProps) {
  const [habits, setHabits] = useState(initialHabits);
  const [coins, setCoins] = useState(initialCoins);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [completingId, setCompletingId] = useState<string | null>(null);
  const [streakPulseId, setStreakPulseId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [freezePromptId, setFreezePromptId] = useState<string | null>(null);

  const editingHabit = useMemo(
    () => habits.find((habit) => habit.id === editingId) ?? null,
    [habits, editingId]
  );

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 2500);
  };

  const handleCreate = async (values: Omit<Habit, "id" | "isCompleted" | "currentStreak" | "longestStreak">) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const response = await fetch("/api/habits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = (await response.json()) as { habit: Habit };
    if (response.ok) {
      setHabits((prev) => [{ ...data.habit, isCompleted: false, currentStreak: 0, longestStreak: 0 }, ...prev]);
      setIsCreating(false);
    }
    setIsSubmitting(false);
  };

  const handleUpdate = async (values: Omit<Habit, "id" | "isCompleted" | "currentStreak" | "longestStreak">) => {
    if (!editingId) return;
    if (isSubmitting) return;
    setIsSubmitting(true);
    const response = await fetch(`/api/habits/${editingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = (await response.json()) as { habit: Habit };
    if (response.ok) {
      setHabits((prev) =>
        prev.map((habit) =>
          habit.id === editingId
            ? { ...habit, ...data.habit }
            : habit
        )
      );
      setEditingId(null);
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const response = await fetch(`/api/habits/${id}`, { method: "DELETE" });
    if (response.ok) {
      setHabits((prev) => prev.filter((habit) => habit.id !== id));
    }
    setIsSubmitting(false);
  };

  const handleRefresh = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const response = await fetch("/api/habits");
    const data = (await response.json()) as { habits: Habit[] };
    if (response.ok) {
      setHabits(data.habits);
    }
    const dash = await fetch("/api/dashboard");
    if (dash.ok) {
      const d = (await dash.json()) as { user: { coins: number } };
      setCoins(d.user.coins);
    }
    setIsLoading(false);
  };

  const completeHabit = async (
    habitId: string,
    useFreeze = false,
    forceWithoutFreeze = false
  ) => {
    setCompletingId(habitId);
    const response = await fetch(`/api/habits/${habitId}/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ useFreeze, forceWithoutFreeze }),
    });
    const data = await response.json();

    if (response.status === 422 && data.needsFreeze) {
      setFreezePromptId(habitId);
      setCompletingId(null);
      return;
    }

    if (!response.ok) {
      showFeedback(data.error ?? "Could not complete habit");
      setCompletingId(null);
      setFreezePromptId(null);
      return;
    }

    setHabits((prev) =>
      prev.map((item) =>
        item.id === habitId
          ? {
              ...item,
              isCompleted: true,
              currentStreak: data.habit.currentStreak,
              longestStreak: data.habit.longestStreak,
            }
          : item
      )
    );
    setCoins(data.coins);
    setStreakPulseId(habitId);
    setTimeout(() => setStreakPulseId(null), 400);
    setFreezePromptId(null);
    showFeedback(`+${data.coinsEarned} coins`);
    setCompletingId(null);
  };

  if (habits.length === 0 && !isCreating) {
    return (
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle>No habits yet</CardTitle>
          <CardDescription>
            Start by adding a habit. Keep it small and achievable.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setIsCreating(true)}>Create habit</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <HabitDashboardHeader
          onCreate={() => setIsCreating(true)}
          onRefresh={handleRefresh}
          isBusy={isLoading || isSubmitting}
        />
        <CoinDisplay coins={coins} />
      </div>

      {feedback ? (
        <p className="text-sm text-[color:var(--success)] animate-fade-in">{feedback}</p>
      ) : null}

      {freezePromptId ? (
        <Card className="border-[color:var(--accent)]/40">
          <CardContent className="flex flex-wrap items-center justify-between gap-3 pt-6">
            <p className="text-sm text-[color:var(--text-2)]">
              You missed yesterday. Use a streak freeze to keep your streak?
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => completeHabit(freezePromptId, true)}
              >
                Use freeze
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  const id = freezePromptId;
                  setFreezePromptId(null);
                  completeHabit(id, false, true);
                }}
              >
                Continue without
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {(isCreating || editingHabit) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingHabit ? "Edit habit" : "Create habit"}</CardTitle>
            <CardDescription>
              {editingHabit
                ? "Update the habit details and keep your plan current."
                : "Add a new habit with a clear frequency and difficulty."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <HabitForm
              initialValues={editingHabit ?? undefined}
              onSubmit={editingHabit ? handleUpdate : handleCreate}
              onCancel={() => {
                setIsCreating(false);
                setEditingId(null);
              }}
              submitLabel={
                isSubmitting
                  ? "Saving..."
                  : editingHabit
                  ? "Save changes"
                  : "Create habit"
              }
              disabled={isSubmitting}
            />
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => <HabitCardSkeleton key={index} />)
          : habits.map((habit) => (
              <HabitCard
                key={habit.id}
                title={habit.title}
                frequency={habit.frequency}
                difficulty={habit.difficulty}
                currentStreak={habit.currentStreak ?? 0}
                longestStreak={habit.longestStreak ?? 0}
                isCompleted={habit.isCompleted}
                isCompleting={completingId === habit.id}
                streakPulse={streakPulseId === habit.id}
                onEdit={() => {
                  setEditingId(habit.id);
                  setIsCreating(false);
                }}
                onDelete={() => handleDelete(habit.id)}
                onComplete={() => completeHabit(habit.id)}
              />
            ))}
      </div>
    </div>
  );
}
