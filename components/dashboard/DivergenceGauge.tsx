import { getDivergenceTone } from "@/lib/utils";

interface DivergenceGaugeProps {
  score: number;
  animatedScore?: number;
  emptyState?: boolean;
}

export function DivergenceGauge({ score, animatedScore, emptyState }: DivergenceGaugeProps) {
  const displayScore = animatedScore ?? score;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayScore / 100) * circumference;
  const tone = getDivergenceTone(displayScore);

  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center">
      <div className="relative h-[260px] w-[260px]">
        <svg viewBox="0 0 220 220" className="h-full w-full -rotate-90">
          <defs>
            <linearGradient id="divergenceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--accent-cyan)" />
              <stop offset="55%" stopColor="var(--accent-blue)" />
              <stop offset="100%" stopColor="var(--danger)" />
            </linearGradient>
          </defs>
          <circle cx="110" cy="110" r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth="14" fill="none" />
          <circle
            cx="110"
            cy="110"
            r={radius}
            stroke="url(#divergenceGradient)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            fill="none"
            style={{ transition: "stroke-dashoffset 1.5s ease, stroke 1.2s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-6xl font-bold tracking-[-0.06em]" style={{ color: emptyState ? "var(--text-muted)" : tone }}>
            {displayScore}
          </div>
          <div className="mt-2 text-sm uppercase tracking-[0.34em] text-[var(--text-secondary)]">Divergence</div>
          <div className="mt-2 text-xs text-[var(--text-muted)]">0 = aligned | 100 = off course</div>
        </div>
      </div>
      <p className="max-w-xs text-sm leading-6 text-[var(--text-secondary)]">
        {emptyState ? "Log your day to see your score." : "The ring updates when your behavior does."}
      </p>
    </div>
  );
}
