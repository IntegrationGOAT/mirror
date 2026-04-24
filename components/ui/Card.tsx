import { cn } from "@/lib/utils";
import type { HTMLAttributes, PropsWithChildren } from "react";

export function Card({ className, children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={cn(
        "mirror-card rounded-[18px] p-5 sm:p-6",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
