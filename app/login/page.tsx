"use client";

import Link from "next/link";
import { Button } from "@base-ui/react/button";
import { Input } from "@base-ui/react/input";

const page = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(59,111,255,0.18),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(124,58,237,0.14),transparent_24%),linear-gradient(180deg,#0a0d16_0%,#080b14_52%,#060810_100%)] px-6 py-12 text-[var(--text-primary)] sm:px-10 lg:px-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-12%] h-72 w-72 rounded-full bg-[rgba(59,111,255,0.18)] blur-3xl animate-[drift_12s_ease-in-out_infinite]" />
        <div className="absolute right-[4%] top-[12%] h-96 w-96 rounded-full bg-[rgba(124,58,237,0.16)] blur-3xl animate-[drift_16s_ease-in-out_infinite_reverse]" />
        <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_35%)] opacity-70" />
        <div className="absolute inset-0 opacity-25 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[72px_72px] mask-[radial-gradient(circle_at_center,black,transparent_78%)]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <section className="space-y-8">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.38em] text-[var(--text-secondary)]">
            <span className="h-px w-12 bg-[var(--accent-blue)]" />
            Mirror
          </div>

          <div className="space-y-4">
            <h1 className="text-[clamp(2.4rem,6vw,4rem)] font-bold tracking-[-0.06em] text-white">
              Welcome back.
            </h1>
            <p className="text-lg leading-8 text-[var(--text-secondary)] sm:text-xl">
              Your twin has been waiting.
            </p>
          </div>

          <div className="space-y-4 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_0_50px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--text-secondary)]">Mirror</p>
            <div className="h-72 rounded-[1.75rem] border border-white/10 bg-[rgba(255,255,255,0.02)]" />
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_0_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <div className="space-y-8">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-secondary)]">Welcome back.</p>
              <h2 className="text-3xl font-bold text-white">Your twin has been waiting.</h2>
            </div>

            <form className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs uppercase tracking-[0.35em] text-[var(--text-secondary)]">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="atreya.sept@gmail.com"
                  className="w-full rounded-[1rem] border border-white/10 bg-white/5 px-4 py-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--accent-blue)] focus:ring-2 focus:ring-[rgba(59,111,255,0.16)]"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-xs uppercase tracking-[0.35em] text-[var(--text-secondary)]">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="•••••"
                  className="w-full rounded-[1rem] border border-white/10 bg-white/5 px-4 py-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--accent-blue)] focus:ring-2 focus:ring-[rgba(59,111,255,0.16)]"
                />
              </div>

              <Button
                type="submit"
                className="w-full rounded-[1rem] bg-gradient-to-r from-[#ff9d00] to-[#ff7b20] px-6 py-4 text-sm font-semibold text-black shadow-[0_20px_40px_rgba(255,149,42,0.25)]"
              >
                Enter Mirror →
              </Button>
            </form>

            <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
              <span className="h-px flex-1 bg-white/10" />
              or continue with
              <span className="h-px flex-1 bg-white/10" />
            </div>

            <Button
              type="button"
              className="w-full justify-center rounded-[1rem] border border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold text-[var(--text-primary)] hover:bg-white/10"
            >
              Google
            </Button>

            <p className="text-sm text-[var(--text-muted)]">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-semibold text-[var(--accent-blue)] hover:text-white">
                Sign up
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default page;
