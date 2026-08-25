"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

/**
 * A dot that trails the pointer and swells over anything interactive.
 *
 * Position is written straight to motion values, never to React state, so the
 * pointer never triggers a re-render. Mounts only for fine pointers.
 */
export default function Cursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 700, damping: 45, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 700, damping: 45, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    setEnabled(fine.matches);

    const onChange = (e: MediaQueryListEvent) => setEnabled(e.matches);
    fine.addEventListener("change", onChange);
    return () => fine.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as Element | null;
      setActive(Boolean(el?.closest("a, button, [data-cursor]")));
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [enabled, x, y]);

  if (!enabled || reduced) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden mix-blend-difference md:block"
      style={{ x: springX, y: springY }}
    >
      <motion.span
        className="block rounded-full bg-bone"
        animate={{
          width: active ? 44 : 10,
          height: active ? 44 : 10,
          x: active ? -22 : -5,
          y: active ? -22 : -5,
          opacity: active ? 0.5 : 0.9,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 34 }}
      />
    </motion.div>
  );
}
