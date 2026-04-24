import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { TwinPersona } from "@/types";

interface TwinPersonaCardProps {
  persona: TwinPersona;
}

export function TwinPersonaCard({ persona }: TwinPersonaCardProps) {
  const riskIndex = { low: 0, medium: 1, high: 2 }[persona.risk_appetite];

  return (
    <Card className="border-[rgba(124,58,237,0.32)] bg-[var(--bg-tertiary)] shadow-[0_0_40px_rgba(124,58,237,0.16)]">
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.36em] text-[var(--accent-purple)]">Your Twin</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Reveal complete</h3>
          </div>
          <Badge className="border-[rgba(124,58,237,0.24)] text-[var(--accent-purple)]">Genesis</Badge>
        </div>

        <p className="text-lg leading-8 text-[var(--text-primary)]">{persona.summary}</p>

        <section className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)]">Core Values</p>
          <div className="flex flex-wrap gap-2">
            {persona.core_values.map((value) => (
              <Badge key={value} className="border-0 bg-[rgba(0,212,255,0.12)] text-[var(--accent-cyan)]">
                {value}
              </Badge>
            ))}
          </div>
        </section>

        <section className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)]">Decision Style</p>
          <p className="italic leading-7 text-[var(--text-secondary)]">{persona.decision_style}</p>
        </section>

        <section className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)]">Blind Spots</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {persona.blind_spots.map((spot) => (
              <div key={spot} className="rounded-2xl border border-[rgba(255,68,68,0.16)] bg-[rgba(255,68,68,0.08)] px-4 py-3 text-sm text-[#ffcbcb]">
                <span className="mr-2">⚠</span>
                {spot}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)]">Risk Appetite</p>
          <div className="grid grid-cols-3 gap-2">
            {(["low", "medium", "high"] as const).map((level, index) => (
              <div
                key={level}
                className={index === riskIndex ? "rounded-2xl bg-[var(--accent-blue)]/20 px-3 py-3 text-center text-sm font-semibold text-white" : "rounded-2xl bg-white/5 px-3 py-3 text-center text-sm text-[var(--text-secondary)]"}
              >
                {level[0].toUpperCase() + level.slice(1)}
              </div>
            ))}
          </div>
        </section>
      </div>
    </Card>
  );
}
