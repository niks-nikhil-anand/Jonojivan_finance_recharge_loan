import type { Operator, Provider } from "@/types";

export const operators: Operator[] = [
  { id: "jio", name: "Jio", badge: "bg-blue-600 text-white" },
  { id: "airtel", name: "Airtel", badge: "bg-red-600 text-white" },
  { id: "vi", name: "Vi", badge: "bg-rose-500 text-white" },
  { id: "bsnl", name: "BSNL", badge: "bg-sky-600 text-white" },
  { id: "mtnl", name: "MTNL", badge: "bg-orange-500 text-white" },
];

export const circles: Provider[] = [
  "Andhra Pradesh & Telangana",
  "Assam",
  "Bihar & Jharkhand",
  "Chennai",
  "Delhi NCR",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu & Kashmir",
  "Karnataka",
  "Kerala",
  "Kolkata",
  "Madhya Pradesh & Chhattisgarh",
  "Maharashtra & Goa",
  "Mumbai",
  "North East",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Uttar Pradesh (East)",
  "Uttar Pradesh (West)",
  "West Bengal",
].map((name) => ({ id: name.toLowerCase().replace(/[^a-z]+/g, "-"), name }));

export const dthProviders: Provider[] = [
  { id: "tata-play", name: "Tata Play" },
  { id: "airtel-dth", name: "Airtel Digital TV" },
  { id: "dish-tv", name: "Dish TV" },
  { id: "d2h", name: "d2h" },
  { id: "sun-direct", name: "Sun Direct" },
];

export function getOperator(id: string) {
  return operators.find((o) => o.id === id);
}
