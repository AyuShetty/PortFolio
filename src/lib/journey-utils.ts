import type { EventEntry } from "@/components/portfolio/experience-data";

export type YearGroup = {
  year: string;
  events: EventEntry[];
};

/** Groups events by year in ascending chronological order. */
export function groupEventsByYear(events: EventEntry[]): YearGroup[] {
  const sorted = [...events].sort((a, b) => Number(a.year) - Number(b.year));
  const map = new Map<string, EventEntry[]>();
  for (const event of sorted) {
    const bucket = map.get(event.year) ?? [];
    bucket.push(event);
    map.set(event.year, bucket);
  }
  return Array.from(map.entries()).map(([year, evts]) => ({ year, events: evts }));
}

/** Returns the IDs of the adjacent events (prev/next) relative to activeId. */
export function getAdjacentEvents(
  events: EventEntry[],
  activeId: string,
): { prevId: string | null; nextId: string | null } {
  const idx = events.findIndex((e) => e.id === activeId);
  if (idx === -1) return { prevId: null, nextId: null };
  return {
    prevId: idx > 0 ? events[idx - 1].id : null,
    nextId: idx < events.length - 1 ? events[idx + 1].id : null,
  };
}
