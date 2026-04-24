"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    let isMounted = true;

    const completeOAuth = async () => {
      const code = searchParams.get("code");
      const oauthError = searchParams.get("error");
      const oauthErrorDescription = searchParams.get("error_description");

      if (oauthError) {
        const message = oauthErrorDescription || oauthError;
        router.replace(`/login?error=${encodeURIComponent(message)}`);
        return;
      }

      if (!code) {
        router.replace("/login?error=Missing%20authorization%20code");
        return;
      }

      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (!isMounted) {
        return;
      }

      if (error) {
        router.replace(`/login?error=${encodeURIComponent(error.message)}`);
        return;
      }

      router.replace("/dashboard");
    };

    completeOAuth();

    return () => {
      isMounted = false;
    };
  }, [router, searchParams]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-(--accent-blue) border-t-transparent" />
        <p className="text-sm uppercase tracking-[0.26em] text-(--text-secondary)">Completing sign in...</p>
      </div>
    </main>
  );
}
