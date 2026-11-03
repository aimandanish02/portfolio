import type { ReactNode } from "react";
import ScrollFloat from "@/components/ScrollFloat";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  /** Used as the heading id so the parent <section> can point aria-labelledby at it. */
  id: string;
  /** Two-digit section number shown before the eyebrow, e.g. "02". */
  index: string;
  eyebrow: string;
  title: string;
  /** Word(s) in the title set in the italic serif accent face. */
  highlight?: string;
  /** Tailwind text colour for the eyebrow and accent word, e.g. `text-pink-400`. */
  accent: string;
  aside?: ReactNode;
  className?: string;
}

/** Numbered eyebrow + heading + optional meta. Every section uses this so spacing and type stay identical. */
export default function SectionHeader({ id, index, eyebrow, title, highlight, accent, aside, className }: SectionHeaderProps) {
  return (
    <header className={cn("flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div>
        <p className={cn("eyebrow flex items-center gap-3", accent)}>
          <span aria-hidden className="font-mono tracking-normal text-white/45">{index}</span>
          <span aria-hidden className="h-px w-8 bg-current opacity-60" />
          {eyebrow}
        </p>
        <ScrollFloat
          id={id}
          containerClassName="mt-4"
          textClassName="heading-section text-white"
          stagger={0.02}
          highlight={highlight}
          highlightClassName={cn("font-serif font-normal italic tracking-normal pr-[0.06em]", accent)}
        >
          {title}
        </ScrollFloat>
      </div>
      {aside ? <p className="font-mono text-xs uppercase tracking-wider text-white/50 sm:pb-2">{aside}</p> : null}
    </header>
  );
}
