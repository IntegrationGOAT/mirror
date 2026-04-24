import { NextResponse } from "next/server";
import { calculateDemoDivergence } from "@/lib/twin";
import type { DailyLog } from "@/types";

export async function POST(request: Request) {
  const body = (await request.json()) as { logData?: Partial<DailyLog> };
  const result = calculateDemoDivergence(body.logData ?? {});

  return NextResponse.json({
    divergence_score: result.divergence_score,
    commentary: result.commentary,
    logId: crypto.randomUUID(),
  });
}
