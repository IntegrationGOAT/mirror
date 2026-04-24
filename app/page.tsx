
import Link from "next/link";

const page = () => {
  return (
    <main className="relative flex min-h-screen items-center overflow-hidden px-6 py-12 text-foreground sm:px-10 lg:px-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-12%] h-72 w-72 rounded-full bg-[rgba(59,111,255,0.18)] blur-3xl animate-[drift_12s_ease-in-out_infinite]" />
        <div className="absolute right-[4%] top-[12%] h-96 w-96 rounded-full bg-[rgba(124,58,237,0.16)] blur-3xl animate-[drift_16s_ease-in-out_infinite_reverse]" />
        <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_35%)] opacity-70" />
        <div className="absolute inset-0 opacity-25 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[72px_72px] mask-[radial-gradient(circle_at_center,black,transparent_78%)]" />
      </div>

      <section className="relative mx-auto flex w-full max-w-5xl flex-col gap-10">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.38em] text-(--text-secondary)">
          <span className="h-px w-12 bg-(--accent-blue)" />
          Mirror
        </div>

        <div className="max-w-3xl space-y-6">
          <p className="text-sm uppercase tracking-[0.4em] text-(--text-secondary)">
            Digital twin / behavioral mirror
          </p>
          <h1 className="max-w-4xl text-[clamp(3.2rem,8vw,7rem)] font-bold leading-[0.9] tracking-[-0.06em] text-white">
            Meet yourself.
          </h1>
          <p className="max-w-2xl text-balance text-lg leading-8 text-(--text-secondary) sm:text-xl">
            Not an AI assistant. A mirror that remembers everything you&apos;ve
            said, done, and avoided.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            href="/login"
            className="inline-flex w-full items-center justify-center rounded-full bg-(--accent-blue) px-7 py-4 text-sm font-semibold text-white shadow-[0_0_30px_rgba(59,111,255,0.28)] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#4d7dff] sm:w-auto"
          >
            Begin
          </Link>
          <p className="max-w-xl text-sm leading-6 text-(--text-muted)">
            Most apps tell you what to do. Mirror tells you who you&apos;re becoming.
          </p>
        </div>

        <div className="mt-6 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-(--text-muted)">
          <span className="h-px w-8 bg-white/15" />
          This isn&apos;t AI pretending to be you. This is a mirror that remembers everything.
        </div>
      </section>
    </main>
  );
};

export default page;
