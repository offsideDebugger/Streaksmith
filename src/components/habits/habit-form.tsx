"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

type HabitFormValues = {
  title: string;
  frequency: string;
  difficulty: string;
};

type HabitFormProps = {
  initialValues?: HabitFormValues;
  onSubmit: (values: HabitFormValues) => void;
  onCancel?: () => void;
  submitLabel?: string;
  disabled?: boolean;
};

export function HabitForm({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel = "Save habit",
  disabled,
}: HabitFormProps) {
  return (
    <form
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const payload = {
          title: String(formData.get("title") ?? ""),
          frequency: String(formData.get("frequency") ?? ""),
          difficulty: String(formData.get("difficulty") ?? ""),
        };
        onSubmit(payload);
      }}
    >
      <Input
        name="title"
        label="Title"
        placeholder="Morning walk"
        defaultValue={initialValues?.title}
        required
        disabled={disabled}
      />
      <Input
        name="frequency"
        label="Frequency"
        placeholder="Daily"
        defaultValue={initialValues?.frequency}
        required
        disabled={disabled}
      />
      <Select
        name="difficulty"
        label="Difficulty"
        defaultValue={initialValues?.difficulty ?? "easy"}
        disabled={disabled}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </Select>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={disabled}>
          {submitLabel}
        </Button>
        {onCancel ? (
          <Button type="button" variant="ghost" onClick={onCancel} disabled={disabled}>
            Cancel
          </Button>
        ) : null}
      </div>
    </form>
  );
}
