export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatDateLabel(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

export function formatTimeLabel(value: string) {
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function getDivergenceTone(score: number) {
  if (score <= 30) {
    return "var(--success)";
  }

  if (score <= 60) {
    return "var(--warning)";
  }

  return "var(--danger)";
}
