import { NextResponse } from "next/server";
import { buildDemoPersona } from "@/lib/twin";
import type { OnboardingAnswers } from "@/types";

export async function POST(request: Request) {
  const body = (await request.json()) as { answers?: OnboardingAnswers };
  const persona = buildDemoPersona(
    body.answers ?? {
      top_values: "Clarity, growth, honesty",
      biggest_regret: "",
      optimize_for: "",
      proud_decision: "",
      regretted_decision: "",
      future_self: "",
      deepest_fear: "",
    },
  );

  return NextResponse.json({ persona });
}
