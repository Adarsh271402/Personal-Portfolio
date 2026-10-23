"use client";

import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Briefcase, MapPin, User } from "lucide-react";
import Image from "next/image";
import profileImage from "../../../public/portfolio/profile.png";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { ABOUT_FACTS } from "@/lib/portfolio-data";

const factIcons = [User, GraduationCap, Briefcase, MapPin];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm">
            <div className="grid gap-10 p-7 sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
              {/* Left copy */}
              <div>
                <SectionHeading
                  number="01"
                  kicker="About Me"
                  title="Turning Ideas Into Real Solutions"
                />
                <Reveal delay={0.12}>
                  <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
                    I&apos;m a BCA graduate currently pursuing my MCA, and a
                    passionate Full Stack Developer with a strong focus on
                    .NET web technologies and modern UI/UX. I enjoy building
                    scalable applications, solving real-world problems and
                    continuously learning new technologies.
                  </p>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                    From designing RESTful APIs in ASP.NET Core to crafting
                    pixel-perfect React interfaces, I care about the whole
                    journey an idea takes — from a sketch on paper to a shipped,
                    production-ready product.
                  </p>
                </Reveal>

                <motion.ul
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
                  className="mt-7 grid gap-3 sm:grid-cols-2"
                >
                  {ABOUT_FACTS.map((fact, i) => {
                    const Icon = factIcons[i % factIcons.length];
                    return (
                      <motion.li
                        key={fact.label}
                        variants={{
                          hidden: { opacity: 0, x: -22 },
                          show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                        }}
                        whileHover={{ x: 5 }}
                        className="group flex items-center gap-3 rounded-xl border border-border bg-background/60 px-4 py-3 transition-colors hover:border-brand/40"
                      >
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand transition-transform duration-300 group-hover:scale-110">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span>
                          <span className="block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                            {fact.label}
                          </span>
                          <span className="block text-sm font-semibold text-foreground">
                            {fact.value}
                          </span>
                        </span>
                      </motion.li>
                    );
                  })}
                </motion.ul>

                <Reveal delay={0.2}>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() =>
                      document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="group mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md"
                  >
                    More About Me
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </motion.button>
                </Reveal>
              </div>

              {/* Right photo */}
              <Reveal direction="left" delay={0.15} className="relative">
                <div className="relative mx-auto max-w-[360px]">
                  {/* rotating dashed ring */}
                  <div
                    aria-hidden
                    className="absolute -left-7 -top-7 h-28 w-28 animate-spin-slower rounded-full border-2 border-dashed border-brand/35"
                  />
                  <motion.div
                    whileHover={{ rotate: 1.5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 200, damping: 18 }}
                    className="relative overflow-hidden rounded-t-[10rem] rounded-b-[2rem] border-[6px] border-brand/25 shadow-xl shadow-black/10"
                  >
                    <Image
                      src={profileImage}
                      alt="Portrait of Adarsh Gupta"
                      width={480}
                      height={640}
                      className="h-auto w-full object-cover"
                      priority={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                  </motion.div>

                  {/* caveat annotation */}
                  <motion.p
                    initial={{ opacity: 0, rotate: -14, scale: 0.7 }}
                    whileInView={{ opacity: 1, rotate: -8, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, type: "spring", bounce: 0.5 }}
                    className="absolute -bottom-4 -right-2 rounded-xl bg-card px-3 py-1 font-handwriting text-2xl leading-tight text-brand shadow-md sm:-right-6"
                  >
                    Dream · Code · Build
                  </motion.p>

                  {/* floating chip */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -left-4 bottom-16 flex items-center gap-2 rounded-2xl border border-border bg-card px-3.5 py-2 shadow-lg sm:-left-8"
                  >
                    <GraduationCap className="h-4 w-4 text-brand" />
                    <span className="text-xs font-semibold">MCA Pursuing</span>
                  </motion.div>
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
