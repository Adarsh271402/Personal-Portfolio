"use client";

import { Navbar } from "@/components/portfolio/navbar";
import { Hero } from "@/components/portfolio/hero";
import { About } from "@/components/portfolio/about";
import { TechStack } from "@/components/portfolio/tech-stack";
import { Experience } from "@/components/portfolio/experience";
import { Projects } from "@/components/portfolio/projects";
import { GitHubSection } from "@/components/portfolio/github";
import { Contact } from "@/components/portfolio/contact";
import { Footer } from "@/components/portfolio/footer";
import { ScrollProgress } from "@/components/portfolio/scroll-progress";
import { CursorGlow } from "@/components/portfolio/cursor-glow";
import { BackToTop } from "@/components/portfolio/back-to-top";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip">
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <TechStack />
        <Experience />
        <Projects />
        <GitHubSection />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
