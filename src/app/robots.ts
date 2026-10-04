import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Preview deployments on Vercel are never indexed; production is. */
export default function robots(): MetadataRoute.Robots {
  const isPreview = process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production";
  if (isPreview) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
