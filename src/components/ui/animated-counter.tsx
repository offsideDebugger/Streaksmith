"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type AnimatedCounterProps = {
  value: number;
  className?: string;
  duration?: number;
};

export function AnimatedCounter({
  value,
  className,
  duration = 500,
}: AnimatedCounterProps) {
  const [display, setDisplay] = useState(value);
  const previous = useRef(value);

  useEffect(() => {
    const from = previous.current;
    const to = value;
    previous.current = value;
    if (from === to) return;

    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return (
    <span className={cn("tabular-nums", className)}>{display.toLocaleString()}</span>
  );
}
