"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";

export interface ScrollProgressSection {
  id: string;
  label: string;
  color: string;
}

interface ScrollProgressProps {
  sections: ScrollProgressSection[];
}

/**
 * Fixed reading-progress bar plus a section rail that tracks the active
 * section while scrolling. ReactBits has no scroll-progress primitive, so this
 * is hand-rolled on `motion/react` to match the rest of the animation stack.
 */
export default function ScrollProgress({ sections }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const targets = sections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-sky-400 via-purple-500 to-emerald-400"
      />

      <nav
        aria-label="Section progress"
        className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex"
      >
        {sections.map((section) => {
          const isActive = section.id === activeId;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="group flex items-center gap-2"
              aria-current={isActive ? "true" : undefined}
            >
              <span
                className={`text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${
                  isActive ? "text-white/80" : "translate-x-1 text-white/0 group-hover:translate-x-0 group-hover:text-white/50"
                }`}
              >
                {section.label}
              </span>
              <span
                className="h-2 w-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: isActive ? section.color : "rgba(255,255,255,0.25)",
                  transform: isActive ? "scale(1.4)" : "scale(1)",
                  boxShadow: isActive ? `0 0 12px 2px ${section.color}66` : "none",
                }}
              />
            </a>
          );
        })}
      </nav>
    </>
  );
}
