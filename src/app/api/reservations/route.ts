import { NextResponse, type NextRequest } from "next/server";

import { validateReservation } from "@/lib/reservation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Booking endpoint.
 *
 * Where a reservation actually goes is a deployment decision, so the transport
 * is configured rather than hardcoded: set RESERVATION_WEBHOOK_URL to forward
 * to a form service, inbox relay or booking system. With nothing configured the
 * request is validated and logged, which keeps the form usable in development
 * without pretending a booking was stored.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

/**
 * Per-instance throttle. Enough to blunt casual form spam; a deployment running
 * multiple instances wants a shared store instead.
 */
const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

function clientKey(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: NextRequest) {
  if (rateLimited(clientKey(request))) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const result = validateReservation(payload);
  if (!result.ok) {
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 422 });
  }

  const reservation = {
    ...result.value,
    receivedAt: new Date().toISOString(),
  };

  const webhook = process.env.RESERVATION_WEBHOOK_URL;
  if (webhook) {
    try {
      const forwarded = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservation),
        signal: AbortSignal.timeout(8000),
      });
      if (!forwarded.ok) {
        console.error("reservation webhook rejected", forwarded.status);
        return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
      }
    } catch (error) {
      console.error("reservation webhook failed", error);
      return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
    }
  } else {
    console.info("reservation received (no RESERVATION_WEBHOOK_URL set)", reservation);
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
