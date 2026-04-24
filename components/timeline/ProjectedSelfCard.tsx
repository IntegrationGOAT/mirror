import { Card } from "@/components/ui/Card";

interface ProjectedSelfCardProps {
  trajectory: "positive" | "negative" | "stagnant";
  description: string;
  keyPattern: string;
  inflectionPoint: string;
  sampleSize: number;
}

export function ProjectedSelfCard({ trajectory, description, keyPattern, inflectionPoint, sampleSize }: ProjectedSelfCardProps) {
  const label = trajectory === "positive" ? "↑ Positive" : trajectory === "negative" ? "↓ Negative" : "→ Stagnant";

  return (
    <Card className="border-[rgba(124,58,237,0.26)] bg-[var(--bg-tertiary)] shadow-[0_0_38px_rgba(124,58,237,0.16)]">
      <div className="space-y-5">
        <p className="text-xs uppercase tracking-[0.34em] text-[var(--accent-purple)]">30-day projection</p>
        <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold text-white">{label}</div>
        <p className="text-2xl leading-10 text-[var(--text-primary)]">{description}</p>
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)]">Key Pattern</p>
          <p className="text-[var(--text-secondary)]">{keyPattern}</p>
        </div>
        <div className="rounded-2xl border border-[rgba(0,212,255,0.16)] bg-[rgba(0,212,255,0.08)] p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent-cyan)]">Inflection Point</p>
          <p className="mt-2 text-[var(--text-primary)]">{inflectionPoint}</p>
        </div>
        <p className="text-xs text-[var(--text-muted)]">Based on {sampleSize} days of data. Log more to improve accuracy.</p>
      </div>
    </Card>
  );
}
