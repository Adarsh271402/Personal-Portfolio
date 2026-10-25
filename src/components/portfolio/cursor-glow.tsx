"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function subscribePointerFine(cb: () => void) {
  const mq = window.matchMedia("(pointer: fine)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/** Comet-like cursor for desktop pointers. */
export function CursorGlow() {
  const finePointer = useSyncExternalStoreSafe();
  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 120, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 120, damping: 22, mass: 0.6 });
  const tx = useSpring(x, { stiffness: 220, damping: 24 });
  const ty = useSpring(y, { stiffness: 220, damping: 24 });
  const ux = useSpring(x, { stiffness: 80, damping: 20 });
  const uy = useSpring(y, { stiffness: 80, damping: 20 });

  useEffect(() => {
    if (!finePointer) return;
    document.documentElement.classList.add("custom-cursor");
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      setInteractive(
        e.target instanceof Element &&
          Boolean(e.target.closest("a, button, [role='button']"))
      );
    };
    const hide = () => setVisible(false);
    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", hide);
    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", hide);
    };
  }, [finePointer, x, y]);

  if (!finePointer) return null;

  return (<>
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
    {!interactive && <>
      <motion.div aria-hidden data-custom-cursor="trail" className="pointer-events-none fixed left-0 top-0 z-[98] h-2 w-2 rounded-full bg-brand/25" style={{ x: ux, y: uy, marginLeft: -4, marginTop: -4, opacity: visible ? 1 : 0 }} />
      <motion.div aria-hidden data-custom-cursor="trail" className="pointer-events-none fixed left-0 top-0 z-[99] h-1.5 w-1.5 rounded-full bg-brand/50" style={{ x: sx, y: sy, marginLeft: -3, marginTop: -3, opacity: visible ? 1 : 0 }} />
      <motion.div aria-hidden data-custom-cursor="trail" className="pointer-events-none fixed left-0 top-0 z-[100] h-1 w-1 rounded-full bg-brand/75" style={{ x: tx, y: ty, marginLeft: -2, marginTop: -2, opacity: visible ? 1 : 0 }} />
    </>}
    <motion.div
      aria-hidden
      data-custom-cursor="dot"
      className="pointer-events-none fixed left-0 top-0 z-[101] flex items-center justify-center rounded-full bg-brand text-white shadow-[0_0_18px_var(--brand)]"
      style={{ x, y, opacity: visible ? 1 : 0 }}
      animate={{ width: interactive ? 44 : 12, height: interactive ? 44 : 12, marginLeft: interactive ? -22 : -6, marginTop: interactive ? -22 : -6 }}
      transition={{ type: "spring", stiffness: 380, damping: 25 }}
    >
      <motion.svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" animate={{ opacity: interactive ? 1 : 0, scale: interactive ? 1 : 0.4 }} transition={{ duration: 0.18 }}>
        <path d="M5 12h14m-6-6 6 6-6 6" />
      </motion.svg>
    </motion.div>
  </>);
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
