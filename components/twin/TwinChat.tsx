"use client";

import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/lib/utils";
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

      <div className="space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "relative max-w-[85%] rounded-3xl p-4 text-sm leading-relaxed transition-all duration-500 animate-in fade-in slide-in-from-bottom-2",
              message.role === "twin"
                ? "bg-gradient-to-br from-[rgba(124,58,237,0.16)] to-[rgba(124,58,237,0.08)] border border-purple-500/10 text-white"
                : "ml-auto bg-gradient-to-br from-[rgba(59,111,255,0.18)] to-[rgba(59,111,255,0.1)] border border-blue-500/10 text-white"
            )}
          >
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] opacity-50">
              {message.role === "twin" ? "Twin" : "You"}
            </p>
            <p className="relative z-10">{message.content}</p>
          </div>
        ))}
        {loading && (
          <div className="max-w-[85%] rounded-3xl bg-[rgba(124,58,237,0.12)] border border-purple-500/10 p-4 animate-pulse">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] opacity-50 text-purple-300">Twin is processing...</p>
            <div className="flex gap-1.5 py-2">
              <div className="h-2 w-2 animate-bounce rounded-full bg-purple-400 [animation-delay:-0.3s]"></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-purple-400 [animation-delay:-0.15s]"></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-purple-400"></div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4 pt-4 border-t border-white/5">
        <Textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Speak to your twin..."
          className="min-h-32 bg-white/5 border-white/10 focus:border-purple-500/30 focus:bg-white/8 transition-all"
        />
        <div className="flex justify-end">
          <Button
            disabled={loading || !draft.trim()}
            onClick={() => {
              onSend(draft.trim());
              setDraft("");
            }}
            className="px-8 shadow-[0_0_20px_rgba(124,58,237,0.2)]"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Thinking...
              </span>
            ) : "Send"}
          </Button>
        </div>
      </div>
    </div>
  );
}
