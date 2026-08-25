import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { menu, meta, restaurant, setMenu, ui } from "@/lib/content";
import { formatPrice, isLocale, type Locale } from "@/lib/i18n";
import { alternates, localeUrl, menuPageSchema } from "@/lib/seo";

import MenuList from "@/components/MenuList";
import JsonLd from "@/components/JsonLd";
import { Reveal, SplitWords } from "@/components/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw;

  return {
    title: meta.menu.title[locale],
    description: meta.menu.description[locale],
    alternates: {
      canonical: localeUrl(locale, "menu"),
      languages: alternates("menu"),
    },
    openGraph: {
      title: meta.menu.title[locale],
      description: meta.menu.description[locale],
      url: localeUrl(locale, "menu"),
      images: [{ url: "/img/dish-kebab.jpg", width: 1000, height: 1250 }],
    },
  };
}

export default async function MenuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  return (
    <>
      <JsonLd data={menuPageSchema(locale)} />

      <div className="shell pt-40 pb-[12vh]">
        <Reveal>
          <p className="eyebrow mb-6">
            {restaurant.name} · {restaurant.address.locality[locale]}
          </p>
        </Reveal>

        <SplitWords
          as="h1"
          text={
            locale === "ku" ? "هەموو ئەوەی لێی دەنێین." : "Everything we cook."
          }
          className="display-lg mb-8 max-w-3xl text-bone"
        />

        <Reveal>
          <p className="mb-20 max-w-xl text-lg leading-relaxed text-bone-dim">
            {locale === "ku"
              ? "نرخەکان بە دیناری عێراقین. لیستەکە بەپێی ئەوەی بازاڕ هەیەتی دەگۆڕێت، بۆیە لەوانەیە هەندێک شت لەم لاپەڕەیە جیاواز بێت لەوەی ئەمشەو لەسەر مێزەکەیە."
              : "Prices are in Iraqi dinar. The card moves with the bazaar, so one or two things here may differ from what is on the table tonight."}
          </p>
        </Reveal>

        <MenuList sections={menu} locale={locale} />

        <Reveal>
          <div className="mt-20 rounded-sm border border-ember/25 bg-ember/[0.06] p-8 sm:p-10">
            <h2 className="display-md text-bone">{setMenu.title[locale]}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-bone-dim">
              {setMenu.description[locale]}
            </p>
            <p className="mt-6 font-display text-4xl text-ember tabular-nums">
              {formatPrice(setMenu.price, locale)}
              <span className="ms-2 text-xs text-bone-faint">
                {ui.currency[locale]} · {ui.perPerson[locale]}
              </span>
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-16 flex flex-wrap gap-4">
            <Link
              href={`/${locale}#reserve`}
              className="rounded-full bg-ember px-7 py-3 font-medium text-ink transition-transform duration-150 hover:scale-[1.02]"
            >
              {ui.reserve[locale]}
            </Link>
            <Link
              href={`/${locale}`}
              className="rounded-full border border-bone/20 px-7 py-3 text-bone transition-colors hover:border-ember hover:text-ember"
            >
              {ui.backHome[locale]}
            </Link>
          </div>
        </Reveal>
      </div>
    </>
  );
}
