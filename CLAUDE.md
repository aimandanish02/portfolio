@AGENTS.md

# Project stack & conventions

Next.js 16.3.1 (App Router) + React 19.2.8 + TypeScript, single-page portfolio (`src/app/page.tsx`). Tailwind CSS v4 — no `tailwind.config.js`; config/theme lives in `src/app/globals.css` via `@tailwindcss/postcss`. Fonts: Geist / Geist Mono via `next/font/google`.

## shadcn/ui

- `components.json`: style `radix-nova`, baseColor `neutral`, `cssVariables: true`, icon library `lucide-react`, RSC on.
- Aliases: `@/components`, `@/components/ui`, `@/lib`, `@/hooks` (all under `src/`).
- Utility: `cn()` in `src/lib/utils.ts` (clsx + tailwind-merge).
- Installed shadcn primitives: `src/components/ui/button.tsx` (radix-ui `Slot` + `class-variance-authority`).
- Custom registry `@react-bits` → `https://reactbits.dev/r/{name}.json` is configured in `components.json` — used to pull ReactBits components via the shadcn CLI/MCP instead of hand-copying them.
- **shadcn MCP server** is wired in `.mcp.json` (`npx shadcn@latest mcp`) — use its tools to browse/add components from both the default shadcn registry and the `@react-bits` registry rather than writing UI primitives from scratch. Install new shadcn components with `npx shadcn add <name>` (or `@react-bits/<name>` for ReactBits pieces) so they land in `src/components/ui` with the right conventions.

## Third-party / animation components (`src/components`)

All sourced/adapted from ReactBits (reactbits.dev), hand-integrated (not all were pulled via the registry):

- `Galaxy.tsx` — WebGL starfield hero background, built on `ogl`.
- `SplashCursor.tsx` — WebGL fluid-simulation cursor trail (`ogl`-free, own shaders), **active**, mounted globally in `src/app/layout.tsx`.
- `SwarmCursor.tsx` — earlier WebGL cursor effect (`ogl`-based), **superseded by `SplashCursor`, currently unused/dead** — kept in tree but not imported anywhere.
- `BubbleMenu.tsx` — floating pill/bubble nav menu, animated with `gsap`.
- `Shuffle.tsx` — text shuffle/reveal animation using `gsap` + `ScrollTrigger` + `SplitText` + `@gsap/react`'s `useGSAP` hook.
- `ScrollExpand.tsx` — scroll-driven expand/reveal effect (no external anim lib, manual scroll math).
- `LogoLoop.tsx` — infinite marquee/logo loop; tech-stack logos passed into it (in `page.tsx`) are loaded live from the `simpleicons.org` CDN (brand-colored SVGs), not bundled npm assets.

## Other key dependencies

- `gsap` + `@gsap/react` — animation engine (ScrollTrigger, SplitText plugins registered where used).
- `ogl` — minimal WebGL library powering `Galaxy` (and the unused `SwarmCursor`).
- `radix-ui` + `class-variance-authority` + `tailwind-merge` — shadcn/ui's underlying primitives/variant/merge stack.
- `lucide-react` — icon set, used directly in `page.tsx` and as shadcn's configured icon library.

## Page structure (`src/app/page.tsx`)

Single scrolling page, dark theme (`bg-black text-white` base), sections in order, each with its own accent color:

1. **Nav** — `BubbleMenu` (floating pill nav, fixed/overlay), logo is a plain `<span>` reading `AD.` (`text-white`, **not yet gradient-styled** — see Open items below). Nav overlay uses `backdrop-blur-2xl` + `rgba(5,6,15,0.82)` scrim to avoid overlapping hero content; pill background is dark navy (`#1a1c2e`), not pure black.
2. `#hero` — `Galaxy` WebGL starfield background (`density=1.3 hueShift=200 glowIntensity=0.5 saturation=0.65 twinkleIntensity=0.5`), `Shuffle` text-reveal headline/subheadline, primary CTA button with sky→purple gradient (`from-sky-400 to-purple-500`). Bottom fade via gradient overlay into black. `ScrollExpand` wraps the transition out of hero.
3. `#about` — purple accent (label + ambient glow blob). Stats grid + capability cards, each card has a distinct icon color (sky/purple/emerald).
4. `#skills` — cyan accent glow blob. `LogoLoop` marquee of tech-stack logos, pulled live from `simpleicons.org` in brand colors (a couple manually overridden to white for contrast: Next.js, Express; AWS kept its orange).
5. `#experience` — pink accent. Timeline with glowing pink dots.
6. `#projects` — amber accent, right-side glow blob.
7. `#contact` — emerald accent. CTA button uses emerald→cyan gradient (`from-emerald-400 to-cyan-500`).

Global: `SplashCursor` (WebGL fluid cursor, color `#38bdf8`) mounted once in `src/app/layout.tsx`, sits behind all page content.

## Design history / decisions worth knowing

- Cursor effect was originally `SwarmCursor` (WebGL swarm/worm effect) — replaced with `SplashCursor` (WebGL fluid sim) per user preference. `SwarmCursor.tsx` still exists in the repo but is dead code.
- Nav (`BubbleMenu`) originally had a bug where its `inset-0` fixed overlay visually clashed with page content on open — fixed with the backdrop-blur + dark scrim treatment described above.
- Tech stack pills started as plain text; upgraded to real brand-colored SVG logos via the Simple Icons CDN.
- The "About" section originally had text only; a stats grid, capability cards, and ambient color blobs were added for visual richness.
- Per-section color accents (purple/cyan/pink/amber/emerald) were a deliberate pass to differentiate each section instead of a flat single-accent theme.

## Open items (not yet done)

- Logo text `AD.` in the nav (`src/app/page.tsx`) is still plain white — user asked for a gradient treatment (e.g. `bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent`) matching the hero CTA gradient. Not yet applied.
