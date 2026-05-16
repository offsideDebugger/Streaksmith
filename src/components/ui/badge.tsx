import { cn } from "@/lib/utils";
import type React from "react";

type BadgeVariant = "default" | "success" | "warning";

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-[color:var(--surface-2)] text-[color:var(--text-2)]",
  success: "bg-[color:var(--success-bg)] text-[color:var(--success)]",
  warning: "bg-[color:var(--warning-bg)] text-[color:var(--warning)]",
};

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
