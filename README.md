# Tenûr — تەنوور

Marketing site for Tenûr, a tandoor restaurant in Erbil, Kurdistan Region.

English and Kurdish Sorani with full RTL support. Content is server-rendered and
statically prerendered per locale.

## Running it

```bash
npm install
npm run dev          # http://localhost:3000  (redirects to /en)
npm run build
npm start
npm run typecheck
```

Fonts are pulled through `next/font` at build time, so the first build needs
network access. After that they are self-hosted.

Copy `.env.example` to `.env.local` and fill it in. Without `NEXT_PUBLIC_SITE_URL`
every canonical URL, hreflang tag and sitemap entry points at the placeholder
domain.

## Stack

| | |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, TypeScript 7 |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens) |
| Motion | Motion 13 (`motion/react`) |
| Scroll | Lenis 1.3 |
| Images | `next/image` |

Routes: `/en`, `/ku`, `/en/menu`, `/ku/menu`, all statically prerendered, plus
`POST /api/reservations`. Icons, the web manifest and the per-locale social card
are generated from `src/app`.

## Layout

```
src/
  app/
    [locale]/          root layout (html lang/dir), home, menu
    sitemap.ts         both locales, with hreflang alternates
    robots.ts
    globals.css        design tokens, display type, RTL overrides
  components/          one client island per interaction
  lib/
    content.ts         all copy and data, bilingual
    i18n.ts            locales, direction, formatting
    seo.ts             JSON-LD builders and URL helpers
    reservation.ts     booking validation, shared by the route and the form
  proxy.ts             sends / to a locale from Accept-Language
```

`lib/content.ts` is the only place copy lives. Change a string there and the
page, the sitemap and the structured data all follow.

## Bilingual and RTL

Locales are `en` and `ku` (Sorani, `ckb` in BCP 47). `/` redirects based on
`Accept-Language`.

RTL is structural rather than a stylesheet toggle:

- Layout uses logical properties throughout (`ms-*`, `pe-*`, `start-*`,
  `text-start`), so the page mirrors from the `dir` attribute alone.
- Directional motion mirrors too. The marquee reverses via separate keyframes,
  and the pinned gallery derives the sign of its travel from the locale.
- Sorani has its own type ramp: larger at the same px size, more leading, and
  letter-spacing zeroed because tracking Arabic script breaks the joins.

### Fonts

Latin uses Instrument Serif for display and IBM Plex Sans for text. Sorani uses
Reem Kufi and IBM Plex Sans Arabic.

Any replacement Arabic-script face must carry the Sorani-specific letters
`ڕ ڵ ۆ ێ ە`. Several widely used Arabic Google fonts (Cairo, Almarai, Tajawal,
Rubik) do not, and will render Kurdish text broken.

## SEO

- Per-locale title, description, canonical, OpenGraph and Twitter cards.
- `hreflang` for `en`, `ckb` and `x-default` on every page and in the sitemap.
- JSON-LD generated from the rendered content: `Restaurant` (address, geo,
  `openingHoursSpecification`, `acceptsReservations`, price range), a full `Menu`
  graph down to `MenuItem` offers, `FAQPage`, `WebSite`, and a `BreadcrumbList`
  on the menu page.
- One `h1` per page, real `<address>` and `<time>`, native `<details>` for the
  FAQ so answers are in the DOM whether or not a panel is open.
- Text reveals split on words, not characters, so headings stay a single
  readable string for crawlers and screen readers.
- The LCP hero image is preloaded; fonts are left to CSS discovery so a
  locale only downloads the faces it actually paints.
- The home page shows two items per menu section; the full card lives at `/menu`,
  so the two pages do not compete for the same terms.

## Reservations

`POST /api/reservations` validates the booking, throttles by IP (five per ten
minutes, per instance) and then forwards it.

Where it forwards is a deployment decision rather than something baked in: set
`RESERVATION_WEBHOOK_URL` to any endpoint that accepts a JSON POST, such as a
form service, an inbox relay or a booking system. With nothing configured the
request is validated and logged, so the form works in development without
pretending a booking was stored.

Validation lives in `src/lib/reservation.ts` and returns error codes rather than
sentences, so the form renders them in whichever language the visitor is
reading. Bookings are accepted up to `MAX_DAYS_AHEAD` days out, which the FAQ
answer is written to match.

## Motion

One scale, defined in `globals.css` and reused: 150ms micro, 260ms enter, 420ms
large, with `cubic-bezier(0.22, 1, 0.36, 1)` for entrances.

Only `transform` and `opacity` are animated. Pointer position is written to
motion values rather than React state, so cursor movement never re-renders.

`prefers-reduced-motion` replaces motion rather than removing it: Lenis is
switched off, reveals cross-fade in place instead of travelling, the pinned
gallery becomes an ordinary swipeable row, and the ember particles and custom
cursor do not mount. Lenis is also disabled for coarse pointers.

## Measured

Lighthouse, all four routes, mobile profile:

| | perf | a11y | best practices | SEO |
| --- | --- | --- | --- | --- |
| `/en` | 91 | 100 | 100 | 100 |
| `/ku` | 87 | 100 | 100 | 100 |
| `/en/menu` | 94 | 100 | 100 | 100 |
| `/ku/menu` | 88 | 100 | 100 | 100 |

CLS is 0. The Kurdish routes sit a few points lower because the Arabic faces are
heavier than the Latin ones and the largest text on the page is set in them.

Layout is verified at 360, 390, 768 and 1024px in both text directions with no
horizontal overflow, and in WebKit, where `position: sticky` and `svh` both
behave.

## Outstanding

- Contact details, address and social links are placeholders.
- No automated tests; the typecheck and the build are the safety net.
