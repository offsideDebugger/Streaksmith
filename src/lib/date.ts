export function startOfDay(date: Date = new Date()) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function endOfDay(date: Date = new Date()) {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

export function daysBetween(from: Date, to: Date) {
  const start = startOfDay(from).getTime();
  const end = startOfDay(to).getTime();
  return Math.round((end - start) / (24 * 60 * 60 * 1000));
}

export function toDateKey(date: Date = new Date()) {
  return startOfDay(date).toISOString().slice(0, 10);
}
