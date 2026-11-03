"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// The fluid sim is ~1.3k lines of WebGL; keep it out of the initial bundle and off devices that can't use it.
const SplashCursor = dynamic(() => import("@/components/SplashCursor"), { ssr: false });

/** Mounts the fluid cursor only for mouse users who haven't asked for reduced motion. */
export default function CursorEffect() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(query.matches);
    const id = requestAnimationFrame(update);
    query.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(id);
      query.removeEventListener("change", update);
    };
  }, []);

  if (!enabled) return null;
  return <SplashCursor COLOR="#38bdf8" RAINBOW_MODE={false} SPLAT_RADIUS={0.06} SPLAT_FORCE={3000} />;
}
