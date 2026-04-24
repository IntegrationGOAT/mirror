"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Card } from "@/components/ui/Card";
import { DailyLogForm } from "@/components/dashboard/DailyLogForm";
import { DivergenceGauge } from "@/components/dashboard/DivergenceGauge";
import { TwinTakePanel } from "@/components/dashboard/TwinTakePanel";
import { formatDateLabel } from "@/lib/utils";
import { useMirrorStore } from "@/hooks/useMirrorStore";
import type { DailyLog } from "@/types";
import { useMemo, useState } from "react";

const seedLogs: DailyLog[] = [
  {
    id: "1",
    user_id: "demo-user",
    log_date: "2026-04-20",
    mood: 3,
    decision_made: "Spent the day avoiding one hard conversation.",
    time_spent: [{ activity: "Work", hours: 6 }],
    goal_status: "behind",
    notes: "I kept moving instead of deciding.",
    divergence_score: 38,
    twin_commentary: "You said you wanted depth, then spent the day avoiding the one hard conversation that would have created it.",
  },
  {
    id: "2",
    user_id: "demo-user",
    log_date: "2026-04-21",
    mood: 2,
    decision_made: "Accepted another task I did not want.",
    time_spent: [{ activity: "Meetings", hours: 5 }],
    goal_status: "behind",
    notes: "Said yes too fast.",
    divergence_score: 62,
    twin_commentary: "You traded clarity for momentum again. It felt productive, but it was still avoidance wearing better clothes.",
  },
  {
    id: "3",
    user_id: "demo-user",
    log_date: "2026-04-22",
    mood: 4,
    decision_made: "Protected a block of deep work.",
    time_spent: [{ activity: "Focus work", hours: 3 }],
    goal_status: "on_track",
    notes: "Felt cleaner after saying no.",
    divergence_score: 44,
    twin_commentary: "You moved closer to your values, then backed away the moment it required a firm no.",
  },
];

export default function DashboardPage() {
  const { hydrated, logs, addLog, latestLog } = useMirrorStore();
  const [latestScore, setLatestScore] = useState(50);
  const [latestCommentary, setLatestCommentary] = useState<string | undefined>(seedLogs[0]?.twin_commentary);
  const [latestTimestamp, setLatestTimestamp] = useState<string | undefined>(new Date().toISOString());
  const [scoreAnimating, setScoreAnimating] = useState(false);

  const visibleLogs = logs.length > 0 ? logs : seedLogs;

  const lastSeven = useMemo(
    () =>
      visibleLogs.slice(-7).map((entry) => ({
        date: entry.log_date,
        score: entry.divergence_score ?? 50,
      })),
    [visibleLogs],
  );

  if (!hydrated) {
    return (
      <main className="flex min-h-screen items-center justify-center text-[var(--text-secondary)]">
        Loading Mirror...
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.1fr)_minmax(0,0.86fr)]">
        <Card className="space-y-5">
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-[var(--text-secondary)]">Log Today</p>
            <h1 className="mt-2 text-2xl font-semibold text-white">You Today</h1>
          </div>
          <DailyLogForm
            onSubmit={async ({ mood, goalStatus, decisionMade, notes, timeSpent, commentary }) => {
              const nextScore = mood === 5 ? 24 : mood === 4 ? 36 : mood === 3 ? 52 : mood === 2 ? 68 : 82;
              const response = await fetch("/api/divergence", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  logData: {
                    mood,
                    decision_made: decisionMade,
                    time_spent: timeSpent,
                    goal_status: goalStatus,
                    notes,
                  },
                }),
              });

              const payload = (await response.json()) as { divergence_score: number; commentary: string; logId: string };
              setScoreAnimating(true);
              window.setTimeout(() => {
                const createdLog: DailyLog = {
                  id: payload.logId,
                  user_id: "demo-user",
                  log_date: new Date().toISOString().slice(0, 10),
                  mood,
                  decision_made: decisionMade || null,
                  time_spent: timeSpent,
                  goal_status: goalStatus,
                  notes: notes || null,
                  divergence_score: payload.divergence_score ?? nextScore,
                  twin_commentary: payload.commentary || commentary,
                };

                addLog(createdLog);
                setLatestScore(createdLog.divergence_score ?? nextScore);
                setLatestCommentary(createdLog.twin_commentary ?? commentary);
                setLatestTimestamp(new Date().toISOString());
                setScoreAnimating(false);
              }, 150);
            }}
          />
        </Card>

        <Card className="flex flex-col items-center justify-between gap-6">
          <DivergenceGauge
            score={latestLog?.divergence_score ?? latestScore}
            animatedScore={scoreAnimating ? 50 : latestLog?.divergence_score ?? latestScore}
            emptyState={visibleLogs.length === 0}
          />
          <div className="flex w-full items-center justify-center gap-2">
            {lastSeven.map((entry) => (
              <div
                key={entry.date}
                title={`${formatDateLabel(entry.date)} · ${entry.score}%`}
                className="h-3 w-3 rounded-full"
                style={{ background: entry.score <= 30 ? "var(--success)" : entry.score <= 60 ? "var(--warning)" : "var(--danger)" }}
              />
            ))}
          </div>
        </Card>

        <TwinTakePanel
          commentary={latestCommentary ?? latestLog?.twin_commentary ?? undefined}
          timestamp={latestTimestamp ?? latestLog?.log_date}
          history={visibleLogs.slice(-3).map((entry) => `${formatDateLabel(entry.log_date)}: ${entry.twin_commentary ?? "No commentary yet."}`)}
        />
      </main>
    </>
  );
}
