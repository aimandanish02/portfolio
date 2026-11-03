import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Small pill used for tech stacks and status badges. */
export default function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-xs leading-none text-white/65",
        className
      )}
    >
      {children}
    </span>
  );
}
