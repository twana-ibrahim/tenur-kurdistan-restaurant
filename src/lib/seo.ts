/**
 * Structured data and URL helpers.
 *
 * The JSON-LD is generated from the same content the page renders, so the two
 * cannot drift. Every graph is emitted server side inside the HTML.
 */
import {
  SITE_URL,
  restaurant,
  hours,
  menu,
  faq,
  meta,
  tagline,
  setMenu,
} from "./content";
import { htmlLang, locales, type Locale } from "./i18n";

export function localeUrl(locale: Locale, path = ""): string {
  const clean = path.replace(/^\/+/, "");
  return `${SITE_URL}/${locale}${clean ? `/${clean}` : ""}`;
}

/** hreflang map for the metadata API, including x-default. */
export function alternates(path = "") {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[htmlLang[locale]] = localeUrl(locale, path);
  }
  languages["x-default"] = localeUrl("en", path);
  return languages;
}

function openingHoursSpecification() {
  return hours.flatMap((row) =>
    row.ranges.map((range) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: row.days.map((d) => `https://schema.org/${d}`),
      opens: range.opens,
      closes: range.closes,
    }))
  );
}

function menuGraph(locale: Locale) {
  return {
    "@type": "Menu",
    "@id": `${localeUrl(locale, "menu")}#menu`,
    name: meta.menu.title[locale],
    inLanguage: htmlLang[locale],
    hasMenuSection: menu.map((section) => ({
      "@type": "MenuSection",
      name: section.title[locale],
      ...(section.note ? { description: section.note[locale] } : {}),
      hasMenuItem: section.items.map((item) => ({
        "@type": "MenuItem",
        name: item.name[locale],
        description: item.description[locale],
        ...(item.image ? { image: `${SITE_URL}${item.image}` } : {}),
        offers: {
          "@type": "Offer",
          price: item.price,
          priceCurrency: restaurant.currency,
        },
        ...(item.tags?.length
          ? { suitableForDiet: item.tags.map((tag) => tag[locale]) }
          : {}),
      })),
    })),
  };
}

/** Restaurant + Menu + Website, emitted on the home page. */
export function restaurantSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Restaurant",
        "@id": `${SITE_URL}#restaurant`,
        name: restaurant.name,
        alternateName: restaurant.nameKu,
        description: meta.home.description[locale],
        slogan: tagline[locale],
        url: localeUrl(locale),
        telephone: restaurant.phone,
        email: restaurant.email,
        foundingDate: String(restaurant.founded),
        image: [
          `${SITE_URL}/img/hero.jpg`,
          `${SITE_URL}/img/tandoor.jpg`,
          `${SITE_URL}/img/dish-kebab.jpg`,
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: restaurant.address.street[locale],
          addressLocality: restaurant.address.locality[locale],
          addressRegion: restaurant.address.region[locale],
          postalCode: restaurant.address.postalCode,
          addressCountry: restaurant.address.countryCode,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: restaurant.geo.lat,
          longitude: restaurant.geo.lng,
        },
        servesCuisine: [...restaurant.cuisine],
        priceRange: restaurant.priceRange,
        currenciesAccepted: restaurant.currency,
        paymentAccepted: "Cash, Credit Card",
        acceptsReservations: "True",
        maximumAttendeeCapacity: restaurant.seats,
        openingHoursSpecification: openingHoursSpecification(),
        hasMenu: menuGraph(locale),
        makesOffer: {
          "@type": "Offer",
          name: setMenu.title[locale],
          description: setMenu.description[locale],
          price: setMenu.price,
          priceCurrency: restaurant.currency,
        },
        sameAs: restaurant.social.map((s) => s.href),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}#website`,
        url: SITE_URL,
        name: restaurant.name,
        inLanguage: locales.map((l) => htmlLang[l]),
        publisher: { "@id": `${SITE_URL}#restaurant` },
      },
    ],
  };
}

/** FAQPage, emitted on the home page where the questions are rendered. */
export function faqSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${localeUrl(locale)}#faq`,
    mainEntity: faq.map((entry) => ({
      "@type": "Question",
      name: entry.question[locale],
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer[locale],
      },
    })),
  };
}

/** Menu page graph, plus a breadcrumb back to the home page. */
export function menuPageSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      menuGraph(locale),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: restaurant.name,
            item: localeUrl(locale),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: meta.menu.title[locale],
            item: localeUrl(locale, "menu"),
          },
        ],
      },
    ],
  };
}
