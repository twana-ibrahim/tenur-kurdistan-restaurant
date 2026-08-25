"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

import { story, ui } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { Reveal, SplitWords } from "./Reveal";

export default function Story({ locale }: { locale: Locale }) {
  return (
    <section id="story" className="shell scroll-mt-24 py-[14vh]">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
        {/* Sticky image column. position:sticky works because Lenis moves the
            real scroll position rather than transforming a wrapper. */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <figure className="relative aspect-[4/5] overflow-hidden rounded-sm">
                <Image
                  src="/img/tandoor.jpg"
                  alt={
                    locale === "ku"
                      ? "نان لە ناو تەنوورێکی قوڕیندا دەبرژێت"
                      : "Bread baking against the inside wall of a clay tandoor"
                  }
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </figure>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow mb-6">{story.eyebrow[locale]}</p>
          </Reveal>

          <SplitWords
            as="h2"
            text={story.heading[locale]}
            className="display-lg mb-12 text-bone"
          />

          <div className="max-w-xl space-y-7">
            {story.paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-lg leading-relaxed text-bone-dim">{paragraph[locale]}</p>
              </Reveal>
            ))}
          </div>

          <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-bone/10 pt-10 sm:grid-cols-4">
            {story.stats.map((stat, i) => (
              <Reveal key={i} delay={i * 0.07} as="div">
                <dt className="sr-only">{stat.label[locale]}</dt>
                <dd>
                  <Counter value={stat.value} suffix={stat.suffix} />
                  <span className="mt-2 block text-xs leading-snug text-bone-faint">
                    {stat.label[locale]}
                  </span>
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/**
 * Counts up when it scrolls into view.
 *
 * The real value is server-rendered as the element's text, so the number is in
 * the HTML for a crawler whether or not the animation ever runs. The animation
 * writes to textContent directly instead of setState, so it does not re-render
 * on every frame.
 */
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView || reduced) return;

    // Years read as years, not as a count from zero.
    const from = value > 1900 ? value - 12 : 0;
    const controls = animate(from, value, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        node.textContent = `${Math.round(latest)}${suffix}`;
      },
    });

    return () => controls.stop();
  }, [inView, value, suffix, reduced]);

  return (
    <span className="font-display text-4xl text-bone tabular-nums sm:text-5xl">
      <span ref={ref}>
        {value}
        {suffix}
      </span>
    </span>
  );
}
