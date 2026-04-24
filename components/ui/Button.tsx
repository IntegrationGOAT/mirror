import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
}

export function Button({
  className,
  variant = "primary",
  children,
  ...props
}: PropsWithChildren<ButtonProps>) {
  const styles = {
    primary:
      "bg-[var(--accent-blue)] text-white shadow-[0_0_24px_rgba(59,111,255,0.26)] hover:bg-[#4d7dff]",
    secondary:
      "bg-white/5 text-[var(--text-primary)] hover:bg-white/10 border border-white/10",
    ghost: "bg-transparent text-[var(--text-secondary)] hover:bg-white/5",
    danger:
      "bg-[rgba(255,68,68,0.12)] text-[#ffb3b3] border border-[rgba(255,68,68,0.28)] hover:bg-[rgba(255,68,68,0.18)]",
  } as const;

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-300 disabled:cursor-not-allowed disabled:opacity-50",
        styles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
