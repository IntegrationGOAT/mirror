import { cn } from "@/lib/utils";
import type { HTMLAttributes, PropsWithChildren } from "react";

export function Badge({ className, children, ...props }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--text-secondary)]",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
