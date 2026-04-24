import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.redirect(
        new URL("/login?error=Configuration Error", request.url)
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("Auth error:", error);
        return NextResponse.redirect(
          new URL(`/login?error=${error.message}`, request.url)
        );
      }

      if (data.session) {
        const response = NextResponse.redirect(
          new URL("/dashboard", request.url)
        );

        // Set auth cookie
        response.cookies.set("sb-auth-token", data.session.access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return response;
      }
    } catch (error) {
      console.error("Callback error:", error);
      return NextResponse.redirect(
        new URL("/login?error=Unexpected Error", request.url)
      );
    }
  }

  return NextResponse.redirect(new URL("/login", request.url));
}
