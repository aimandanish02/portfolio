"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScreenContent from "./ScreenContent";

gsap.registerPlugin(ScrollTrigger);

// three.js + R3F never touch the initial bundle: the scene is code-split and
// only mounted once the section is within a viewport of the user.
const LaptopScene = dynamic(() => import("./LaptopScene"), { ssr: false });

const OVERLAY_SIZE = { width: 960, height: 536 };

export default function LaptopSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
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
        progressRef.current = self.progress;
        if (hintRef.current) {
          hintRef.current.style.opacity = `${Math.max(0, 1 - self.progress / 0.35)}`;
        }
      },
    });

    return () => trigger.kill();
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <section id="workstation" className="relative bg-black px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10">
            <ScreenContent />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="workstation" className="relative h-[280vh] bg-black">
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
          <ScreenContent />
        </div>

        <p ref={hintRef} className="pointer-events-none absolute inset-x-0 bottom-8 text-center text-xs uppercase tracking-[0.3em] text-white/30">
          Scroll to boot up
        </p>
      </div>
    </section>
  );
}
