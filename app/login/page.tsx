"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@base-ui/react/button";
import { Input } from "@base-ui/react/input";
import { signIn, signInWithGoogle } from "@/lib/auth";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn(email, password);
    if (result.success) {
      router.push("/dashboard");
    } else {
      setError(result.message || "Failed to sign in");
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");

    const result = await signInWithGoogle();
    if (!result.success) {
      setError(result.message || "Failed to sign in with Google");
    }
    setLoading(false);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(59,111,255,0.18),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(124,58,237,0.14),transparent_24%),linear-gradient(180deg,#0a0d16_0%,#080b14_52%,#060810_100%)] px-6 py-12 text-foreground sm:px-10 lg:px-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-12%] h-72 w-72 rounded-full bg-[rgba(59,111,255,0.18)] blur-3xl animate-[drift_12s_ease-in-out_infinite]" />
        <div className="absolute right-[4%] top-[12%] h-96 w-96 rounded-full bg-[rgba(124,58,237,0.16)] blur-3xl animate-[drift_16s_ease-in-out_infinite_reverse]" />
        <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_35%)] opacity-70" />
        <div className="absolute inset-0 opacity-25 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[72px_72px] mask-[radial-gradient(circle_at_center,black,transparent_78%)]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <section className="space-y-8">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.38em] text-(--text-secondary)">
            <span className="h-px w-12 bg-(--accent-blue)" />
            Mirror
          </div>

          <div className="space-y-4">
            <h1 className="text-[clamp(2.4rem,6vw,4rem)] font-bold tracking-[-0.06em] text-white">
              Welcome back.
            </h1>
            <p className="text-lg leading-8 text-(--text-secondary) sm:text-xl">
              Your twin has been waiting.
            </p>
          </div>

          <div className="space-y-4 rounded-4xl border border-white/10 bg-white/5 p-6 shadow-[0_0_50px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-(--text-secondary)">Mirror</p>
            <div className="h-72 rounded-[1.75rem] border border-white/10 bg-[rgba(255,255,255,0.02)]" />
          </div>
        </section>

        <section className="rounded-4xl border border-white/10 bg-white/5 p-8 shadow-[0_0_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <div className="space-y-8">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.35em] text-(--text-secondary)">Welcome back.</p>
              <h2 className="text-3xl font-bold text-white">Your twin has been waiting.</h2>
            </div>

            <form onSubmit={handleSignIn} className="space-y-6">
              {error && (
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs uppercase tracking-[0.35em] text-(--text-secondary)">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="atreya.sept@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-foreground placeholder:text-(--text-muted) outline-none focus:border-(--accent-blue) focus:ring-2 focus:ring-[rgba(59,111,255,0.16)] disabled:opacity-50"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-xs uppercase tracking-[0.35em] text-(--text-secondary)">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="•••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-foreground placeholder:text-(--text-muted) outline-none focus:border-(--accent-blue) focus:ring-2 focus:ring-[rgba(59,111,255,0.16)] disabled:opacity-50"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-linear-to-r from-[#ff9d00] to-[#ff7b20] px-6 py-4 text-sm font-semibold text-black shadow-[0_20px_40px_rgba(255,149,42,0.25)] disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Enter Mirror →"}
              </Button>
            </form>

            <div className="flex items-center gap-3 text-sm text-(--text-muted)">
              <span className="h-px flex-1 bg-white/10" />
              or continue with
              <span className="h-px flex-1 bg-white/10" />
            </div>

            <Button
              onClick={handleGoogleSignIn}
              disabled={loading}
              type="button"
              className="w-full justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold text-foreground hover:bg-white/10 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Google"}
            </Button>

            <p className="text-sm text-(--text-muted)">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-semibold text-(--accent-blue) hover:text-white">
                Sign up
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;
