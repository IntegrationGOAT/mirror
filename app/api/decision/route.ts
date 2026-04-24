import { NextResponse } from "next/server";
import { SHADOW_DECISION_PROMPT } from "@/lib/ai/prompts";
import { generateGeminiText } from "@/lib/ai/client";
import { buildDemoPersona, makeDemoShadowDecision } from "@/lib/twin";
import type { DailyLog, OnboardingAnswers } from "@/types";

function parseJsonObject(raw: string) {
  const clean = raw
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/, "");

  return JSON.parse(clean) as {
    recommendation: "yes" | "no" | "conditional";
    reasoning: string;
    confidence: number;
    past_self_choice: string;
    evolved_self_choice: string;
    key_tension: string;
  };
}

const defaultAnswers: OnboardingAnswers = {
  top_values: "clarity, integrity, courage",
  biggest_regret: "",
  optimize_for: "",
  proud_decision: "",
  regretted_decision: "",
  future_self: "",
  deepest_fear: "",
};

export async function POST(request: Request) {
  const body = (await request.json()) as {
    dilemma?: string;
    recentLogs?: DailyLog[];
  };

  const dilemma = body.dilemma?.trim() ?? "";
  if (!dilemma) {
    return NextResponse.json({ message: "Dilemma is required" }, { status: 400 });
  }

  const recentLogs = body.recentLogs ?? [];
  const persona = buildDemoPersona(defaultAnswers);

  try {
    const modelResponse = await generateGeminiText(
      SHADOW_DECISION_PROMPT(persona, dilemma, recentLogs),
    );

    if (modelResponse.text) {
      const parsed = parseJsonObject(modelResponse.text);
      return NextResponse.json({
        id: crypto.randomUUID(),
        dilemma,
        twin_recommendation: parsed.recommendation,
        twin_reasoning: parsed.reasoning,
        confidence: parsed.confidence,
        past_self_choice: parsed.past_self_choice,
        evolved_self_choice: parsed.evolved_self_choice,
        debate_history: [],
        key_tension: parsed.key_tension,
        created_at: new Date().toISOString(),
      });
    }
  } catch {
    // Fall back to deterministic demo behavior when model parsing fails.
  }

  const fallback = makeDemoShadowDecision(dilemma, persona, recentLogs);
  return NextResponse.json({
    id: crypto.randomUUID(),
    dilemma,
    twin_recommendation: fallback.recommendation,
    twin_reasoning: fallback.reasoning,
    confidence: fallback.confidence,
    past_self_choice: fallback.past_self_choice,
    evolved_self_choice: fallback.evolved_self_choice,
    debate_history: [],
    key_tension: fallback.key_tension,
    created_at: new Date().toISOString(),
  });
}
