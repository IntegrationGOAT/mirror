import { getDivergenceTone, cn } from "@/lib/utils";

interface DivergenceGaugeProps {
  score: number;
  animatedScore?: number;
  emptyState?: boolean;
  loading?: boolean;
}

export function DivergenceGauge({ score, animatedScore, emptyState, loading }: DivergenceGaugeProps) {
  const displayScore = animatedScore ?? score;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayScore / 100) * circumference;
  const tone = getDivergenceTone(displayScore);

  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center group">
      <div className="relative h-[280px] w-[280px]">
        {/* Glow effect background */}
        <div 
          className={cn(
            "absolute inset-0 rounded-full blur-[60px] opacity-20 transition-all duration-1000",
            loading && "animate-pulse"
          )}
          style={{ background: tone }}
        />
        
        <svg viewBox="0 0 220 220" className={cn(
          "relative h-full w-full -rotate-90 transition-transform duration-1000",
          loading && "animate-[spin_4s_linear_infinite]"
        )}>
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d4ff" />
              <stop offset="50%" stopColor="#3b6fff" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <circle cx="110" cy="110" r={radius} stroke="rgba(255,255,255,0.05)" strokeWidth="12" fill="none" />
          <circle
            cx="110"
            cy="110"
            r={radius}
            stroke="url(#gaugeGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            fill="none"
            filter="url(#glow)"
            style={{ transition: "stroke-dashoffset 2s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="relative">
             <div className="text-7xl font-bold tracking-tight" style={{ color: emptyState ? "var(--text-muted)" : "white" }}>
              {displayScore}
            </div>
            {!emptyState && (
              <div className="absolute -right-6 top-2 text-xl font-medium opacity-50">%</div>
            )}
          </div>
          <div className="mt-2 text-[10px] font-black uppercase tracking-[0.5em] text-[var(--text-secondary)] opacity-80">Divergence Index</div>
          <div className="mt-4 flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="h-1 w-4 rounded-full" 
                style={{ 
                  background: i * 20 < displayScore ? tone : 'rgba(255,255,255,0.1)',
                  opacity: i * 20 < displayScore ? 1 : 0.3
                }} 
              />
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <p className="max-w-xs text-sm font-medium leading-relaxed text-[var(--text-primary)]">
          {emptyState ? "Awaiting your first log of the day." : displayScore > 60 ? "Significant drift detected." : displayScore > 30 ? "Moderate alignment." : "High integrity state."}
        </p>
        <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
          {emptyState ? "Your twin needs data to calibrate" : "Real-time behavioral mapping active"}
        </p>
      </div>
    </div>
  );
}
