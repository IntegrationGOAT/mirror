"use client";

import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import type { DebateMessage } from "@/types";
import { useState } from "react";

interface TwinChatProps {
  messages: DebateMessage[];
  loading?: boolean;
  onSend: (message: string) => void;
  onStarterPrompt: (prompt: string) => void;
}

const starterPrompts = [
  "Am I making progress toward my future self?",
  "What pattern are you seeing in me this week?",
  "Where am I lying to myself?",
];

export function TwinChat({ messages, loading, onSend, onStarterPrompt }: TwinChatProps) {
  const [draft, setDraft] = useState("");

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {starterPrompts.map((prompt) => (
          <button key={prompt} type="button" onClick={() => onStarterPrompt(prompt)} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[var(--text-secondary)] transition hover:bg-white/10">
            {prompt}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {messages.map((message, index) => (
          <div key={index} className={message.role === "twin" ? "max-w-[82%] rounded-2xl bg-[rgba(124,58,237,0.16)] p-4 text-sm leading-7 text-white" : "ml-auto max-w-[82%] rounded-2xl bg-[rgba(59,111,255,0.18)] p-4 text-sm leading-7 text-white"}>
            <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-white/60">{message.role === "twin" ? "Twin" : "You"}</p>
            <p>{message.content}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <Textarea value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Speak to your twin..." className="min-h-32" />
        <div className="flex justify-end">
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
