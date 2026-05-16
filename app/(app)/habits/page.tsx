import { HabitDashboard } from "@/components/habits/habit-dashboard";
import { prisma } from "@/lib/prisma";

const userId = "demo-user";

export default async function HabitsPage() {
  const habits = await prisma.habit.findMany({
    where: { userId },
    orderBy: { id: "desc" },
  });

  const initialHabits = habits.map((habit) => ({
    id: habit.id,
    title: habit.title,
    frequency: habit.frequency,
    difficulty: habit.difficulty,
    isCompleted: false,
  }));

  return <HabitDashboard habits={initialHabits} />;
}
