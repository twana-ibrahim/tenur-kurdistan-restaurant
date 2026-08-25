import { ImageResponse } from "next/og";

import { restaurant } from "@/lib/content";
import { locales } from "@/lib/i18n";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${restaurant.name} — tandoor restaurant in Erbil, Kurdistan`;

/** Prerender the card per locale instead of rendering it on demand. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Social card.
 *
 * Drawn rather than photographic: ImageResponse only emits PNG, and a
 * photograph at this size lands around 1.4MB, which several messaging apps
 * refuse to fetch for a preview. Flat colour compresses to a few tens of KB.
 *
 * The card stays in Latin for both locales, because the font bundled with
 * ImageResponse has no Arabic coverage and a tofu-filled preview is worse than
 * an English one.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 76,
          background: "#0b0908",
          position: "relative",
        }}
      >
        {/* The mouth of the oven, glowing off the bottom-left corner. */}
        <div
          style={{
            position: "absolute",
            width: 900,
            height: 900,
            left: -260,
            bottom: -520,
            borderRadius: 450,
            background:
              "radial-gradient(circle, rgba(224,118,44,0.55) 0%, rgba(138,71,24,0.22) 45%, rgba(11,9,8,0) 70%)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 21,
            letterSpacing: 7,
            color: "#b6a897",
          }}
        >
          <div style={{ width: 46, height: 2, background: "#e0762c" }} />
          ERBIL · KURDISTAN
        </div>

        <div
          style={{
            position: "relative",
            marginTop: 20,
            fontSize: 150,
            letterSpacing: -5,
            color: "#f3ebde",
            lineHeight: 1,
          }}
        >
          {restaurant.wordmark}
        </div>

        <div style={{ position: "relative", marginTop: 24, fontSize: 35, color: "#b6a897" }}>
          Clay, fire, bread. In that order.
        </div>
      </div>
    ),
    size
  );
}
