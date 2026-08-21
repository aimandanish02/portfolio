import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SplashCursor from "@/components/SplashCursor";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aiman Danish | Software Engineer",
  description:
    "Portfolio of Aiman Danish, a software engineer specializing in React, Next.js, Laravel, and full-stack web development.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        <SplashCursor
          COLOR="#38bdf8"
          RAINBOW_MODE={false}
          SPLAT_RADIUS={0.06}
          SPLAT_FORCE={3000}
        />
        {children}
      </body>
    </html>
  );
}
