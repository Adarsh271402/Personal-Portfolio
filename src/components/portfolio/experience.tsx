"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { CalendarDays, ChevronRight } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { TIMELINE } from "@/lib/portfolio-data";

export function Experience() {
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 78%", "end 55%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const glowY = useTransform(scaleY, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative min-w-0 scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto w-full min-w-0 max-w-6xl">
        <Reveal>
          <div className="min-w-0 rounded-[2rem] border border-border bg-card px-4 py-7 shadow-sm sm:p-10">
            <SectionHeading
              number="03"
              kicker="Experience"
              title="My Journey"
              description="Milestones that shaped my path as a developer — from first lines of code to real-world projects."
            />

            <div ref={listRef} className="relative mt-8 min-w-0 pl-7 sm:mt-10 sm:pl-10">
              {/* rail */}
              <div className="absolute bottom-2 left-[9px] top-2 w-[2px] rounded-full bg-border" />
              {/* progress line */}
              <motion.div
                style={{ scaleY }}
                className="absolute bottom-2 left-[9px] top-2 w-[2px] origin-top rounded-full bg-gradient-to-b from-brand to-[#f2a65a]"
              />
              {/* travelling glow */}
              <motion.div
                style={{ top: glowY }}
                className="absolute left-[4px] h-3 w-3 -translate-y-1/2 rounded-full bg-brand blur-[5px]"
                aria-hidden
              />

              <ol className="space-y-9">
                {TIMELINE.map((item, i) => (
                  <motion.li
                    key={item.title}
                    initial={{ opacity: 0, x: -34, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-70px" }}
                    transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative min-w-0"
                  >
                    {/* node */}
                    <span
                      className={`absolute -left-7 top-1.5 grid h-5 w-5 place-items-center rounded-full border-[3px] sm:-left-10 ${
                        item.current
                          ? "animate-pulse-ring border-brand bg-brand-soft"
                          : "border-brand/60 bg-card"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          item.current ? "bg-brand" : "bg-brand/60"
                        }`}
                      />
                    </span>

                    <motion.div
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className="min-w-0 rounded-2xl border border-border bg-background/70 p-3.5 [overflow-wrap:anywhere] transition-colors group-hover:border-brand/40 sm:p-6"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="w-full min-w-0">
                          <span className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 font-mono text-[11px] font-semibold text-brand-strong dark:text-brand-strong">
                            <CalendarDays className="h-3 w-3 shrink-0" />
                            {item.period}
                          </span>
                          <div className="mt-3 flex min-w-0 flex-wrap items-center gap-2">
                            <h3 className="min-w-0 text-base font-bold leading-snug text-foreground sm:text-lg">{item.title}</h3>
                            {item.current && (
                              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                                Now
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 text-sm font-medium text-brand">{item.org}</p>
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {item.desc}
                      </p>
                      <div className="mt-3.5 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="min-w-0 max-w-full rounded-md border border-border bg-card px-2.5 py-1 font-mono text-[10.5px] font-medium text-muted-foreground transition-colors group-hover:border-brand/30 group-hover:text-brand"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </motion.li>
                ))}
              </ol>

              <Reveal delay={0.2} className="mt-8 pl-1">
                <button
                  onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand"
                >
                  See what I built
                  <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </button>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
