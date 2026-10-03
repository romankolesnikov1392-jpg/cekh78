import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRightIcon } from "@phosphor-icons/react/ssr"

import { PageTransition } from "@/components/layout/page-transition"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { PageHero } from "@/components/sections/page-hero"
import { SectionHeader } from "@/components/sections/section-header"
import { BookingCta } from "@/components/service/booking-cta"
import { ServiceCard } from "@/components/service-card"
import { photos } from "@/content/photos"
import { getServices } from "@/content/services"
import { pageMetadata } from "@/lib/seo"
import { formatPrice, typo } from "@/lib/typo"

export const metadata: Metadata = pageMetadata({
  title: "Услуги и цены автосервиса в Санкт-Петербурге",
  description:
    "Кузовной ремонт и покраска, техническое обслуживание, ремонт ходовой, автоэлектрика, ремонт двигателя и КПП. Цены от 400 ₽, диагностика ходовой бесплатно при ремонте.",
  path: "/uslugi",
})

export default function ServicesPage() {
  const services = getServices()
  // по 2–3 самые частые работы из каждого направления
  const popular = services.flatMap((s) =>
    s.prices
      .filter((p) => typeof p.price === "number" && p.price > 0)
      .slice(0, s.slug === "kuzovnoy-remont" ? 3 : 2)
      .map((p) => ({ ...p, service: s }))
  )

  return (
    <PageTransition>
      <PageHero
        crumbs={[{ href: "/uslugi", label: "Услуги" }]}
        eyebrow="Пять направлений · один цех"
        title={["Услуги", "и цены"]}
        lead="От замены масла за 40 минут до восстановления кузова после ДТП. На каждой странице — состав работ, цены, оборудование и пример из практики."
        image={photos.workshopHall}
        size="md"
        objectPosition="50% 55%"
      />

      <section aria-label="Направления" className="py-16 md:py-24">
        <RevealGroup className="container-x grid gap-3 md:grid-cols-2 lg:grid-cols-6" stagger={0.06}>
          {services.map((s, i) => (
            <RevealItem key={s.slug} className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}>
              <ServiceCard service={s} variant={i < 2 ? "feature" : "default"} className={i < 2 ? "h-full lg:min-h-[560px]" : "h-full"} />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section aria-labelledby="popular-title" className="border-t border-line py-20 md:py-28">
        <div className="container-x flex flex-col gap-12">
          <SectionHeader
            id="popular-title"
            eyebrow="Популярные работы"
            title="Цены, с которыми чаще всего приходят"
            lead="Цены за работу для легкового автомобиля. Точную сумму называем после диагностики и фиксируем в заказ-наряде."
          />
          <Reveal>
            <ul className="grid border-t border-line md:grid-cols-2 md:gap-x-10">
              {popular.map((p) => (
                <li key={p.service.slug + p.name} className="border-b border-line">
                  <Link
                    href={`/uslugi/${p.service.slug}#ceny`}
                    className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-4 outline-hidden focus-visible:outline-2 focus-visible:outline-solid focus-visible:-outline-offset-2 focus-visible:outline-ring"
                  >
                    <span className="text-[0.9375rem] text-foreground transition-colors group-hover:text-white">{typo(p.name)}</span>
                    <span className="font-medium whitespace-nowrap tabular">
                      <span className="mr-1.5 text-sm font-normal text-subtle">от</span>
                      {formatPrice(p.price as number)}&nbsp;₽
                    </span>
                    <span className="tech-label flex items-center gap-1.5 text-subtle">
                      {p.service.shortTitle}
                      <ArrowRightIcon className="size-3 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <BookingCta />
    </PageTransition>
  )
}
