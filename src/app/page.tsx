import { ArrowRight, ArrowUp, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
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
import { GitHubIcon, LinkedInIcon } from "@/components/site/BrandIcons";
import {
  capabilities,
  experience,
  facts,
  navItems,
  profile,
  progressSections,
  projects,
  skillGroups,
  stats,
  techStack,
  velocityTexts,
} from "@/data/portfolio";

const techLogos: LogoItem[] = techStack.map(({ name, slug, color }) => ({
  node: (
    <span className="flex items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-medium text-white/85 transition hover:border-white/30 hover:bg-white/10">
      {/* eslint-disable-next-line @next/next/no-img-element -- remote SVG from the Simple Icons CDN, no optimisation needed */}
      <img
        src={`https://cdn.simpleicons.org/${slug}${color ? `/${color}` : ""}`}
        alt=""
        width={16}
        height={16}
        className="size-4"
        loading="lazy"
        decoding="async"
      />
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

const isExternal = (href: string) => href.startsWith("http");
const hostOf = (href: string) => new URL(href).host;
const liveCount = projects.filter((p) => p.href).length;

/** Gradient-outline CTA shared by hero and contact. */
const outlineCta =
  "border-white/20 bg-white/[0.03] text-white backdrop-blur-sm hover:border-white/35 hover:bg-white/10 hover:text-white";

export default function Home() {
  return (
    <>
      <BubbleMenu
        logo={
          <span className="bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-lg font-bold tracking-tight text-transparent">
            AD.
          </span>
        }
        logoHref="#hero"
        logoAriaLabel={`${profile.name} — back to top`}
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
          <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.55)_0%,transparent_70%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-40 bg-gradient-to-b from-transparent to-black" />

          <div className="container-page relative z-10 flex flex-col items-center pb-24 pt-32 text-center">
            {profile.available ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1.5 text-xs font-medium text-emerald-300">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                </span>
                Open to new opportunities
              </span>
            ) : null}

            <Shuffle
              tag="h1"
              text={profile.name.toUpperCase()}
              className="mt-6 font-black tracking-tight text-white"
              style={{ fontSize: "clamp(2.75rem, 9vw, 7rem)", lineHeight: 1 }}
              shuffleDirection="up"
              duration={0.4}
              colorFrom="#38bdf8"
              colorTo="#ffffff"
            />
            <Shuffle
              tag="p"
              text={profile.role.toUpperCase()}
              className="mt-5 font-medium tracking-[0.3em] text-white/75"
              style={{ fontSize: "clamp(0.9375rem, 2.2vw, 1.375rem)" }}
              shuffleDirection="right"
              duration={0.3}
              stagger={0.02}
            />

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">{profile.tagline}</p>

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

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild
                size="xl"
                className="bg-gradient-to-r from-sky-400 to-purple-500 text-white shadow-[0_8px_32px_-8px_rgba(56,189,248,0.6)] hover:opacity-90"
              >
                <a href="#projects">
                  View projects
                  <ArrowRight data-icon="inline-end" aria-hidden />
                </a>
              </Button>
              <Button asChild size="xl" variant="outline" className={outlineCta}>
                <a href="#contact">Get in touch</a>
              </Button>
            </div>

            <dl className="mt-16 grid w-full max-w-2xl grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 pt-8 sm:grid-cols-4">
              {stats.map((stat, i) => (
                <AnimatedContent
                  key={stat.label}
                  distance={24}
                  duration={0.6}
                  delay={i * 0.08}
                  threshold={0}
                  className="flex flex-col-reverse items-center gap-1"
                >
                  <dt className="label-meta">{stat.label}</dt>
                  <dd className="text-3xl font-bold tabular-nums text-white">
                    <CountUp to={stat.value} duration={1.4} />
                    {stat.suffix}
                  </dd>
                </AnimatedContent>
              ))}
            </dl>
          </div>
        </section>

        <LaptopSection />

        {/* ─────────────────────────── About ─────────────────────────── */}
        <section id="about" aria-labelledby="about-title" className="section-y relative overflow-hidden">
          <div className="pointer-events-none absolute -top-32 right-0 size-96 rounded-full bg-purple-500/20 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-0 left-0 size-72 rounded-full bg-cyan-500/10 blur-[100px]" />

          <div className="container-page relative grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 id="about-title" className="eyebrow text-purple-400">
                About
              </h2>
              <ScrollReveal
                className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl"
                baseOpacity={0.15}
                baseRotation={2}
                blurStrength={5}
              >
                I&apos;m a software engineer based in Seremban, currently building API tooling at Revenue Monster after leading full-stack delivery at iPen Sdn. Bhd.
              </ScrollReveal>
              <p className="mt-6 max-w-prose text-base leading-relaxed text-white/65">
                Over the past few years I&apos;ve shipped production React.js, Next.js, and Laravel applications, deployed and
                hardened infrastructure on DigitalOcean with Laravel Forge, and mentored junior developers through code review. I
                hold a Bachelor of Computer Science (Hons.) in Netcentric Computing from Universiti Teknologi MARA, graduating with a
                CGPA of 3.44 and two Dean&apos;s List awards.
              </p>

              <dl className="mt-10 grid gap-x-8 gap-y-6 border-t border-white/10 pt-8 sm:grid-cols-2">
                {facts.map((fact, i) => (
                  <AnimatedContent key={fact.label} distance={24} duration={0.5} delay={i * 0.05} threshold={0.15}>
                    <dt className="label-meta">{fact.label}</dt>
                    <dd className="mt-1.5 text-[0.9375rem] text-white/85">{fact.value}</dd>
                  </AnimatedContent>
                ))}
              </dl>
            </div>

            <ul className="flex flex-col gap-4 lg:col-span-5">
              {capabilities.map((item, i) => (
                <AnimatedContent
                  as="li"
                  key={item.title}
                  direction="horizontal"
                  distance={48}
                  duration={0.7}
                  delay={i * 0.1}
                  threshold={0.15}
                >
                  <SpotlightCard
                    className={`flex gap-4 !rounded-2xl !border-white/10 !bg-white/[0.03] !p-6 transition duration-300 hover:-translate-y-0.5 ${item.hover}`}
                    spotlightColor={item.spotlight}
                  >
                    <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ring-1 ${item.tone}`}>
                      <item.icon className="size-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-white">{item.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/65">{item.description}</p>
                    </div>
                  </SpotlightCard>
                </AnimatedContent>
              ))}
            </ul>
          </div>
        </section>

        {/* ─────────────────────────── Skills ─────────────────────────── */}
        <section id="skills" aria-labelledby="skills-title" className="section-y relative overflow-hidden border-t border-white/10">
          <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
          <div className="container-page relative">
            <SectionHeader
              id="skills-title"
              eyebrow="Tech stack"
              title="Languages, frameworks, and tools I build with"
              accent="text-cyan-400"
              aside={`${techStack.length} technologies across ${skillGroups.length} layers`}
            />

            <ul className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
              {skillGroups.map((group, i) => (
                <AnimatedContent as="li" key={group.label} distance={40} duration={0.6} delay={i * 0.08} threshold={0.15}>
                  <GlareHover
                    width="100%"
                    height="100%"
                    background="rgba(255,255,255,0.03)"
                    borderRadius="1rem"
                    borderColor="rgba(255,255,255,0.1)"
                    glareColor="#22d3ee"
                    glareOpacity={0.25}
                    glareSize={220}
                    transitionDuration={800}
                    className="!cursor-default !grid-cols-1 !place-items-stretch p-6 transition-colors duration-300 hover:!border-cyan-400/40"
                  >
                    <div className="w-full text-left">
                      <h3 className="label-meta !text-cyan-400">{group.label}</h3>
                      <ul className="mt-4 space-y-2 text-[0.9375rem] text-white/75">
                        {group.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </GlareHover>
                </AnimatedContent>
              ))}
            </ul>
          </div>

          <div className="relative mt-16 h-14">
            <LogoLoop
              logos={techLogos}
              speed={60}
              gap={24}
              logoHeight={32}
              fadeOut
              fadeOutColor="#000000"
              pauseOnHover
              ariaLabel="Technologies I work with"
            />
          </div>
        </section>

        <div aria-hidden className="relative overflow-hidden border-t border-white/10 py-10">
          <ScrollVelocity
            texts={velocityTexts}
            velocity={45}
            numCopies={6}
            className="px-4 text-3xl font-black uppercase tracking-tight text-white/[0.12] sm:text-5xl"
          />
        </div>

        {/* ─────────────────────────── Experience ─────────────────────────── */}
        <section id="experience" aria-labelledby="experience-title" className="section-y relative overflow-hidden border-t border-white/10">
          <div className="container-page">
            <SectionHeader
              id="experience-title"
              eyebrow="Experience"
              title="Where I've worked"
              accent="text-pink-400"
              aside={`${experience.length} roles · 2022 — present`}
            />

            <ol className="relative mt-12 space-y-12 border-l border-white/15 pl-8 sm:mt-16 sm:pl-10">
              {experience.map((job, i) => (
                <li key={job.title + job.period} className="group relative">
                  <span
                    aria-hidden
                    className={`absolute -left-[calc(2rem+5px)] top-1.5 size-2.5 rounded-full bg-pink-400 shadow-[0_0_12px_2px_rgba(244,114,182,0.5)] transition-transform duration-300 group-hover:scale-150 sm:-left-[calc(2.5rem+5px)] ${
                      job.current ? "ring-4 ring-pink-400/20" : ""
                    }`}
                  />
                  <AnimatedContent
                    direction="horizontal"
                    distance={48}
                    duration={0.7}
                    delay={i * 0.05}
                    threshold={0.15}
                    className="grid gap-4 md:grid-cols-[12rem_1fr] md:gap-10"
                  >
                    <div>
                      <p className="label-meta">{job.period}</p>
                      <p className="mt-2 text-[0.9375rem] font-medium text-white/85">{job.company}</p>
                      <p className="mt-0.5 text-sm text-white/55">{job.location}</p>
                    </div>
                    <div className="max-w-2xl">
                      <h3 className="flex flex-wrap items-center gap-x-3 gap-y-2 text-lg font-semibold text-white transition-colors duration-300 group-hover:text-pink-300">
                        {job.title}
                        {job.current ? (
                          <Tag className="border-pink-400/30 bg-pink-400/10 text-pink-300">Current</Tag>
                        ) : null}
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
                      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech used">
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
            </ol>
          </div>
        </section>

        {/* ─────────────────────────── Projects ─────────────────────────── */}
        <section id="projects" aria-labelledby="projects-title" className="section-y relative overflow-hidden border-t border-white/10">
          <div className="pointer-events-none absolute right-0 top-1/3 size-80 rounded-full bg-amber-500/10 blur-[120px]" />
          <div className="container-page relative">
            <SectionHeader
              id="projects-title"
              eyebrow="Projects"
              title="Things I've built"
              accent="text-amber-400"
              aside={`${projects.length} projects · ${liveCount} live`}
            />

            <ul className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {projects.map((p, i) => {
                const body = (
                  <>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3
                          className={`font-semibold text-white transition-colors duration-300 group-hover:text-amber-300 ${
                            p.featured ? "text-xl sm:text-2xl" : "text-base"
                          }`}
                        >
                          {p.title}
                        </h3>
                        {p.href ? <p className="mt-1 font-mono text-xs text-white/50">{hostOf(p.href)}</p> : null}
                      </div>
                      {p.href ? (
                        <ArrowUpRight
                          aria-hidden
                          className="size-5 shrink-0 text-white/45 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber-400"
                        />
                      ) : null}
                    </div>
                    <p className={`mt-3 leading-relaxed text-white/65 ${p.featured ? "max-w-xl text-[0.9375rem]" : "text-sm"}`}>
                      {p.description}
                    </p>
                    <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
                      {p.stack.map((tech) => (
                        <Tag key={tech}>{tech}</Tag>
                      ))}
                      {p.status ? <Tag className="border-amber-400/30 bg-amber-400/10 text-amber-300">{p.status}</Tag> : null}
                    </div>
                  </>
                );

                return (
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
                    <SpotlightCard
                      className={`group h-full !rounded-2xl !border-white/10 !p-0 transition duration-300 hover:-translate-y-1 hover:!border-amber-400/40 ${
                        p.featured ? "!bg-gradient-to-br !from-amber-400/[0.07] !to-white/[0.02]" : "!bg-white/[0.03]"
                      }`}
                      spotlightColor="rgba(250, 204, 21, 0.18)"
                    >
                      {p.href ? (
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="flex h-full flex-col rounded-2xl p-6 focus-visible:outline-offset-[-2px]"
                        >
                          {body}
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      ) : (
                        <div className="flex h-full flex-col p-6">{body}</div>
                      )}
                    </SpotlightCard>
                  </AnimatedContent>
                );
              })}
            </ul>
          </div>
        </section>

        {/* ─────────────────────────── Contact ─────────────────────────── */}
        <section id="contact" aria-labelledby="contact-title" className="section-y relative overflow-hidden border-t border-white/10">
          <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
          <div className="container-page relative grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <SectionHeader
                id="contact-title"
                eyebrow="Contact"
                title="Let's build something together"
                accent="text-emerald-400"
              />
              <p className="mt-6 max-w-lg text-base leading-relaxed text-white/65">
                Open to new opportunities and collaborations — full-stack roles, product work, or freelance builds. I usually reply
                within a day.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="xl"
                  className="bg-gradient-to-r from-emerald-400 to-cyan-500 text-black shadow-[0_8px_32px_-8px_rgba(52,211,153,0.6)] hover:text-black hover:opacity-90"
                >
                  <a href={`mailto:${profile.email}`}>
                    <Mail data-icon="inline-start" aria-hidden />
                    Email me
                  </a>
                </Button>
                <CopyEmailButton email={profile.email} />
              </div>
              <p className="mt-6 flex items-center gap-2 text-sm text-white/55">
                <MapPin className="size-4 text-emerald-400" aria-hidden />
                {profile.location}, {profile.country}
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
                    className="!place-items-stretch transition-colors duration-300 hover:!border-emerald-400/40"
                  >
                    <a
                      href={item.href}
                      target={isExternal(item.href) ? "_blank" : undefined}
                      rel={isExternal(item.href) ? "noreferrer noopener" : undefined}
                      className="flex w-full items-start gap-4 rounded-2xl p-5 text-left focus-visible:outline-offset-[-2px]"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400 ring-1 ring-emerald-400/20">
                        <item.icon className="size-[1.125rem]" aria-hidden />
                      </span>
                      <span className="min-w-0">
                        <span className="label-meta block">{item.label}</span>
                        <span className="mt-1 block truncate text-[0.9375rem] text-white/85">{item.value}</span>
                      </span>
                    </a>
                  </GlareHover>
                </AnimatedContent>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
          <p className="text-sm text-white/55">
            © {new Date().getFullYear()} {profile.name}. Built with Next.js.
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
      </footer>
    </>
  );
}
