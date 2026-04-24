import { NextResponse } from "next/server";
import { generateGeminiText } from "@/lib/ai/client";
import { DIVERGENCE_SCORE_PROMPT } from "@/lib/ai/prompts";
import { buildDemoPersona } from "@/lib/twin";
import type { DailyLog } from "@/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { logData?: Partial<DailyLog>; persona?: any };
    const logData = body.logData ?? {};
    
    // In a real app, we'd fetch the user's persona. For the demo, we use a default or build one.
    const persona = body.persona || buildDemoPersona({
      top_values: "Growth, Autonomy, Impact",
      biggest_regret: "Not starting sooner.",
      optimize_for: "Efficiency",
      proud_decision: "Leaving my old job.",
      regretted_decision: "Saying yes to everything.",
      future_self: "Someone who is at peace and focused.",
      deepest_fear: "Wasted potential."
    });

    const prompt = DIVERGENCE_SCORE_PROMPT(persona, logData);
    const response = await generateGeminiText(prompt);
    
    let result = { divergence_score: 50, commentary: "Your twin is processing..." };
    
    try {
      // Extract JSON from response (sometimes Gemini wraps it in code blocks)
      const jsonMatch = response.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      console.error("Failed to parse Gemini response:", e);
      // Fallback to basic logic if AI fails
      const moodScore = logData.mood ? 100 - logData.mood * 14 : 42;
      result.divergence_score = Math.max(0, Math.min(100, Math.round(moodScore)));
      result.commentary = "I see your patterns, but I'm having trouble articulating them right now. Keep logging.";
    }

    return NextResponse.json({
      divergence_score: result.divergence_score,
      commentary: result.commentary,
      logId: crypto.randomUUID(),
    });
  } catch (error) {
    console.error("Divergence API Error:", error);
    return NextResponse.json({ error: "Failed to process divergence" }, { status: 500 });
  }
}
