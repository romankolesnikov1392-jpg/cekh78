import type { MetadataRoute } from "next"

import { site } from "@/lib/site"

/**
 * robots.txt. Демо-проект: бренд и адрес вымышленные, поэтому по умолчанию индексация закрыта,
 * чтобы несуществующий автосервис не попадал в поиск по реальной улице.
 * Для реального клиента — выставить SITE_INDEXING=true в переменных окружения.
 */
export default function robots(): MetadataRoute.Robots {
  if (!site.indexing) {
    return { rules: { userAgent: "*", disallow: "/" } }
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  }
}
