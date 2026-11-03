import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import CursorEffect from "@/components/site/CursorEffect";
import { profile } from "@/data/portfolio";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Editorial italic used for single accent words in section titles.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

// Set NEXT_PUBLIC_SITE_URL in the deploy environment so OG/canonical URLs are absolute.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const title = `${profile.name} | ${profile.role}`;
const description = `Portfolio of ${profile.name}, a software engineer in Malaysia specializing in React, Next.js, Laravel, and full-stack web development.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s | ${profile.name}` },
  description,
  applicationName: `${profile.name} Portfolio`,
  authors: [{ name: profile.name, url: profile.linkedin }],
  creator: profile.name,
  keywords: [
    "Aiman Danish",
    "Software Engineer",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "Laravel",
    "Malaysia",
    "Portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: `${profile.name} Portfolio`,
    title,
    description,
    locale: "en_MY",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  url: siteUrl,
  address: { "@type": "PostalAddress", addressLocality: "Seremban", addressRegion: "Negeri Sembilan", addressCountry: "MY" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Universiti Teknologi MARA" },
  worksFor: { "@type": "Organization", name: "Revenue Monster" },
  sameAs: [profile.linkedin, profile.github],
  knowsAbout: ["React", "Next.js", "TypeScript", "Laravel", "Node.js", "REST APIs", "AWS", "DigitalOcean"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`dark ${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full scroll-smooth antialiased`}>
      <body className="flex min-h-full flex-col overflow-x-clip bg-black text-white">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[2000] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-black"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          // Static, author-controlled data — safe to inline.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <CursorEffect />
        {children}
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
