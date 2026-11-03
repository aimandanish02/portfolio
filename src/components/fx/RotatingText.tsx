"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface RotatingTextProps {
  words: string[];
  /** Milliseconds each word stays on screen. */
  interval?: number;
  /** Classes for the fixed-height line. */
  className?: string;
  /** Classes for each word, e.g. gradient text. */
  wordClassName?: string;
}

/**
 * Cycles through phrases with a vertical blur-slide on a fixed-height, centred line,
 * so changing word lengths never reflows the surrounding layout. Screen readers get the full list once.
 */
export default function RotatingText({ words, interval = 2600, className, wordClassName }: RotatingTextProps) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || words.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [reduce, interval, words.length]);

  return (
    <span className={cn("relative block h-[1.4em] overflow-hidden", className)}>
      <span className="sr-only">{words.join(", ")}</span>
      <AnimatePresence initial={false}>
        <motion.span
          key={words[index]}
          aria-hidden
          initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(8px)" }}
          transition={{ type: "spring", stiffness: 200, damping: 26, mass: 0.9 }}
          className="absolute inset-x-0 top-0 whitespace-nowrap leading-[1.4]"
        >
          {/* Gradient lives on an inner span: Chrome drops background-clip:text on an element that also has a filter. */}
          <span className={wordClassName}>{words[index]}</span>
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
