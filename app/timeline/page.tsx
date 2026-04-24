"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Card } from "@/components/ui/Card";
import { BehaviorTimeline } from "@/components/timeline/BehaviorTimeline";
import { ProjectedSelfCard } from "@/components/timeline/ProjectedSelfCard";
import { useMirrorStore } from "@/hooks/useMirrorStore";
import type { DailyLog } from "@/types";
import { useMemo, useState , useEffect} from "react";


const logs: DailyLog[] = [
  {
    id: "1",
    user_id: "demo",
    log_date: "2026-04-20",
    mood: 3,
    decision_made: "Skipped a boundary-setting conversation",
    time_spent: [{ activity: "Work", hours: 6 }],
    goal_status: "behind",
    notes: "I kept moving instead of deciding.",
    divergence_score: 38,
    twin_commentary: "You called it busyness, but it was really delay dressed as momentum.",
  },
  {
    id: "2",
    user_id: "demo",
    log_date: "2026-04-21",
    mood: 2,
    decision_made: "Accepted another task I did not want",
    time_spent: [{ activity: "Meetings", hours: 5 }],
    goal_status: "behind",
    notes: "Said yes too fast.",
    divergence_score: 61,
    twin_commentary: "You keep outsourcing your own limits. That has a cost.",
  },
  {
    id: "3",
    user_id: "demo",
    log_date: "2026-04-22",
    mood: 4,
    decision_made: "Protected a block of deep work",
    time_spent: [{ activity: "Focus work", hours: 3 }],
    goal_status: "on_track",
    notes: "Felt cleaner after saying no.",
    divergence_score: 24,
    twin_commentary: "This was closer to the person you keep describing. Notice how calm that felt.",
  },
];

export default function TimelinePage() {
  const { logs, hydrated } = useMirrorStore();
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    if (hydrated) {
      const timer = setTimeout(() => setIsAnalyzing(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [hydrated]);

  const visibleLogs = logs;

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--accent-purple)] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,0.05),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(0,212,255,0.05),transparent_40%)]">
      <Navbar />
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-12">
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--text-secondary)] opacity-70">Archive & Intelligence</p>
          <h1 className="text-4xl font-bold tracking-tight text-white">Your Behavioral Timeline</h1>
          <p className="max-w-2xl text-[var(--text-secondary)] leading-relaxed">
            The Mirror stores your decisions to identify the person you are actually becoming, not just the one you describe.
          </p>
        </div>

        {visibleLogs.length >= 1 ? (
          <ProjectedSelfCard
            trajectory="stagnant"
            description="If this pattern holds, you will become someone who is increasingly articulate about growth while still choosing the safer path."
            keyPattern="You are capable of strong self-observation, but you keep delaying the point where observation becomes action."
            inflectionPoint="Make one clean decision today that costs you comfort but restores self-respect."
            sampleSize={visibleLogs.length}
            loading={isAnalyzing}
          />
        ) : (
          <Card className="text-[var(--text-secondary)] border-dashed border-white/10 bg-white/[0.02] py-20 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.4em]">Log your first day to begin projection</p>
          </Card>
        )}

        <div className="relative">
          {/* Vertical line for timeline */}
          <div className="absolute left-[13px] top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent-purple)] via-white/5 to-transparent md:left-[59px]" />
          
          <div className="space-y-8">
            <BehaviorTimeline logs={visibleLogs} loading={isAnalyzing} />
          </div>
        </div>
      </main>
    </div>
  );
}
