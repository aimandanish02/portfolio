"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MagnetProps {
  children: ReactNode;
  /** 0–1: how far the content follows the pointer. */
  strength?: number;
  className?: string;
}

/**
 * Pulls its content toward the cursor. The outer span has extra padding (cancelled by a
 * negative margin) so the pull starts just before the pointer reaches the button.
 */
export default function Magnet({ children, strength = 0.3, className }: MagnetProps) {
  const inner = useRef<HTMLSpanElement>(null);

  const onMove = (e: PointerEvent<HTMLSpanElement>) => {
    const el = inner.current;
    if (!el || e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const reset = () => {
    if (inner.current) inner.current.style.transform = "";
  };

  return (
    <span className={cn("-m-4 inline-block p-4", className)} onPointerMove={onMove} onPointerLeave={reset}>
      <span ref={inner} className="inline-block transition-transform duration-300 ease-out will-change-transform">
        {children}
      </span>
    </span>
  );
}
