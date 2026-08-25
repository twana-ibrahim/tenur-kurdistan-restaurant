"use client";

import Image from "next/image";
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";

import type { MenuSection } from "@/lib/content";
import { formatPrice, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/content";
import { Reveal } from "./Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The menu, with a preview that follows the pointer.
 *
 * Pointer position is written to motion values so no React state changes while
 * the cursor moves; state only changes when the hovered row changes. The
 * preview is a pointer-only affordance, so on touch the rows simply do not
 * have one, and no content depends on it.
 */
export default function MenuList({
  sections,
  locale,
  limit,
  headingLevel = 3,
}: {
  sections: MenuSection[];
  locale: Locale;
  limit?: number;
  /**
   * Section titles render at this level and dish names one below it. The home
   * page nests this under its own h2, the menu page sits directly under the h1,
   * and hardcoding either one breaks heading order on the other.
   */
  headingLevel?: 2 | 3;
}) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);

  const SectionHeading = headingLevel === 2 ? "h2" : "h3";
  const ItemHeading = headingLevel === 2 ? "h3" : "h4";

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 28, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 220, damping: 28, mass: 0.5 });

  const handleMove = (event: React.PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    x.set(event.clientX);
    y.set(event.clientY);
  };

  return (
    <div onPointerMove={handleMove}>
      {sections.map((section) => {
        const items = limit ? section.items.slice(0, limit) : section.items;

        return (
          <section key={section.id} className="mb-20 last:mb-0">
            <Reveal>
              <header className="mb-8 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b border-bone/10 pb-4">
                <SectionHeading className="display-md text-bone">
                  {section.title[locale]}
                </SectionHeading>
                {section.note && (
                  <p className="max-w-sm text-sm text-bone-faint">{section.note[locale]}</p>
                )}
              </header>
            </Reveal>

            <ul>
              {items.map((item, i) => {
                const key = `${section.id}-${i}`;
                return (
                  <Reveal as="li" key={key} delay={i * 0.05}>
                    <div
                      data-cursor
                      className="group relative border-b border-bone/[0.07] py-7 transition-colors duration-200 hover:border-bone/25"
                      onPointerEnter={() => item.image && setActive(item.image)}
                      onPointerLeave={() => setActive(null)}
                    >
                      <div className="flex items-baseline justify-between gap-6">
                        <ItemHeading className="font-display text-2xl text-bone transition-transform duration-300 ease-out group-hover:translate-x-1 sm:text-3xl rtl:group-hover:-translate-x-1">
                          {item.name[locale]}
                        </ItemHeading>
                        <span className="shrink-0 font-display text-xl text-ember tabular-nums">
                          {formatPrice(item.price, locale)}
                          <span className="ms-1.5 text-xs text-bone-faint">
                            {ui.currency[locale]}
                          </span>
                        </span>
                      </div>

                      {item.roman && locale === "ku" && (
                        <p className="mt-1 text-xs tracking-wide text-bone-faint">{item.roman}</p>
                      )}

                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-bone-dim">
                        {item.description[locale]}
                      </p>

                      {item.tags && item.tags.length > 0 && (
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {item.tags.map((tag, t) => (
                            <li
                              key={t}
                              className="rounded-full border border-bone/15 px-3 py-1 text-[0.7rem] text-bone-faint"
                            >
                              {tag[locale]}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </Reveal>
                );
              })}
            </ul>
          </section>
        );
      })}

      {/* Preview layer. Mouse only, and never rendered under reduced motion. */}
      {!reduced && (
        <AnimatePresence>
          {active && (
            <motion.div
              key={active}
              aria-hidden
              className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block"
              style={{ x: springX, y: springY }}
              initial={{ opacity: 0, scale: 0.86 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.26, ease: EASE }}
            >
              <div className="relative -translate-x-1/2 -translate-y-[115%] overflow-hidden rounded-sm shadow-2xl shadow-black/60">
                <Image
                  src={active}
                  alt=""
                  width={260}
                  height={325}
                  className="h-[20rem] w-[16rem] object-cover"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
