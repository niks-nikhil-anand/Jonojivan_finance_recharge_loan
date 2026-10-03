import type { MetadataRoute } from "next";
import { billCategorySlugs } from "@/lib/data/services";

const BASE = "https://jonojivan.in";

const staticRoutes = [
  "",
  "/loans",
  "/loans/personal-loan",
  "/loans/business-loan",
  "/loans/eligibility",
  "/loans/emi-calculator",
  "/loans/apply",
  "/recharge",
  "/recharge/mobile",
  "/recharge/dth",
  "/offers",
  "/support",
  "/faq",
  "/about",
  "/contact",
  "/login",
  "/register",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [...staticRoutes, ...billCategorySlugs.map((c) => `/recharge/${c}`)].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
