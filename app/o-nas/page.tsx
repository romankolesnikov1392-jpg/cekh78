import type { Metadata } from "next"
import Image from "next/image"

import { BrandIcon, brandNames } from "@/components/brand/brand-icons"
import { TrustFacts } from "@/components/home/trust-facts"
import { PageTransition } from "@/components/layout/page-transition"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { PageHero } from "@/components/sections/page-hero"
import { SectionHeader } from "@/components/sections/section-header"
import { BookingCta } from "@/components/service/booking-cta"
import { brands, equipmentShowcase, history, team } from "@/content/company"
import { photos, type PhotoKey } from "@/content/photos"
import { pageMetadata } from "@/lib/seo"
import { plural, typo } from "@/lib/typo"

export const metadata: Metadata = pageMetadata({
  title: "О нас и наш цех: оборудование и мастера",
  description:
    "История автосервиса Цех78 с 2016 года, оборудование цеха: подъёмники, покрасочная камера, стапель, стенд развал-схождения, сканеры. Команда мастеров и марки на обслуживании.",
  path: "/o-nas",
})

function Silhouette() {
  return (
    <svg viewBox="0 0 120 150" className="absolute inset-x-0 bottom-0 mx-auto h-[78%] text-line-strong" fill="currentColor" aria-hidden="true">
      <circle cx="60" cy="48" r="24" />
      <path d="M12 150c0-30 21-52 48-52s48 22 48 52Z" />
    </svg>
  )
}

export default function AboutPage() {
  return (
    <PageTransition>
      <PageHero
        crumbs={[{ href: "/o-nas", label: "О нас" }]}
        eyebrow="С 2016 года · ул. Руставели, 13"
        title={["О нас", "и наш цех"]}
        lead="Начинали с одного поста на две машины. Сейчас — шесть постов, свой кузовной цех с камерой и стапелем и одиннадцать мастеров, у каждого своя специализация."
        image={photos.workshopOsb}
        objectPosition="50% 60%"
      />

      <TrustFacts showBrands={false} />

      {/* История */}
      <section aria-labelledby="history-title" className="py-20 md:py-28">
        <div className="container-x flex flex-col gap-12">
          <SectionHeader
            id="history-title"
            index="01"
            eyebrow="История"
            title="Десять лет — от бокса в Парнасе до своего цеха"
            lead="Росли постепенно: каждый новый пост и каждый станок появлялся, когда без него уже нельзя было делать работу хорошо."
          />
          <RevealGroup as="ol" className="flex flex-col border-t border-line" stagger={0.06}>
            {history.map((h) => (
              <RevealItem as="li" key={h.year} className="grid gap-3 border-b border-line py-8 md:grid-cols-12 md:gap-10">
                <span className="font-display text-[3.5rem] leading-[0.85] font-bold text-subtle tabular md:col-span-3 md:text-[5rem]">
                  {h.year}
                </span>
                <div className="flex flex-col gap-2 md:col-span-6 md:pt-2">
                  <h3 className="text-[1.875rem] leading-none font-bold">{h.title}</h3>
                  <p className="text-[0.9375rem] text-muted-foreground md:text-base">{h.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Оборудование */}
      <section id="oborudovanie" aria-labelledby="equipment-title" className="border-t border-line py-20 md:py-28">
        <div className="container-x flex flex-col gap-12">
          <SectionHeader
            id="equipment-title"
            index="02"
            eyebrow="Оборудование"
            title="Что стоит в цеху и зачем"
            lead="Без маркетинговых названий: что это за станок и какую задачу он решает."
          />
          <RevealGroup className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {equipmentShowcase.map((e, i) => {
              const photo = photos[e.photo as PhotoKey]
              return (
                <RevealItem key={e.title}>
                  <figure className="group flex flex-col gap-4">
                    <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
                      <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" placeholder="blur" className="img-zoom object-cover" />
                      <span className="tech-label absolute top-3 left-3 bg-ink/80 px-2 py-1 text-foreground/85 tabular">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <figcaption className="flex flex-col gap-2">
                      <span className="tech-label text-brand">{e.spec}</span>
                      <span className="text-xl leading-tight font-medium text-foreground">{e.title}</span>
                      <span className="text-[0.9375rem] text-muted-foreground">{e.text}</span>
                    </figcaption>
                  </figure>
                </RevealItem>
              )
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Команда */}
      <section aria-labelledby="team-title" className="border-t border-line py-20 md:py-28">
        <div className="container-x flex flex-col gap-12">
          <SectionHeader
            id="team-title"
            index="03"
            eyebrow="Команда"
            title="Каждый отвечает за своё"
            lead="Кузовщик не меняет масло, моторист не красит бампер. Машину ведёт мастер-приёмщик — он же держит вас в курсе."
          />
          <RevealGroup as="ul" className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 lg:grid-cols-6" stagger={0.05}>
            {team.map((m) => (
              <RevealItem as="li" key={m.name}>
                <figure className="flex flex-col gap-4">
                  <div className="relative aspect-[4/5] overflow-hidden border border-line bg-surface bg-[linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] bg-[size:24px_24px]">
                    <Silhouette />
                    <span className="tech-label absolute top-3 left-3 text-subtle">{m.years}&nbsp;{plural(m.years, ["год", "года", "лет"])}</span>
                  </div>
                  <figcaption className="flex flex-col gap-1">
                    <span className="text-lg font-medium text-foreground">{m.name}</span>
                    <span className="tech-label text-brand">{m.role}</span>
                    <span className="mt-1 text-sm text-muted-foreground">{m.text}</span>
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </RevealGroup>
          <p className="text-sm text-subtle">{typo("Фотографии мастеров появятся после съёмки в цеху. Имена — демонстрационные.")}</p>
        </div>
      </section>

      {/* Марки */}
      <section aria-labelledby="brands-title" className="border-t border-line py-20 md:py-28">
        <div className="container-x flex flex-col gap-12">
          <SectionHeader
            id="brands-title"
            index="04"
            eyebrow="Марки"
            title="14 марок на обслуживании"
            lead="Для этих марок есть дилерские или полнофункциональные сканеры, схемы и проверенные поставщики запчастей."
          />
          <Reveal>
            <ul className="grid grid-cols-2 border-t border-l border-line sm:grid-cols-4 lg:grid-cols-7">
              {brands.map((b) => (
                <li key={b} className="group flex aspect-[4/3] flex-col items-center justify-center gap-3 border-r border-b border-line">
                  <BrandIcon brand={b} className="size-9 text-muted-foreground transition-colors duration-200 group-hover:text-foreground md:size-10" />
                  <span className="tech-label text-subtle">{brandNames[b]}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <p className="text-sm text-subtle">
            {typo("Не являемся официальным дилером перечисленных марок. Логотипы принадлежат их правообладателям и используются для обозначения марок, которые мы обслуживаем.")}
          </p>
        </div>
      </section>

      <BookingCta title="Приезжайте посмотреть цех" lead="Покажем посты, камеру и стапель, расскажем, как будем ремонтировать именно вашу машину. Запишитесь, чтобы мастер-приёмщик был на месте." />
    </PageTransition>
  )
}
