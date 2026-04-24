import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { formatTimeLabel } from "@/lib/utils";

interface TwinTakePanelProps {
  commentary?: string;
  timestamp?: string;
  history?: string[];
}

export function TwinTakePanel({ commentary, timestamp, history = [] }: TwinTakePanelProps) {
  return (
    <Card className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.34em] text-[var(--accent-purple)]">Your Twin Says</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Twin commentary</h3>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--accent-purple),var(--accent-blue))] text-lg font-bold text-white shadow-[0_0_24px_rgba(124,58,237,0.35)]">
          T
        </div>
      </div>

      <p className="text-lg leading-8 text-[var(--text-primary)]">
        {commentary ?? "Log your day. Your twin is watching."}
      </p>

      <div className="flex items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
        <span>{timestamp ? `Logged at ${formatTimeLabel(timestamp)}` : "No log yet"}</span>
        <Badge className="border-[rgba(124,58,237,0.22)] text-[var(--accent-purple)]">Live mirror</Badge>
      </div>

      {history.length > 0 ? (
        <details className="rounded-2xl border border-white/10 bg-white/4 px-4 py-3">
          <summary className="cursor-pointer text-sm font-semibold text-white">History</summary>
          <div className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
            {history.map((entry) => (
              <p key={entry} className="leading-6">
                {entry}
              </p>
            ))}
          </div>
        </details>
      ) : null}
    </Card>
  );
}
