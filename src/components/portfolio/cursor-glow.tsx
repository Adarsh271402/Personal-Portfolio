"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function subscribePointerFine(cb: () => void) {
  const mq = window.matchMedia("(pointer: fine)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/** Soft orange glow that trails the cursor — desktop pointers only. */
export function CursorGlow() {
  const finePointer = useSyncExternalStoreSafe();
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 120, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 120, damping: 22, mass: 0.6 });

  useEffect(() => {
    if (!finePointer) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [finePointer, x, y]);

  if (!finePointer) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[1] hidden md:block"
      style={{ x: sx, y: sy }}
    >
      <div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.55] dark:opacity-40"
        style={{
          width: 460,
          height: 460,
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--brand) 16%, transparent) 0%, transparent 62%)",
        }}
      />
    </motion.div>
  );
}

/** SSR-safe "is this a fine pointer device" without setState-in-effect. */
import { useSyncExternalStore } from "react";
function useSyncExternalStoreSafe() {
  return useSyncExternalStore(
    subscribePointerFine,
    () => window.matchMedia("(pointer: fine)").matches,
    () => false
  );
}
