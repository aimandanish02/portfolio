"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

/** Vertical rail that draws itself as the list scrolls through the viewport, with a glowing tip. */
export default function TimelineRail({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  const tipTop = useTransform(progress, (v) => `${v * 100}%`);
  const tipOpacity = useTransform(progress, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);

  return (
    <div className="relative">
      <div aria-hidden className="absolute left-0 top-0 h-full w-px bg-white/10" />
      <motion.div
        aria-hidden
        style={{ scaleY: progress }}
        className="absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-pink-400 via-purple-400 to-sky-400"
      />
      <motion.div
        aria-hidden
        style={{ top: tipTop, opacity: tipOpacity }}
        className="absolute left-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_16px_4px_rgba(244,114,182,0.8)]"
      />
      <ol ref={ref} className={cn(className)}>
        {children}
      </ol>
    </div>
  );
}

/** Timeline node that lights up as it scrolls into the upper part of the viewport. */
export function TimelineDot({ className, current }: { className?: string; current?: boolean }) {
  return (
    <motion.span
      aria-hidden
      initial={{ scale: 0.5, opacity: 0.35 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -35% 0px" }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      className={cn(
        "absolute flex size-3 items-center justify-center rounded-full bg-pink-400 shadow-[0_0_14px_3px_rgba(244,114,182,0.55)]",
        className
      )}
    >
      {current ? <span className="absolute inline-flex size-full animate-ping rounded-full bg-pink-400 opacity-60" /> : null}
    </motion.span>
  );
}
