import { Card } from "@/components/ui/Card";
import { formatDateLabel, getDivergenceTone } from "@/lib/utils";
import type { DailyLog } from "@/types";

interface BehaviorTimelineProps {
  logs: DailyLog[];
  loading?: boolean;
}

export function BehaviorTimeline({ logs, loading }: BehaviorTimelineProps) {
  if (loading && logs.length === 0) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse grid gap-4 md:grid-cols-[120px_1fr] md:items-center border-white/5 bg-white/[0.02]">
            <div className="space-y-2">
              <div className="h-3 w-20 bg-white/10 rounded" />
              <div className="h-3 w-3 rounded-full bg-white/10" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="h-6 w-48 bg-white/10 rounded" />
                <div className="h-5 w-12 bg-white/10 rounded-full" />
              </div>
              <div className="h-4 w-full bg-white/10 rounded" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {logs.map((log) => {
        const tone = getDivergenceTone(log.divergence_score ?? 50);
        return (
          <Card key={log.id} className="grid gap-4 md:grid-cols-[120px_1fr] md:items-center transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04] group">
            <div className="space-y-2 text-sm text-[var(--text-secondary)]">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-70">{formatDateLabel(log.log_date)}</p>
              <div className="h-3 w-3 rounded-full transition-transform group-hover:scale-110" style={{ background: tone, boxShadow: `0 0 18px ${tone}` }} />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-lg font-semibold text-white group-hover:text-[var(--accent-blue)] transition-colors">{log.decision_made ?? "No decision logged"}</p>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold text-[var(--text-secondary)]">
                  {log.divergence_score ?? 50}% DIVERGENCE
                </span>
              </div>
              <p className="italic leading-7 text-[var(--text-secondary)] opacity-90">{log.twin_commentary ?? "Your twin is still waiting for enough data."}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
