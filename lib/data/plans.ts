import type { DthPlan, Plan, PlanCategory } from "@/types";

export const planCategories: { id: PlanCategory; label: string }[] = [
  { id: "popular", label: "Popular" },
  { id: "unlimited", label: "Unlimited" },
  { id: "data", label: "Data" },
  { id: "validity", label: "Validity" },
  { id: "talktime", label: "Talktime" },
  { id: "sms", label: "SMS" },
];

type Template = Omit<Plan, "id" | "operatorId">;

const baseTemplates: Template[] = [
  { price: 199, data: "1.5 GB/day", validity: "18 Days", calls: "Unlimited Calls", sms: "100 SMS/day", categories: ["unlimited"] },
  { price: 299, data: "1.5 GB/day", validity: "28 Days", calls: "Unlimited Calls", sms: "100 SMS/day", categories: ["popular", "unlimited"] },
  { price: 349, data: "2 GB/day", validity: "28 Days", calls: "Unlimited Calls", sms: "100 SMS/day", categories: ["popular", "unlimited"] },
  { price: 399, data: "2.5 GB/day", validity: "28 Days", calls: "Unlimited Calls", sms: "100 SMS/day", categories: ["popular", "unlimited"], extras: ["Unlimited 5G data"] },
  { price: 579, data: "1.5 GB/day", validity: "56 Days", calls: "Unlimited Calls", sms: "100 SMS/day", categories: ["unlimited", "validity"] },
  { price: 859, data: "2 GB/day", validity: "84 Days", calls: "Unlimited Calls", sms: "100 SMS/day", categories: ["popular", "unlimited", "validity"] },
  { price: 1899, data: "24 GB total", validity: "336 Days", calls: "Unlimited Calls", sms: "3600 SMS", categories: ["validity"] },
  { price: 3599, data: "2.5 GB/day", validity: "365 Days", calls: "Unlimited Calls", sms: "100 SMS/day", categories: ["validity", "unlimited"], extras: ["Unlimited 5G data"] },
  { price: 19, data: "1 GB", validity: "1 Day", calls: "—", sms: "—", categories: ["data"] },
  { price: 49, data: "3 GB", validity: "Existing plan", calls: "—", sms: "—", categories: ["data"] },
  { price: 98, data: "10 GB", validity: "Existing plan", calls: "—", sms: "—", categories: ["data"] },
  { price: 181, data: "30 GB", validity: "30 Days", calls: "—", sms: "—", categories: ["data"] },
  { price: 10, data: "—", validity: "Unlimited", calls: "₹7.47 talktime", sms: "—", categories: ["talktime"] },
  { price: 100, data: "—", validity: "Unlimited", calls: "₹81.75 talktime", sms: "—", categories: ["talktime"] },
  { price: 500, data: "—", validity: "Unlimited", calls: "₹423.73 talktime", sms: "—", categories: ["talktime"] },
  { price: 22, data: "—", validity: "28 Days", calls: "—", sms: "300 SMS", categories: ["sms"] },
  { price: 45, data: "—", validity: "28 Days", calls: "—", sms: "1000 SMS", categories: ["sms"] },
];

/** Per-operator price tweaks so each operator's catalogue looks distinct. */
const priceOffset: Record<string, number> = { jio: 0, airtel: 10, vi: 0, bsnl: -50, mtnl: -60 };

export function buildPlans(operatorId: string): Plan[] {
  const offset = priceOffset[operatorId] ?? 0;
  return baseTemplates.map((t, i) => {
    const adjusted = t.price >= 199 ? Math.max(99, t.price + offset) : t.price;
    return { ...t, price: adjusted, id: `${operatorId}-${i}`, operatorId };
  });
}

export const dthPlans: DthPlan[] = [
  { id: "dth-hindi-smart", name: "Hindi Smart Pack", price: 299, validity: "1 Month", channels: "180+ channels" },
  { id: "dth-family-hd", name: "Family HD Pack", price: 449, validity: "1 Month", channels: "220+ channels, 40 HD" },
  { id: "dth-sports", name: "Sports Mega Pack", price: 549, validity: "1 Month", channels: "240+ channels incl. sports" },
  { id: "dth-annual", name: "Annual Value Pack", price: 4999, validity: "12 Months", channels: "220+ channels, 40 HD" },
];
