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

Set the canonical origin before deploying, or canonical URLs and the sitemap
will point at the placeholder domain:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Stack

| | |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, TypeScript 7 |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens) |
| Motion | Motion 13 (`motion/react`) |
| Scroll | Lenis 1.3 |
| Images | `next/image` |

Routes: `/en`, `/ku`, `/en/menu`, `/ku/menu`, all statically prerendered.

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
- Fonts and the LCP hero image are preloaded.
- The home page shows two items per menu section; the full card lives at `/menu`,
  so the two pages do not compete for the same terms.

## Motion

One scale, defined in `globals.css` and reused: 150ms micro, 260ms enter, 420ms
large, with `cubic-bezier(0.22, 1, 0.36, 1)` for entrances.

Only `transform` and `opacity` are animated. Pointer position is written to
motion values rather than React state, so cursor movement never re-renders.

`prefers-reduced-motion` replaces motion rather than removing it: Lenis is
switched off, reveals cross-fade in place instead of travelling, the pinned
gallery becomes an ordinary swipeable row, and the ember particles and custom
cursor do not mount. Lenis is also disabled for coarse pointers.

## Outstanding

- The reservation form has no backend. Submit resolves locally; the states a
  real one needs (in-flight, disabled, guarded double submit, announced success)
  are already wired.
- No test suite. The typecheck and the build are the current safety net.
- Contact details, address and social links are placeholders.
