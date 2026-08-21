"use client";

const facts = [
  { key: "role", value: "Software Engineer · Revenue Monster" },
  { key: "focus", value: "Full-stack web & AI-driven platforms" },
  { key: "stack", value: "React · Next.js · Laravel · Node · AWS" },
  { key: "education", value: "BCS (Hons.) Netcentric Computing, UiTM" },
];

const stats = [
  { value: "4", label: "roles" },
  { value: "6+", label: "live projects" },
  { value: "18", label: "technologies" },
  { value: "2×", label: "dean's list" },
];

const recent = [
  { name: "fagrox-app", note: "AI agriculture platform", href: "https://apps.fagrox.com" },
  { name: "ipen-hr", note: "HR management system", href: "https://hrs.ipentech.com" },
  { name: "hekha", note: "clothing brand storefront", href: "https://hekha.co" },
];

const contact = [
  { key: "email", value: "aimandanish955@gmail.com", href: "mailto:aimandanish955@gmail.com" },
  { key: "linkedin", value: "aimandanish02", href: "https://www.linkedin.com/in/aimandanish02" },
  { key: "phone", value: "+60 16-221 9666", href: "tel:+60162219666" },
];

const Prompt = ({ command }: { command: string }) => (
  <p className="text-white/45">
    <span className="text-emerald-400">➜</span> <span className="text-sky-400">~</span>{" "}
    <span className="text-white/75">{command}</span>
  </p>
);

/** Terminal panel projected onto the laptop lid. Authored at 960×536. */
export default function ScreenContent() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#05060f] font-mono text-[15px] leading-relaxed text-white">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.05] px-5 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[13px] tracking-wide text-white/40">aiman@portfolio — zsh</span>
        <span className="ml-auto flex items-center gap-2 text-[13px] text-emerald-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          open to work
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 px-7 py-5">
        <div className="space-y-2">
          <Prompt command="whoami" />
          <p className="text-[34px] font-bold leading-none tracking-tight text-white">Aiman Danish</p>
          <dl className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
            {facts.map((fact) => (
              <div key={fact.key} className="flex gap-2">
                <dt className="shrink-0 text-purple-400">{fact.key}:</dt>
                <dd className="text-white/75">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="space-y-2">
          <Prompt command="stats --summary" />
          <div className="grid grid-cols-4 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2">
                <p className="text-2xl font-bold leading-none text-sky-300">{stat.value}</p>
                <p className="mt-1 text-[12px] uppercase tracking-wider text-white/40">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid flex-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Prompt command="ls ~/projects" />
            <ul className="space-y-1">
              {recent.map((project) => (
                <li key={project.name} className="flex flex-wrap items-baseline gap-x-2">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-amber-300 underline decoration-amber-300/30 underline-offset-4 transition hover:decoration-amber-300"
                  >
                    {project.name}/
                  </a>
                  <span className="text-white/40"># {project.note}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <Prompt command="cat contact.txt" />
            <ul className="space-y-1">
              {contact.map((item) => (
                <li key={item.key} className="flex gap-2">
                  <span className="shrink-0 text-purple-400">{item.key}:</span>
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer noopener" : undefined}
                    className="text-sky-300 underline decoration-sky-300/30 underline-offset-4 transition hover:decoration-sky-300"
                  >
                    {item.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="flex items-center gap-2 text-white/45">
          <span className="text-emerald-400">➜</span> <span className="text-sky-400">~</span>
          <span className="inline-block h-4 w-2.5 animate-pulse bg-sky-400/80" />
        </p>
      </div>
    </div>
  );
}
