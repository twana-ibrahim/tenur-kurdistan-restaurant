import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n";

const PUBLIC_FILE = /\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|txt|xml|webmanifest)$/;

/**
  * Every page lives under /<locale>. This sends the bare root to a locale,
 * preferring what the browser asks for over the default.
 */
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

/** Reads Accept-Language and falls back to English. */
function preferredLocale(request: NextRequest) {
  const header = request.headers.get("accept-language") ?? "";
  // ckb is Sorani; ku covers the broader Kurdish tag some browsers send.
  if (/\b(ckb|ku)\b/i.test(header)) return "ku";
  return defaultLocale;
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
