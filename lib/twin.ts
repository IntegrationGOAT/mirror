import type { DailyLog, OnboardingAnswers, TwinPersona } from "@/types";

export function buildDemoPersona(answers: OnboardingAnswers): TwinPersona {
  const values = answers.top_values
    .split(/[\n,]/)
    .map((value) => value.trim())
    .filter(Boolean)
    .slice(0, 5);

  return {
    id: "mirror-demo",
    user_id: "demo-user",
    created_at: new Date().toISOString(),
    onboarding_answers: answers,
    uploaded_context: null,
    core_values: values.length > 0 ? values : ["Clarity", "Intensity", "Autonomy"],
    decision_style: "You decide fast when something is emotionally true, then rationalize afterward.",
    blind_spots: ["You confuse pressure with purpose.", "You call delay research when it is usually fear."],
    dominant_emotions: ["restlessness", "self-critique", "ambition"],
    risk_appetite: "medium",
    summary:
      "You are self-aware but not always self-honest. The pattern is a person who wants depth, but whose habits keep drifting back toward urgency, control, and avoidance.",
    full_persona_json: {
      shadow_tendencies: ["overcommitting", "delayed honesty"],
      growth_edge: "You need to choose discomfort sooner instead of dressing it up as strategy.",
    },
  };
}

export function calculateDemoDivergence(log: Partial<DailyLog>) {
  const moodScore = log.mood ? 100 - log.mood * 14 : 42;
  const goalScore = log.goal_status === "behind" ? 22 : log.goal_status === "on_track" ? 66 : 48;
  const decisionPenalty = log.decision_made ? Math.min(20, log.decision_made.length / 8) : 10;
  const score = Math.max(0, Math.min(100, Math.round((moodScore + goalScore + decisionPenalty) / 3)));

  return {
    divergence_score: score,
    commentary:
      score >= 60
        ? "You said one thing, then made a choice that protected comfort. The gap is obvious."
        : score >= 35
          ? "You were partly aligned, but there is still friction between what you want and what you actually did."
          : "This was closer to the person you keep describing. The behavior and the values finally matched.",
  };
}

export function makeDemoShadowDecision(dilemma: string, persona: TwinPersona, recentLogs: DailyLog[]) {
  const averageDivergence = recentLogs.reduce((sum, log) => sum + (log.divergence_score ?? 50), 0) / Math.max(recentLogs.length, 1);

  return {
    recommendation: averageDivergence > 55 ? ("no" as const) : ("conditional" as const),
    reasoning: `Your recent pattern shows ${averageDivergence > 55 ? "more avoidance than alignment" : "some discipline, but not enough certainty"}. The dilemma matters less than whether you keep the boundary clear after saying yes.`,
    confidence: 82,
    past_self_choice: `Your earlier self would probably say yes quickly, then absorb the cost later to avoid disappointing people.`,
    evolved_self_choice: `Your evolved self would slow down, name the limit, and only proceed if the scope respects your values.`,
    key_tension: `You want to grow, but you still treat strain as proof that something is worth doing.`,
    persona,
    dilemma,
  };
}
