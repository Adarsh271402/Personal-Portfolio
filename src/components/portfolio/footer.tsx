"use client";

import { motion } from "framer-motion";
import { ArrowUp, Heart } from "lucide-react";
import { NAV_LINKS } from "@/lib/portfolio-data";

export function Footer() {
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="mt-auto border-t border-border bg-card/50">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-9 sm:px-6 md:flex-row md:justify-between">
        {/* brand */}
        <button onClick={() => go("home")} className="group flex items-center gap-2.5">
          <motion.span
            whileHover={{ rotate: -8, scale: 1.08 }}
            className="grid h-9 w-9 place-items-center rounded-xl bg-primary shadow-md"
          >
            <span className="text-lg font-extrabold text-brand">A</span>
          </motion.span>
          <span className="text-base font-bold tracking-tight">
            Adarsh <span className="text-brand">Gupta</span>
          </span>
        </button>

        <p className="flex items-center gap-1.5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Adarsh Gupta. All rights reserved. Made with
          <Heart className="h-3.5 w-3.5 animate-pulse fill-brand text-brand" />
          and lots of chai.
        </p>

        <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {NAV_LINKS.slice(1).map((link) => (
            <button
              key={link.id}
              onClick={() => go(link.id)}
              className="relative text-xs font-medium text-muted-foreground transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-brand after:transition-all after:duration-300 hover:text-foreground hover:after:w-full"
            >
              {link.label}
            </button>
          ))}
          <motion.button
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => go("home")}
            aria-label="Back to top"
            className="grid h-8 w-8 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand hover:text-brand"
          >
            <ArrowUp className="h-3.5 w-3.5" />
          </motion.button>
        </nav>
      </div>
    </footer>
  );
}
