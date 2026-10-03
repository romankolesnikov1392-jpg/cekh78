import { getServices } from "@/content/services"
import { site } from "@/lib/site"

/*
 * JSON-LD AutoRepair (LocalBusiness).
 * ДЕМО: все данные вымышленные и нужны только для демонстрации разметки.
 * На реальном сайте — заменить на данные клиента (адрес, телефон, координаты, часы).
 * Пока индексация выключена (robots), поисковики эти данные не используют.
 */
export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${site.url}/#business`,
    name: site.name,
    slogan: site.tagline,
    description: site.description,
    url: site.url,
    telephone: site.phones.main.href.replace("tel:", ""),
    image: `${site.url}/opengraph-image`,
    priceRange: "₽₽",
    foundingDate: String(site.founded),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressCountry: "RU",
    },
    openingHoursSpecification: site.openingHoursSpec.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Услуги автосервиса",
      itemListElement: getServices().map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, url: `${site.url}/uslugi/${s.slug}` },
      })),
    },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  )
}
