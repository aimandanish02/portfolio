import type { ReactNode } from "react";
import ScrollFloat from "@/components/ScrollFloat";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  /** Used as the heading id so the parent <section> can point aria-labelledby at it. */
  id: string;
  eyebrow: string;
  title: string;
  /** Tailwind text color class for the eyebrow, e.g. `text-pink-400`. */
  accent: string;
  aside?: ReactNode;
  className?: string;
}

/** Eyebrow + heading + optional right-aligned meta. Every section uses this so spacing and type stay identical. */
export default function SectionHeader({ id, eyebrow, title, accent, aside, className }: SectionHeaderProps) {
  return (
    <header className={cn("flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div>
        <p className={cn("eyebrow", accent)}>{eyebrow}</p>
        <ScrollFloat id={id} containerClassName="mt-3" textClassName="heading-section text-white" stagger={0.02}>
          {title}
        </ScrollFloat>
      </div>
      {aside ? <p className="text-sm text-white/55 sm:pb-1.5">{aside}</p> : null}
    </header>
  );
}
