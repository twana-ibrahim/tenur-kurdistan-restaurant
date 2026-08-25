"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import { hours, restaurant, setMenu, ui } from "@/lib/content";
import { formatPrice, type Locale } from "@/lib/i18n";
import { Reveal, SplitWords } from "./Reveal";

type Status = "idle" | "sending" | "sent";

export default function Visit({ locale }: { locale: Locale }) {
  return (
    <section id="visit" className="shell scroll-mt-24 py-[12vh]">
      <Reveal>
        <p className="eyebrow mb-6">{ui.visitTitle[locale]}</p>
      </Reveal>

      <SplitWords
        as="h2"
        text={
          locale === "ku"
            ? "شەقامی ١٠٠ مەتری، هەولێر."
            : "The 100 Metre Road, Erbil."
        }
        className="display-lg mb-16 max-w-3xl text-bone"
      />

      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <h3 className="eyebrow mb-5">{ui.openingHours[locale]}</h3>
            <dl className="mb-12 space-y-4">
              {hours.map((row, i) => (
                <div key={i} className="flex items-baseline justify-between gap-6 border-b border-bone/10 pb-4">
                  <dt>
                    <span className="block text-bone">{row.label[locale]}</span>
                    <span className="text-xs text-bone-faint">{row.service[locale]}</span>
                  </dt>
                  <dd className="shrink-0 tabular-nums text-bone-dim">
                    {row.ranges.map((range, r) => (
                      <span key={r} className="block">
                        <time>{range.opens}</time> – <time>{range.closes}</time>
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.08}>
            <h3 className="eyebrow mb-5">{ui.findUs[locale]}</h3>
            <address className="mb-8 not-italic leading-relaxed text-bone-dim">
              {restaurant.address.street[locale]}
              <br />
              {restaurant.address.locality[locale]}, {restaurant.address.region[locale]}
              <br />
              {restaurant.address.country[locale]}
            </address>

            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${restaurant.phoneHref}`}
                className="rounded-full border border-bone/20 px-5 py-2.5 text-sm text-bone transition-colors hover:border-ember hover:text-ember"
              >
                {restaurant.phone}
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${restaurant.geo.lat},${restaurant.geo.lng}`}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-full border border-bone/20 px-5 py-2.5 text-sm text-bone transition-colors hover:border-ember hover:text-ember"
              >
                {locale === "ku" ? "نەخشە" : "Map"}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-12 rounded-sm border border-ember/25 bg-ember/[0.06] p-7">
              <h3 className="font-display text-2xl text-bone">{setMenu.title[locale]}</h3>
              <p className="mt-3 text-sm leading-relaxed text-bone-dim">
                {setMenu.description[locale]}
              </p>
              <p className="mt-5 font-display text-3xl text-ember tabular-nums">
                {formatPrice(setMenu.price, locale)}
                <span className="ms-2 text-xs text-bone-faint">
                  {ui.currency[locale]} · {ui.perPerson[locale]}
                </span>
              </p>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <ReservationForm locale={locale} />
        </div>
      </div>
    </section>
  );
}

/**
 * The booking form.
 *
 * There is no backend in this build, so submit resolves locally. The states
 * that a real one needs are all here: disabled while in flight, a guarded
 * double submit, native validation messages, and a success state that is
 * announced rather than only shown.
 */
function ReservationForm({ locale }: { locale: Locale }) {
  const [status, setStatus] = useState<Status>("idle");
  const ku = locale === "ku";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status !== "idle") return;

    setStatus("sending");
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("sent");
  }

  const field =
    "w-full rounded-sm border border-bone/15 bg-transparent px-4 py-3 text-bone transition-colors placeholder:text-bone-faint focus:border-ember focus:outline-none";
  const label = "mb-2 block text-xs tracking-wide text-bone-faint";

  return (
    <div id="reserve" className="scroll-mt-28 rounded-sm border border-bone/10 bg-ink-2 p-7 sm:p-10">
      <h3 className="display-md mb-2 text-bone">{ui.reserve[locale]}</h3>
      <p className="mb-8 text-sm text-bone-dim">
        {ku
          ? "فۆرمەکە پڕبکەرەوە و لە ماوەی چەند کاتژمێرێکدا پەیوەندیت پێوە دەکەین."
          : "Send this and we will confirm by phone within a few hours."}
      </p>

      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            role="status"
            aria-live="polite"
            className="rounded-sm border border-ember/30 bg-ember/10 p-8 text-center"
          >
            <p className="font-display text-2xl text-bone">
              {ku ? "داواکەت گەیشت." : "That reached us."}
            </p>
            <p className="mt-3 text-sm text-bone-dim">
              {ku
                ? "بەم زووانە پەیوەندیت پێوە دەکەین بۆ دڵنیاکردنەوەی مێزەکە."
                : "We will call you shortly to confirm the table."}
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-5 sm:grid-cols-2"
          >
            <div className="sm:col-span-2">
              <label className={label} htmlFor="name">
                {ku ? "ناو" : "Name"}
              </label>
              <input id="name" name="name" required className={field} autoComplete="name" />
            </div>

            <div>
              <label className={label} htmlFor="phone">
                {ku ? "ژمارەی تەلەفۆن" : "Phone"}
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className={field}
                autoComplete="tel"
                placeholder="+964 750 000 0000"
              />
            </div>

            <div>
              <label className={label} htmlFor="guests">
                {ku ? "ژمارەی کەسان" : "Guests"}
              </label>
              <select id="guests" name="guests" className={field} defaultValue="2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n} className="bg-ink">
                    {n}
                  </option>
                ))}
                <option value="9+" className="bg-ink">
                  9+
                </option>
              </select>
            </div>

            <div>
              <label className={label} htmlFor="date">
                {ku ? "بەروار" : "Date"}
              </label>
              <input id="date" name="date" type="date" required className={field} />
            </div>

            <div>
              <label className={label} htmlFor="time">
                {ku ? "کات" : "Time"}
              </label>
              <input
                id="time"
                name="time"
                type="time"
                required
                className={field}
                defaultValue="20:00"
              />
            </div>

            <div className="sm:col-span-2">
              <label className={label} htmlFor="notes">
                {ku ? "تێبینی (هەستیاری، ڕووەکخۆر، ڕۆژی لەدایکبوون)" : "Notes (allergies, vegetarian, a birthday)"}
              </label>
              <textarea id="notes" name="notes" rows={3} className={field} />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-full bg-ember px-8 py-3.5 font-medium text-ink transition-transform duration-150 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending"
                  ? ku
                    ? "دەنێردرێت…"
                    : "Sending…"
                  : ui.reserve[locale]}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
