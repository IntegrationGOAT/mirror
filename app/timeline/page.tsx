"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Card } from "@/components/ui/Card";
import { BehaviorTimeline } from "@/components/timeline/BehaviorTimeline";
import { ProjectedSelfCard } from "@/components/timeline/ProjectedSelfCard";
import { useMirrorStore } from "@/hooks/useMirrorStore";
import type { DailyLog } from "@/types";
import { useMemo } from "react";

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
  const { logs } = useMirrorStore();
  const visibleLogs = useMemo(() => (logs.length > 0 ? logs : seedLogs), [logs]);

  return (
    <>
      <Navbar />
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6">
        <Card className="space-y-5">
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-[var(--text-secondary)]">Behavior Timeline</p>
            <h1 className="mt-2 text-2xl font-semibold text-white">Your last few days</h1>
          </div>
          <BehaviorTimeline logs={visibleLogs} />
        </Card>

        {visibleLogs.length >= 3 ? (
          <ProjectedSelfCard
            trajectory="stagnant"
            description="If this pattern holds, you will become someone who is increasingly articulate about growth while still choosing the safer path in the moments that matter."
            keyPattern="You are capable of strong self-observation, but you keep delaying the point where observation becomes action."
            inflectionPoint="Make one clean decision today that costs you comfort but restores self-respect."
            sampleSize={visibleLogs.length}
          />
        ) : (
          <Card className="text-[var(--text-secondary)]">Log at least three days to reveal your projected self.</Card>
        )}
      </main>
    </>
  );
}
