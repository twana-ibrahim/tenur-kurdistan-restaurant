"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

import { gallery, ui } from "@/lib/content";
import { direction, type Locale } from "@/lib/i18n";
import { Reveal } from "./Reveal";

/**
 * Vertical scroll drives a horizontal track across a pinned viewport.
 *
 * The distance is measured rather than guessed at, so the last frame lands
 * flush at every viewport width. Direction is mirrored for RTL.
 *
 * Reduced motion gets a plain swipeable row instead: same photographs, same
 * order, no hijacked scroll.
 */
export default function Gallery({ locale }: { locale: Locale }) {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  const rtl = direction[locale] === "rtl";

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, rtl ? distance : -distance]);

  if (reduced) {
    return (
      <section className="py-[10vh]">
        <Header locale={locale} />
        <div className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-[clamp(1.25rem,5vw,4.5rem)] pb-4">
          {gallery.map((item) => (
            <Figure key={item.src} item={item} locale={locale} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative"
      // Taller section = more scroll to spend on the horizontal travel.
      style={{ height: `${Math.max(200, distance / 6 + 160)}vh` }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <Header locale={locale} />
        <motion.div
          ref={trackRef}
          className="flex w-max items-center gap-5 px-[clamp(1.25rem,5vw,4.5rem)]"
          style={{ x }}
        >
          {gallery.map((item) => (
            <Figure key={item.src} item={item} locale={locale} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Header({ locale }: { locale: Locale }) {
  return (
    <div className="shell mb-10">
      <Reveal>
        <p className="eyebrow">{ui.galleryTitle[locale]}</p>
      </Reveal>
    </div>
  );
}

function Figure({
  item,
  locale,
}: {
  item: (typeof gallery)[number];
  locale: Locale;
}) {
  return (
    <figure className="group w-[78vw] shrink-0 snap-center sm:w-[46vw] lg:w-[30vw]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
        <Image
          src={item.src}
          alt={item.alt[locale]}
          fill
          sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 30vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <figcaption className="mt-4 flex items-center gap-3 text-xs text-bone-faint">
        <span className="h-px w-6 bg-ember" />
        {item.caption[locale]}
      </figcaption>
    </figure>
  );
}
