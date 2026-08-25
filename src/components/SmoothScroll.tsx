"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";

/**
 * Lenis drives the scroll for the whole document.
 *
 * It is switched off entirely for reduced motion and for coarse pointers:
 * hijacking scroll on a phone fights the platform and feels worse than native,
 * and mid-range Android is the device that suffers most.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        wheelMultiplier: 1,
        syncTouch: false,
        // Touch devices keep native scrolling.
        smoothWheel: true,
        autoRaf: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
