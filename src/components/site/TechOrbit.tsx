import type { CSSProperties } from "react";
import { orbitRings } from "@/data/portfolio";
import { BrandIcon } from "./BrandIcon";

// Ring sizes as an inset from the container edge, innermost first.
const RING_INSET = ["31%", "19%", "6%"];

/**
 * The stack as a little solar system. Pure CSS: each ring spins, and every icon
 * counter-spins at the same rate so it stays upright. Hovering pauses everything.
 */
export default function TechOrbit() {
  return (
    <div className="group/orbit relative mx-auto aspect-square w-full max-w-[30rem]" aria-hidden>
      <div className="absolute inset-[22%] rounded-full bg-cyan-500/15 blur-3xl" />
      <div className="absolute inset-[38%] rounded-full bg-purple-500/20 blur-2xl" />

      {orbitRings.map((ring, ri) => {
        const ringStyle = {
          inset: RING_INSET[ri],
          animationDuration: `${ring.duration}s`,
          animationDirection: ring.reverse ? "reverse" : "normal",
        } as CSSProperties;
        const counterStyle = {
          animationDuration: `${ring.duration}s`,
          animationDirection: ring.reverse ? "normal" : "reverse",
        } as CSSProperties;

        return (
          <div
            key={ri}
            className={`absolute animate-orbit rounded-full border group-hover/orbit:[animation-play-state:paused] ${
              ri === 1 ? "border-dashed border-white/10" : "border-white/[0.07]"
            }`}
            style={ringStyle}
          >
            {ring.icons.map((tech, i) => {
              const angle = (360 / ring.icons.length) * i + ri * 18;
              return (
                <div key={tech.name} className="absolute inset-0" style={{ rotate: `${angle}deg` }}>
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2" style={{ rotate: `${-angle}deg` }}>
                    <div className="animate-orbit group-hover/orbit:[animation-play-state:paused]" style={counterStyle}>
                      <span
                        title={tech.name}
                        className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-[#0b0c18]/90 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.8)] backdrop-blur transition duration-300 hover:scale-125 hover:border-white/30 sm:size-12"
                      >
                        <BrandIcon slug={tech.icon} className="size-5 sm:size-6" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}

      <div className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#0b0c18] shadow-[0_0_80px_-12px_rgba(34,211,238,0.7)] sm:size-24">
        <span className="absolute inset-0 animate-ping rounded-full border border-cyan-400/20 [animation-duration:3s]" />
        <span className="bg-gradient-to-br from-sky-300 via-cyan-300 to-purple-400 bg-clip-text text-2xl font-black tracking-tight text-transparent sm:text-3xl">
          AD.
        </span>
      </div>
    </div>
  );
}
