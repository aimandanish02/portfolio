import type { CSSProperties } from "react";
import { Boxes, CloudSun, Globe, LayoutDashboard, Leaf, ShieldCheck, ShoppingBag, Sprout, TrendingUp, Users, type LucideIcon } from "lucide-react";
import type { Project, ProjectIcon } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const ICONS: Record<ProjectIcon, LucideIcon> = {
  sprout: Sprout,
  users: Users,
  layout: LayoutDashboard,
  globe: Globe,
  leaf: Leaf,
  shopping: ShoppingBag,
  shield: ShieldCheck,
  boxes: Boxes,
};

// Two-stop palettes, cycled per card so every cover is distinct but on-theme.
const PALETTES: [string, string][] = [
  ["#f59e0b", "#f97316"],
  ["#38bdf8", "#6366f1"],
  ["#a855f7", "#ec4899"],
  ["#34d399", "#06b6d4"],
  ["#f472b6", "#fb923c"],
  ["#22d3ee", "#3b82f6"],
  ["#818cf8", "#c084fc"],
  ["#facc15", "#84cc16"],
];

interface ProjectCoverProps {
  project: Project;
  index: number;
  className?: string;
}

/** Generated artwork for a project card — no screenshots needed. Purely decorative. */
export default function ProjectCover({ project, index, className }: ProjectCoverProps) {
  const [a, b] = PALETTES[index % PALETTES.length];
  const Icon = ICONS[project.icon];
  const style = { "--a": a, "--b": b } as CSSProperties;

  return (
    <div aria-hidden className={cn("relative isolate overflow-hidden bg-[#07080f]", className)} style={style}>
      <div
        className="absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(110% 90% at 0% 0%, color-mix(in oklab, ${a} 38%, transparent), transparent 60%), radial-gradient(90% 80% at 100% 100%, color-mix(in oklab, ${b} 34%, transparent), transparent 62%)`,
        }}
      />
      <div className="bg-grid fade-radial absolute inset-0 opacity-70" />

      {project.featured ? <DashboardMock accent={a} /> : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="absolute size-28 rounded-full opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-70" style={{ background: a }} />
          <span className="relative flex size-16 items-center justify-center rounded-2xl border border-white/15 bg-black/40 shadow-2xl backdrop-blur-md transition duration-500 group-hover:-translate-y-1 group-hover:scale-110">
            <Icon className="size-7" style={{ color: a }} strokeWidth={1.75} />
          </span>
        </div>
      )}

      <span className="absolute left-4 top-4 font-mono text-xs text-white/55">{String(index + 1).padStart(2, "0")}</span>
      <span className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-xs text-white/75 backdrop-blur-md">
        {project.category}
      </span>
    </div>
  );
}

/** Tiny skeleton dashboard for the featured project (no real data — decorative only). */
function DashboardMock({ accent }: { accent: string }) {
  const bars = [38, 56, 44, 72, 60, 84, 66, 92, 74, 88];
  const tiles = [
    { icon: CloudSun, label: "Weather" },
    { icon: Sprout, label: "Crop health" },
    { icon: TrendingUp, label: "Market" },
  ];

  return (
    <div className="absolute inset-x-6 bottom-0 top-14 overflow-hidden rounded-t-xl border border-b-0 border-white/10 bg-[#0a0b14]/85 shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-1.5 sm:inset-x-10">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
        <span className="size-2 rounded-full bg-white/20" />
        <span className="size-2 rounded-full bg-white/20" />
        <span className="size-2 rounded-full bg-white/20" />
        <span className="ml-3 h-2 w-24 rounded-full bg-white/10" />
        <span className="ml-auto size-5 rounded-full" style={{ background: `linear-gradient(135deg, ${accent}, #f97316)` }} />
      </div>
      <div className="grid grid-cols-[2.25rem_1fr] gap-3 p-3 sm:grid-cols-[2.75rem_1fr] sm:p-4">
        <div className="flex flex-col items-center gap-2.5 rounded-lg bg-white/[0.03] py-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={cn("size-4 rounded-md", i === 0 ? "" : "bg-white/10")} style={i === 0 ? { background: accent } : undefined} />
          ))}
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {tiles.map(({ icon: TileIcon, label }, i) => (
              <div key={label} className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-2.5">
                <span className="flex size-6 items-center justify-center rounded-md bg-white/[0.06]">
                  <TileIcon className="size-3.5" style={{ color: accent }} />
                </span>
                <div className="mt-2.5 h-2 rounded-full bg-white/20" style={{ width: `${70 - i * 12}%` }} />
                <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-white/10" />
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-3">
            <div className="flex h-20 items-end gap-1.5 sm:h-24">
              {bars.map((h, i) => (
                <span
                  key={i}
                  className="flex-1 origin-bottom rounded-t-sm transition-transform duration-500 group-hover:scale-y-110"
                  style={{ height: `${h}%`, background: `linear-gradient(to top, color-mix(in oklab, ${accent} 25%, transparent), ${accent})`, transitionDelay: `${i * 25}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
