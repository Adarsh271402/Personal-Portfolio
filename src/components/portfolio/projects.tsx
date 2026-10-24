"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { GITHUB_URL, PROJECTS } from "@/lib/portfolio-data";

export function Projects() {
  return (
    <section id="projects" className="relative scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20">
      <div
        aria-hidden
        className="absolute left-[-90px] bottom-40 -z-10 h-72 w-72 animate-blob rounded-full bg-brand-soft blur-2xl"
      />
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              number="04"
              kicker="Projects"
              title="Featured Projects"
              description="Some of the projects I've worked on. Each project helped me improve my skills and solve real-world problems."
            />
            <motion.a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group hidden items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold shadow-sm transition-colors hover:border-brand/50 hover:text-brand sm:inline-flex"
            >
              View All Projects
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </motion.a>
          </div>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14 } } }}
          className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {PROJECTS.map((project) => (
            <motion.article
              key={project.title}
              variants={{
                hidden: { opacity: 0, y: 46, filter: "blur(6px)" },
                show: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow duration-500 hover:shadow-2xl hover:shadow-brand/15"
            >
              {/* image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <motion.div
                  className="h-full w-full"
                  whileHover={{ scale: 1.07 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    width={896}
                    height={560}
                    className="h-full w-full object-cover object-top"
                  />
                </motion.div>
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${project.accent} via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-40`}
                />
                {/* floating "open" chip */}
                <span className="absolute right-3.5 top-3.5 grid h-9 w-9 translate-y-2 place-items-center rounded-full bg-white/95 text-[#1d2634] opacity-0 shadow-md transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>

              {/* body */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-brand/25 bg-brand-soft px-2 py-0.5 font-mono text-[10.5px] font-semibold text-brand-strong dark:text-brand-strong"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="mt-3.5 text-lg font-bold text-foreground transition-colors group-hover:text-brand">
                  {project.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {project.desc}
                </p>
                <a
                  href={"href" in project ? project.href : GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-brand"
                >
                  <span className="relative">
                    View Project
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                  </span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
