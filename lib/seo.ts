import type { Metadata } from "next"

import { site } from "@/lib/site"

/** Уникальные title/description/Open Graph для каждой страницы. */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle,
  type = "website",
}: {
  title: string
  description: string
  path: string
  /** не добавлять « | Цех78» */
  absoluteTitle?: boolean
  type?: "website" | "article"
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "ru_RU",
      siteName: site.name,
      title: fullTitle,
      description,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  }
}
