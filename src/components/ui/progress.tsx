import { cn } from "@/lib/utils";

type ProgressProps = {
  value: number;
  max?: number;
  className?: string;
};

export function Progress({ value, max = 100, className }: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div
      className={cn(
        "h-1.5 w-full overflow-hidden rounded-full bg-[color:var(--surface-3)]",
        className
      )}
    >
      <div
        className="h-full rounded-full bg-[color:var(--accent)] transition-all duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
