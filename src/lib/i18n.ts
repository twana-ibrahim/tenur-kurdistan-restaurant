export const locales = ["en", "ku"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Kurdish Sorani is written right to left. */
export const direction: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  ku: "rtl",
};

/** BCP 47 tags, used for the html lang attribute and hreflang. */
export const htmlLang: Record<Locale, string> = {
  en: "en",
  ku: "ckb",
};

export const localeNames: Record<Locale, { self: string; other: string }> = {
  en: { self: "English", other: "کوردی" },
  ku: { self: "کوردی", other: "English" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** A bilingual string. Every piece of copy on the site has this shape. */
export type T = Record<Locale, string>;

export function t(value: T, locale: Locale): string {
  return value[locale];
}

/**
 * Numerals. Sorani commonly uses Arabic-Indic digits, but prices and phone
 * numbers in Kurdistan are widely printed in Latin digits, so this is a
 * deliberate choice rather than a font default: Latin digits everywhere, with
 * locale-correct grouping.
 */
export function formatPrice(amount: number, locale: Locale): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(amount);
}
