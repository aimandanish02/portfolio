import type { CSSProperties } from "react";
import { brandIcons } from "@/data/brandIcons";
import type { IconSlug } from "@/data/portfolio";
import { cn } from "@/lib/utils";

// Simple Icons removed the AWS mark, so AWS gets a neutral filled cloud (Material "cloud", Apache-2.0).
const AWS = {
  title: "AWS",
  hex: "FF9900",
  path: "M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z",
};

const icons = { ...brandIcons, aws: AWS } as Record<IconSlug, { title: string; hex: string; path: string }>;

/** Relative luminance of a #rrggbb colour (WCAG formula). */
function luminance(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Brand colour tuned for the black page: near-black marks (Next.js, Express) become white,
 * and dark brand colours (PostgreSQL, MySQL, WordPress, Strapi…) are lifted so they don't sink.
 */
export function brandColor(slug: IconSlug) {
  const hex = icons[slug].hex;
  const lum = luminance(hex);
  if (lum < 0.02) return "#ffffff";
  if (lum < 0.2) return `color-mix(in oklab, #${hex} 68%, white)`;
  return `#${hex}`;
}

/**
 * One hidden <svg> holding every brand mark as a <symbol>. Render it once per page;
 * each <BrandIcon> then references a symbol instead of repeating the path data.
 */
export function BrandSprite() {
  return (
    <svg aria-hidden width="0" height="0" className="absolute" focusable="false">
      {Object.entries(icons).map(([slug, icon]) => (
        <symbol key={slug} id={`brand-${slug}`} viewBox="0 0 24 24">
          <path d={icon.path} />
        </symbol>
      ))}
    </svg>
  );
}

interface BrandIconProps {
  slug: IconSlug;
  className?: string;
  /** Use the brand colour (default) or inherit `currentColor`. */
  colored?: boolean;
  style?: CSSProperties;
}

export function BrandIcon({ slug, className, colored = true, style }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      focusable="false"
      className={cn("size-4 shrink-0", className)}
      style={colored ? { color: brandColor(slug), ...style } : style}
    >
      <use href={`#brand-${slug}`} />
    </svg>
  );
}
