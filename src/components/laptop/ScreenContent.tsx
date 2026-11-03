"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { TerminalView, useTerminal } from "@/components/terminal/Terminal";

interface ScreenContentProps {
  fullscreen: boolean;
  onFullscreenChange: (open: boolean) => void;
}

/**
 * Interactive terminal projected onto the laptop lid (authored at 960×536).
 * The same session can pop out into a fullscreen dialog — essential on phones,
 * where the projected screen is too small to type on.
 */
export default function ScreenContent({ fullscreen, onFullscreenChange }: ScreenContentProps) {
  const session = useTerminal({ onNavigate: () => onFullscreenChange(false) });

  useEffect(() => {
    if (!fullscreen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onFullscreenChange(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [fullscreen, onFullscreenChange]);

  return (
    <>
      {fullscreen ? (
        <div className="flex h-full w-full items-center justify-center bg-[#05060f] font-mono text-[15px] text-white/45">
          terminal opened in fullscreen ↗
        </div>
      ) : (
        <TerminalView session={session} onExpand={() => onFullscreenChange(true)} />
      )}

      {fullscreen
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Interactive terminal"
              className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-md sm:p-8"
              onClick={(e) => e.target === e.currentTarget && onFullscreenChange(false)}
            >
              <TerminalView
                session={session}
                variant="fullscreen"
                onClose={() => onFullscreenChange(false)}
                className="h-[min(85svh,44rem)] max-w-4xl rounded-2xl border border-white/15 text-sm shadow-2xl sm:text-[15px]"
              />
            </div>,
            document.body
          )
        : null}
    </>
  );
}
