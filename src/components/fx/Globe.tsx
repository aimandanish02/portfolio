"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import createGlobe from "cobe";
import { cn } from "@/lib/utils";

interface GlobeProps {
  /** Marker position in degrees. */
  lat: number;
  lng: number;
  className?: string;
}

/** Longitude → cobe's `phi` so the given meridian faces the viewer. */
const phiFor = (lng: number) => Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2);

/**
 * Dotted WebGL globe (cobe, ~5 KB) with a marker on home. Auto-rotates, can be dragged,
 * and only renders while on screen and the tab is visible.
 */
export default function Globe({ lat, lng, className }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dragStart = useRef<{ x: number; offset: number } | null>(null);
  const dragOffset = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let size = canvas.offsetWidth * dpr;
    canvas.width = canvas.height = size;

    let phi = phiFor(lng) - 0.4;
    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: size,
      height: size,
      phi,
      theta: 0.28,
      dark: 1,
      diffuse: 1.4,
      mapSamples: 16000,
      mapBrightness: 5,
      mapBaseBrightness: 0.02,
      baseColor: [0.16, 0.17, 0.26],
      markerColor: [0.66, 0.4, 1],
      glowColor: [0.28, 0.22, 0.5],
      markers: [{ location: [lat, lng], size: 0.1 }],
      opacity: 0.9,
    });

    let raf = 0;
    let visible = false;

    const loop = () => {
      if (!dragStart.current && !reduce) phi += 0.0032;
      globe.update({ phi: phi + dragOffset.current, width: size, height: size });
      raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };
    const start = () => {
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(loop);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    observer.observe(canvas);

    const onResize = () => {
      size = canvas.offsetWidth * dpr;
      canvas.width = canvas.height = size;
    };
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", start);

    const fade = requestAnimationFrame(() => (canvas.style.opacity = "1"));

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(fade);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", start);
      globe.destroy();
    };
  }, [lat, lng]);

  const onPointerDown = (e: PointerEvent<HTMLCanvasElement>) => {
    dragStart.current = { x: e.clientX, offset: dragOffset.current };
    e.currentTarget.setPointerCapture(e.pointerId);
    e.currentTarget.style.cursor = "grabbing";
  };
  const onPointerMove = (e: PointerEvent<HTMLCanvasElement>) => {
    if (!dragStart.current) return;
    dragOffset.current = dragStart.current.offset + (e.clientX - dragStart.current.x) / 180;
  };
  const onPointerUp = (e: PointerEvent<HTMLCanvasElement>) => {
    dragStart.current = null;
    e.currentTarget.style.cursor = "";
  };

  return (
    <canvas
      ref={canvasRef}
      aria-label="Globe with a marker on Seremban, Malaysia"
      role="img"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      className={cn("aspect-square size-full cursor-grab touch-pan-y opacity-0 transition-opacity duration-1000", className)}
    />
  );
}
