"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

import { heroLead, restaurant, tagline, ui } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { SplitWords } from "./Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero({ locale }: { locale: Locale }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // The photograph drifts slower than the page, the copy leaves faster.
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "18%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.14]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "-38%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduced ? 1 : 0]);

  const wordmark = locale === "ku" ? restaurant.nameKu : restaurant.wordmark;

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[38rem] overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
        <Image
          src="/img/hero.jpg"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/70" />
        <div className="absolute inset-0 bg-ink/25" />
      </motion.div>

      <Embers />

      <motion.div
        className="shell relative flex h-full flex-col justify-end pb-[8vh]"
        style={{ y: copyY, opacity: copyOpacity }}
      >
        <motion.p
          className="eyebrow mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          {restaurant.address.locality[locale]} · {restaurant.founded}
        </motion.p>

        <h1 className="display-xl mb-8 text-bone">
          <span className="sr-only">
            {restaurant.name} — {tagline[locale]}
          </span>
          <span aria-hidden className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "108%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.05, ease: EASE, delay: 0.1 }}
            >
              {wordmark}
            </motion.span>
          </span>
        </h1>

        <div className="flex flex-col gap-8 border-t border-bone/15 pt-7 md:flex-row md:items-end md:justify-between">
          <SplitWords
            as="p"
            text={tagline[locale]}
            className="display-md max-w-2xl text-bone"
            delay={0.45}
          />
          <p className="max-w-sm text-sm leading-relaxed text-bone-dim">{heroLead[locale]}</p>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-6 end-6 z-10 flex items-center gap-3 text-bone-faint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span className="eyebrow">{ui.scroll[locale]}</span>
        <motion.span
          className="block h-8 w-px bg-bone-faint"
          animate={reduced ? {} : { scaleY: [0.3, 1, 0.3], originY: 0 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

/**
 * Sparks lifting off the grill. Pure CSS animation on transform and opacity,
 * twelve elements, no JavaScript per frame. Dropped under reduced motion.
 */
function Embers() {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          className="absolute bottom-0 block rounded-full bg-ember-bright"
          style={{
            insetInlineStart: `${6 + i * 8}%`,
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            ["--dx" as string]: `${(i % 2 === 0 ? 1 : -1) * (20 + i * 6)}px`,
            animation: `ember-drift ${11 + (i % 5) * 3}s linear ${i * 1.3}s infinite`,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}
