"use client";

import { ExternalLink, Code2, Server, Cloud, Users, Mail, Phone, Link2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Galaxy from "@/components/Galaxy";
import Shuffle from "@/components/Shuffle";
import BubbleMenu from "@/components/BubbleMenu";
import LogoLoop, { type LogoItem } from "@/components/LogoLoop";
import AnimatedContent from "@/components/AnimatedContent";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollFloat from "@/components/ScrollFloat";
import ScrollVelocity from "@/components/ScrollVelocity";
import SpotlightCard from "@/components/SpotlightCard";
import GlareHover from "@/components/GlareHover";
import CountUp from "@/components/CountUp";
import ScrollProgress from "@/components/ScrollProgress";
import LaptopSection from "@/components/laptop/LaptopSection";

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
    <span className="flex items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-medium text-white/85 transition hover:border-white/30 hover:bg-white/10">
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

const skillGroups = [
  { label: "Frontend", items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "React Native"] },
  { label: "Backend", items: ["Laravel", "Express.js", "Node.js", "PHP", "REST / OpenAPI"] },
  { label: "Data", items: ["MySQL", "PostgreSQL", "Firebase", "Supabase", "Strapi"] },
  { label: "Cloud & Ops", items: ["DigitalOcean", "AWS", "Laravel Forge", "WordPress"] },
];

const experience = [
  {
    period: "May 2025 — Current",
    title: "Software Engineer",
    company: "Revenue Monster",
    location: "Malaysia",
    stack: ["OpenAPI", "Redoc", "REST"],
    bullets: ["Developed and maintained API documentation."],
  },
  {
    period: "May 2025 — Dec 2025",
    title: "Junior Lead Web Developer",
    company: "iPen Sdn. Bhd.",
    location: "Seri Kembangan, Selangor",
    stack: ["React.js", "Next.js", "Laravel", "Express.js", "DigitalOcean"],
    bullets: [
      "Developed and maintained full-stack applications using React.js, Next.js, Laravel, Express.js, WordPress and RESTful APIs to deliver scalable solutions.",
      "Deployed and managed production environments on DigitalOcean with Laravel Forge, ensuring secure, reliable, and optimized performance.",
      "Led code reviews, mentored junior developers, and collaborated with stakeholders to translate requirements into technical solutions.",
    ],
  },
  {
    period: "Mar 2025 — May 2025",
    title: "Degree Intern — Web Developer",
    company: "iPen Sdn. Bhd.",
    location: "Seri Kembangan, Selangor",
    stack: ["React.js", "Laravel", "Strapi", "Tailwind CSS"],
    bullets: [
      "Built web applications with React.js and Laravel, gaining hands-on experience in full-stack development.",
      "Supported integration of Strapi CMS and contributed to basic RESTful API implementations.",
      "Helped with deployment tasks on DigitalOcean using Laravel Forge, while implementing UI components with Tailwind CSS.",
    ],
  },
  {
    period: "Sep 2022 — Feb 2023",
    title: "Diploma Intern — Management Information System",
    company: "Kaneka Malaysia Sdn. Bhd.",
    location: "Kuantan, Pahang",
    stack: ["IT Systems", "R&D"],
    bullets: [
      "Fulfilled tasks assigned by supervisors, including research and development of IT-focused solutions.",
      "Proposed ideas to streamline processes and presented a final project at the internship's conclusion.",
      "Gained hands-on experience with IT systems in a corporate environment.",
    ],
  },
];

const projects = [
  { title: "FagroX App", description: "AI-driven agriculture platform integrating weather forecasts, crop analytics, and market access tools.", href: "https://apps.fagrox.com", stack: ["Next.js", "AI", "REST"], status: "Ongoing" },
  { title: "iPen HR System", description: "Full-stack HR management system covering employee records, leave, and payroll workflows.", href: "https://hrs.ipentech.com", stack: ["Laravel", "React.js", "MySQL"] },
  { title: "FagroX CMS", description: "Strapi-based CMS backend powering content for fagrox.com.", href: "https://bos.fagrox.com", stack: ["Strapi", "Node.js"] },
  { title: "FagroX", description: "Official landing site highlighting digital agriculture solutions and farmer onboarding.", href: "https://fagrox.com", stack: ["Next.js", "Tailwind CSS"] },
  { title: "Phytob", description: "Responsive corporate website for a health and wellness brand.", href: "https://phytob.com.my", stack: ["WordPress", "PHP"] },
  { title: "Hekha", description: "Clothing brand storefront with a modern UI/UX pass end to end.", href: "https://hekha.co", stack: ["Next.js", "Tailwind CSS"] },
  { title: "E-Certificate Management System", description: "Blockchain-based certificate storage using Laravel and IPFS for tamper-proof verification.", stack: ["Laravel", "IPFS", "Blockchain"] },
  { title: "Hardware Inventory System", description: "Inventory tracking system for hardware assets with reporting and stock movement history.", stack: ["Laravel", "MySQL"] },
];

const stats = [
  { value: 4, suffix: "", label: "Roles Held" },
  { value: 6, suffix: "+", label: "Live Projects" },
  { value: 18, suffix: "", label: "Technologies" },
  { value: 2, suffix: "×", label: "Dean's List" },
];

const progressSections = [
  { id: "hero", label: "Home", color: "#38bdf8" },
  { id: "workstation", label: "Setup", color: "#818cf8" },
  { id: "about", label: "About", color: "#a855f7" },
  { id: "skills", label: "Skills", color: "#22d3ee" },
  { id: "experience", label: "Experience", color: "#f472b6" },
  { id: "projects", label: "Projects", color: "#facc15" },
  { id: "contact", label: "Contact", color: "#34d399" },
];

const velocityTexts = [
  "FULL-STACK ENGINEER · REACT · NEXT.JS · LARAVEL ·",
  "API DESIGN · CLOUD DEPLOYMENT · UI ENGINEERING ·",
];

const facts = [
  { label: "Current", value: "Software Engineer · Revenue Monster" },
  { label: "Based in", value: "Seremban, Negeri Sembilan" },
  { label: "Education", value: "BCS (Hons.) Netcentric Computing, UiTM" },
  { label: "Academics", value: "CGPA 3.44 · 2× Dean's List" },
  { label: "Focus", value: "Full-stack web & AI-driven platforms" },
  { label: "Availability", value: "Open to new opportunities" },
];

const capabilities = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    description: "React.js, Next.js, and Laravel applications built end-to-end, from UI to data layer.",
    color: "text-sky-400",
    glow: "hover:border-sky-400/40",
    spotlight: "rgba(56, 189, 248, 0.25)" as const,
  },
  {
    icon: Server,
    title: "Backend & APIs",
    description: "RESTful API design and documentation with OpenAPI and Redoc across Express.js and Laravel.",
    color: "text-purple-400",
    glow: "hover:border-purple-400/40",
    spotlight: "rgba(168, 85, 247, 0.25)" as const,
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "Production deployments on DigitalOcean, AWS, and Laravel Forge with secure, reliable delivery.",
    color: "text-emerald-400",
    glow: "hover:border-emerald-400/40",
    spotlight: "rgba(52, 211, 153, 0.25)" as const,
  },
  {
    icon: Users,
    title: "Team & Delivery",
    description: "Code review, mentoring, and stakeholder translation — turning requirements into shipped features.",
    color: "text-pink-400",
    glow: "hover:border-pink-400/40",
    spotlight: "rgba(244, 114, 182, 0.25)" as const,
  },
];

export default function Home() {
  return (
    <>
      <BubbleMenu
        logo={
          <span className="bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-lg font-bold tracking-tight text-transparent">
            AD.
          </span>
        }
        items={navItems}
        menuBg="#1a1c2e"
        menuContentColor="#f5f5f5"
        useFixedPosition
      />

      <ScrollProgress sections={progressSections} />

      <main className="relative">
        <section id="hero" className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            <Galaxy density={1.3} hueShift={200} glowIntensity={0.5} saturation={0.65} twinkleIntensity={0.5} />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-40 bg-gradient-to-b from-transparent to-black" />

          <div className="relative z-10 flex w-full max-w-4xl flex-col items-center gap-4 px-6 py-28 text-center">
            <span className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Open to new opportunities
            </span>
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

            <div className="mt-1 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/55 sm:text-sm">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-sky-400" />
                Seremban, Negeri Sembilan
              </span>
              <a className="flex items-center gap-1.5 transition hover:text-white" href="mailto:aimandanish955@gmail.com">
                <Mail className="h-3.5 w-3.5 text-sky-400" />
                aimandanish955@gmail.com
              </a>
              <a
                className="flex items-center gap-1.5 transition hover:text-white"
                href="https://www.linkedin.com/in/aimandanish02"
                target="_blank"
                rel="noreferrer noopener"
              >
                <Link2 className="h-3.5 w-3.5 text-sky-400" />
                aimandanish02
              </a>
            </div>

            <div className="mt-3 flex gap-3">
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

            <dl className="mt-8 grid w-full max-w-2xl grid-cols-2 gap-x-6 gap-y-4 border-t border-white/10 pt-6 sm:grid-cols-4">
              {stats.map((stat, i) => (
                <AnimatedContent key={stat.label} distance={30} duration={0.6} delay={i * 0.08} threshold={0.2}>
                  <dt className="text-2xl font-bold text-white sm:text-3xl">
                    <CountUp to={stat.value} duration={1.4} />
                    {stat.suffix}
                  </dt>
                  <dd className="mt-0.5 text-[11px] uppercase tracking-wider text-white/40">{stat.label}</dd>
                </AnimatedContent>
              ))}
            </dl>
          </div>
        </section>

        <LaptopSection />

        <section id="about" className="relative overflow-hidden bg-black px-6 py-20">
          <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-purple-500/20 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />

          <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <h2 className="text-sm uppercase tracking-[0.3em] text-purple-400/90">About</h2>
              <ScrollReveal
                containerClassName="!my-0 mt-4"
                textClassName="!text-2xl sm:!text-3xl !leading-snug font-semibold text-white"
                baseOpacity={0.15}
                baseRotation={2}
                blurStrength={5}
              >
                I&#39;m a software engineer based in Seremban, currently building API tooling at Revenue Monster after leading full-stack delivery at iPen Sdn. Bhd.
              </ScrollReveal>
              <p className="mt-4 leading-relaxed text-white/60">
                Over the past few years I&apos;ve shipped production React.js, Next.js, and Laravel applications, deployed and hardened infrastructure on DigitalOcean with Laravel Forge, and mentored junior developers through code review. I hold a Bachelor of Computer Science (Hons.) in Netcentric Computing from Universiti Teknologi MARA, graduating with a CGPA of 3.44 and two Dean&apos;s List awards.
              </p>

              <dl className="mt-8 grid gap-x-8 gap-y-4 border-t border-white/10 pt-6 sm:grid-cols-2">
                {facts.map((fact, i) => (
                  <AnimatedContent key={fact.label} distance={24} duration={0.5} delay={i * 0.05} threshold={0.15} className="flex flex-col">
                    <dt className="text-[11px] uppercase tracking-wider text-white/40">{fact.label}</dt>
                    <dd className="mt-0.5 text-sm text-white/80">{fact.value}</dd>
                  </AnimatedContent>
                ))}
              </dl>
            </div>

            <div className="flex flex-col gap-4 lg:col-span-5">
              {capabilities.map((item, i) => (
                <AnimatedContent
                  key={item.title}
                  direction="horizontal"
                  distance={60}
                  duration={0.7}
                  delay={i * 0.1}
                  threshold={0.15}
                >
                  <SpotlightCard
                    className={`flex gap-4 !rounded-2xl !border-white/10 !bg-white/[0.04] !p-5 transition duration-300 hover:-translate-y-1 ${item.glow}`}
                    spotlightColor={item.spotlight}
                  >
                    <item.icon className={`mt-0.5 h-5 w-5 shrink-0 ${item.color}`} />
                    <div>
                      <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/60">{item.description}</p>
                    </div>
                  </SpotlightCard>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="relative overflow-hidden border-t border-white/10 bg-black py-16">
          <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
          <div className="relative mx-auto max-w-6xl px-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-sm uppercase tracking-[0.3em] text-cyan-400/90">Tech Stack</h2>
                <ScrollFloat
                  containerClassName="!my-0 mt-2"
                  textClassName="!text-2xl sm:!text-3xl !leading-tight font-semibold text-white"
                  stagger={0.015}
                >
                  Languages, frameworks, and tools I build with
                </ScrollFloat>
              </div>
              <p className="text-sm text-white/45">18 technologies across 4 layers</p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {skillGroups.map((group, i) => (
                <AnimatedContent key={group.label} distance={50} duration={0.6} delay={i * 0.08} threshold={0.15}>
                  <GlareHover
                    width="100%"
                    height="100%"
                    background="rgba(255,255,255,0.04)"
                    borderRadius="1rem"
                    borderColor="rgba(255,255,255,0.1)"
                    glareColor="#22d3ee"
                    glareOpacity={0.25}
                    glareSize={220}
                    transitionDuration={800}
                    className="!grid-cols-1 !place-items-stretch p-5 transition-colors duration-300 hover:!border-cyan-400/40"
                  >
                    <div className="w-full text-left">
                      <h3 className="text-[11px] uppercase tracking-wider text-cyan-400/80">{group.label}</h3>
                      <ul className="mt-3 space-y-1.5 text-sm text-white/70">
                        {group.items.map((item) => (
                          <li key={item} className="transition-colors duration-200 hover:text-white">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </GlareHover>
                </AnimatedContent>
              ))}
            </div>
          </div>
          <div className="relative mt-10 h-14">
            <LogoLoop logos={techLogos} speed={60} gap={40} logoHeight={32} fadeOut fadeOutColor="#000000" pauseOnHover />
          </div>
        </section>

        <div className="relative overflow-hidden border-t border-white/10 bg-black py-8">
          <ScrollVelocity
            texts={velocityTexts}
            velocity={45}
            numCopies={6}
            className="px-4 text-3xl font-black uppercase tracking-tight text-white/[0.14] sm:text-5xl"
          />
        </div>

        <section id="experience" className="relative border-t border-white/10 bg-black px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-sm uppercase tracking-[0.3em] text-pink-400/90">Experience</h2>
                <ScrollFloat
                  containerClassName="!my-0 mt-2"
                  textClassName="!text-2xl sm:!text-3xl !leading-tight font-semibold text-white"
                  stagger={0.02}
                >
                  Where I&#39;ve worked
                </ScrollFloat>
              </div>
              <p className="text-sm text-white/45">4 roles · 2022 — present</p>
            </div>

            <div className="mt-10 space-y-8 border-l border-white/15 pl-6 sm:pl-8">
              {experience.map((job, i) => (
                <AnimatedContent
                  key={job.title + job.period}
                  direction="horizontal"
                  distance={70}
                  duration={0.7}
                  delay={i * 0.05}
                  threshold={0.15}
                  className="group relative grid gap-3 md:grid-cols-[minmax(0,13rem)_1fr] md:gap-8"
                >
                  <span className="absolute -left-[calc(1.5rem+5px)] top-2 h-2.5 w-2.5 rounded-full bg-pink-400 shadow-[0_0_12px_2px_rgba(244,114,182,0.5)] transition-transform duration-300 group-hover:scale-150 sm:-left-[calc(2rem+5px)]" />
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/40">{job.period}</p>
                    <p className="mt-1 text-sm font-medium text-white/70">{job.company}</p>
                    <p className="text-xs text-white/35">{job.location}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white transition-colors duration-300 group-hover:text-pink-300">
                      {job.title}
                    </h3>
                    <ul className="mt-2 list-inside list-disc space-y-1.5 text-sm leading-relaxed text-white/60">
                      {job.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {job.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-0.5 text-[11px] text-white/55 transition-colors duration-200 hover:border-pink-400/40 hover:text-white"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="relative overflow-hidden border-t border-white/10 bg-black px-6 py-20">
          <div className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-amber-500/10 blur-[120px]" />
          <div className="relative mx-auto max-w-6xl">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-sm uppercase tracking-[0.3em] text-amber-400/90">Projects</h2>
                <ScrollFloat
                  containerClassName="!my-0 mt-2"
                  textClassName="!text-2xl sm:!text-3xl !leading-tight font-semibold text-white"
                  stagger={0.025}
                >
                  Things I&#39;ve built
                </ScrollFloat>
              </div>
              <p className="text-sm text-white/45">8 projects · 6 live</p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p, i) => {
                const body = (
                  <>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-semibold text-white transition-colors duration-300 group-hover:text-amber-300">
                        {p.title}
                      </h3>
                      {p.href ? (
                        <ExternalLink className="h-4 w-4 shrink-0 text-white/40 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber-400" />
                      ) : null}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{p.description}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                      {p.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-0.5 text-[11px] text-white/55"
                        >
                          {tech}
                        </span>
                      ))}
                      {p.status ? (
                        <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 text-[11px] text-amber-300">
                          {p.status}
                        </span>
                      ) : null}
                    </div>
                  </>
                );

                return (
                  <AnimatedContent
                    key={p.title}
                    distance={60}
                    duration={0.65}
                    delay={(i % 3) * 0.08}
                    scale={0.96}
                    threshold={0.12}
                  >
                    <SpotlightCard
                      className="group h-full !rounded-2xl !border-white/10 !bg-white/[0.04] !p-5 transition duration-300 hover:-translate-y-1.5 hover:!border-amber-400/40"
                      spotlightColor="rgba(250, 204, 21, 0.22)"
                    >
                      {p.href ? (
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="flex h-full flex-col"
                        >
                          {body}
                        </a>
                      ) : (
                        <div className="flex h-full flex-col">{body}</div>
                      )}
                    </SpotlightCard>
                  </AnimatedContent>
                );
              })}
            </div>
          </div>
        </section>

        <section id="contact" className="relative overflow-hidden border-t border-white/10 bg-black px-6 py-20">
          <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
          <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-sm uppercase tracking-[0.3em] text-emerald-400/90">Contact</h2>
              <ScrollFloat
                containerClassName="!my-0 mt-3"
                textClassName="!text-2xl sm:!text-3xl !leading-tight font-semibold text-white"
                stagger={0.02}
              >
                Let&#39;s build something together
              </ScrollFloat>
              <p className="mt-3 text-white/60">
                Open to new opportunities and collaborations — full-stack roles, product work, or freelance builds. Usually replies within a day.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
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
            </div>

            <dl className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: Mail, label: "Email", value: "aimandanish955@gmail.com", href: "mailto:aimandanish955@gmail.com" },
                { icon: Phone, label: "Phone", value: "+60 16-221 9666", href: "tel:+60162219666" },
                { icon: Link2, label: "LinkedIn", value: "aimandanish02", href: "https://www.linkedin.com/in/aimandanish02" },
                { icon: MapPin, label: "Location", value: "Seremban, Negeri Sembilan" },
              ].map((item, idx) => {
                const inner = (
                  <>
                    <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <div>
                      <dt className="text-[11px] uppercase tracking-wider text-white/40">{item.label}</dt>
                      <dd className="mt-0.5 break-all text-sm text-white/80">{item.value}</dd>
                    </div>
                  </>
                );

                return (
                  <AnimatedContent key={item.label} distance={40} duration={0.55} delay={idx * 0.07} threshold={0.15}>
                    <GlareHover
                      width="100%"
                      height="100%"
                      background="rgba(255,255,255,0.04)"
                      borderRadius="1rem"
                      borderColor="rgba(255,255,255,0.1)"
                      glareColor="#34d399"
                      glareOpacity={0.3}
                      glareSize={200}
                      transitionDuration={700}
                      className="!place-items-stretch p-4 transition-colors duration-300 hover:!border-emerald-400/40"
                    >
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noreferrer noopener" : undefined}
                          className="flex w-full gap-3 text-left"
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className="flex w-full gap-3 text-left">{inner}</div>
                      )}
                    </GlareHover>
                  </AnimatedContent>
                );
              })}
            </dl>
          </div>

          <footer className="relative mx-auto mt-14 flex max-w-6xl flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-xs text-white/35 sm:flex-row">
            <span>© {new Date().getFullYear()} Aiman Danish. Built with Next.js.</span>
            <span>Seremban, Negeri Sembilan · Malaysia</span>
          </footer>
        </section>
      </main>
    </>
  );
}
