import { cn } from "@/lib/utils";
import type React from "react";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

export function Textarea({ label, className, id, ...props }: TextareaProps) {
  const textareaId = id ?? props.name;

  return (
    <label className="flex flex-col gap-2 text-sm text-[color:var(--text-2)]">
      {label ? <span className="text-xs uppercase tracking-[0.2em]">{label}</span> : null}
      <textarea
        id={textareaId}
        className={cn(
          "min-h-[96px] rounded-md border border-[color:var(--border-1)] bg-[color:var(--surface-1)] px-3 py-2 text-sm text-[color:var(--text-1)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/20",
          className
        )}
        {...props}
      />
    </label>
  );
}
