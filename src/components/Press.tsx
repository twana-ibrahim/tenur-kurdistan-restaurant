"use client";

import Image from "next/image";
import { chef, press, ui } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { Reveal, SplitWords } from "./Reveal";

export default function Press({ locale }: { locale: Locale }) {
  return (
    <section className="shell py-[12vh]">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-6">
          <Reveal>
            <figure className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <Image
                src={chef.image}
                alt={
                  locale === "ku"
                    ? "چێشتلێنەران لە چێشتخانەی خواردنگەکەدا کار دەکەن"
                    : "Cooks working in the restaurant kitchen"
                }
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover"
              />
            </figure>
          </Reveal>
        </div>

        <div className="flex flex-col justify-center lg:col-span-6">
          <SplitWords
            as="blockquote"
            text={`“${chef.quote[locale]}”`}
            className="display-md mb-8 text-bone"
          />

          <Reveal delay={0.1}>
            <p className="mb-2 text-bone">{chef.name[locale]}</p>
            <p className="mb-10 text-xs tracking-wide text-bone-faint">{chef.role[locale]}</p>
            <p className="max-w-md text-sm leading-relaxed text-bone-dim">{chef.bio[locale]}</p>
          </Reveal>
        </div>
      </div>

      <div className="mt-24">
        <Reveal>
          <p className="eyebrow mb-10">{ui.pressTitle[locale]}</p>
        </Reveal>

        <ul className="grid gap-10 md:grid-cols-3">
          {press.map((item, i) => (
            <Reveal as="li" key={i} delay={i * 0.08}>
              <figure className="border-t border-bone/15 pt-6">
                <blockquote className="font-display text-xl leading-snug text-bone">
                  “{item.quote[locale]}”
                </blockquote>
                <figcaption className="mt-5 text-xs tracking-wide text-bone-faint">
                  {item.source} · {item.year}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
