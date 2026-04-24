import { DEBATE_RESPONSE_PROMPT } from "@/lib/ai/prompts";
import { generateGeminiText } from "@/lib/ai/client";
import type { DebateMessage } from "@/types";

function streamText(text: string) {
  return new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      const chunks = text.match(/.{1,24}/g) ?? [text];

      chunks.forEach((chunk, index) => {
        setTimeout(() => {
          controller.enqueue(encoder.encode(chunk));
          if (index === chunks.length - 1) {
            controller.close();
          }
        }, index * 24);
      });
    },
  });
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    userMessage?: string;
    history?: DebateMessage[];
  };

  const userMessage = body.userMessage?.trim() ?? "";
  const history = body.history ?? [];

  if (!userMessage) {
    return new Response("Your twin couldn't connect.", {
      status: 400,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  let responseText = "Your twin couldn't connect.";

  try {
    const model = await generateGeminiText(
      DEBATE_RESPONSE_PROMPT(history, userMessage),
    );

    if (model.text.trim()) {
      responseText = model.text.trim();
    }
  } catch {
    responseText = "You're defending urgency again, not alignment. What would change if you chose discomfort now instead of later?";
  }

  if (!responseText.endsWith("?")) {
    responseText = `${responseText} What are you still avoiding?`;
  }

  return new Response(streamText(responseText), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
