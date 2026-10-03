import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/transactions"] },
    sitemap: "https://jonojivan.in/sitemap.xml",
  };
}
