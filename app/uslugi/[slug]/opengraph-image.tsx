import { getService, getServices } from "@/content/services"
import { ogSize, renderOg } from "@/lib/og"

export const alt = "Услуга автосервиса Цех78 в Санкт-Петербурге"
export const size = ogSize
export const contentType = "image/png"

const photoBySlug: Record<string, string> = {
  "kuzovnoy-remont": "services/kuzov-hero.jpg",
  to: "services/to-hero.jpg",
  hodovaya: "services/hodovaya-hero.jpg",
  avtoelektrika: "services/elektrika-hero.jpg",
  remont: "services/remont-hero.jpg",
}

export function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const s = getService(slug)
  return renderOg({
    eyebrow: s ? `Услуга ${s.index} · ${s.priceFrom}` : "Услуги",
    title: s ? (s.shortTitle === "ТО" ? "Техническое обслуживание" : s.title) : "Услуги",
    photo: photoBySlug[slug] ?? "workshop/hall.jpg",
  })
}
