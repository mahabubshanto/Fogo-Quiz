export function weekRangeFor(date = new Date()) {
  const d = new Date(date);
  const day = (d.getDay() + 6) % 7; // ISO Monday=0
  const start = new Date(d);
  start.setDate(d.getDate() - day);
  start.setHours(0,0,0,0);
  const end = new Date(start);
  end.setDate(start.getDate() + 7);
  end.setHours(0,0,0,0);
  return [start.toISOString(), end.toISOString()];
}
