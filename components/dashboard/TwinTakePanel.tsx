import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { formatTimeLabel, cn } from "@/lib/utils";

interface TwinTakePanelProps {
  commentary?: string;
  timestamp?: string;
  history?: string[];
  loading?: boolean;
}

export function TwinTakePanel({ commentary, timestamp, history = [], loading }: TwinTakePanelProps) {
  return (
    <Card className={cn("space-y-6 transition-all duration-500", loading && "opacity-80 shadow-[0_0_30px_rgba(124,58,237,0.2)]")}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--accent-purple)]">Analytic Insight</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">Your Twin&apos;s Take</h3>
        </div>
        <div className={cn(
          "flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent-purple)] to-[#9333ea] text-xl font-bold text-white shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-transform duration-700",
          loading && "animate-spin [animation-duration:3s]"
        )}>
          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" opacity="0.2" />
            <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div className="relative">
        {loading ? (
          <div className="space-y-3 py-2">
            <div className="h-4 w-full animate-pulse rounded bg-white/10" />
            <div className="h-4 w-[90%] animate-pulse rounded bg-white/10" />
            <div className="h-4 w-[40%] animate-pulse rounded bg-white/10" />
          </div>
        ) : (
          <p className="text-xl leading-relaxed text-[var(--text-primary)] font-medium italic">
            &ldquo;{commentary ?? "Log your day. Your twin is watching for patterns you might be missing."}&rdquo;
          </p>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] border-t border-white/5 pt-4">
        <span className="flex items-center gap-2">
          <div className={cn("h-1.5 w-1.5 rounded-full bg-purple-500", loading && "animate-pulse")} />
          {timestamp ? `Analyzed at ${formatTimeLabel(timestamp)}` : "Awaiting data"}
        </span>
        <Badge className="border-purple-500/20 bg-purple-500/10 text-purple-400">Deep Neural Sync</Badge>
      </div>

      {!loading && history.length > 0 ? (
        <details className="group rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 transition-all hover:bg-white/[0.04]">
          <summary className="cursor-pointer text-xs font-bold uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">View Previous Insights</summary>
          <div className="mt-4 space-y-4 border-t border-white/5 pt-4">
            {history.map((entry, i) => (
              <div key={i} className="flex gap-3">
                <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/10" />
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {entry}
                </p>
              </div>
            ))}
          </div>
        </details>
      ) : null}
    </Card>
  );
}
