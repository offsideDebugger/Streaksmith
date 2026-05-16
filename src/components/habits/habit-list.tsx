"use client";

import { useMemo, useState } from "react";
import { HabitCard } from "@/components/habits/habit-card";
import { HabitCardSkeleton } from "@/components/habits/habit-card-skeleton";
import { HabitDashboardHeader } from "@/components/habits/habit-dashboard-header";
import { HabitForm } from "@/components/habits/habit-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export type Habit = {
  id: string;
  title: string;
  frequency: string;
  difficulty: string;
  isCompleted?: boolean;
};

type HabitListProps = {
  initialHabits: Habit[];
};

export function HabitList({ initialHabits }: HabitListProps) {
  const [habits, setHabits] = useState(initialHabits);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const editingHabit = useMemo(
    () => habits.find((habit) => habit.id === editingId) ?? null,
    [habits, editingId]
  );

  const handleCreate = async (values: Omit<Habit, "id" | "isCompleted">) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const response = await fetch("/api/habits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = (await response.json()) as { habit: Habit };
    if (response.ok) {
      setHabits((prev) => [{ ...data.habit, isCompleted: false }, ...prev]);
      setIsCreating(false);
    }
    setIsSubmitting(false);
  };

  const handleUpdate = async (values: Omit<Habit, "id" | "isCompleted">) => {
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
            ? { ...data.habit, isCompleted: habit.isCompleted }
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
      setHabits((prev) =>
        data.habits.map((habit) => ({
          ...habit,
          isCompleted: prev.find((item) => item.id === habit.id)?.isCompleted ?? false,
        }))
      );
    }
    setIsLoading(false);
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
      <HabitDashboardHeader
        onCreate={() => setIsCreating(true)}
        onRefresh={handleRefresh}
        isBusy={isLoading || isSubmitting}
      />

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
                isCompleted={habit.isCompleted}
                onEdit={() => {
                  setEditingId(habit.id);
                  setIsCreating(false);
                }}
                onDelete={() => handleDelete(habit.id)}
                onComplete={() => {
                  setHabits((prev) =>
                    prev.map((item) =>
                      item.id === habit.id ? { ...item, isCompleted: true } : item
                    )
                  );
                }}
              />
            ))}
      </div>
    </div>
  );
}
