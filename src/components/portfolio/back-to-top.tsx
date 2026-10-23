"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [show, setShow] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
  });
  const [dash, setDash] = useState(0);

  useEffect(() => {
    const unsub = progress.on("change", (v) => {
      setDash(1 - v);
    });
    return unsub;
  }, [progress]);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const R = 20;
  const C = 2 * Math.PI * R;

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 24, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.8 }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full bg-card text-foreground shadow-lg shadow-black/10 ring-1 ring-border transition-colors hover:text-brand"
        >
          <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r={R} fill="none" stroke="transparent" strokeWidth="3" />
            <circle
              cx="24"
              cy="24"
              r={R}
              fill="none"
              stroke="var(--brand)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={dash * C}
              opacity="0.9"
            />
          </svg>
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
