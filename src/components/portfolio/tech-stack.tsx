"use client";

import { motion } from "framer-motion";
import { Check, Flame } from "lucide-react";
import { Reveal, staggerChild } from "./reveal";
import { SectionHeading } from "./section-heading";
import { ALSO_FAMILIAR, TECH_STACK, type TechItem } from "@/lib/portfolio-data";

function TechCard({ tech, index }: { tech: TechItem; index: number }) {
  return (
    <motion.div
      variants={staggerChild}
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 text-center shadow-sm"
    >
      {/* shine sweep on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-1/2 -translate-x-[160%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-brand/10 to-transparent transition-transform duration-700 group-hover:translate-x-[220%]"
      />

      <div className="relative mx-auto w-fit">
        <span
          className="grid h-14 w-14 place-items-center rounded-2xl text-sm font-extrabold shadow-md transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
          style={{ background: tech.tint, color: tech.fg }}
        >
          {tech.monogram}
        </span>
        <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 scale-0 place-items-center rounded-full bg-brand text-white transition-transform duration-300 group-hover:scale-100">
          <Flame className="h-3 w-3" />
        </span>
      </div>

      <h3 className="mt-3 text-sm font-bold text-foreground">{tech.name}</h3>
      <p className="mt-0.5 hidden text-[11px] leading-snug text-muted-foreground sm:block">
        {tech.desc}
      </p>

      {/* proficiency bar */}
      <div className="mx-auto mt-3 h-1.5 w-full max-w-[110px] overflow-hidden rounded-full bg-muted">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${tech.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.15 + index * 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-brand to-[#f2a65a]"
        />
      </div>
    </motion.div>
  );
}

export function TechStack() {
  return (
    <section id="skills" className="relative scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20">
      {/* decorative side blob */}
      <div
        aria-hidden
        className="absolute right-[-80px] top-24 -z-10 h-64 w-64 animate-blob rounded-full bg-brand-soft blur-2xl"
      />
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          number="02"
          kicker="Tech Stack"
          title="Technologies I Work With"
          description="Here are the technologies and tools I use to build modern web applications and bring ideas to life."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_300px]">
          {/* main grid */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-70px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5"
          >
            {TECH_STACK.map((tech, i) => (
              <TechCard key={tech.name} tech={tech} index={i} />
            ))}
          </motion.div>

          {/* also familiar */}
          <Reveal direction="left" delay={0.15}>
            <div className="h-full rounded-2xl border border-brand/20 bg-brand-softer p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                Also Familiar With
              </h3>
              <motion.ul
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
                className="mt-4 space-y-2.5"
              >
                {ALSO_FAMILIAR.map((item) => (
                  <motion.li
                    key={item}
                    variants={{
                      hidden: { opacity: 0, x: 24 },
                      show: { opacity: 1, x: 0, transition: { duration: 0.45 } },
                    }}
                    whileHover={{ x: 6 }}
                    className="flex items-center gap-2.5 text-sm font-medium text-foreground/85"
                  >
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand text-white">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
