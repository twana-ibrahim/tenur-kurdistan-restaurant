import Link from "next/link";

import { restaurant, ui } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

export default function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-bone/10 pt-16 pb-10">
      <div className="shell">
        <div className="mb-16 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <p className="display-xl leading-none text-bone/90">
            {locale === "ku" ? restaurant.nameKu : restaurant.wordmark}
          </p>

          <div className="flex flex-col gap-3 md:items-end">
            <a
              href={`tel:${restaurant.phoneHref}`}
              className="text-bone-dim transition-colors hover:text-ember"
            >
              {restaurant.phone}
            </a>
            <a
              href={`mailto:${restaurant.email}`}
              className="text-bone-dim transition-colors hover:text-ember"
            >
              {restaurant.email}
            </a>
            <ul className="mt-2 flex gap-5">
              {restaurant.social.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-xs tracking-wide text-bone-faint transition-colors hover:text-bone"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t border-bone/10 pt-8 text-xs text-bone-faint md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <p>
              © {new Date().getFullYear()} {restaurant.legalName}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link href={`/${locale}/menu`} className="transition-colors hover:text-bone">
              {ui.viewMenu[locale]}
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
