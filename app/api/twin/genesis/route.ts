import { NextResponse } from "next/server";
import { generateGeminiText } from "@/lib/ai/client";
import { TWIN_GENESIS_PROMPT } from "@/lib/ai/prompts";
import type { OnboardingAnswers } from "@/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { answers: OnboardingAnswers; uploadedText?: string };
    const { answers, uploadedText = "" } = body;

    if (!answers) {
      return NextResponse.json({ error: "Answers are required" }, { status: 400 });
    }

    const prompt = TWIN_GENESIS_PROMPT(answers, uploadedText);
    console.log("Calling Gemini for Twin Genesis...");
    const response = await generateGeminiText(prompt);

    if (!response.text) {
      console.error("Gemini returned empty text for Genesis");
      return NextResponse.json({ error: "Empty AI response" }, { status: 500 });
    }

    let personaData;
    try {
      // Extract JSON from Gemini response
      const jsonMatch = response.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        personaData = JSON.parse(jsonMatch[0]);
        console.log("Successfully parsed persona JSON");
      } else {
        console.error("No JSON block found in Gemini response:", response.text);
        throw new Error("No JSON found in response");
      }
    } catch (e) {
      console.error("Failed to parse Gemini response:", e);
      return NextResponse.json({ error: "Failed to synthesize persona: Invalid JSON structure" }, { status: 500 });
    }

    // Map the AI response to the TwinPersona type
    const persona = {
      id: crypto.randomUUID(),
      user_id: "demo-user",
      created_at: new Date().toISOString(),
      onboarding_answers: answers,
      uploaded_context: uploadedText || null,
      core_values: personaData.core_values || [],
      decision_style: personaData.decision_style || "",
      blind_spots: personaData.blind_spots || [],
      dominant_emotions: personaData.dominant_emotions || [],
      risk_appetite: personaData.risk_appetite || "medium",
      summary: personaData.summary || "",
      full_persona_json: {
        shadow_tendencies: personaData.shadow_tendencies || [],
        growth_edge: personaData.growth_edge || "",
      },
    };

    return NextResponse.json(persona);
  } catch (error) {
    console.error("Twin Genesis API Error:", error);
    return NextResponse.json({ error: "Failed to process twin genesis" }, { status: 500 });
  }
}
