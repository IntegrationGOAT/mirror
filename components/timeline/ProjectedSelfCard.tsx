import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface ProjectedSelfCardProps {
  trajectory: "positive" | "negative" | "stagnant";
  description: string;
  keyPattern: string;
  inflectionPoint: string;
  sampleSize: number;
  loading?: boolean;
}

export function ProjectedSelfCard({ trajectory, description, keyPattern, inflectionPoint, sampleSize, loading }: ProjectedSelfCardProps) {
  const label = trajectory === "positive" ? "↑ Positive" : trajectory === "negative" ? "↓ Negative" : "→ Stagnant";
  const color = trajectory === "positive" ? "var(--success)" : trajectory === "negative" ? "var(--danger)" : "var(--accent-purple)";

  return (
    <Card className={cn(
      "relative overflow-hidden border-[rgba(124,58,237,0.26)] bg-[var(--bg-tertiary)] shadow-[0_0_40px_rgba(124,58,237,0.1)] transition-all duration-700",
      loading && "opacity-90 scale-[0.99]"
    )}>
      {/* Animated background lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-[move-x_3s_linear_infinite]" />
        <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-[move-x_3s_linear_infinite_reverse]" />
      </div>

      <div className="relative space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--accent-purple)]">Behavioral Projection (30 Days)</p>
          {!loading && (
            <div 
              className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white"
              style={{ borderColor: `${color}44`, color: color }}
            >
              {label}
            </div>
          )}
        </div>

        {loading ? (
          <div className="space-y-6 py-4">
            <div className="h-10 w-full animate-pulse rounded-lg bg-white/5" />
            <div className="h-20 w-full animate-pulse rounded-lg bg-white/5" />
            <div className="flex gap-4">
              <div className="h-12 w-1/2 animate-pulse rounded-lg bg-white/5" />
              <div className="h-12 w-1/2 animate-pulse rounded-lg bg-white/5" />
            </div>
          </div>
        ) : (
          <>
            <p className="text-3xl font-semibold leading-relaxed text-white tracking-tight">
              {description}
            </p>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] opacity-60">Dominant Pattern</p>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{keyPattern}</p>
              </div>
              
              <div className="rounded-2xl border border-[rgba(0,212,255,0.15)] bg-[rgba(0,212,255,0.04)] p-5 transition-colors hover:bg-[rgba(0,212,255,0.08)]">
                <p className="text-[10px] font-black uppercase tracking-widest text-[var(--accent-cyan)]">Critical Inflection Point</p>
                <p className="mt-3 text-sm font-medium leading-relaxed text-white">{inflectionPoint}</p>
              </div>
            </div>
          </>
        )}

        <div className="flex items-center justify-between border-t border-white/5 pt-6 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
          <span>Based on {sampleSize} data points</span>
          <span className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-500" />
            Probability: 84%
          </span>
        </div>
      </div>
    </Card>
  );
}
