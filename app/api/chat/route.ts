import { TWIN_CHAT_PROMPT } from "@/lib/ai/prompts";
import { generateGeminiText } from "@/lib/ai/client";
import type { DailyLog, DebateMessage } from "@/types";

function streamText(text: string) {
  return new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      const chunks = text.match(/.{1,20}/g) ?? [text];

      chunks.forEach((chunk, index) => {
        setTimeout(() => {
          controller.enqueue(encoder.encode(chunk));
          if (index === chunks.length - 1) {
            controller.close();
          }
        }, index * 20);
      });
    },
  });
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    messages?: DebateMessage[];
    recentLogs?: DailyLog[];
  };

  const messages = body.messages ?? [];
  const recentLogs = body.recentLogs ?? [];

  if (messages.length === 0) {
    return new Response("Log your day first. Your twin reads patterns, not blank space.", {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  let responseText = "Your twin couldn't connect.";

  try {
    const model = await generateGeminiText(TWIN_CHAT_PROMPT(messages, recentLogs));
    if (model.text.trim()) {
      responseText = model.text.trim();
    }
  } catch {
    responseText = "As your twin, I see the same loop: strong intention, delayed commitment. Which promise are you postponing right now?";
  }

  return new Response(streamText(responseText), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
