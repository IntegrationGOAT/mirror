"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { TimeEntry } from "@/types";

const moods = ["😞", "😕", "😐", "🙂", "😄"];
const goalStatuses = ["on_track", "behind", "completed"] as const;

interface DailyLogFormProps {
  onSubmit: (payload: {
    mood: 1 | 2 | 3 | 4 | 5;
    goalStatus: (typeof goalStatuses)[number];
    decisionMade: string;
    notes: string;
    timeSpent: TimeEntry[];
    commentary: string;
  }) => void;
}

export function DailyLogForm({ onSubmit }: DailyLogFormProps) {
  const [mood, setMood] = useState(3);
  const [goalStatus, setGoalStatus] = useState<(typeof goalStatuses)[number]>("on_track");
  const [activities, setActivities] = useState([{ activity: "", hours: "" }]);
  const [decision, setDecision] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const scoreCommentary =
      goalStatus === "behind"
        ? "You are moving, but not toward the thing you keep claiming matters most."
        : goalStatus === "completed"
          ? "Today had more integrity than your recent average. The gap narrowed."
          : "This was mostly aligned, but you still left one important thing unresolved.";

    onSubmit({
      mood: mood as 1 | 2 | 3 | 4 | 5,
      goalStatus,
      decisionMade: decision,
      notes,
      timeSpent: activities
        .map((entry) => ({
          activity: entry.activity.trim(),
          hours: Number(entry.hours),
        }))
        .filter((entry) => entry.activity && Number.isFinite(entry.hours) && entry.hours > 0),
      commentary: `${scoreCommentary} ${decision ? `You said: ${decision}` : ""}`.trim(),
    });
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <p className="text-xs uppercase tracking-[0.34em] text-(--text-secondary)">Mood</p>
        <div className="mt-3 grid grid-cols-5 gap-2">
          {moods.map((emoji, index) => (
            <button
              key={emoji}
              type="button"
              onClick={() => setMood(index + 1)}
              className={cn(
                "rounded-2xl border px-3 py-4 text-2xl transition",
                mood === index + 1
                  ? "border-(--accent-blue) bg-[rgba(59,111,255,0.12)] shadow-[0_0_24px_rgba(59,111,255,0.14)]"
                  : "border-white/10 bg-white/4 hover:bg-white/8",
              )}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.34em] text-(--text-secondary)">A decision I made today</p>
        <Textarea className="mt-3 min-h-28" value={decision} onChange={(event) => setDecision(event.target.value)} placeholder="What did you decide, and why?" />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.34em] text-(--text-secondary)">Time I spent on</p>
          <button type="button" className="text-sm text-(--accent-cyan)">Add +</button>
        </div>
        <div className="space-y-3">
          {activities.map((entry, index) => (
            <div key={index} className="grid grid-cols-[1fr_96px] gap-3">
              <Input
                placeholder="Activity"
                value={entry.activity}
                onChange={(event) => {
                  const value = event.target.value;
                  setActivities((current) =>
                    current.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, activity: value } : item,
                    ),
                  );
                }}
              />
              <Input
                placeholder="Hours"
                value={entry.hours}
                onChange={(event) => {
                  const value = event.target.value;
                  setActivities((current) =>
                    current.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, hours: value } : item,
                    ),
                  );
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.34em] text-(--text-secondary)">Goal status</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {goalStatuses.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setGoalStatus(status)}
              className={cn(
                "rounded-2xl border px-3 py-3 text-sm font-semibold capitalize transition",
                goalStatus === status
                  ? "border-(--accent-blue) bg-[rgba(59,111,255,0.12)] text-white"
                  : "border-white/10 bg-white/4 text-(--text-secondary) hover:bg-white/8",
              )}
            >
              {status.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="text-sm text-[var(--accent-cyan)]"
        onClick={() => setActivities((current) => [...current, { activity: "", hours: "" }])}
      >
        Add +
      </button>

      <div>
        <p className="text-xs uppercase tracking-[0.34em] text-(--text-secondary)">Notes</p>
        <Textarea className="mt-3 min-h-24" value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Anything your twin should know?" />
      </div>

      <Button className="w-full">Submit Log</Button>
    </form>
  );
}
