import { ArrowRight, ArrowUp, ArrowUpRight, Clock, GraduationCap, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Galaxy from "@/components/Galaxy";
import Shuffle from "@/components/Shuffle";
import BubbleMenu from "@/components/BubbleMenu";
import LogoLoop, { type LogoItem } from "@/components/LogoLoop";
import AnimatedContent from "@/components/AnimatedContent";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollVelocity from "@/components/ScrollVelocity";
import SpotlightCard from "@/components/SpotlightCard";
import GlareHover from "@/components/GlareHover";
import CountUp from "@/components/CountUp";
import ScrollProgress from "@/components/ScrollProgress";
import LaptopSection from "@/components/laptop/LaptopSection";
import SectionHeader from "@/components/site/SectionHeader";
import Tag from "@/components/site/Tag";
import CopyEmailButton from "@/components/site/CopyEmailButton";
import ScrollCue from "@/components/site/ScrollCue";
import TechOrbit from "@/components/site/TechOrbit";
import ProjectCover from "@/components/site/ProjectCover";
import { BrandIcon, BrandSprite } from "@/components/site/BrandIcon";
import { GitHubIcon, LinkedInIcon } from "@/components/site/BrandIcons";
import Globe from "@/components/fx/Globe";
import LocalTime from "@/components/fx/LocalTime";
import Magnet from "@/components/fx/Magnet";
import RotatingText from "@/components/fx/RotatingText";
import TiltCard from "@/components/fx/TiltCard";
import TimelineRail, { TimelineDot } from "@/components/fx/TimelineRail";
import { cn } from "@/lib/utils";
import {
  capabilities,
  education,
  experience,
  focusAreas,
  heroRotatingWords,
  navItems,
  profile,
  progressSections,
  projects,
  skillGroups,
  stats,
  techStack,
  velocityTexts,
} from "@/data/portfolio";

const techLogos: LogoItem[] = techStack.map(({ name, icon }) => ({
  node: (
    <span className="flex items-center gap-2.5 whitespace-nowrap rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/80 transition hover:border-white/30 hover:bg-white/10 hover:text-white">
      <BrandIcon slug={icon} className="size-4" />
      {name}
    </span>
  ),
  title: name,
}));

const contactItems = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: "Phone", value: profile.phone, href: profile.phoneHref },
  { icon: LinkedInIcon, label: "LinkedIn", value: profile.linkedinHandle, href: profile.linkedin },
  { icon: GitHubIcon, label: "GitHub", value: profile.githubHandle, href: profile.github },
];

const socials = [
  { label: "GitHub", href: profile.github, icon: GitHubIcon },
  { label: "LinkedIn", href: profile.linkedin, icon: LinkedInIcon },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
];

const currentJob = experience.find((job) => job.current) ?? experience[0];
const isExternal = (href: string) => href.startsWith("http");

/** Card chrome shared by every bento tile. */
const bentoCard = "h-full !rounded-2xl !border-white/10 !bg-white/[0.03] !p-0";

/** Outline CTA shared by hero and contact. */
const outlineCta =
  "border-white/20 bg-white/[0.03] text-white backdrop-blur-sm hover:border-white/35 hover:bg-white/10 hover:text-white";

/** A pulsing status dot. */
function LiveDot({ className }: { className?: string }) {
  return (
    <span className={cn("relative flex size-2", className)}>
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
      <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
    </span>
  );
}

export default function Home() {
  return (
    <>
      <BrandSprite />

      <BubbleMenu
        logo={
          <span className="bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-lg font-bold tracking-tight text-transparent">
            AD.
          </span>
        }
        logoHref="#hero"
        logoAriaLabel={`${profile.name} — back to top`}
        actions={
          <a
            href="#contact"
            className="pointer-events-auto hidden h-12 items-center gap-2.5 rounded-full border border-white/10 bg-[#1a1c2e] px-5 text-sm font-medium text-white shadow-[0_4px_16px_rgba(0,0,0,0.35)] transition hover:border-emerald-400/40 hover:bg-[#20233a] md:inline-flex md:h-14 md:px-6"
          >
            <LiveDot />
            Let&apos;s talk
          </a>
        }
        items={navItems}
        menuBg="#1a1c2e"
        menuContentColor="#f5f5f5"
        useFixedPosition
      />

      <ScrollProgress sections={progressSections} />

      <main id="main" className="relative">
        {/* ─────────────────────────── Hero ─────────────────────────── */}
        <section
          id="hero"
          aria-label="Introduction"
          className="relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-black"
        >
          <div className="absolute inset-0 z-0">
            <Galaxy density={1.3} hueShift={200} glowIntensity={0.5} saturation={0.65} twinkleIntensity={0.5} />
          </div>
          <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.6)_0%,transparent_70%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-48 bg-gradient-to-b from-transparent to-black" />

          <div className="container-page relative z-10 flex flex-col items-center pb-28 pt-28 text-center">
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-[30%] -z-10 h-56 w-[min(56rem,95vw)] -translate-x-1/2 -translate-y-1/2 animate-aurora rounded-full bg-[conic-gradient(from_120deg,rgba(56,189,248,0.28),rgba(168,85,247,0.32),rgba(34,211,238,0.22),rgba(56,189,248,0.28))] blur-[90px]"
            />

            {profile.available ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1.5 text-xs font-medium text-emerald-300 backdrop-blur-sm">
                <LiveDot />
                Open to new opportunities
              </span>
            ) : null}

            <Shuffle
              tag="h1"
              text={profile.name.toUpperCase()}
              className="mt-7 font-black tracking-tight text-white drop-shadow-[0_0_40px_rgba(56,189,248,0.25)]"
              style={{ fontSize: "clamp(2.75rem, 10vw, 8rem)", lineHeight: 0.95 }}
              shuffleDirection="up"
              duration={0.4}
              colorFrom="#38bdf8"
              colorTo="#ffffff"
            />
            <Shuffle
              tag="p"
              text={profile.role.toUpperCase()}
              className="mt-6 font-medium tracking-[0.35em] text-white/70"
              style={{ fontSize: "clamp(0.875rem, 2vw, 1.25rem)" }}
              shuffleDirection="right"
              duration={0.3}
              stagger={0.02}
            />

            <p className="mt-8 w-full max-w-2xl text-base text-white/60 sm:text-lg">
              <span className="block">I design and ship</span>
              <RotatingText
                words={heroRotatingWords}
                className="mt-1 text-2xl font-semibold tracking-tight sm:text-4xl"
                wordClassName="bg-gradient-to-r from-sky-300 via-cyan-200 to-purple-300 bg-clip-text text-transparent"
              />
              <span className="mt-1 block">with React, Next.js &amp; Laravel — from API design to production.</span>
            </p>

            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/60">
              <li className="flex items-center gap-2">
                <MapPin className="size-4 text-sky-400" aria-hidden />
                {profile.location}
              </li>
              {socials.slice(0, 2).map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center gap-2 transition-colors hover:text-white"
                  >
                    <Icon className="size-4 text-sky-400" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Magnet>
                <Button
                  asChild
                  size="xl"
                  className="bg-gradient-to-r from-sky-400 to-purple-500 text-white shadow-[0_8px_40px_-8px_rgba(56,189,248,0.7)] hover:opacity-95"
                >
                  <a href="#projects">
                    View projects
                    <ArrowRight data-icon="inline-end" aria-hidden />
                  </a>
                </Button>
              </Magnet>
              <Magnet>
                <Button asChild size="xl" variant="outline" className={outlineCta}>
                  <a href="#contact">Get in touch</a>
                </Button>
              </Magnet>
            </div>

            <dl className="mt-12 grid w-full max-w-3xl grid-cols-2 gap-y-8 rounded-2xl border border-white/10 bg-black/30 py-5 backdrop-blur-md sm:grid-cols-4 sm:divide-x sm:divide-white/10">
              {stats.map((stat, i) => (
                <AnimatedContent
                  key={stat.label}
                  distance={24}
                  duration={0.6}
                  delay={i * 0.08}
                  threshold={0}
                  className="flex flex-col-reverse items-center gap-1 px-4"
                >
                  <dt className="label-meta">{stat.label}</dt>
                  <dd className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-3xl font-bold tabular-nums text-transparent sm:text-4xl">
                    <CountUp to={stat.value} duration={1.4} />
                    {stat.suffix}
                  </dd>
                </AnimatedContent>
              ))}
            </dl>
          </div>

          {/* HUD corners */}
          <div className="pointer-events-none absolute bottom-8 left-8 z-10 hidden font-mono text-xs uppercase tracking-wider text-white/45 md:block">
            <p className="text-white/70">Seremban, MY</p>
            <p className="mt-1">{profile.coordinates.label}</p>
          </div>
          <div className="pointer-events-none absolute bottom-8 right-8 z-10 hidden text-right font-mono text-xs uppercase tracking-wider text-white/45 md:block">
            <p className="text-white/70">
              <LocalTime timeZone={profile.timeZone} seconds /> MYT
            </p>
            <p className="mt-1">Local time · {profile.timeZoneLabel}</p>
          </div>
          <ScrollCue href="#workstation" />
        </section>

        <LaptopSection />

        {/* ─────────────────────────── About (bento) ─────────────────────────── */}
        <section id="about" aria-labelledby="about-title" className="section-y divider-top relative overflow-hidden">
          <div className="pointer-events-none absolute -top-32 right-0 size-[28rem] animate-aurora rounded-full bg-purple-500/15 blur-[130px]" />
          <div className="pointer-events-none absolute bottom-0 left-0 size-80 animate-aurora rounded-full bg-cyan-500/10 blur-[110px] [animation-delay:-9s]" />

          <div className="container-page relative grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {/* Intro */}
            <AnimatedContent distance={32} duration={0.7} threshold={0.1} className="sm:col-span-2 lg:row-span-2">
              <SpotlightCard className={bentoCard} spotlightColor="rgba(168, 85, 247, 0.16)">
                <div className="flex h-full flex-col p-7 sm:p-10">
                  <h2 id="about-title" className="eyebrow flex items-center gap-3 text-purple-400">
                    <span aria-hidden className="font-mono tracking-normal text-white/45">01</span>
                    <span aria-hidden className="h-px w-8 bg-current opacity-60" />
                    About
                  </h2>
                  <ScrollReveal
                    className="mt-6 text-2xl font-semibold leading-snug tracking-tight text-white sm:text-[1.75rem]"
                    baseOpacity={0.15}
                    baseRotation={1.5}
                    blurStrength={5}
                  >
                    I&apos;m a software engineer based in Seremban, currently building API tooling at Revenue Monster after leading full-stack delivery at iPen Sdn. Bhd.
                  </ScrollReveal>
                  <p className="mt-6 text-[0.9375rem] leading-relaxed text-white/65">
                    Over the past few years I&apos;ve shipped production React.js, Next.js, and Laravel applications, deployed and
                    hardened infrastructure on DigitalOcean with Laravel Forge, and mentored junior developers through code review.
                  </p>
                  <ul className="mt-auto flex flex-wrap gap-2 pt-8" aria-label="Focus areas">
                    {focusAreas.map((area) => (
                      <li key={area}>
                        <Tag className="border-purple-400/25 bg-purple-400/10 text-purple-200">{area}</Tag>
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            </AnimatedContent>

            {/* Location + globe */}
            <AnimatedContent distance={32} duration={0.7} delay={0.08} threshold={0.1} className="sm:col-span-2">
              <SpotlightCard className={cn(bentoCard, "relative min-h-[19rem]")} spotlightColor="rgba(168, 85, 247, 0.14)">
                <div className="relative z-10 flex h-full max-w-[58%] flex-col p-6 sm:p-8">
                  <p className="label-meta flex items-center gap-2">
                    <MapPin className="size-3.5 text-purple-400" aria-hidden />
                    Based in
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-white sm:text-2xl">
                    {profile.location.split(",")[0]}, <span className="font-serif font-normal italic text-purple-300">{profile.country}</span>
                  </h3>
                  <p className="mt-1.5 whitespace-nowrap font-mono text-xs text-white/50">{profile.coordinates.label}</p>
                  <p className="mt-auto flex items-center gap-2 pt-8 text-sm text-white/65">
                    <Clock className="size-4 text-purple-400" aria-hidden />
                    <span>
                      <LocalTime timeZone={profile.timeZone} className="font-medium text-white" /> local · {profile.timeZoneLabel}
                    </span>
                  </p>
                </div>
                <div className="absolute -bottom-24 -right-20 size-[19rem] sm:-bottom-32 sm:-right-14 sm:size-[24rem]">
                  <Globe lat={profile.coordinates.lat} lng={profile.coordinates.lng} />
                </div>
              </SpotlightCard>
            </AnimatedContent>

            {/* Now */}
            <AnimatedContent distance={32} duration={0.7} delay={0.12} threshold={0.1}>
              <SpotlightCard className={bentoCard} spotlightColor="rgba(52, 211, 153, 0.14)">
                <div className="flex h-full flex-col p-6">
                  <p className="label-meta flex items-center gap-2">
                    <LiveDot />
                    Now
                  </p>
                  <h3 className="mt-4 text-lg font-semibold text-white">{currentJob.title}</h3>
                  <p className="mt-1 text-sm text-white/65">
                    at <span className="text-white/85">{currentJob.company}</span>
                  </p>
                  <p className="mt-auto pt-6 font-mono text-xs uppercase tracking-wider text-white/45">
                    Since {currentJob.period.split(" — ")[0]}
                  </p>
                </div>
              </SpotlightCard>
            </AnimatedContent>

            {/* Education */}
            <AnimatedContent distance={32} duration={0.7} delay={0.16} threshold={0.1}>
              <SpotlightCard className={bentoCard} spotlightColor="rgba(56, 189, 248, 0.14)">
                <div className="flex h-full flex-col p-6">
                  <p className="label-meta flex items-center gap-2">
                    <GraduationCap className="size-3.5 text-sky-400" aria-hidden />
                    Education
                  </p>
                  <h3 className="mt-4 text-lg font-semibold leading-snug text-white">{education.degree}</h3>
                  <p className="mt-1 text-sm text-white/65">{education.school}</p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-6">
                    <Tag className="border-sky-400/25 bg-sky-400/10 text-sky-200">CGPA {education.cgpa}</Tag>
                    <Tag className="border-amber-400/25 bg-amber-400/10 text-amber-200">{education.honors}</Tag>
                  </div>
                </div>
              </SpotlightCard>
            </AnimatedContent>

            {/* Capabilities */}
            {capabilities.map((item, i) => (
              <AnimatedContent key={item.title} distance={32} duration={0.7} delay={0.08 * i} threshold={0.1}>
                <SpotlightCard
                  className={cn(bentoCard, "transition duration-300 hover:-translate-y-1", item.hover)}
                  spotlightColor={item.spotlight}
                >
                  <div className="flex h-full flex-col p-6">
                    <span className={`flex size-11 items-center justify-center rounded-xl ring-1 ${item.tone}`}>
                      <item.icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="mt-5 text-base font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">{item.description}</p>
                  </div>
                </SpotlightCard>
              </AnimatedContent>
            ))}
          </div>
        </section>

        {/* ─────────────────────────── Skills ─────────────────────────── */}
        <section id="skills" aria-labelledby="skills-title" className="section-y divider-top relative overflow-hidden">
          <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[40rem] -translate-x-1/2 animate-aurora rounded-full bg-cyan-500/10 blur-[120px]" />
          <div className="bg-dots fade-radial pointer-events-none absolute inset-0 opacity-50" />

          <div className="container-page relative">
            <SectionHeader
              id="skills-title"
              index="02"
              eyebrow="Tech stack"
              title="Languages, frameworks & tools I build with"
              highlight="build with"
              accent="text-cyan-400"
              aside={`${techStack.length} technologies · ${skillGroups.length} layers`}
            />

            <div className="mt-12 grid items-center gap-12 sm:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,27rem)] lg:gap-16">
              <ul className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                {skillGroups.map((group, i) => (
                  <AnimatedContent as="li" key={group.label} distance={40} duration={0.6} delay={i * 0.08} threshold={0.15}>
                    <GlareHover
                      width="100%"
                      height="100%"
                      background="rgba(255,255,255,0.03)"
                      borderRadius="1rem"
                      borderColor="rgba(255,255,255,0.1)"
                      glareColor="#22d3ee"
                      glareOpacity={0.22}
                      glareSize={220}
                      transitionDuration={800}
                      className="!cursor-default !grid-cols-1 !place-items-stretch p-6 transition-colors duration-300 hover:!border-cyan-400/40"
                    >
                      <div className="w-full text-left">
                        <div className="flex items-baseline justify-between gap-3">
                          <h3 className="label-meta !text-cyan-400">{group.label}</h3>
                          <span className="font-mono text-xs text-white/35">{String(i + 1).padStart(2, "0")}</span>
                        </div>
                        <p className="mt-1.5 text-sm text-white/55">{group.blurb}</p>
                        <ul className="mt-5 space-y-2.5">
                          {group.items.map((item) => (
                            <li key={item.name} className="flex items-center gap-3 text-[0.9375rem] text-white/80">
                              <span className="flex size-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
                                <BrandIcon slug={item.icon} className="size-4" />
                              </span>
                              {item.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </GlareHover>
                  </AnimatedContent>
                ))}
              </ul>

              <AnimatedContent distance={40} duration={0.9} scale={0.9} threshold={0.1}>
                <TechOrbit />
                <p className="mt-6 hidden text-center font-mono text-xs uppercase tracking-wider text-white/40 [@media(hover:hover)]:block">Hover to pause the orbit</p>
              </AnimatedContent>
            </div>
          </div>

          <div className="relative mt-20 h-14">
            <LogoLoop
              logos={techLogos}
              speed={60}
              gap={20}
              logoHeight={32}
              fadeOut
              fadeOutColor="#000000"
              pauseOnHover
              ariaLabel="Technologies I work with"
            />
          </div>
        </section>

        <div
          aria-hidden
          className="divider-top relative overflow-hidden py-12 [&>section>div:nth-child(even)_span]:text-outline [&>section>div:nth-child(odd)_span]:text-white/[0.1]"
        >
          <ScrollVelocity
            texts={velocityTexts}
            velocity={45}
            numCopies={6}
            className="px-4 text-4xl font-black uppercase tracking-tight sm:text-6xl"
          />
        </div>

        {/* ─────────────────────────── Experience ─────────────────────────── */}
        <section id="experience" aria-labelledby="experience-title" className="section-y divider-top relative overflow-hidden">
          <div className="pointer-events-none absolute -left-32 top-1/3 size-96 animate-aurora rounded-full bg-pink-500/10 blur-[130px]" />
          <div className="container-page relative">
            <SectionHeader
              id="experience-title"
              index="03"
              eyebrow="Experience"
              title="Where I've worked"
              highlight="worked"
              accent="text-pink-400"
              aside={`${experience.length} roles · 2022 — present`}
            />

            <TimelineRail className="mt-12 space-y-8 pl-8 sm:mt-16 sm:space-y-10 sm:pl-12">
              {experience.map((job, i) => (
                <li key={job.title + job.period} className="group relative">
                  <TimelineDot current={job.current} className="-left-8 top-8 -translate-x-1/2 sm:-left-12" />
                  <AnimatedContent
                    direction="horizontal"
                    distance={40}
                    duration={0.7}
                    delay={i * 0.05}
                    threshold={0.15}
                    className="grid gap-5 md:grid-cols-[13rem_1fr] md:gap-10"
                  >
                    <div className="md:pt-6">
                      <p className="label-meta">{job.period}</p>
                      <div className="mt-3 flex items-center gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-pink-400/25 to-purple-500/10 font-mono text-sm font-semibold text-pink-100">
                          {job.monogram}
                        </span>
                        <div className="min-w-0">
                          <p className="text-[0.9375rem] font-medium leading-snug text-white/85">{job.company}</p>
                          <p className="mt-0.5 text-sm text-white/55">{job.location}</p>
                        </div>
                      </div>
                    </div>
                    <div className="max-w-2xl rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 transition-colors duration-300 group-hover:border-pink-400/30 group-hover:bg-white/[0.035]">
                      <h3 className="flex flex-wrap items-center gap-x-3 gap-y-2 text-lg font-semibold text-white transition-colors duration-300 group-hover:text-pink-200">
                        {job.title}
                        {job.current ? <Tag className="border-pink-400/30 bg-pink-400/10 text-pink-300">Current</Tag> : null}
                      </h3>
                      <ul className="mt-3 space-y-2 text-[0.9375rem] leading-relaxed text-white/65">
                        {job.bullets.map((b) => (
                          <li
                            key={b}
                            className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:size-1.5 before:rounded-full before:bg-pink-400/60"
                          >
                            {b}
                          </li>
                        ))}
                      </ul>
                      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech used">
                        {job.stack.map((tech) => (
                          <li key={tech}>
                            <Tag>{tech}</Tag>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AnimatedContent>
                </li>
              ))}
            </TimelineRail>
          </div>
        </section>

        {/* ─────────────────────────── Projects ─────────────────────────── */}
        <section id="projects" aria-labelledby="projects-title" className="section-y divider-top relative overflow-hidden">
          <div className="pointer-events-none absolute -right-20 top-1/4 size-[26rem] animate-aurora rounded-full bg-amber-500/10 blur-[130px]" />
          <div className="bg-dots fade-radial pointer-events-none absolute inset-0 opacity-40" />

          <div className="container-page relative">
            <SectionHeader
              id="projects-title"
              index="04"
              eyebrow="Projects"
              title="Things I've built"
              highlight="built"
              accent="text-amber-400"
              aside={`${projects.length} projects · 2022 — present`}
            />

            <ul className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {projects.map((p, i) => (
                <AnimatedContent
                  as="li"
                  key={p.title}
                  distance={48}
                  duration={0.65}
                  delay={(i % 3) * 0.08}
                  scale={0.97}
                  threshold={0.12}
                  className={p.featured ? "lg:col-span-2" : undefined}
                >
                  <TiltCard>
                    <SpotlightCard
                      className={cn(
                        "group flex h-full flex-col !rounded-2xl !border-white/10 !bg-white/[0.03] !p-0 transition-colors duration-300 hover:!border-amber-400/40",
                        p.featured && "border-beam lg:flex-row"
                      )}
                      spotlightColor="rgba(250, 204, 21, 0.14)"
                    >
                      <ProjectCover
                        project={p}
                        index={i}
                        className={p.featured ? "h-64 shrink-0 border-b border-white/10 sm:h-72 lg:h-auto lg:w-[56%] lg:border-b-0 lg:border-r" : "h-40 shrink-0 border-b border-white/10"}
                      />
                      <div className="flex flex-1 flex-col p-6">
                        {p.featured ? (
                          <p className="label-meta mb-3 flex items-center gap-2 !text-amber-300">
                            <Sparkles className="size-3.5" aria-hidden />
                            Featured project
                          </p>
                        ) : null}
                        <h3
                          className={cn(
                            "font-semibold text-white transition-colors duration-300 group-hover:text-amber-200",
                            p.featured ? "text-2xl" : "text-base"
                          )}
                        >
                          {p.title}
                        </h3>
                        <p className={cn("mt-3 leading-relaxed text-white/65", p.featured ? "text-[0.9375rem]" : "text-sm")}>
                          {p.description}
                        </p>
                        <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
                          {p.stack.map((tech) => (
                            <Tag key={tech}>{tech}</Tag>
                          ))}
                          {p.status ? (
                            <Tag className="border-amber-400/30 bg-amber-400/10 text-amber-300">
                              <LiveDot className="mr-1.5 size-1.5 [&>span]:size-1.5 [&>span]:bg-amber-400" />
                              {p.status}
                            </Tag>
                          ) : null}
                        </div>
                      </div>
                    </SpotlightCard>
                  </TiltCard>
                </AnimatedContent>
              ))}
            </ul>
          </div>
        </section>

        {/* ─────────────────────────── Contact ─────────────────────────── */}
        <section id="contact" aria-labelledby="contact-title" className="section-y divider-top relative overflow-hidden">
          <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[44rem] -translate-x-1/2 animate-aurora rounded-full bg-emerald-500/10 blur-[130px]" />
          <div className="bg-grid fade-radial pointer-events-none absolute inset-0 opacity-50" />

          <div className="container-page relative grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
            <div>
              <SectionHeader
                id="contact-title"
                index="05"
                eyebrow="Contact"
                title="Let's build something together"
                highlight="together"
                accent="text-emerald-400"
              />
              <p className="mt-6 max-w-lg text-base leading-relaxed text-white/65">
                Open to new opportunities and collaborations — full-stack roles, product work, or freelance builds. I usually reply
                within a day.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Magnet>
                  <Button
                    asChild
                    size="xl"
                    className="bg-gradient-to-r from-emerald-400 to-cyan-500 text-black shadow-[0_8px_40px_-8px_rgba(52,211,153,0.7)] hover:text-black hover:opacity-95"
                  >
                    <a href={`mailto:${profile.email}`}>
                      <Mail data-icon="inline-start" aria-hidden />
                      Email me
                    </a>
                  </Button>
                </Magnet>
                <CopyEmailButton email={profile.email} />
              </div>
              <p className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/65 backdrop-blur-sm">
                <LiveDot />
                <span>
                  It&apos;s <LocalTime timeZone={profile.timeZone} className="font-medium text-white" /> in {profile.location.split(",")[0]} ·{" "}
                  {profile.timeZoneLabel}
                </span>
              </p>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {contactItems.map((item, idx) => (
                <AnimatedContent as="li" key={item.label} distance={32} duration={0.55} delay={idx * 0.07} threshold={0.15}>
                  <GlareHover
                    width="100%"
                    height="100%"
                    background="rgba(255,255,255,0.03)"
                    borderRadius="1rem"
                    borderColor="rgba(255,255,255,0.1)"
                    glareColor="#34d399"
                    glareOpacity={0.3}
                    glareSize={200}
                    transitionDuration={700}
                    className="group/contact !place-items-stretch transition-colors duration-300 hover:!border-emerald-400/40"
                  >
                    <a
                      href={item.href}
                      target={isExternal(item.href) ? "_blank" : undefined}
                      rel={isExternal(item.href) ? "noreferrer noopener" : undefined}
                      className="flex w-full items-center gap-4 rounded-2xl p-5 text-left focus-visible:outline-offset-[-2px]"
                    >
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400 ring-1 ring-emerald-400/20 transition-transform duration-300 group-hover/contact:scale-110">
                        <item.icon className="size-[1.125rem]" aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="label-meta block">{item.label}</span>
                        <span className="mt-1 block truncate text-[0.9375rem] text-white/85">{item.value}</span>
                      </span>
                      <ArrowUpRight
                        aria-hidden
                        className="size-5 shrink-0 text-white/30 transition duration-300 group-hover/contact:-translate-y-0.5 group-hover/contact:translate-x-0.5 group-hover/contact:text-emerald-300"
                      />
                    </a>
                  </GlareHover>
                </AnimatedContent>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="divider-top relative overflow-hidden">
        <div className="container-page relative z-10 flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
          <p className="text-sm text-white/55">
            © {new Date().getFullYear()} {profile.name}. Designed &amp; built with Next.js.
          </p>
          <ul className="flex items-center gap-2">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={isExternal(href) ? "_blank" : undefined}
                  rel={isExternal(href) ? "noreferrer noopener" : undefined}
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Icon className="size-[1.125rem]" />
                </a>
              </li>
            ))}
            <li className="ml-2 border-l border-white/10 pl-4">
              <a
                href="#hero"
                className="flex items-center gap-1.5 rounded-full py-2 text-sm text-white/60 transition-colors hover:text-white"
              >
                Back to top
                <ArrowUp className="size-4" aria-hidden />
              </a>
            </li>
          </ul>
        </div>
        <p
          aria-hidden
          className="pointer-events-none -mb-[0.2em] select-none whitespace-nowrap bg-gradient-to-b from-white/[0.2] via-white/[0.06] to-transparent bg-clip-text text-center text-[12.5vw] font-black leading-[0.85] tracking-tighter text-transparent"
        >
          AIMAN DANISH
        </p>
      </footer>
    </>
  );
}
