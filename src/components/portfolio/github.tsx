"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { BookOpen, ExternalLink, Users } from "lucide-react";
import Image from "next/image";
import profileImage from "../../../public/portfolio/profile.png";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { AnimatedCounter } from "./animated-counter";
import { GITHUB_STATS, GITHUB_URL, TOP_REPOS } from "@/lib/portfolio-data";

/** deterministic pseudo-random intensity (no hydration mismatches) */
function intensity(row: number, col: number) {
  const h = Math.sin(row * 12.9898 + col * 78.233) * 43758.5453;
  const v = h - Math.floor(h);
  if (v < 0.18) return 0;
  if (v < 0.42) return 1;
  if (v < 0.68) return 2;
  if (v < 0.88) return 3;
  return 4;
}

function ContributionGraph() {
  const weeks = 26;
  const days = 7;
  const grid = useMemo(
    () =>
      Array.from({ length: weeks }, (_, c) =>
        Array.from({ length: days }, (_, r) => intensity(r, c))
      ),
    []
  );

  return (
    <div className="mt-5 overflow-x-auto pb-1">
      <div className="flex w-max gap-[3px]">
        {grid.map((week, c) => (
          <div key={c} className="flex flex-col gap-[3px]">
            {week.map((level, r) => (
              <motion.span
                key={r}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.3,
                  delay: 0.35 + (c * days + r) * 0.004,
                  ease: "easeOut",
                }}
                title={`${level * 3} contributions`}
                className={`gh-cell-${level} h-[10px] w-[10px] rounded-[3px] sm:h-[11px] sm:w-[11px]`}
              />
            ))}
          </div>
        ))}
      </div>
      {/* legend */}
      <div className="mt-2.5 flex items-center justify-end gap-1.5 text-[10px] text-muted-foreground">
        Less
        {["#dcefe2", "#9be9a8", "#40c463", "#30a14e", "#216e39"].map((c) => (
          <span key={c} className="h-[9px] w-[9px] rounded-[2px]" style={{ background: c }} />
        ))}
        More
      </div>
    </div>
  );
}

export function GitHubSection() {
  return (
    <section id="github" className="relative scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          number="05"
          kicker="GitHub"
          title="My GitHub Activity"
          description="Explore my repositories, contributions and open-source journey."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          {/* profile + graph */}
          <Reveal direction="up">
            <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-7">
              <div className="flex flex-wrap items-center gap-4">
                <motion.div
                  whileHover={{ rotate: 6, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 260, damping: 14 }}
                  className="relative"
                >
                  <span className="absolute -inset-1 rounded-full bg-gradient-to-tr from-brand to-[#f2c14e] opacity-80 blur-[3px]" aria-hidden />
                  <Image
                    src={profileImage}
                    alt={`${GITHUB_STATS.username} avatar`}
                    width={56}
                    height={56}
                    className="relative h-14 w-14 rounded-full border-2 border-card object-cover object-top"
                  />
                </motion.div>
                <div className="flex-1">
                  <h3 className="flex items-center gap-2 text-base font-bold">
                    {GITHUB_STATS.username}
                    <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-strong dark:text-brand-strong">
                      Cool
                    </span>
                  </h3>
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-0.5 inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-brand"
                  >
                    github.com/{GITHUB_STATS.username}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <motion.dl
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
                className="mt-5 grid grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-background/60 py-4"
              >
                {[
                  { value: GITHUB_STATS.repos, label: "Repositories" },
                  { value: GITHUB_STATS.followers, label: "Followers" },
                  { value: GITHUB_STATS.following, label: "Following" },
                ].map((s) => (
                  <motion.div
                    key={s.label}
                    variants={{
                      hidden: { opacity: 0, y: 18 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                    }}
                    className="text-center"
                  >
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="text-xl font-extrabold text-foreground sm:text-2xl">
                      <AnimatedCounter value={s.value} />
                    </dd>
                    <dd className="mt-0.5 text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground">
                      {s.label}
                    </dd>
                  </motion.div>
                ))}
              </motion.dl>

              <p className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <BookOpen className="h-3.5 w-3.5 text-brand" />
                Contribution Graph
              </p>
              <ContributionGraph />
            </div>
          </Reveal>

          {/* top repositories */}
          <div className="min-w-0">
            <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-7">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                Top Repositories
              </h3>
              <ul className="mt-4 space-y-2.5">
                {TOP_REPOS.map((repo) => (
                  <li key={repo.name}>
                    <motion.a
                      href={"href" in repo ? repo.href : `${GITHUB_URL}/${repo.name}`}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ x: 6 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="group flex items-center gap-3 rounded-xl border border-border bg-background/60 px-4 py-3 transition-colors hover:border-brand/40"
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                        <BookOpen className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1 break-words font-mono text-[13px] font-semibold text-foreground [overflow-wrap:anywhere] transition-colors group-hover:text-brand">
                        {repo.name}
                      </span>
                      <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    </motion.a>
                  </li>
                ))}
              </ul>

              <motion.a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group mt-5 flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-md"
              >
                <Users className="h-4 w-4" />
                View My GitHub
                <ExternalLink className="h-3.5 w-3.5 opacity-70 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
