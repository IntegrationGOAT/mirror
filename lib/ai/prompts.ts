import type { DailyLog, OnboardingAnswers, TwinPersona } from "@/types";

export const TWIN_GENESIS_PROMPT = (answers: OnboardingAnswers, uploadedText: string) => `
You are creating a digital twin from reflective answers.
Return ONLY valid JSON with this structure:
{
  "core_values": ["value1", "value2", "value3"],
  "decision_style": "string",
  "blind_spots": ["spot1", "spot2"],
  "dominant_emotions": ["emotion1", "emotion2"],
  "risk_appetite": "low" | "medium" | "high",
  "summary": "string",
  "shadow_tendencies": ["tendency1", "tendency2"],
  "growth_edge": "string"
}

TOP VALUES: ${answers.top_values}
BIGGEST REGRET: ${answers.biggest_regret}
OPTIMIZE FOR: ${answers.optimize_for}
PROUD DECISION: ${answers.proud_decision}
REGRETTED DECISION: ${answers.regretted_decision}
FUTURE SELF: ${answers.future_self}
DEEPEST FEAR: ${answers.deepest_fear}

UPLOADED CONTEXT:
${uploadedText || "None provided"}
`;

export const DIVERGENCE_SCORE_PROMPT = (persona: TwinPersona, log: Partial<DailyLog>) => `
You are calculating a divergence score for the user's day.
Return ONLY valid JSON with this structure:
{ "divergence_score": number, "commentary": "string" }

PERSONA:
${JSON.stringify(persona, null, 2)}

LOG:
${JSON.stringify(log, null, 2)}
`;

export const SHADOW_DECISION_PROMPT = (persona: TwinPersona, dilemma: string, recentLogs: DailyLog[]) => `
You are making a shadow decision.
Return ONLY valid JSON with this structure:
{
  "recommendation": "yes" | "no" | "conditional",
  "reasoning": "string",
  "confidence": number,
  "past_self_choice": "string",
  "evolved_self_choice": "string",
  "key_tension": "string"
}

PERSONA:
${JSON.stringify(persona, null, 2)}

RECENT LOGS:
${JSON.stringify(recentLogs, null, 2)}

DILEMMA: ${dilemma}
`;

export const DEBATE_RESPONSE_PROMPT = (history: Array<{ role: string; content: string }>, userMessage: string) => `
You are the user's digital twin in a live debate.
Keep it short, firm, and specific. End with a question.

HISTORY:
${JSON.stringify(history, null, 2)}

USER MESSAGE:
${userMessage}
`;

export const TWIN_CHAT_PROMPT = (messages: Array<{ role: string; content: string }>, recentLogs: DailyLog[]) => `
You are the user's digital twin in chat. Speak in first person as the twin.
Never be generic. Reference patterns in the logs.

MESSAGES:
${JSON.stringify(messages, null, 2)}

RECENT LOGS:
${JSON.stringify(recentLogs, null, 2)}
`;
