import { cn } from "@/lib/utils";
import type React from "react";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
};

export function Select({ label, className, id, children, ...props }: SelectProps) {
  const selectId = id ?? props.name;

  return (
    <label className="flex flex-col gap-2 text-sm text-[color:var(--text-2)]">
      {label ? <span className="text-xs uppercase tracking-[0.2em]">{label}</span> : null}
      <select
        id={selectId}
        className={cn(
          "h-10 rounded-md border border-[color:var(--border-1)] bg-[color:var(--surface-1)] px-3 text-sm text-[color:var(--text-1)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/20",
          className
        )}
        {...props}
      >
        {children}
      </select>
    </label>
  );
}
