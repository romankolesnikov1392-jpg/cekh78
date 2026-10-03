import type { MetadataRoute } from "next"

import { getPosts } from "@/content/posts"
import { getServices } from "@/content/services"
import { site } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-10-03")
  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/uslugi", priority: 0.9 },
    { path: "/raboty", priority: 0.8 },
    { path: "/o-nas", priority: 0.6 },
    { path: "/blog", priority: 0.6 },
    { path: "/kontakty", priority: 0.8 },
  ]
  return [
    ...staticRoutes.map((r) => ({
      url: `${site.url}${r.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: r.priority,
    })),
    ...getServices().map((s) => ({
      url: `${site.url}/uslugi/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: s.slug === "kuzovnoy-remont" ? 0.9 : 0.8,
    })),
    ...getPosts().map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ]
}
