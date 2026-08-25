import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { alternates, localeUrl } from "@/lib/seo";

const ROUTES = [
  { path: "", priority: 1, changeFrequency: "monthly" as const },
  { path: "menu", priority: 0.8, changeFrequency: "weekly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return ROUTES.flatMap((route) =>
    locales.map((locale) => ({
      url: localeUrl(locale, route.path),
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: { languages: alternates(route.path) },
    }))
  );
}
