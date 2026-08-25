import { faq, ui } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

/**
 * Built on native details/summary.
 *
 * No JavaScript, keyboard accessible for free, and the answers are real text
 * in the DOM whether or not a panel is open, which is what the FAQPage
 * structured data on this page is claiming.
 */
export default function Faq({ locale }: { locale: Locale }) {
  return (
    <section className="shell py-[10vh]">
      <p className="eyebrow mb-10">{ui.questions[locale]}</p>

      <div className="border-t border-bone/10">
        {faq.map((entry, i) => (
          <details key={i} className="group border-b border-bone/10">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg text-bone transition-colors hover:text-ember [&::-webkit-details-marker]:hidden">
              {entry.question[locale]}
              <span
                aria-hidden
                className="relative h-3 w-3 shrink-0 text-ember transition-transform duration-200 group-open:rotate-45"
              >
                <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
                <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current" />
              </span>
            </summary>
            <p className="max-w-2xl pb-7 text-sm leading-relaxed text-bone-dim">
              {entry.answer[locale]}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
