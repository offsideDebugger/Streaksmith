import { cn } from "@/lib/utils";

type HeatmapDay = {
  date: string;
  count: number;
};

type HeatmapProps = {
  days: HeatmapDay[];
  className?: string;
};

export function Heatmap({ days, className }: HeatmapProps) {
  const max = Math.max(1, ...days.map((d) => d.count));

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-[color:var(--text-1)]">
          Activity heatmap
        </p>
        <p className="text-xs text-[color:var(--text-3)]">Last 12 weeks</p>
      </div>
      <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto pb-1">
        {chunkWeeks(days).map((week, wi) => (
          <div key={wi} className="grid grid-rows-7 gap-1">
            {week.map((day) => (
              <div
                key={day.date}
                title={`${day.date}: ${day.count} completions`}
                className={cn(
                  "h-3 w-3 rounded-sm transition hover:scale-110",
                  intensityClass(day.count, max)
                )}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function chunkWeeks(days: HeatmapDay[]) {
  const weeks: HeatmapDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

function intensityClass(count: number, max: number) {
  if (count === 0) return "bg-[color:var(--surface-3)]";
  const ratio = count / max;
  if (ratio < 0.34) return "bg-[color:var(--accent)]/30";
  if (ratio < 0.67) return "bg-[color:var(--accent)]/55";
  return "bg-[color:var(--accent)]";
}
