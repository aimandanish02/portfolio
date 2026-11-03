"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Terminal } from "lucide-react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScreenContent from "./ScreenContent";
import { OVERLAY_SIZE } from "./overlay";

gsap.registerPlugin(ScrollTrigger);

// three.js + R3F never touch the initial bundle: the scene is code-split and
// only mounted once the section is within a viewport of the user.
const LaptopScene = dynamic(() => import("./LaptopScene"), { ssr: false });

// The zoom finishes at this fraction of the section's scroll; the rest is a
// "hold" where the screen stays put so visitors can use the terminal.
const ANIMATION_END = 0.7;


export default function LaptopSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const useHintRef = useRef<HTMLDivElement>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const onFullscreenChange = useCallback((open: boolean) => setFullscreen(open), []);
  const progressRef = useRef(0);
  const [isNear, setIsNear] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // Mount/unmount the WebGL context based on proximity so it never competes
  // with the hero starfield for GPU time.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsNear(entry.isIntersecting),
      { rootMargin: "50% 0px 50% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || prefersReducedMotion) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const p = Math.min(1, self.progress / ANIMATION_END);
        progressRef.current = p;
        if (hintRef.current) {
          hintRef.current.style.opacity = `${Math.max(0, 1 - p / 0.35)}`;
        }
        // Once the screen has settled, tell people they can type into it.
        if (useHintRef.current) {
          const visible = Math.min(1, Math.max(0, (p - 0.92) / 0.08));
          useHintRef.current.style.opacity = `${visible}`;
          useHintRef.current.style.pointerEvents = visible > 0.5 ? "auto" : "none";
        }
      },
    });

    return () => trigger.kill();
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <section id="workstation" aria-label="Workstation" className="section-y relative bg-black">
        <div className="container-page max-w-3xl">
          <div className="h-[34rem] w-full overflow-hidden rounded-2xl border border-white/10">
            <ScreenContent fullscreen={fullscreen} onFullscreenChange={onFullscreenChange} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="workstation" aria-label="Workstation" className="relative h-[340vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[140px]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />

        <div className="absolute inset-0">
          {isNear ? <LaptopScene progressRef={progressRef} overlayRef={overlayRef} /> : null}
        </div>

        <div
          ref={overlayRef}
          className="absolute left-0 top-0 origin-top-left opacity-0 will-change-transform"
          style={{ width: OVERLAY_SIZE.width, height: OVERLAY_SIZE.height, pointerEvents: "none" }}
        >
          <ScreenContent fullscreen={fullscreen} onFullscreenChange={onFullscreenChange} />
        </div>

        <p ref={hintRef} className="pointer-events-none absolute inset-x-0 bottom-10 text-center text-xs uppercase tracking-[0.3em] text-white/50">
          Scroll to boot up
        </p>

        <div
          ref={useHintRef}
          className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-3 opacity-0"
          style={{ pointerEvents: "none" }}
        >
          <p className="hidden text-xs uppercase tracking-[0.3em] text-white/55 sm:block">
            Click the screen and type <span className="text-emerald-300">help</span>
          </p>
          <button
            type="button"
            onClick={() => setFullscreen(true)}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/10 sm:hidden"
          >
            <Terminal className="size-4 text-emerald-300" aria-hidden />
            Open terminal
          </button>
        </div>
      </div>
    </section>
  );
}
