import { cn } from "@/lib/utils";
import type React from "react";

type StatProps = React.HTMLAttributes<HTMLDivElement> & {
  label: string;
  value: string;
  tone?: "default" | "success" | "warning";
};

const toneClasses = {
  default: "text-[color:var(--text-1)]",
  success: "text-[color:var(--success)]",
  warning: "text-[color:var(--warning)]",
};

export function Stat({ label, value, tone = "default", className, ...props }: StatProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-[color:var(--border-1)] bg-[color:var(--surface-2)] px-4 py-3",
        className
      )}
      {...props}
    >
      <p className="text-xs uppercase tracking-wide text-[color:var(--text-3)]">
        {label}
      </p>
      <p className={cn("mt-2 text-2xl font-semibold", toneClasses[tone])}>{value}</p>
    </div>
  );
}
