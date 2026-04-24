"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DebateThread } from "@/components/decisions/DebateThread";
import { Textarea } from "@/components/ui/Textarea";
import { TwinDecisionCard } from "@/components/decisions/TwinDecisionCard";
import { useMirrorStore } from "@/hooks/useMirrorStore";
import type { DebateMessage, ShadowDecision } from "@/types";
import { useMemo, useState } from "react";

export default function DecisionsPage() {
  const [dilemma, setDilemma] = useState("Should I take this freelance project even though I'm already overwhelmed?");
  const { logs, decisions, addDecision, updateDecisionHistory } = useMirrorStore();
  const [selectedDecisionId, setSelectedDecisionId] = useState<string | null>(null);
  const [decision, setDecision] = useState<ShadowDecision | null>(null);
  const [debateVisible, setDebateVisible] = useState(false);
  const [debateLoading, setDebateLoading] = useState(false);

  const selectedDecision = useMemo(
    () => decisions.find((item) => item.id === selectedDecisionId) ?? decision,
    [decision, decisions, selectedDecisionId],
  );

  const fetchDecision = async () => {
    const response = await fetch("/api/decision", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dilemma,
        recentLogs: logs.slice(-7),
      }),
    });

    const payload = (await response.json()) as ShadowDecision & { created_at?: string };
    const nextDecision: ShadowDecision = {
      id: payload.id,
      dilemma: payload.dilemma,
      twin_recommendation: payload.twin_recommendation,
      twin_reasoning: payload.twin_reasoning,
      confidence: payload.confidence,
      past_self_choice: payload.past_self_choice,
      evolved_self_choice: payload.evolved_self_choice,
      debate_history: payload.debate_history ?? [],
    };

    addDecision({ ...nextDecision, created_at: payload.created_at ?? new Date().toISOString() });
    setDecision(nextDecision);
    setSelectedDecisionId(nextDecision.id);
    setDebateVisible(true);
  };

  const sendDebate = async (message: string) => {
    if (!selectedDecision) {
      return;
    }

    setDebateLoading(true);
    const userMessage: DebateMessage = {
      role: "user",
      content: message,
      timestamp: new Date().toISOString(),
    };

    const response = await fetch("/api/debate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userMessage: message,
        history: [...selectedDecision.debate_history, userMessage],
      }),
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let twinMessage = "";

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        twinMessage += decoder.decode(value, { stream: true });
      }
    }

    const nextHistory: DebateMessage[] = [
      ...selectedDecision.debate_history,
      userMessage,
      { role: "twin", content: twinMessage, timestamp: new Date().toISOString() },
    ];

    updateDecisionHistory(selectedDecision.id, nextHistory);
    setDecision((current) =>
      current && current.id === selectedDecision.id
        ? { ...current, debate_history: nextHistory }
        : current,
    );
    setDebateLoading(false);
  };

  return (
    <>
      <Navbar />
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6">
        <Card className="space-y-5">
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-(--text-secondary)">Shadow Decision</p>
            <h1 className="mt-2 text-2xl font-semibold text-white">What are you deciding?</h1>
          </div>
          <Textarea value={dilemma} onChange={(event) => setDilemma(event.target.value)} placeholder="e.g., Should I take this freelance project even though I'm already overwhelmed?" />
          <div className="flex justify-end">
            <Button onClick={fetchDecision}>Ask Your Twin</Button>
          </div>
        </Card>

        {selectedDecision ? (
          <div className="space-y-4">
            <TwinDecisionCard
              recommendation={selectedDecision.twin_recommendation}
              confidence={selectedDecision.confidence}
              reasoning={selectedDecision.twin_reasoning}
              pastSelfChoice={selectedDecision.past_self_choice}
              evolvedSelfChoice={selectedDecision.evolved_self_choice}
              tension={`The core tension is still ${selectedDecision.twin_recommendation === "conditional" ? "conditional commitment" : "whether you are choosing from alignment or relief"}.`}
            />
            {debateVisible ? (
              <DebateThread
                messages={selectedDecision.debate_history}
                loading={debateLoading}
                onSend={sendDebate}
                onEndDebate={() => setDebateVisible(false)}
              />
            ) : null}
          </div>
        ) : null}

          <Card className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-(--text-secondary)">Decision History</p>
              <h2 className="mt-2 text-xl font-semibold text-white">Past shadow decisions</h2>
            </div>

            {decisions.length > 0 ? (
              <div className="space-y-3">
                {decisions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSelectedDecisionId(item.id);
                      setDecision(item);
                      setDebateVisible(true);
                    }}
                    className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/4 px-4 py-4 text-left transition hover:border-(--accent-blue) hover:bg-white/6"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-white">{item.dilemma.slice(0, 68)}{item.dilemma.length > 68 ? "…" : ""}</p>
                      <p className="text-xs uppercase tracking-[0.24em] text-(--text-secondary)">{item.confidence}% confidence</p>
                    </div>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-(--text-secondary)">
                      {item.twin_recommendation}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-(--text-secondary)">Ask your twin once and the history appears here.</p>
            )}
          </Card>
      </main>
    </>
  );
}
