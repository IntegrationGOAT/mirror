"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/decisions", label: "Decisions" },
  { href: "/timeline", label: "Timeline" },
  { href: "/twin", label: "Twin" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-[rgba(8,11,20,0.72)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="text-sm font-semibold uppercase tracking-[0.34em] text-white">
          Mirror
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm text-[var(--text-secondary)] transition hover:text-white",
                  active && "text-white after:block after:h-px after:bg-[var(--accent-blue)] after:mt-1",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
