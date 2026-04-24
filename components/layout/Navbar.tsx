"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { signOut } from "@/lib/auth";
import { useState } from "react";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/decisions", label: "Decisions" },
  { href: "/timeline", label: "Timeline" },
  { href: "/twin", label: "Twin" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[rgba(8,11,20,0.8)] backdrop-blur-2xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 shadow-[0_0_15px_rgba(124,58,237,0.5)]" />
          <span className="text-sm font-black uppercase tracking-[0.5em] text-white">Mirror</span>
        </Link>
        
        <nav className="flex items-center gap-2">
          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all duration-300",
                  active 
                    ? "text-white" 
                    : "text-white/40 hover:text-white/70"
                )}
              >
                {link.label}
                {active && (
                  <div className="absolute inset-x-4 bottom-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 shadow-[0_0_10px_rgba(59,111,255,0.5)]" />
                )}
              </Link>
            );
          })}
          
          {user && (
            <div className="ml-6 flex items-center gap-4 border-l border-white/10 pl-6">
              <span className="text-xs text-white/60">{user.email}</span>
              <button
                onClick={handleSignOut}
                disabled={signingOut}
                className="rounded-lg bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/70 hover:bg-white/10 hover:text-white disabled:opacity-50 transition-all"
              >
                {signingOut ? "Signing out..." : "Sign Out"}
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
