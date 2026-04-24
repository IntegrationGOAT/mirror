import { Card } from "@/components/ui/Card";
import { formatDateLabel, getDivergenceTone } from "@/lib/utils";
import type { DailyLog } from "@/types";

interface BehaviorTimelineProps {
  logs: DailyLog[];
}

export function BehaviorTimeline({ logs }: BehaviorTimelineProps) {
  return (
    <div className="space-y-4">
      {logs.map((log) => {
        const tone = getDivergenceTone(log.divergence_score ?? 50);
        return (
          <Card key={log.id} className="grid gap-4 md:grid-cols-[120px_1fr] md:items-center">
            <div className="space-y-2 text-sm text-[var(--text-secondary)]">
              <p className="text-xs uppercase tracking-[0.3em]">{formatDateLabel(log.log_date)}</p>
              <div className="h-3 w-3 rounded-full" style={{ background: tone, boxShadow: `0 0 18px ${tone}` }} />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-lg font-semibold text-white">{log.decision_made ?? "No decision logged"}</p>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--text-secondary)]">
                  {log.divergence_score ?? 50}%
                </span>
              </div>
              <p className="italic leading-7 text-[var(--text-secondary)]">{log.twin_commentary ?? "Your twin is still waiting for enough data."}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
