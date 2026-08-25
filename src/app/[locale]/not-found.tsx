"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";

const copy = {
  en: {
    code: "404",
    heading: "That page is not on the menu.",
    body: "The link may be old, or the page may have been folded into another one. The oven is still lit either way.",
    home: "Back to the start",
    menu: "See the menu",
  },
  ku: {
    code: "٤٠٤",
    heading: "ئەو لاپەڕەیە لە لیستەکەدا نییە.",
    body: "لەوانەیە بەستەرەکە کۆن بێت، یان لاپەڕەکە خرابێتە ناو لاپەڕەیەکی ترەوە. بە هەر حاڵ تەنوورەکە هێشتا هەڵکراوە.",
    home: "گەڕانەوە بۆ سەرەتا",
    menu: "لیستەکە ببینە",
  },
} satisfies Record<Locale, Record<string, string>>;

/**
 * not-found.tsx receives no route params, so the locale is read back off the
 * pathname. Falls back to English for anything unrecognised.
 */
export default function NotFound() {
  const pathname = usePathname();
  const segment = pathname.split("/")[1] ?? "";
  const locale: Locale = isLocale(segment) ? segment : defaultLocale;
  const t = copy[locale];

  return (
    <section className="shell flex min-h-[100svh] flex-col justify-center py-32">
      <p className="display-xl leading-none text-bone/15">{t.code}</p>

      <h1 className="display-lg mt-6 max-w-2xl text-bone">{t.heading}</h1>

      <p className="mt-6 max-w-md leading-relaxed text-bone-dim">{t.body}</p>

      <div className="mt-12 flex flex-wrap gap-4">
        <Link
          href={`/${locale}`}
          className="rounded-full bg-ember px-7 py-3 font-medium text-ink transition-transform duration-150 hover:scale-[1.02]"
        >
          {t.home}
        </Link>
        <Link
          href={`/${locale}/menu`}
          className="rounded-full border border-bone/20 px-7 py-3 text-bone transition-colors hover:border-ember hover:text-ember"
        >
          {t.menu}
        </Link>
      </div>
    </section>
  );
}
