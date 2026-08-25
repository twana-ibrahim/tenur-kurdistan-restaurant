import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { IBM_Plex_Sans, IBM_Plex_Sans_Arabic, Instrument_Serif, Reem_Kufi } from "next/font/google";

import "../globals.css";
import { SITE_URL, meta, restaurant, ui } from "@/lib/content";
import { alternates, localeUrl } from "@/lib/seo";
import { direction, htmlLang, isLocale, locales, type Locale } from "@/lib/i18n";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

/*
 * preload is off on every face on purpose.
 *
 * next/font preloads every font declared in this module regardless of which
 * one the rendered locale uses, so an English page was fetching ~70KB of
 * Arabic it never paints, competing with the largest text for bandwidth. With
 * preload off the browser downloads only the faces the stylesheet actually
 * asks for. display:swap plus the adjusted fallback metrics keep text visible
 * from the first paint and CLS at zero.
 */

/* Latin */
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-instrument",
  preload: false,
});

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex",
  preload: false,
});

/* Kurdish Sorani */
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-arabic",
  preload: false,
});

const reem = Reem_Kufi({
  subsets: ["arabic"],
  weight: ["400"],
  display: "swap",
  variable: "--font-reem",
  preload: false,
});

export const viewport: Viewport = {
  themeColor: "#0b0908",
  colorScheme: "dark",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: meta.home.title[locale],
      template: `%s — ${restaurant.name}`,
    },
    description: meta.home.description[locale],
    applicationName: restaurant.name,
    authors: [{ name: restaurant.legalName }],
    creator: restaurant.legalName,
    alternates: {
      canonical: localeUrl(locale),
      languages: alternates(),
    },
    openGraph: {
      type: "website",
      siteName: restaurant.name,
      title: meta.home.title[locale],
      description: meta.home.description[locale],
      url: localeUrl(locale),
      locale: htmlLang[locale],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.home.title[locale],
      description: meta.home.description[locale],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    formatDetection: { telephone: true, address: true },
  };
}

/**
 * Only hand the document the faces that locale actually renders. English never
 * paints Arabic script, and Sorani never paints the Latin serif, so shipping
 * both sets makes the font files compete with the largest text for bandwidth.
 */
function fontVariables(locale: Locale) {
  return locale === "ku"
    ? `${reem.variable} ${plexArabic.variable} ${plex.variable}`
    : `${instrument.variable} ${plex.variable}`;
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dir = direction[locale];

  return (
    <html
      lang={htmlLang[locale]}
      dir={dir}
      className={fontVariables(locale)}
      suppressHydrationWarning
    >
      <body className="grain bg-ink text-bone antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-[100] focus:rounded-full focus:bg-ember focus:px-5 focus:py-2 focus:text-sm focus:font-medium focus:text-ink"
        >
          {ui.skipToContent[locale]}
        </a>

        <SmoothScroll>
          <Cursor />
          <Nav locale={locale} />
          <main id="main">{children}</main>
          <Footer locale={locale} />
        </SmoothScroll>
      </body>
    </html>
  );
}
