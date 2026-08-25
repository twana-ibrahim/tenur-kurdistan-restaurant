import { ticker } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

/**
 * Infinite marquee. The list is rendered twice and the track is translated by
 * exactly half, which is what makes the loop seamless. The duplicate is hidden
 * from assistive tech so the phrases are not announced twice.
 *
 * Direction flips in RTL via the keyframes in globals.css.
 */
export default function Ticker({ locale }: { locale: Locale }) {
  const items = ticker.map((item) => item[locale]);

  return (
    <div className="relative overflow-hidden border-y border-bone/10 py-5">
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-10" aria-hidden={copy === 1}>
            {items.map((item, i) => (
              <span key={`${copy}-${i}`} className="flex items-center gap-10">
                <span className="text-sm tracking-[0.18em] text-bone-dim uppercase">
                  {item}
                </span>
                <span className="h-1 w-1 shrink-0 rounded-full bg-ember" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
