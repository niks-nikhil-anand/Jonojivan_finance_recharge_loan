const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const inrNumber = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});

const timeFormat = new Intl.DateTimeFormat("en-IN", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: "Asia/Kolkata",
});

/** ₹2,00,000 */
export function formatINR(amount: number) {
  return inr.format(Math.round(amount));
}

/** 2,00,000 (no currency symbol) */
export function formatNumber(amount: number) {
  return inrNumber.format(Math.round(amount));
}

/** 02 Oct 2026 — month always 3 letters (some ICU versions emit "Sept"). */
export function formatDate(iso: string) {
  return dateFormat
    .formatToParts(new Date(iso))
    .map((p) => (p.type === "month" ? p.value.slice(0, 3) : p.value))
    .join("");
}

/** 4:30 pm */
export function formatTime(iso: string) {
  return timeFormat.format(new Date(iso));
}

/** ••••4321 */
export function maskTail(value: string, visible = 4) {
  return `••••${value.slice(-visible)}`;
}

/** 98765 43210 */
export function formatMobile(digits: string) {
  const d = digits.replace(/\D/g, "").slice(0, 10);
  return d.length > 5 ? `${d.slice(0, 5)} ${d.slice(5)}` : d;
}

/** Keeps only digits, optionally capped to a max length. */
export function onlyDigits(value: string, max?: number) {
  const d = value.replace(/\D/g, "");
  return max ? d.slice(0, max) : d;
}
