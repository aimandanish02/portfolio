@AGENTS.md

# Project stack & conventions

Next.js 16.3.1 (App Router) + React 19.2.8 + TypeScript, single-page portfolio (`src/app/page.tsx`, a **Server Component** — interactive pieces are `"use client"` leaf components). Tailwind CSS v4 — no `tailwind.config.js`; config/theme lives in `src/app/globals.css` via `@tailwindcss/postcss`. Fonts: Geist / Geist Mono via `next/font/google` (`--font-sans` maps to `--font-geist-sans`), plus **Instrument Serif** (`font-serif`) used only for single italic accent words in headings.

## Content & design system

- **All copy/data lives in `src/data/portfolio.ts`** (profile, nav, experience, projects, stats, skills, accents). Edit content there, not in `page.tsx`.
- **Spacing/type tokens are custom `@utility` classes in `globals.css`** — use them instead of ad-hoc values:
  - `container-page` — max-w 72rem, gutter 20px / 32px (sm+). Every section's inner wrapper.
  - `section-y` — vertical section padding 96px / 128px (lg+).
  - `eyebrow` — 12px uppercase label above headings; `heading-section` — 30px / 40px section `h2`.
  - `label-meta` — 12px uppercase caption (dt, stat labels, card meta), white/55.
- Decoration utilities (also in `globals.css`): `divider-top` (fading hairline on a section's top edge — used instead of `border-t`), `bg-dots` / `bg-grid` + `fade-radial` / `fade-bottom` (masked background patterns), `text-outline` (hollow type), `text-shimmer`, `border-beam` (light travelling around a card border, `--beam-color`), `.grain` (fixed film-grain overlay mounted in `layout.tsx`). Animations: `animate-aurora` (drifting glow blobs), `animate-orbit`, `animate-shimmer`, `animate-scroll-dot`, `animate-float`. The global reduced-motion rule neutralises all of them.
- Rhythm: section header → content `mt-12 sm:mt-16`; card grids `gap-4 sm:gap-6`; card padding `p-6` (contact cards `p-5`); CTAs use the shadcn Button `size="xl"` (48px, rounded-full), wrapped in `fx/Magnet` in the hero/contact.
- Text contrast floor on black is `text-white/55` (WCAG AA); body copy `text-white/65`, emphasized `text-white/85`.
- Shared site components in `src/components/site/`: `SectionHeader` (numbered eyebrow `index` + `ScrollFloat` h2 with an optional serif `highlight` word + aside), `Tag` (pill), `CopyEmailButton`, `CursorEffect` (gates `SplashCursor`), `BrandIcons` (GitHub/LinkedIn SVGs — lucide v1 has no brand icons), `BrandIcon` + `BrandSprite` (tech logos as an SVG `<symbol>` sprite rendered once per page; `brandColor()` lifts dark brand colours for the black background), `TechOrbit` (pure-CSS orbiting logo rings), `ProjectCover` (generated per-project cover art; featured project gets a skeleton dashboard mock), `ScrollCue`.
- Effect components in `src/components/fx/` (all `"use client"`, all respect reduced motion): `Globe` (cobe WebGL globe, draggable, renders only while visible), `LocalTime` (live clock in `profile.timeZone`, placeholder on the server), `Magnet` (magnetic hover), `RotatingText` (fixed-height cycling phrase — keep gradient classes in `wordClassName`, Chrome drops `background-clip:text` on elements with a `filter`), `TiltCard` (3D tilt), `TimelineRail` + `TimelineDot` (scroll-drawn experience rail).
- Tech logos are **bundled locally** in `src/data/brandIcons.ts` (generated from `simple-icons@16.36.0`, CC0) — no runtime CDN. Simple Icons dropped the AWS mark, so AWS uses a neutral orange cloud glyph (`"aws"` slug). To add a logo, copy its path/hex from the `simple-icons` package into that file.
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
- `laptop/` — R3F scroll-driven 3D laptop (`#workstation`); three.js is code-split and only mounted near the viewport. The zoom finishes at 70% of the section's scroll (`ANIMATION_END`); the rest is a hold so visitors can use the terminal. The final zoom is capped to fit the viewport width on portrait phones.
- `terminal/` — the **interactive terminal** shown on the laptop screen (`ScreenContent` → `TerminalView`). `filesystem.ts` builds a read-only virtual FS from `src/data/portfolio.ts` (README.md, about.md, contact.txt, skills.json, projects/, experience/, hidden .secret/.zshrc); `commands.tsx` holds the commands (help, ls [-la], cd, pwd, cat, tree, whoami, neofetch, open <section>, contact, history, echo, date, clear, exit + hidden easter eggs) and tab completion. `useTerminal` holds one session shared by the on-screen view and a fullscreen dialog (portal) — the dialog is the main way to use it on phones ("Open terminal" button). Suggestion chips under the prompt list starter commands.
- `LogoLoop.tsx` — infinite marquee/logo loop; the tech-stack pills passed into it (in `page.tsx`) use the locally bundled `BrandIcon` sprite.

## Other key dependencies

- `gsap` + `@gsap/react` — animation engine (ScrollTrigger, SplitText plugins registered where used).
- `ogl` — minimal WebGL library powering `Galaxy` (its render loop pauses when the hero is off-screen or the tab is hidden).
- `cobe` (v2) — ~5 KB WebGL dotted globe in the About bento. v2 has no internal loop: `fx/Globe` drives it with its own rAF and calls `globe.update()`.
- `three` + `@react-three/fiber` + `@react-three/drei` — laptop scene. `motion` — `ScrollProgress`, `CountUp`.
- `radix-ui` + `class-variance-authority` + `tailwind-merge` — shadcn/ui's underlying primitives/variant/merge stack.
- `lucide-react` — icon set, used directly in `page.tsx` and as shadcn's configured icon library.

## Page structure (`src/app/page.tsx`)

Single scrolling page, dark theme (`bg-black text-white` base), sections in order, each with its own accent color:

1. **Nav** — `BubbleMenu` (floating pill nav, fixed/overlay), logo `AD.` with sky→purple gradient text, links to `#hero`. Menu closes on link click / Escape, locks scroll, uses `aria-expanded`. An `actions` slot renders a "Let's talk" pill (md+) beside the toggle. Nav overlay uses `backdrop-blur-2xl` + `rgba(5,6,15,0.82)` scrim to avoid overlapping hero content; pill background is dark navy (`#1a1c2e`), not pure black.
2. `#hero` — `Galaxy` WebGL starfield background (`density=1.3 hueShift=200 glowIntensity=0.5 saturation=0.65 twinkleIntensity=0.5`), aurora glow behind the name, `Shuffle` text-reveal headline/subheadline, `RotatingText` line cycling `heroRotatingWords`, magnetic CTAs (sky→purple gradient primary), glass stats card (`CountUp`), HUD corner labels (coordinates + live MYT clock, md+) and an animated scroll cue. Content is tuned to fit a 1440×900 viewport. Followed by `#workstation` (3D laptop) with a "Step inside my workstation" intro heading that fades as the laptop zooms.
3. `#about` — purple accent. **Bento grid** (lg: 4 cols): intro card (2×2, `ScrollReveal` statement + focus chips), location card with the draggable `Globe` + live local time, "Now" card (current job), education card, then the four capability cards.
4. `#skills` — cyan accent. Skill-group cards with brand-icon rows beside the `TechOrbit` solar system, then the `LogoLoop` marquee. Followed by the `ScrollVelocity` band (alternating solid / outlined rows).
5. `#experience` — pink accent. `TimelineRail` draws a gradient line with a glowing tip as you scroll; `TimelineDot`s light up when reached; each role has a monogram badge and a card.
6. `#projects` — amber accent. Cards have generated `ProjectCover` art (index, category, domain icon), `TiltCard` hover, and the featured card (spans 2 cols on lg, horizontal layout) has a `border-beam`. Projects intentionally have **no external links** (most client sites are no longer viewable) — don't add them back.
7. `#contact` — emerald accent. "Email me" CTA (emerald→cyan gradient) + "Copy email" button, live "It's HH:MM in Seremban" pill; contact cards for email/phone/LinkedIn/GitHub. Footer ends with a giant faded "AIMAN DANISH" wordmark.

Global: `SplashCursor` (WebGL fluid cursor, color `#38bdf8`) via `CursorEffect` in `layout.tsx` (fixed overlay, `pointer-events: none`). `ScrollProgress` top bar + right-side section rail (lg+). Footer with socials + back-to-top.

## Design history / decisions worth knowing

- Cursor effect was originally `SwarmCursor` (WebGL swarm/worm effect) — replaced with `SplashCursor` (WebGL fluid sim) per user preference. `SwarmCursor.tsx` has since been deleted.
- Nav (`BubbleMenu`) originally had a bug where its `inset-0` fixed overlay visually clashed with page content on open — fixed with the backdrop-blur + dark scrim treatment described above.
- Tech stack pills started as plain text; upgraded to real brand-colored SVG logos via the Simple Icons CDN.
- The "About" section originally had text only; a stats grid, capability cards, and ambient color blobs were added for visual richness.
- Per-section color accents (purple/cyan/pink/amber/emerald) were a deliberate pass to differentiate each section instead of a flat single-accent theme.

- Visual upgrade pass: numbered serif-accent headings, film grain, aurora blobs, bento About with globe, tech orbit, scroll-drawn timeline, generated project covers, HUD hero, footer wordmark; logos moved from the Simple Icons CDN to a bundled sprite (the CDN's `amazonaws` icon had been removed upstream, so AWS was rendering as a broken image).
- Polish pass: fixed Geist never loading (circular `--font-sans`), standardized spacing via utilities, enlarged CTAs, raised text contrast, fixed invalid markup (`<p>` in `<h2>`, `dt` inside links), removed dead `SwarmCursor`/`ScrollExpand`/default Next assets, made the page a Server Component.
