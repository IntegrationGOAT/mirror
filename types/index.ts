export interface OnboardingAnswers {
  top_values: string;
  biggest_regret: string;
  optimize_for: string;
  proud_decision: string;
  regretted_decision: string;
  future_self: string;
  deepest_fear: string;
}

export interface TwinPersona {
  id: string;
  user_id: string;
  created_at: string;
  onboarding_answers: OnboardingAnswers;
  uploaded_context: string | null;
  core_values: string[];
  decision_style: string;
  blind_spots: string[];
  dominant_emotions: string[];
  risk_appetite: "low" | "medium" | "high";
  summary: string;
  full_persona_json: Record<string, unknown>;
}

export interface TimeEntry {
  activity: string;
  hours: number;
}

export interface DailyLog {
  id: string;
  user_id: string;
  log_date: string;
  mood: 1 | 2 | 3 | 4 | 5;
  decision_made: string | null;
  time_spent: TimeEntry[];
  goal_status: "on_track" | "behind" | "completed" | null;
  notes: string | null;
  divergence_score: number | null;
  twin_commentary: string | null;
}

export interface DebateMessage {
  role: "user" | "twin";
  content: string;
  timestamp: string;
}

export interface ShadowDecision {
  id: string;
  dilemma: string;
  twin_recommendation: "yes" | "no" | "conditional";
  twin_reasoning: string;
  confidence: number;
  past_self_choice: string;
  evolved_self_choice: string;
  debate_history: DebateMessage[];
}
