import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface TwinDecisionCardProps {
  recommendation: "yes" | "no" | "conditional";
  confidence: number;
  reasoning: string;
  pastSelfChoice: string;
  evolvedSelfChoice: string;
  tension: string;
}

export function TwinDecisionCard({
  recommendation,
  confidence,
  reasoning,
  pastSelfChoice,
  evolvedSelfChoice,
  tension,
}: TwinDecisionCardProps) {
  const tone =
    recommendation === "yes"
      ? "text-[var(--success)]"
      : recommendation === "no"
        ? "text-[var(--danger)]"
        : "text-[var(--warning)]";

  return (
    <Card className="space-y-5 border-[rgba(124,58,237,0.18)]">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.34em] text-[var(--text-secondary)]">Your twin says</p>
        <h3 className={cn("text-3xl font-bold uppercase tracking-[-0.04em]", tone)}>{recommendation}</h3>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-[var(--text-secondary)]">
          <span>Confidence</span>
          <span>{confidence}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/8">
          <div className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent-blue),var(--accent-cyan))]" style={{ width: `${confidence}%` }} />
        </div>
      </div>

      <p className="leading-7 text-[var(--text-primary)]">{reasoning}</p>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)]">Past you would have...</p>
          <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{pastSelfChoice}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[rgba(59,111,255,0.08)] p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)]">Evolved you would...</p>
          <p className="mt-3 text-sm leading-7 text-white">{evolvedSelfChoice}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] p-4 italic text-[var(--text-secondary)]">
        {tension}
      </div>

      <Button variant="danger">I disagree →</Button>
    </Card>
  );
}
