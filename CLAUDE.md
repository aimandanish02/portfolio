@AGENTS.md

# Project stack & conventions

Next.js 16.3.1 (App Router) + React 19.2.8 + TypeScript, single-page portfolio (`src/app/page.tsx`, a **Server Component** — interactive pieces are `"use client"` leaf components). Tailwind CSS v4 — no `tailwind.config.js`; config/theme lives in `src/app/globals.css` via `@tailwindcss/postcss`. Fonts: Geist / Geist Mono via `next/font/google` (`--font-sans` maps to `--font-geist-sans`).

## Content & design system

- **All copy/data lives in `src/data/portfolio.ts`** (profile, nav, experience, projects, stats, skills, accents). Edit content there, not in `page.tsx`.
- **Spacing/type tokens are custom `@utility` classes in `globals.css`** — use them instead of ad-hoc values:
  - `container-page` — max-w 72rem, gutter 20px / 32px (sm+). Every section's inner wrapper.
  - `section-y` — vertical section padding 96px / 128px (lg+).
  - `eyebrow` — 12px uppercase label above headings; `heading-section` — 30px / 40px section `h2`.
  - `label-meta` — 12px uppercase caption (dt, stat labels, card meta), white/55.
- Rhythm: section header → content `mt-12 sm:mt-16`; card grids `gap-4 sm:gap-6`; card padding `p-6` (contact cards `p-5`); CTAs use the shadcn Button `size="xl"` (48px, rounded-full).
- Text contrast floor on black is `text-white/55` (WCAG AA); body copy `text-white/65`, emphasized `text-white/85`.
- Shared site components in `src/components/site/`: `SectionHeader` (eyebrow + `ScrollFloat` h2 + aside), `Tag` (pill), `CopyEmailButton`, `CursorEffect` (gates `SplashCursor`), `BrandIcons` (GitHub/LinkedIn SVGs — lucide v1 has no brand icons).
- Accessibility: skip link, landmarks with `aria-labelledby`, one `h1`, `h2` per section; split-text components (`Shuffle`, `ScrollFloat`) set `aria-label` with the full string. Every animation component honours `prefers-reduced-motion`.
- SEO: full `metadata` + `viewport` in `layout.tsx`, Person JSON-LD, generated `opengraph-image.tsx`, `icon.svg`. Set `NEXT_PUBLIC_SITE_URL` in production so OG/canonical URLs are absolute.

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
- `SplashCursor.tsx` — WebGL fluid-simulation cursor trail (own shaders), mounted via `site/CursorEffect.tsx` in `layout.tsx` — lazy-loaded, only on fine pointers without reduced motion.
- `BubbleMenu.tsx` — floating pill/bubble nav menu, animated with `gsap`.
- `Shuffle.tsx` — text shuffle/reveal animation using `gsap` + `ScrollTrigger` + `SplitText` + `@gsap/react`'s `useGSAP` hook.
- `AnimatedContent`, `ScrollReveal`, `ScrollFloat`, `ScrollVelocity`, `SpotlightCard`, `GlareHover`, `CountUp` — scroll/hover effects. `AnimatedContent` takes `as="li"`, `ScrollFloat`/`ScrollReveal` take `as` so list/heading markup stays valid.
- `laptop/` — R3F scroll-driven 3D laptop (`#workstation`); three.js is code-split and only mounted near the viewport.
- `LogoLoop.tsx` — infinite marquee/logo loop; tech-stack logos passed into it (in `page.tsx`) are loaded live from the `simpleicons.org` CDN (brand-colored SVGs), not bundled npm assets.

## Other key dependencies

- `gsap` + `@gsap/react` — animation engine (ScrollTrigger, SplitText plugins registered where used).
- `ogl` — minimal WebGL library powering `Galaxy`.
- `three` + `@react-three/fiber` + `@react-three/drei` — laptop scene. `motion` — `ScrollProgress`, `CountUp`.
- `radix-ui` + `class-variance-authority` + `tailwind-merge` — shadcn/ui's underlying primitives/variant/merge stack.
- `lucide-react` — icon set, used directly in `page.tsx` and as shadcn's configured icon library.

## Page structure (`src/app/page.tsx`)

Single scrolling page, dark theme (`bg-black text-white` base), sections in order, each with its own accent color:

1. **Nav** — `BubbleMenu` (floating pill nav, fixed/overlay), logo `AD.` with sky→purple gradient text, links to `#hero`. Menu closes on link click / Escape, locks scroll, uses `aria-expanded`. Nav overlay uses `backdrop-blur-2xl` + `rgba(5,6,15,0.82)` scrim to avoid overlapping hero content; pill background is dark navy (`#1a1c2e`), not pure black.
2. `#hero` — `Galaxy` WebGL starfield background (`density=1.3 hueShift=200 glowIntensity=0.5 saturation=0.65 twinkleIntensity=0.5`), `Shuffle` text-reveal headline/subheadline, primary CTA button with sky→purple gradient (`from-sky-400 to-purple-500`). Bottom fade via gradient overlay into black. Stats row (`CountUp`) at the bottom. Followed by `#workstation` (3D laptop).
3. `#about` — purple accent (label + ambient glow blob). Stats grid + capability cards, each card has a distinct icon color (sky/purple/emerald).
4. `#skills` — cyan accent glow blob. `LogoLoop` marquee of tech-stack logos, pulled live from `simpleicons.org` in brand colors (a couple manually overridden to white for contrast: Next.js, Express; AWS kept its orange).
5. `#experience` — pink accent. Timeline with glowing pink dots.
6. `#projects` — amber accent, right-side glow blob. First project is `featured` (spans 2 cols on lg so the 8-card grid fills 3 rows), cards show the live hostname.
7. `#contact` — emerald accent. "Email me" CTA (emerald→cyan gradient) + "Copy email" button; contact cards for email/phone/LinkedIn/GitHub.

Global: `SplashCursor` (WebGL fluid cursor, color `#38bdf8`) via `CursorEffect` in `layout.tsx` (fixed overlay, `pointer-events: none`). `ScrollProgress` top bar + right-side section rail (lg+). Footer with socials + back-to-top.

## Design history / decisions worth knowing

- Cursor effect was originally `SwarmCursor` (WebGL swarm/worm effect) — replaced with `SplashCursor` (WebGL fluid sim) per user preference. `SwarmCursor.tsx` still exists in the repo but is dead code.
- Nav (`BubbleMenu`) originally had a bug where its `inset-0` fixed overlay visually clashed with page content on open — fixed with the backdrop-blur + dark scrim treatment described above.
- Tech stack pills started as plain text; upgraded to real brand-colored SVG logos via the Simple Icons CDN.
- The "About" section originally had text only; a stats grid, capability cards, and ambient color blobs were added for visual richness.
- Per-section color accents (purple/cyan/pink/amber/emerald) were a deliberate pass to differentiate each section instead of a flat single-accent theme.

- Polish pass: fixed Geist never loading (circular `--font-sans`), standardized spacing via utilities, enlarged CTAs, raised text contrast, fixed invalid markup (`<p>` in `<h2>`, `dt` inside links), removed dead `SwarmCursor`/`ScrollExpand`/default Next assets, made the page a Server Component.
