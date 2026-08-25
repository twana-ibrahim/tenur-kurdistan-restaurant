"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useReducedMotion } from "motion/react";

import { navigation, restaurant, ui } from "@/lib/content";
import { locales, type Locale } from "@/lib/i18n";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Nav({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    // Give back the header the moment the user reverses.
    setHidden(y > previous && y > 240 && !open);
  });

  // A route change should never leave the overlay open behind the new page.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const other = locales.find((l) => l !== locale) ?? "en";
  const otherHref = pathname.replace(`/${locale}`, `/${other}`) || `/${other}`;

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: 0 }}
        animate={{ y: hidden ? "-110%" : 0 }}
        transition={{ duration: reduced ? 0 : 0.42, ease: EASE }}
      >
        <div
          className={`transition-colors duration-300 ${
            solid ? "bg-ink/80 backdrop-blur-md" : "bg-transparent"
          }`}
        >
          <div className="shell flex h-[4.5rem] items-center justify-between gap-6">
            <Link
              href={`/${locale}`}
              className="font-display text-2xl tracking-tight text-bone"
              aria-label={restaurant.name}
            >
              {locale === "ku" ? restaurant.nameKu : restaurant.wordmark}
            </Link>

            <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  className="group relative py-1 text-sm text-bone-dim transition-colors hover:text-bone"
                >
                  {item.label[locale]}
                  <span className="absolute inset-x-0 -bottom-0.5 h-px origin-start scale-x-0 bg-ember transition-transform duration-200 group-hover:scale-x-100" />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href={otherHref}
                hrefLang={other === "ku" ? "ckb" : "en"}
                className="rounded-full border border-bone/20 px-3 py-1.5 text-xs text-bone-dim transition-colors hover:border-bone/50 hover:text-bone"
              >
                {ui.langSwitch[locale]}
              </Link>

              <a
                href="#reserve"
                className="hidden rounded-full bg-ember px-5 py-2 text-sm font-medium text-ink transition-transform duration-150 hover:scale-[1.03] sm:block"
              >
                {ui.reserveShort[locale]}
              </a>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="flex h-10 w-10 items-center justify-center lg:hidden"
                aria-expanded={open}
                aria-controls="nav-overlay"
                aria-label={open ? ui.close[locale] : ui.menuLabel[locale]}
              >
                <span className="relative block h-3 w-6">
                  <motion.span
                    className="absolute inset-x-0 top-0 h-px bg-bone"
                    animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
                    transition={{ duration: 0.18 }}
                  />
                  <motion.span
                    className="absolute inset-x-0 bottom-0 h-px bg-bone"
                    animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
                    transition={{ duration: 0.18 }}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="nav-overlay"
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.26 }}
          >
            <nav className="shell flex flex-col gap-2" aria-label="Primary">
              {navigation.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: reduced ? 0 : 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease: EASE }}
                >
                  <Link
                    href={`/${locale}${item.href}`}
                    className="display-md block py-2 text-bone"
                    onClick={() => setOpen(false)}
                  >
                    {item.label[locale]}
                  </Link>
                </motion.div>
              ))}
              <motion.a
                href="#reserve"
                onClick={() => setOpen(false)}
                className="mt-8 w-fit rounded-full bg-ember px-7 py-3 font-medium text-ink"
                initial={{ opacity: 0, y: reduced ? 0 : 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4, ease: EASE }}
              >
                {ui.reserve[locale]}
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
