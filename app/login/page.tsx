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
    <main className="relative min-h-screen overflow-hidden bg-[#050507] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_88%,rgba(0,88,196,0.24),transparent_36%),radial-gradient(circle_at_88%_16%,rgba(255,132,0,0.22),transparent_34%),linear-gradient(180deg,#060608_0%,#050507_100%)]" />
        <div className="absolute inset-y-0 left-1/2 hidden w-px bg-white/7 lg:block" />
      </div>

      <div className="relative mx-auto grid min-h-screen w-full max-w-7xl items-center gap-10 px-6 py-10 lg:grid-cols-2 lg:px-12">
        <section className="flex flex-col items-center justify-center gap-10">
          <div className="relative h-75 w-75">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,189,88,0.42)_0%,rgba(155,92,255,0.18)_48%,transparent_74%)] blur-xl" />
            <div className="absolute left-1/2 top-1/2 h-44.5 w-44.5 -translate-x-1/2 -translate-y-1/2">
              <div
                className="absolute inset-0 border border-white/25 bg-[linear-gradient(135deg,rgba(122,171,255,0.45),rgba(164,117,255,0.26))]"
                style={{ clipPath: "polygon(50% 0%, 100% 25%, 50% 50%, 0% 25%)" }}
              />
              <div
                className="absolute inset-0 border border-white/15 bg-[linear-gradient(160deg,rgba(108,70,255,0.45),rgba(81,120,255,0.2))]"
                style={{ clipPath: "polygon(0% 25%, 50% 50%, 50% 100%, 0% 75%)" }}
              />
              <div
                className="absolute inset-0 border border-white/15 bg-[linear-gradient(160deg,rgba(255,152,70,0.42),rgba(130,96,255,0.2))]"
                style={{ clipPath: "polygon(100% 25%, 50% 50%, 50% 100%, 100% 75%)" }}
              />
            </div>
            <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(142,215,255,0.75),rgba(122,135,255,0.35)_34%,rgba(255,140,201,0.3)_58%,transparent_72%)] blur-md" />
          </div>

          <div className="space-y-5 text-center">
            <h1 className="text-[clamp(2.8rem,6vw,4.8rem)] font-black tracking-tighter">Mirror</h1>
            <p className="mx-auto max-w-xl text-[clamp(1rem,1.8vw,1.6rem)] font-medium italic leading-relaxed text-white/60">
              &quot;A digital twin that doesn&apos;t just reflect you
              <span className="mx-2">-</span>
              it reveals who you&apos;re becoming.&quot;
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-2xl rounded-[28px] border border-white/10 bg-black/20 p-7 shadow-[0_24px_70px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-10">
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold tracking-[-0.035em]">Welcome back.</h2>
              <p className="text-lg text-white/55">Your twin has been waiting.</p>
            </div>

            <form onSubmit={handleSignIn} className="space-y-6">
              {error && (
                <div className="rounded-2xl border border-red-500/40 bg-red-500/12 p-4 text-sm text-red-300">
                  {error}
                </div>
              )}
              <div className="space-y-2.5">
                <label htmlFor="email" className="text-xs font-black uppercase tracking-[0.22em] text-white/55">
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
                  className="h-14 w-full rounded-[18px] border border-[#d6dceb]/30 bg-[#d6dceb] px-5 text-[1.12rem] font-medium text-[#232833] placeholder:text-[#454d5a] outline-none transition-all duration-200 focus:border-[#ffe1a8] focus:ring-2 focus:ring-[#ffae3f]/40 disabled:opacity-60"
                />
              </div>

              <div className="space-y-2.5">
                <label htmlFor="password" className="text-xs font-black uppercase tracking-[0.22em] text-white/55">
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
                  className="h-14 w-full rounded-[18px] border border-[#d6dceb]/30 bg-[#d6dceb] px-5 text-[1.12rem] font-medium text-[#232833] placeholder:text-[#454d5a] outline-none transition-all duration-200 focus:border-[#ffe1a8] focus:ring-2 focus:ring-[#ffae3f]/40 disabled:opacity-60"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="mt-1 h-14 w-full rounded-[18px] bg-linear-to-r from-[#ffad14] to-[#ff8e26] text-xl font-extrabold text-black shadow-[0_18px_38px_rgba(255,152,30,0.34)] transition duration-200 hover:brightness-105 disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Enter Mirror →"}
              </Button>
            </form>

            <div className="flex items-center gap-4 text-[1.03rem] text-white/38">
              <span className="h-px flex-1 bg-white/16" />
              or continue with
              <span className="h-px flex-1 bg-white/16" />
            </div>

            <Button
              onClick={handleGoogleSignIn}
              disabled={loading}
              type="button"
              className="flex h-14 w-full items-center justify-center gap-3 rounded-[18px] border border-white/12 bg-[linear-gradient(90deg,rgba(137,111,255,0.08),rgba(0,0,0,0.26)_35%,rgba(0,0,0,0.4))] px-6 text-[1.03rem] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-200 hover:bg-white/12 disabled:opacity-60"
            >
              <span className="inline-block h-5 w-5 rounded-full bg-[conic-gradient(#ea4335_0_25%,#fbbc05_25%_50%,#34a853_50%_75%,#4285f4_75%_100%)]" />
              {loading ? "Signing in..." : "Google"}
            </Button>

            <p className="text-center text-[1.03rem] text-white/45">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-bold text-[#f0a71b] transition hover:text-[#ffd074]">
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
