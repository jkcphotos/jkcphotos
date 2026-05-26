export function formatEventMeta(opts: {
  location?: string | null;
  eventDate?: string | null;
  yearLabel?: string | null;
  photoCount?: number | null;
}): string {
  const parts: string[] = [];
  if (opts.location) parts.push(opts.location);
  const dateLabel = opts.yearLabel || (opts.eventDate ? formatDate(opts.eventDate) : "");
  if (dateLabel) parts.push(dateLabel);
  if (typeof opts.photoCount === "number" && opts.photoCount > 0) {
    parts.push(`${opts.photoCount} photos`);
  }
  return parts.join(" · ");
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
