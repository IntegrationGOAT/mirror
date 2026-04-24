"use client";

import { useEffect, useMemo, useState } from "react";
import type { DailyLog, DebateMessage, ShadowDecision } from "@/types";

const LOGS_KEY = "mirror:logs";
const DECISIONS_KEY = "mirror:decisions";

interface StoredShadowDecision extends ShadowDecision {
  created_at: string;
}

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return fallback;
    }

    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function useMirrorStore() {
  const [hydrated, setHydrated] = useState(false);
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [decisions, setDecisions] = useState<StoredShadowDecision[]>([]);

  useEffect(() => {
    setLogs(readStorage<DailyLog[]>(LOGS_KEY, []));
    setDecisions(readStorage<StoredShadowDecision[]>(DECISIONS_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
  }, [hydrated, logs]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(DECISIONS_KEY, JSON.stringify(decisions));
  }, [decisions, hydrated]);

  const addLog = (log: DailyLog) => {
    setLogs((current) => [...current.filter((item) => item.id !== log.id), log]);
  };

  const addDecision = (decision: StoredShadowDecision) => {
    setDecisions((current) => [decision, ...current.filter((item) => item.id !== decision.id)]);
  };

  const updateDecisionHistory = (decisionId: string, debateHistory: DebateMessage[]) => {
    setDecisions((current) =>
      current.map((decision) =>
        decision.id === decisionId
          ? {
              ...decision,
              debate_history: debateHistory,
            }
          : decision,
      ),
    );
  };

  const latestLog = useMemo(() => {
    if (logs.length === 0) {
      return null;
    }

    return [...logs].sort((a, b) => new Date(b.log_date).getTime() - new Date(a.log_date).getTime())[0] ?? null;
  }, [logs]);

  return {
    hydrated,
    logs,
    decisions,
    latestLog,
    addLog,
    addDecision,
    updateDecisionHistory,
  };
}
