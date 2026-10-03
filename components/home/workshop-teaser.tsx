import Image from "next/image"

import { RevealGroup, RevealItem } from "@/components/motion/reveal"
import { SectionHeader } from "@/components/sections/section-header"
import { photos } from "@/content/photos"

/** Тизер цеха: асимметричный коллаж из 3 фото с техническими подписями. */
export function WorkshopTeaser() {
  return (
    <section aria-labelledby="workshop-title" className="py-20 md:py-32">
      <div className="container-x flex flex-col gap-12 md:gap-16">
        <SectionHeader
          id="workshop-title"
          index="07"
          eyebrow="Наш цех"
          title="Шесть постов, своя покрасочная камера и стапель"
          lead="Кузов, механика и диагностика под одной крышей: машину не возят по подрядчикам, а ответственность не размывается."
          action={{ href: "/o-nas", label: "Подробнее о цехе и оборудовании" }}
        />
        <RevealGroup className="grid gap-3 lg:grid-cols-12" stagger={0.08}>
          <RevealItem className="lg:col-span-7">
            <figure className="group flex h-full flex-col gap-3">
              <div className="relative aspect-[4/3] overflow-hidden bg-surface-2 lg:aspect-auto lg:flex-1">
                <Image src={photos.workshopOsb.src} alt={photos.workshopOsb.alt} fill sizes="(min-width: 1024px) 58vw, 100vw" placeholder="blur" className="img-zoom object-cover" />
              </div>
              <figcaption className="tech-label text-subtle">Пост 02 · Слесарный участок и подъёмник</figcaption>
            </figure>
          </RevealItem>
          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {[
              { p: photos.paintBooth, c: "Пост 05 · Покрасочно-сушильная камера" },
              { p: photos.frameBench, c: "Кузовной участок · Стапель" },
            ].map(({ p, c }) => (
              <RevealItem key={c}>
                <figure className="group flex flex-col gap-3">
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
                    <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw" placeholder="blur" className="img-zoom object-cover" />
                  </div>
                  <figcaption className="tech-label text-subtle">{c}</figcaption>
                </figure>
              </RevealItem>
            ))}
          </div>
        </RevealGroup>
      </div>
    </section>
  )
}
