/** Animated mouse glyph at the bottom of the hero, linking to the next section. */
export default function ScrollCue({ href }: { href: string }) {
  return (
    <a
      href={href}
      aria-label="Scroll to the next section"
      className="group absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex"
    >
      <span className="flex h-10 w-6 justify-center rounded-full border border-white/25 pt-2 transition-colors group-hover:border-white/60">
        <span className="h-2 w-1 animate-scroll-dot rounded-full bg-white/80" />
      </span>
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/45 transition-colors group-hover:text-white/80">
        Scroll
      </span>
    </a>
  );
}
