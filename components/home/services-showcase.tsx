import { RevealGroup, RevealItem } from "@/components/motion/reveal"
import { SectionHeader } from "@/components/sections/section-header"
import { ServiceCard } from "@/components/service-card"
import { getServices } from "@/content/services"

/** «Что мы делаем»: 5 направлений, кузовной цех — крупной карточкой. */
export function ServicesShowcase() {
  const [feature, ...rest] = getServices()
  return (
    <section aria-labelledby="services-title" className="py-20 md:py-32">
      <div className="container-x flex flex-col gap-12 md:gap-16">
        <SectionHeader
          id="services-title"
          index="01"
          eyebrow="Что мы делаем"
          title="Пять направлений — одна ответственность за результат"
          lead="От планового ТО до восстановления кузова после ДТП. Каждое направление — свой пост, оборудование и мастер."
          action={{ href: "/uslugi", label: "Все услуги и цены" }}
        />
        <RevealGroup className="grid gap-3 md:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2" stagger={0.06}>
          <RevealItem className="md:col-span-2 lg:col-span-6 lg:row-span-2">
            <ServiceCard service={feature} variant="feature" className="h-full" />
          </RevealItem>
          {rest.map((s) => (
            <RevealItem key={s.slug} className="lg:col-span-3">
              <ServiceCard service={s} className="h-full" />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
