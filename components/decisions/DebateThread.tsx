"use client";

import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import type { DebateMessage } from "@/types";
import { useState } from "react";

interface DebateThreadProps {
  messages: DebateMessage[];
  loading?: boolean;
  onSend: (message: string) => void;
  onEndDebate: () => void;
}

export function DebateThread({ messages, loading, onSend, onEndDebate }: DebateThreadProps) {
  const [draft, setDraft] = useState("");

  return (
    <div className="mt-4 space-y-4 rounded-[22px] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4">
      <div className="space-y-3">
        {messages.map((message, index) => (
          <div
            key={index}
            className={message.role === "twin" ? "max-w-[80%] rounded-2xl bg-[rgba(124,58,237,0.15)] p-4 text-sm leading-7 text-white" : "ml-auto max-w-[80%] rounded-2xl bg-[rgba(59,111,255,0.16)] p-4 text-sm leading-7 text-white"}
          >
            <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-white/60">{message.role === "twin" ? "Twin" : "You"}</p>
            <p>{message.content}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <Textarea value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Make your case..." className="min-h-28" />
        <div className="flex items-center justify-between gap-3">
          <Button variant="secondary" onClick={onEndDebate}>End Debate</Button>
          <Button
            disabled={loading || !draft.trim()}
            onClick={() => {
              onSend(draft.trim());
              setDraft("");
            }}
          >
            {loading ? "Thinking..." : "Send"}
          </Button>
        </div>
      </div>
    </div>
  );
}
