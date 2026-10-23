"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Slim gradient progress bar pinned to the very top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-brand via-[#f2a65a] to-brand"
      style={{ scaleX }}
    />
  );
}
