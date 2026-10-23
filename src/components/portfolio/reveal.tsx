"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 42 },
  down: { y: -42 },
  left: { x: 52 },
  right: { x: -52 },
  none: {},
};

export function Reveal({
  children,
  delay = 0,
  duration = 0.7,
  direction = "up",
  className,
  once = true,
  blur = true,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: Direction;
  className?: string;
  once?: boolean;
  blur?: boolean;
}) {
  const reduce = useReducedMotion();
  const { x = 0, y = 0 } = reduce ? { x: 0, y: 0 } : offsets[direction];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y, filter: blur ? "blur(6px)" : "none" }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Container that staggers its direct motion children */
export const staggerParent = {
  hidden: {},
  show: (stagger = 0.09) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.08 },
  }),
};

export const staggerChild = {
  hidden: { opacity: 0, y: 34, filter: "blur(5px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};
