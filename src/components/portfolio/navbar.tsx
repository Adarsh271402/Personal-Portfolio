"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Download, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { NAV_LINKS } from "@/lib/portfolio-data";

const noopSubscribe = () => () => {};

function useActiveSection() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.05, 0.25, 0.5] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const go = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return { active, go };
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // SSR-safe mounted check (false during hydration, true after)
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );

  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      whileTap={{ scale: 0.85, rotate: 24 }}
      whileHover={{ scale: 1.06 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="relative grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:text-brand"
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted && (
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="grid place-items-center"
          >
            {isDark ? (
              <Moon className="h-[18px] w-[18px]" />
            ) : (
              <Sun className="h-[18px] w-[18px]" />
            )}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export function Navbar() {
  const { active, go } = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
    >
      <nav
        className={`mx-auto flex h-16 max-w-6xl items-center justify-between rounded-2xl px-4 transition-all duration-500 sm:px-6 ${
          scrolled
            ? "glass-nav shadow-lg shadow-black/[0.06] ring-1 ring-border"
            : "bg-transparent ring-1 ring-transparent"
        }`}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <button
          onClick={() => go("home")}
          className="group flex items-center gap-2.5"
          aria-label="Go to home"
        >
          <motion.span
            whileHover={{ rotate: -8, scale: 1.06 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-md"
          >
            <span className="text-lg font-extrabold text-brand">A</span>
          </motion.span>
          <span className="text-base font-bold tracking-tight">
            Adarsh <span className="text-brand">Gupta</span>
          </span>
        </button>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <button
                  onClick={() => go(link.id)}
                  className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-brand-soft ring-1 ring-brand/25"
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Right cluster */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <motion.a
            href="/resume.pdf"
            download="Adarsh-Gupta-Resume.pdf"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="group hidden items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition-shadow hover:shadow-lg sm:inline-flex"
          >
            <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            Download Resume
          </motion.a>

          {/* Mobile hamburger */}
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-0 z-40 bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
              }}
              className="flex h-full flex-col items-center justify-center gap-2"
            >
              {NAV_LINKS.map((link) => (
                <motion.li
                  key={link.id}
                  variants={{
                    hidden: { opacity: 0, y: 26 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <button
                    onClick={() => {
                      setOpen(false);
                      setTimeout(() => go(link.id), 80);
                    }}
                    className={`px-6 py-3 text-2xl font-bold tracking-tight transition-colors ${
                      active === link.id ? "text-brand" : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  hidden: { opacity: 0, y: 26 },
                  show: { opacity: 1, y: 0 },
                }}
                className="mt-6"
              >
                <a
                  href="/resume.pdf"
                  download="Adarsh-Gupta-Resume.pdf"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
                >
                  <Download className="h-4 w-4" /> Download Resume
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
