import Link from "next/link";
import { notFound } from "next/navigation";

import { menu, ui } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { faqSchema, restaurantSchema } from "@/lib/seo";

import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Story from "@/components/Story";
import Fire from "@/components/Fire";
import MenuList from "@/components/MenuList";
import Gallery from "@/components/Gallery";
import Press from "@/components/Press";
import Faq from "@/components/Faq";
import Visit from "@/components/Visit";
import JsonLd from "@/components/JsonLd";
import { Reveal, SplitWords } from "@/components/Reveal";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  return (
    <>
      <JsonLd data={restaurantSchema(locale)} />
      <JsonLd data={faqSchema(locale)} />

      <Hero locale={locale} />
      <Ticker locale={locale} />
      <Story locale={locale} />
      <Fire locale={locale} />

      {/* The home page shows a couple of items per section. The full card
          lives at /menu, which keeps the two pages from competing. */}
      <section id="menu" className="shell scroll-mt-24 py-[12vh]">
        <Reveal>
          <p className="eyebrow mb-6">{ui.menuTitle[locale]}</p>
        </Reveal>
        <SplitWords
          as="h2"
          text={
            locale === "ku"
              ? "لیستەکە هەفتانە دەگۆڕێت."
              : "The card is rewritten most weeks."
          }
          className="display-lg mb-16 max-w-3xl text-bone"
        />

        <MenuList sections={menu} locale={locale} limit={2} />

        <Reveal>
          <Link
            href={`/${locale}/menu`}
            className="mt-14 inline-flex items-center gap-3 rounded-full border border-bone/20 px-7 py-3 text-sm text-bone transition-colors hover:border-ember hover:text-ember"
          >
            {ui.viewMenu[locale]}
            <span aria-hidden className="rtl:rotate-180">
              →
            </span>
          </Link>
        </Reveal>
      </section>

      <Gallery locale={locale} />
      <Press locale={locale} />
      <Faq locale={locale} />
      <Visit locale={locale} />
    </>
  );
}
