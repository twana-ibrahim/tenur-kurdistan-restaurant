/**
 * Reservation request shape and validation.
 *
 * Lives outside the route handler so the same rules can be unit tested without
 * standing up a server. Errors are returned as codes rather than sentences, so
 * the client renders them in whichever locale the visitor is reading.
 */

export type ReservationInput = {
  name: string;
  phone: string;
  guests: string;
  date: string;
  time: string;
  notes?: string;
};

export type FieldErrors = Partial<Record<keyof ReservationInput, string>>;

/** How far ahead bookings are accepted, matching the answer in the FAQ. */
export const MAX_DAYS_AHEAD = 14;

const PHONE = /^[+()\d][\d\s()-]{6,19}$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/**
 * Validates and normalises one submission.
 *
 * `today` is injected so the date rules are testable and do not depend on the
 * clock of whatever machine runs the suite.
 */
export function validateReservation(
  raw: unknown,
  today: Date = new Date()
): { ok: true; value: ReservationInput } | { ok: false; errors: FieldErrors } {
  const errors: FieldErrors = {};
  const body = (typeof raw === "object" && raw !== null ? raw : {}) as Record<string, unknown>;

  const str = (key: string) => (typeof body[key] === "string" ? (body[key] as string).trim() : "");

  const name = str("name");
  if (name.length < 2) errors.name = "name_too_short";
  else if (name.length > 80) errors.name = "name_too_long";

  const phone = str("phone");
  if (!phone) errors.phone = "phone_required";
  else if (!PHONE.test(phone)) errors.phone = "phone_invalid";

  const guests = str("guests");
  if (!guests) errors.guests = "guests_required";
  else if (guests !== "9+" && !(Number(guests) >= 1 && Number(guests) <= 8)) {
    errors.guests = "guests_invalid";
  }

  const date = str("date");
  if (!DATE.test(date)) {
    errors.date = "date_invalid";
  } else {
    const parsed = new Date(`${date}T00:00:00`);
    if (Number.isNaN(parsed.getTime())) {
      errors.date = "date_invalid";
    } else {
      const floor = startOfDay(today);
      const ceiling = new Date(floor);
      ceiling.setDate(ceiling.getDate() + MAX_DAYS_AHEAD);
      if (parsed < floor) errors.date = "date_past";
      else if (parsed > ceiling) errors.date = "date_too_far";
    }
  }

  const time = str("time");
  if (!TIME.test(time)) errors.time = "time_invalid";

  const notes = str("notes");
  if (notes.length > 500) errors.notes = "notes_too_long";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    value: { name, phone, guests, date, time, ...(notes ? { notes } : {}) },
  };
}
