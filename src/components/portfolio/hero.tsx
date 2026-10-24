"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Download,
  Github,
  Instagram,
  Linkedin,
  Sparkles,
  Twitter,
} from "lucide-react";
import { CodeWindow } from "./code-window";
import { TypingText } from "./typing-text";
import { AnimatedCounter } from "./animated-counter";
import { GITHUB_URL, LINKEDIN_URL, TWITTER_URL, HERO_STATS, MARQUEE_ITEMS } from "@/lib/portfolio-data";

const socialIcon = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Twitter: Twitter,
  Instagram: Instagram,
} as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 20 });
  const sy = useSpring(my, { stiffness: 55, damping: 20 });

  const layer1x = useTransform(sx, (v) => v * 26);
  const layer1y = useTransform(sy, (v) => v * 22);
  const layer2x = useTransform(sx, (v) => v * -34);
  const layer2y = useTransform(sy, (v) => v * -26);
  const badgeX = useTransform(sx, (v) => v * 14);
  const badgeY = useTransform(sy, (v) => v * 12);

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const goProjects = () =>
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      ref={ref}
      onMouseMove={onMouseMove}
      className="relative overflow-hidden pt-32 sm:pt-36"
    >
      {/* backdrop: soft blobs + dotted grid */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-lines opacity-70 [mask-image:radial-gradient(75%_60%_at_50%_35%,black,transparent)]" />
        <motion.div
          style={{ x: layer2x, y: layer2y }}
          className="absolute -left-24 top-16 h-72 w-72 animate-blob rounded-full bg-brand-soft blur-2xl"
        />
        <motion.div
          style={{ x: layer1x, y: layer1y }}
          className="absolute right-[-60px] top-40 h-80 w-80 animate-blob rounded-full bg-[#f2ddb9] blur-2xl dark:bg-brand-softer"
        />
      </div>

      <div className="mx-auto grid min-w-0 max-w-6xl items-center gap-14 px-4 pb-10 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        {/* ------------ Left: intro ------------ */}
        <div className="relative z-10 min-w-0 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand-soft px-4 py-1.5 text-sm font-medium text-brand-strong dark:text-brand-strong"
          >
            <span className="inline-block animate-wave origin-bottom text-base">👋</span>
            Hello, I&apos;m
            <Sparkles className="h-3.5 w-3.5" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 34, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-5xl font-extrabold leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.2rem]"
          >
            Adarsh{" "}
            <span className="text-gradient-brand animate-gradient-x">
              Gupta
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-4 text-xl font-semibold text-foreground/85 sm:text-2xl"
          >
            <TypingText words={["Full Stack & .NET Developer", "React Enthusiast", "Clean Code Advocate"]} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42 }}
            className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-muted-foreground sm:text-base lg:mx-0"
          >
            I build modern, scalable and interactive digital experiences with a
            focus on clean code, great performance and user-friendly design.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.54 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3.5 lg:justify-start"
          >
            <motion.button
              onClick={goProjects}
              whileHover={{ scale: 1.045, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25"
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Projects
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </span>
              <span
                aria-hidden
                className="absolute inset-y-0 z-0 w-1/3 animate-shine bg-gradient-to-r from-transparent via-white/25 to-transparent"
              />
            </motion.button>

            <motion.a
              href="/resume.pdf"
              download="Adarsh-Gupta-Resume.pdf"
              whileHover={{ scale: 1.045, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold shadow-sm transition-colors hover:border-brand/50 hover:text-brand"
            >
              <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              Download Resume
            </motion.a>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.66 }}
            className="mt-8 flex items-center justify-center gap-2.5 lg:justify-start"
          >
            {Object.entries(socialIcon).map(([name, Icon], i) => (
              <motion.a
                key={name}
                href={name === "GitHub" ? GITHUB_URL : name === "LinkedIn" ? LINKEDIN_URL : name === "Twitter" ? TWITTER_URL : "#contact"}
                target={name === "GitHub" || name === "LinkedIn" || name === "Twitter" ? "_blank" : undefined}
                rel={name === "GitHub" || name === "LinkedIn" || name === "Twitter" ? "noreferrer" : undefined}
                aria-label={name}
                whileHover={{ y: -5, scale: 1.1, rotate: i % 2 ? 4 : -4 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 320, damping: 16 }}
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-brand/40 hover:text-brand"
              >
                <Icon className="h-[17px] w-[17px]" />
              </motion.a>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.dl
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.78 }}
            className="mt-9 flex items-center justify-center gap-6 sm:gap-12 lg:justify-start"
          >
            {HERO_STATS.map((s) => (
              <div key={s.label} className="text-center lg:text-left">
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-xl font-extrabold text-foreground sm:text-[1.7rem]">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </dd>
                <dd className="mt-0.5 whitespace-nowrap text-[10px] font-medium uppercase tracking-wider text-muted-foreground sm:text-[11px]">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ------------ Right: animated code scene ------------ */}
        <div className="relative z-10 flex min-w-0 justify-center lg:justify-end">
          <div className="relative w-full min-w-0 max-w-xl">
            {/* rotating dashed ring */}
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 animate-spin-slower rounded-full border border-dashed border-brand/30 sm:h-[480px] sm:w-[480px]"
            />
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 -z-10 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-brand/15 sm:h-[380px] sm:w-[380px]"
            />

            <motion.div style={{ x: layer1x, y: layer1y }}>
              <CodeWindow />
            </motion.div>

            {/* floating tech badges */}
            <motion.div
              style={{ x: badgeX, y: badgeY }}
              className="absolute -left-8 -top-6 sm:-left-12"
            >
              <motion.div
                animate={{ y: [0, -12, 0], rotate: [-4, 2, -4] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2.5 shadow-lg shadow-black/[0.07]"
              >
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#512BD4] font-mono text-[10px] font-bold text-white">.NET</span>
                <span className="text-xs font-semibold">.NET 8</span>
              </motion.div>
            </motion.div>

            <motion.div
              style={{ x: layer2x, y: layer2y }}
              className="absolute -right-4 top-1/3 sm:-right-10"
            >
              <motion.div
                animate={{ y: [0, 12, 0], rotate: [3, -3, 3] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2.5 shadow-lg shadow-black/[0.07]"
              >
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#087EA4] text-white">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
                    <ellipse cx="12" cy="12" rx="10" ry="4.2" />
                    <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
                    <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
                  </svg>
                </span>
                <span className="text-xs font-semibold">React 19</span>
              </motion.div>
            </motion.div>

            <motion.div
              style={{ x: badgeX, y: badgeY }}
              className="absolute -bottom-7 left-6 sm:left-2"
            >
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [2, -3, 2] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
                className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2.5 shadow-lg shadow-black/[0.07]"
              >
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#3178C6] font-mono text-[10px] font-bold text-white">TS</span>
                <span className="text-xs font-semibold">TypeScript</span>
              </motion.div>
            </motion.div>

            {/* handwritten annotation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: 10 }}
              animate={{ opacity: 1, scale: 1, rotate: 6 }}
              transition={{ delay: 1.15, duration: 0.55, type: "spring", bounce: 0.45 }}
              className="absolute -right-3 -top-9 hidden sm:block"
            >
              <p className="font-handwriting text-2xl leading-[0.95] text-brand-strong dark:text-brand-strong">
                Code · Create
                <br />
                <span className="ml-4">Innovate</span>
              </p>
              <svg viewBox="0 0 60 30" className="ml-8 h-5 w-12 text-brand">
                <path d="M4 4 C 22 6, 40 12, 52 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                <path d="M52 24 l-9 -2 m9 2 l-3 -8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="group mx-auto mt-6 flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-brand"
        aria-label="Scroll down"
      >
        <span className="text-[11px] font-medium uppercase tracking-[0.2em]">Scroll Down</span>
        <span className="flex h-9 w-6 items-start justify-center rounded-full border-2 border-current p-1.5">
          <span className="h-2 w-1 animate-wheel rounded-full bg-current" />
        </span>
        <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
      </motion.button>

      {/* tech marquee */}
      <div className="mt-8 border-y border-border bg-card/60 py-3.5">
        <div className="marquee-mask overflow-hidden">
          <div className="flex w-max animate-marquee gap-3 pr-3">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="flex items-center gap-2 whitespace-nowrap rounded-full border border-border bg-background px-4 py-1.5 font-mono text-xs font-medium text-muted-foreground"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
