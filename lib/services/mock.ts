/**
 * Helpers for the mock service layer. Everything in lib/services is the
 * single boundary the UI talks to — swap these implementations for real
 * API calls without touching components.
 */

export function delay(ms = 700) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Small deterministic string hash so the same input always gives the same mock data. */
export function hash(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) >>> 0;
  }
  return h;
}

export function pick<T>(items: T[], seed: number) {
  return items[seed % items.length];
}

export function newTransactionId() {
  return `JJ${Math.floor(100000 + Math.random() * 900000)}`;
}

export function daysFromNow(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

const firstNames = ["Nikhil", "Priya", "Rahul", "Ananya", "Arjun", "Sneha", "Vikram", "Kavya", "Rohan", "Meera"];
const lastNames = ["Anand", "Sharma", "Iyer", "Reddy", "Das", "Patel", "Nair", "Gupta", "Singh", "Rao"];

export function mockName(seed: number) {
  return `${pick(firstNames, seed)} ${pick(lastNames, Math.floor(seed / 7))}`;
}
