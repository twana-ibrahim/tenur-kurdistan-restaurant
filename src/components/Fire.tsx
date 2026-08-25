"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

import { steps, ui } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { Reveal, SplitWords } from "./Reveal";

/**
 * The four steps. Each panel is full height and its image scales back slightly
 * as the panel leaves, which gives depth without pinning anything.
 */
export default function Fire({ locale }: { locale: Locale }) {
  return (
    <section id="fire" className="scroll-mt-24 py-[12vh]">
      <div className="shell mb-16">
        <Reveal>
          <p className="eyebrow mb-6">{ui.fireTitle[locale]}</p>
        </Reveal>
        <SplitWords
          as="h2"
          text={
            locale === "ku"
              ? "چوار شت ڕۆژانە دووبارە دەبنەوە."
              : "Four things repeat, every single day."
          }
          className="display-lg max-w-3xl text-bone"
        />
      </div>

      <div className="shell grid gap-6 md:grid-cols-2">
        {steps.map((step, i) => (
          <Step key={step.index} step={step} locale={locale} index={i} />
        ))}
      </div>
    </section>
  );
}

function Step({
  step,
  locale,
  index,
}: {
  step: (typeof steps)[number];
  locale: Locale;
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-6%", reduced ? "-6%" : "6%"]);

  return (
    <Reveal as="figure" delay={index * 0.06} className="group relative">
      <article ref={ref} className="relative overflow-hidden rounded-sm">
        <div className="relative aspect-[16/11] overflow-hidden">
          <motion.div className="absolute inset-[-8%]" style={{ y }}>
            <Image
              src={step.image}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              aria-hidden
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
          <span className="eyebrow mb-3 block text-ember">{step.index}</span>
          <h3 className="display-md mb-3 text-bone">{step.title[locale]}</h3>
          <p className="max-w-md text-sm leading-relaxed text-bone-dim">{step.body[locale]}</p>
        </div>
      </article>
    </Reveal>
  );
}
