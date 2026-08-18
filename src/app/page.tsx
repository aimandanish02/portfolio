"use client";

import { ExternalLink, Code2, Server, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import Galaxy from "@/components/Galaxy";
import Shuffle from "@/components/Shuffle";
import BubbleMenu from "@/components/BubbleMenu";
import ScrollExpand from "@/components/ScrollExpand";
import LogoLoop, { type LogoItem } from "@/components/LogoLoop";

const ABOUT_BG = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='1000' viewBox='0 0 1600 1000'>
    <defs>
      <radialGradient id='g' cx='32%' cy='18%' r='85%'>
        <stop offset='0%' stop-color='#16324a'/>
        <stop offset='45%' stop-color='#0a0f1f'/>
        <stop offset='100%' stop-color='#020207'/>
      </radialGradient>
      <linearGradient id='l' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='#38bdf8' stop-opacity='0.35'/>
        <stop offset='100%' stop-color='#a855f7' stop-opacity='0.25'/>
      </linearGradient>
    </defs>
    <rect width='1600' height='1000' fill='url(#g)'/>
    <circle cx='1260' cy='160' r='420' fill='url(#l)'/>
    <circle cx='260' cy='860' r='320' fill='url(#l)' opacity='0.5'/>
  </svg>`
)}`;

const navItems = [
  { label: "home", href: "#hero", rotation: -8, hoverStyles: { bgColor: "#38bdf8", textColor: "#05060f" } },
  { label: "about", href: "#about", rotation: 8, hoverStyles: { bgColor: "#a855f7", textColor: "#ffffff" } },
  { label: "skills", href: "#skills", rotation: -8, hoverStyles: { bgColor: "#22d3ee", textColor: "#05060f" } },
  { label: "experience", href: "#experience", rotation: 8, hoverStyles: { bgColor: "#f472b6", textColor: "#05060f" } },
  { label: "projects", href: "#projects", rotation: -8, hoverStyles: { bgColor: "#facc15", textColor: "#05060f" } },
  { label: "contact", href: "#contact", rotation: 8, hoverStyles: { bgColor: "#34d399", textColor: "#05060f" } },
];

const techStack = [
  { name: "React.js", slug: "react" },
  { name: "Next.js", slug: "nextdotjs", color: "ffffff" },
  { name: "TypeScript", slug: "typescript" },
  { name: "JavaScript", slug: "javascript" },
  { name: "Laravel", slug: "laravel" },
  { name: "Express.js", slug: "express", color: "ffffff" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "PHP", slug: "php" },
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "MySQL", slug: "mysql" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "Firebase", slug: "firebase" },
  { name: "Supabase", slug: "supabase" },
  { name: "AWS", slug: "amazonaws", color: "ff9900" },
  { name: "DigitalOcean", slug: "digitalocean" },
  { name: "WordPress", slug: "wordpress" },
  { name: "Strapi", slug: "strapi" },
  { name: "React Native", slug: "react" },
];

const techLogos: LogoItem[] = techStack.map(({ name, slug, color }) => ({
  node: (
    <span className="flex items-center gap-2.5 whitespace-nowrap rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-sm font-medium text-white/85 transition hover:border-white/30 hover:bg-white/10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://cdn.simpleicons.org/${slug}${color ? `/${color}` : ""}`}
        alt=""
        className="h-4 w-4"
        loading="lazy"
      />
      {name}
    </span>
  ),
  title: name,
}));

const experience = [
  {
    period: "May 2025 — Current",
    title: "Software Engineer",
    company: "Revenue Monster",
    bullets: ["Developed and maintained API documentation."],
  },
  {
    period: "May 2025 — December 2025",
    title: "Junior Lead Web Developer",
    company: "iPen Sdn. Bhd.",
    bullets: [
      "Developed and maintained full-stack applications using React.js, Next.js, Laravel, Express.js, WordPress and RESTful APIs to deliver scalable solutions.",
      "Deployed and managed production environments on DigitalOcean with Laravel Forge, ensuring secure, reliable, and optimized performance.",
      "Led code reviews, mentored junior developers, and collaborated with stakeholders to translate requirements into technical solutions.",
    ],
  },
  {
    period: "March 2025 — May 2025",
    title: "Degree Intern — Web Developer",
    company: "iPen Sdn. Bhd., Seri Kembangan, Selangor",
    bullets: [
      "Built web applications with React.js and Laravel, gaining hands-on experience in full-stack development.",
      "Supported integration of Strapi CMS and contributed to basic RESTful API implementations.",
      "Helped with deployment tasks on DigitalOcean using Laravel Forge, while implementing UI components with Tailwind CSS.",
    ],
  },
  {
    period: "September 2022 — February 2023",
    title: "Diploma Intern — Management Information System",
    company: "Kaneka Malaysia Sdn. Bhd., Kuantan, Pahang",
    bullets: [
      "Fulfilled tasks assigned by supervisors, including research and development of IT-focused solutions.",
      "Proposed ideas to streamline processes and presented a final project at the internship's conclusion.",
      "Gained hands-on experience with IT systems in a corporate environment.",
    ],
  },
];

const projects = [
  { title: "Phytob", description: "Developed a responsive corporate website for a health and wellness brand.", href: "https://phytob.com.my" },
  { title: "iPen HR System", description: "Developed a full-stack HR management system for iPen.", href: "https://hrs.ipentech.com" },
  { title: "Hekha", description: "Developed a website for a clothing brand with modern UI/UX.", href: "https://hekha.co" },
  { title: "FagroX App", description: "Engineered an AI-driven agriculture platform integrating weather forecasts, crop analytics, and market access tools. (Ongoing)", href: "https://apps.fagrox.com" },
  { title: "FagroX CMS", description: "Developed a CMS backend for fagrox.com using Strapi.", href: "https://bos.fagrox.com" },
  { title: "FagroX", description: "Developed the official landing site for FagroX, highlighting digital agriculture solutions and farmer onboarding.", href: "https://fagrox.com" },
  { title: "E-Certificate Management System", description: "Designed and implemented a blockchain-based system using Laravel and IPFS for secure certificate storage." },
  { title: "Hardware Inventory Management System", description: "Developed an efficient inventory tracking system using Laravel and SQLyog." },
];

export default function Home() {
  return (
    <>
      <BubbleMenu
        logo={<span className="text-lg font-bold tracking-tight text-white">AD.</span>}
        items={navItems}
        menuBg="#1a1c2e"
        menuContentColor="#f5f5f5"
        useFixedPosition
      />

      <main className="relative">
        <section id="hero" className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            <Galaxy density={1.3} hueShift={200} glowIntensity={0.5} saturation={0.65} twinkleIntensity={0.5} />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-40 bg-gradient-to-b from-transparent to-black" />

          <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Seremban, Negeri Sembilan</p>
            <Shuffle
              tag="h1"
              text="AIMAN DANISH"
              className="font-black text-white"
              style={{ fontSize: "clamp(2.75rem, 8vw, 6.5rem)", lineHeight: 1 }}
              shuffleDirection="up"
              duration={0.4}
              colorFrom="#38bdf8"
              colorTo="#ffffff"
            />
            <Shuffle
              tag="p"
              text="SOFTWARE ENGINEER"
              className="font-medium text-white/70 tracking-[0.2em]"
              style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }}
              shuffleDirection="right"
              duration={0.3}
              stagger={0.02}
            />
            <p className="max-w-xl text-sm text-white/60 sm:text-base">
              Full-stack engineer building scalable web platforms with React, Next.js, and Laravel — from API design to production deployment.
            </p>
            <div className="mt-4 flex gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-sky-400 to-purple-500 text-white hover:opacity-90 hover:text-white"
              >
                <a href="#projects">View Projects</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white">
                <a href="#contact">Contact Me</a>
              </Button>
            </div>
          </div>
        </section>

        <ScrollExpand
          src={ABOUT_BG}
          mediaType="image"
          useWindowScroll
          startWidth={44}
          startHeight={60}
          startRadius={28}
          endRadius={0}
          mediaZoom={1.3}
          scrollDistance={1.1}
          holdDistance={0.3}
          title="About Me"
          scrollHint="Scroll to explore"
          className="bg-black"
        >
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">
            Full-stack engineer crafting scalable web & AI-driven platforms — from pixel to production.
          </p>
        </ScrollExpand>

        <section id="about" className="relative overflow-hidden bg-black px-6 py-24 sm:py-32">
          <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-purple-500/20 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />
          <div className="relative mx-auto max-w-3xl space-y-6">
            <h2 className="text-sm uppercase tracking-[0.3em] text-purple-400/90">About</h2>
            <p className="text-2xl font-semibold leading-snug text-white sm:text-3xl">
              I&apos;m a software engineer based in Seremban, Negeri Sembilan, currently building API tooling at Revenue Monster after leading full-stack delivery at iPen Sdn. Bhd.
            </p>
            <p className="leading-relaxed text-white/60">
              Over the past few years I&apos;ve shipped production React.js, Next.js, and Laravel applications, deployed and hardened infrastructure on DigitalOcean with Laravel Forge, and mentored junior developers through code review. I hold a Bachelor of Computer Science (Hons.) in Netcentric Computing from Universiti Teknologi MARA, graduating with a CGPA of 3.44 and two Dean&apos;s List awards.
            </p>
          </div>

          <div className="relative mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { value: "4", label: "Roles Held" },
              { value: "6+", label: "Live Projects" },
              { value: "18", label: "Technologies" },
              { value: "2×", label: "Dean's List" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-white sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-white/40">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="relative mx-auto mt-16 grid max-w-3xl gap-6 sm:grid-cols-3">
            {[
              {
                icon: Code2,
                title: "Full-Stack Development",
                description: "React.js, Next.js, and Laravel applications built end-to-end, from UI to data layer.",
                color: "text-sky-400",
                glow: "hover:border-sky-400/40",
              },
              {
                icon: Server,
                title: "Backend & APIs",
                description: "RESTful API design and documentation with OpenAPI and Redoc across Express.js and Laravel.",
                color: "text-purple-400",
                glow: "hover:border-purple-400/40",
              },
              {
                icon: Cloud,
                title: "Cloud & DevOps",
                description: "Production deployments on DigitalOcean, AWS, and Laravel Forge with secure, reliable delivery.",
                color: "text-emerald-400",
                glow: "hover:border-emerald-400/40",
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition ${item.glow}`}
              >
                <item.icon className={`h-5 w-5 ${item.color}`} />
                <h3 className="mt-4 text-sm font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="skills" className="relative overflow-hidden border-t border-white/10 bg-black py-24">
          <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
          <div className="relative mx-auto mb-12 max-w-3xl px-6 text-center">
            <h2 className="mb-3 text-sm uppercase tracking-[0.3em] text-cyan-400/90">Tech Stack</h2>
            <p className="text-2xl font-semibold text-white sm:text-3xl">Languages, frameworks, and tools I build with</p>
          </div>
          <div className="relative h-16">
            <LogoLoop logos={techLogos} speed={60} gap={40} logoHeight={32} fadeOut fadeOutColor="#000000" pauseOnHover />
          </div>
        </section>

        <section id="experience" className="relative border-t border-white/10 bg-black px-6 py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-3 text-center text-sm uppercase tracking-[0.3em] text-pink-400/90">Experience</h2>
            <p className="mb-16 text-center text-2xl font-semibold text-white sm:text-3xl">Where I&apos;ve worked</p>
            <div className="space-y-10 border-l border-white/15 pl-8">
              {experience.map((job) => (
                <div key={job.title + job.period} className="relative">
                  <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-pink-400 shadow-[0_0_12px_2px_rgba(244,114,182,0.5)]" />
                  <p className="mb-1 text-xs uppercase tracking-widest text-white/40">{job.period}</p>
                  <h3 className="text-lg font-semibold text-white">
                    {job.title} · {job.company}
                  </h3>
                  <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm leading-relaxed text-white/60">
                    {job.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="relative overflow-hidden border-t border-white/10 bg-black px-6 py-24">
          <div className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-amber-500/10 blur-[120px]" />
          <div className="relative mx-auto max-w-5xl">
            <h2 className="mb-3 text-center text-sm uppercase tracking-[0.3em] text-amber-400/90">Projects</h2>
            <p className="mb-16 text-center text-2xl font-semibold text-white sm:text-3xl">Things I&apos;ve built</p>
            <div className="grid gap-6 sm:grid-cols-2">
              {projects.map((p) =>
                p.href ? (
                  <a
                    key={p.title}
                    href={p.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-amber-400/40 hover:bg-white/[0.07]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                      <ExternalLink className="h-4 w-4 shrink-0 text-white/40 transition group-hover:text-amber-400" />
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{p.description}</p>
                  </a>
                ) : (
                  <div key={p.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                    <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{p.description}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        <section id="contact" className="relative overflow-hidden border-t border-white/10 bg-black px-6 py-24">
          <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="mb-3 text-sm uppercase tracking-[0.3em] text-emerald-400/90">Contact</h2>
            <p className="mb-4 text-2xl font-semibold text-white sm:text-3xl">Let&apos;s build something together</p>
            <p className="mb-10 text-white/60">Open to new opportunities and collaborations. Reach out any time.</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-emerald-400 to-cyan-500 text-white hover:opacity-90 hover:text-white"
              >
                <a href="mailto:aimandanish955@gmail.com">Email Me</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white">
                <a href="tel:+60162219666">Call Me</a>
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-white/50">
              <a
                className="transition hover:text-white"
                href="https://www.linkedin.com/in/aimandanish02"
                target="_blank"
                rel="noreferrer noopener"
              >
                LinkedIn
              </a>
              <span>·</span>
              <span>Seremban, Negeri Sembilan</span>
            </div>
          </div>
          <footer className="mt-24 text-center text-xs text-white/30">
            © {new Date().getFullYear()} Aiman Danish. Built with Next.js.
          </footer>
        </section>
      </main>
    </>
  );
}
