import { Cloud, Code2, Server, Users, type LucideIcon } from "lucide-react";
import type { BrandSlug } from "./brandIcons";

/**
 * Single source of truth for the portfolio's content. Sections read from here
 * so copy changes never require touching layout code.
 */

export const profile = {
  name: "Aiman Danish",
  role: "Software Engineer",
  tagline:
    "Full-stack engineer building scalable web platforms with React, Next.js, and Laravel — from API design to production deployment.",
  location: "Seremban, Negeri Sembilan",
  country: "Malaysia",
  email: "aimandanish955@gmail.com",
  phone: "+60 16-221 9666",
  phoneHref: "tel:+60162219666",
  linkedin: "https://www.linkedin.com/in/aimandanish02",
  linkedinHandle: "aimandanish02",
  github: "https://github.com/aimandanish02",
  githubHandle: "aimandanish02",
  available: true,
  /** Where the globe marker sits. Never shown as text. */
  coordinates: { lat: 2.7258, lng: 101.9424 },
} as const;

/** Phrases cycled in the hero tagline: "I build ___". */
export const heroRotatingWords = [
  "scalable web platforms",
  "API-first products",
  "AI-driven tools",
  "pixel-perfect interfaces",
];

export const accents = {
  sky: "#38bdf8",
  indigo: "#818cf8",
  purple: "#a855f7",
  cyan: "#22d3ee",
  pink: "#f472b6",
  amber: "#facc15",
  emerald: "#34d399",
} as const;

export const navItems = [
  { label: "home", href: "#hero", rotation: -8, hoverStyles: { bgColor: accents.sky, textColor: "#05060f" } },
  { label: "about", href: "#about", rotation: 8, hoverStyles: { bgColor: accents.purple, textColor: "#ffffff" } },
  { label: "skills", href: "#skills", rotation: -8, hoverStyles: { bgColor: accents.cyan, textColor: "#05060f" } },
  { label: "experience", href: "#experience", rotation: 8, hoverStyles: { bgColor: accents.pink, textColor: "#05060f" } },
  { label: "projects", href: "#projects", rotation: -8, hoverStyles: { bgColor: accents.amber, textColor: "#05060f" } },
  { label: "contact", href: "#contact", rotation: 8, hoverStyles: { bgColor: accents.emerald, textColor: "#05060f" } },
];

export const progressSections = [
  { id: "hero", label: "Home", color: accents.sky },
  { id: "workstation", label: "Setup", color: accents.indigo },
  { id: "about", label: "About", color: accents.purple },
  { id: "skills", label: "Skills", color: accents.cyan },
  { id: "experience", label: "Experience", color: accents.pink },
  { id: "projects", label: "Projects", color: accents.amber },
  { id: "contact", label: "Contact", color: accents.emerald },
];

/** A Simple Icons slug, or "aws" (Simple Icons dropped the AWS mark, so it gets a neutral cloud glyph). */
export type IconSlug = BrandSlug | "aws";

export type Tech = { name: string; icon: IconSlug };

export const techStack: Tech[] = [
  { name: "React.js", icon: "react" },
  { name: "Next.js", icon: "nextdotjs" },
  { name: "TypeScript", icon: "typescript" },
  { name: "JavaScript", icon: "javascript" },
  { name: "Laravel", icon: "laravel" },
  { name: "Express.js", icon: "express" },
  { name: "Node.js", icon: "nodedotjs" },
  { name: "PHP", icon: "php" },
  { name: "Tailwind CSS", icon: "tailwindcss" },
  { name: "MySQL", icon: "mysql" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "Firebase", icon: "firebase" },
  { name: "Supabase", icon: "supabase" },
  { name: "AWS", icon: "aws" },
  { name: "DigitalOcean", icon: "digitalocean" },
  { name: "WordPress", icon: "wordpress" },
  { name: "Strapi", icon: "strapi" },
  { name: "React Native", icon: "react" },
];

export type SkillGroup = { label: string; blurb: string; items: Tech[] };

export const skillGroups: SkillGroup[] = [
  {
    label: "Frontend",
    blurb: "Interfaces that feel fast",
    items: [
      { name: "React.js", icon: "react" },
      { name: "Next.js", icon: "nextdotjs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "React Native", icon: "react" },
    ],
  },
  {
    label: "Backend",
    blurb: "APIs that stay documented",
    items: [
      { name: "Laravel", icon: "laravel" },
      { name: "Express.js", icon: "express" },
      { name: "Node.js", icon: "nodedotjs" },
      { name: "PHP", icon: "php" },
      { name: "REST / OpenAPI", icon: "openapiinitiative" },
    ],
  },
  {
    label: "Data",
    blurb: "Storage that scales",
    items: [
      { name: "MySQL", icon: "mysql" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Firebase", icon: "firebase" },
      { name: "Supabase", icon: "supabase" },
      { name: "Strapi", icon: "strapi" },
    ],
  },
  {
    label: "Cloud & Ops",
    blurb: "Deploys that don't page anyone",
    items: [
      { name: "DigitalOcean", icon: "digitalocean" },
      { name: "AWS", icon: "aws" },
      { name: "Laravel Forge", icon: "laravel" },
      { name: "WordPress", icon: "wordpress" },
    ],
  },
];

/** Rings of the skills orbit, innermost first. */
export const orbitRings: { icons: Tech[]; duration: number; reverse?: boolean }[] = [
  {
    duration: 28,
    icons: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextdotjs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
    ],
  },
  {
    duration: 42,
    reverse: true,
    icons: [
      { name: "Laravel", icon: "laravel" },
      { name: "Node.js", icon: "nodedotjs" },
      { name: "Express", icon: "express" },
      { name: "PHP", icon: "php" },
      { name: "JavaScript", icon: "javascript" },
      { name: "OpenAPI", icon: "openapiinitiative" },
    ],
  },
  {
    duration: 60,
    icons: [
      { name: "MySQL", icon: "mysql" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Firebase", icon: "firebase" },
      { name: "Supabase", icon: "supabase" },
      { name: "DigitalOcean", icon: "digitalocean" },
      { name: "AWS", icon: "aws" },
      { name: "WordPress", icon: "wordpress" },
      { name: "Strapi", icon: "strapi" },
    ],
  },
];

export type Job = {
  period: string;
  title: string;
  company: string;
  location: string;
  /** Two-letter badge shown in the timeline. */
  monogram: string;
  current?: boolean;
  stack: string[];
  bullets: string[];
};

export const experience: Job[] = [
  {
    period: "May 2025 — Present",
    title: "Software Engineer",
    company: "Revenue Monster",
    location: "Malaysia",
    monogram: "RM",
    current: true,
    stack: ["OpenAPI", "Redoc", "REST"],
    bullets: ["Developed and maintained API documentation."],
  },
  {
    period: "May 2025 — Dec 2025",
    title: "Junior Lead Web Developer",
    company: "iPen Sdn. Bhd.",
    location: "Seri Kembangan, Selangor",
    monogram: "iP",
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
    monogram: "iP",
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
    monogram: "KM",
    stack: ["IT Systems", "R&D"],
    bullets: [
      "Fulfilled tasks assigned by supervisors, including research and development of IT-focused solutions.",
      "Proposed ideas to streamline processes and presented a final project at the internship's conclusion.",
      "Gained hands-on experience with IT systems in a corporate environment.",
    ],
  },
];

export type ProjectIcon = "sprout" | "users" | "layout" | "globe" | "leaf" | "shopping" | "shield" | "boxes";

export type Project = {
  title: string;
  description: string;
  /** Short label shown on the generated cover. */
  category: string;
  icon: ProjectIcon;
  stack: string[];
  status?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "FagroX App",
    description:
      "AI-driven agriculture platform integrating weather forecasts, crop analytics, and market access tools — helping farmers plan, grow, and sell from one dashboard.",
    category: "AgriTech platform",
    icon: "sprout",
    stack: ["Next.js", "AI", "REST"],
    status: "Ongoing",
    featured: true,
  },
  { title: "iPen HR System", category: "HR system", icon: "users", description: "Full-stack HR management system covering employee records, leave, and payroll workflows.", stack: ["Laravel", "React.js", "MySQL"] },
  { title: "FagroX CMS", category: "Headless CMS", icon: "layout", description: "Strapi-based CMS backend powering content for fagrox.com.", stack: ["Strapi", "Node.js"] },
  { title: "FagroX", category: "Landing site", icon: "globe", description: "Official landing site highlighting digital agriculture solutions and farmer onboarding.", stack: ["Next.js", "Tailwind CSS"] },
  { title: "Phytob", category: "Corporate site", icon: "leaf", description: "Responsive corporate website for a health and wellness brand.", stack: ["WordPress", "PHP"] },
  { title: "Hekha", category: "E-commerce", icon: "shopping", description: "Clothing brand storefront with a modern UI/UX pass end to end.", stack: ["Next.js", "Tailwind CSS"] },
  { title: "E-Certificate Management System", category: "Blockchain", icon: "shield", description: "Blockchain-based certificate storage using Laravel and IPFS for tamper-proof verification.", stack: ["Laravel", "IPFS", "Blockchain"] },
  { title: "Hardware Inventory System", category: "Internal tool", icon: "boxes", description: "Inventory tracking system for hardware assets with reporting and stock movement history.", stack: ["Laravel", "MySQL"] },
];

export const stats = [
  { value: 4, suffix: "", label: "Roles held" },
  { value: projects.length, suffix: "", label: "Projects built" },
  { value: techStack.length, suffix: "", label: "Technologies" },
  { value: 2, suffix: "×", label: "Dean's List" },
];

export const velocityTexts = [
  "FULL-STACK ENGINEER · REACT · NEXT.JS · LARAVEL ·",
  "API DESIGN · CLOUD DEPLOYMENT · UI ENGINEERING ·",
];

export const education = {
  degree: "BCS (Hons.) Netcentric Computing",
  school: "Universiti Teknologi MARA",
  cgpa: "3.44",
  honors: "2× Dean's List",
};

/** Topics shown as chips on the About intro card. */
export const focusAreas = ["Full-stack web", "AI-driven platforms", "API design", "Code review & mentoring"];

export const facts = [
  { label: "Current", value: "Software Engineer · Revenue Monster" },
  { label: "Based in", value: profile.location },
  { label: "Education", value: "BCS (Hons.) Netcentric Computing, UiTM" },
  { label: "Academics", value: "CGPA 3.44 · 2× Dean's List" },
  { label: "Focus", value: "Full-stack web & AI-driven platforms" },
  { label: "Availability", value: "Open to new opportunities" },
];

export type Capability = {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Tailwind classes for the icon tile and hover border, written out in full so Tailwind can see them. */
  tone: string;
  hover: string;
  spotlight: `rgba(${number}, ${number}, ${number}, ${number})`;
};

export const capabilities: Capability[] = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    description: "React.js, Next.js, and Laravel applications built end-to-end, from UI to data layer.",
    tone: "bg-sky-400/10 text-sky-400 ring-sky-400/20",
    hover: "hover:!border-sky-400/40",
    spotlight: "rgba(56, 189, 248, 0.2)",
  },
  {
    icon: Server,
    title: "Backend & APIs",
    description: "RESTful API design and documentation with OpenAPI and Redoc across Express.js and Laravel.",
    tone: "bg-purple-400/10 text-purple-400 ring-purple-400/20",
    hover: "hover:!border-purple-400/40",
    spotlight: "rgba(168, 85, 247, 0.2)",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "Production deployments on DigitalOcean, AWS, and Laravel Forge with secure, reliable delivery.",
    tone: "bg-emerald-400/10 text-emerald-400 ring-emerald-400/20",
    hover: "hover:!border-emerald-400/40",
    spotlight: "rgba(52, 211, 153, 0.2)",
  },
  {
    icon: Users,
    title: "Team & Delivery",
    description: "Code review, mentoring, and stakeholder translation — turning requirements into shipped features.",
    tone: "bg-pink-400/10 text-pink-400 ring-pink-400/20",
    hover: "hover:!border-pink-400/40",
    spotlight: "rgba(244, 114, 182, 0.2)",
  },
];
