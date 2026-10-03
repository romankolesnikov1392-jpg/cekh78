import type { Metadata } from "next"

import { PageTransition } from "@/components/layout/page-transition"
import { DemoBadge } from "@/components/sections/section-header"
import { PageHero } from "@/components/sections/page-hero"
import { BookingCta } from "@/components/service/booking-cta"
import { WorksGallery } from "@/components/works/works-gallery"
import { getServices } from "@/content/services"
import { getWorks } from "@/content/works"
import { pageMetadata } from "@/lib/seo"
import { typo } from "@/lib/typo"

export const metadata: Metadata = pageMetadata({
  title: "Работы до и после: кузовной ремонт, ходовая, двигатель",
  description:
    "Примеры ремонта в автосервисе Цех78: фото до и после, модель автомобиля, проблема, решение и срок. Кузовной ремонт и покраска, ходовая, ТО, автоэлектрика, двигатель.",
  path: "/raboty",
})

export default function WorksPage() {
  const works = getWorks()
  const filters = [
    { value: "all" as const, label: "Все" },
    ...getServices().map((s) => ({ value: s.slug, label: s.shortTitle })),
  ]
  return (
    <PageTransition>
      <PageHero
        crumbs={[{ href: "/raboty", label: "Работы" }]}
        eyebrow={`${works.length} кейсов · до и после`}
        title={["Работы", "до и после"]}
        lead="Модель, проблема, что сделали и за сколько. Потяните разделитель на фото, чтобы сравнить состояние до ремонта и после."
        aside={
          <div className="flex flex-col gap-3 border-l-2 border-brand pl-4 sm:flex-row sm:items-center sm:gap-4">
            <DemoBadge className="w-fit" />
            <p className="max-w-2xl text-sm text-muted-foreground">
              {typo("Сейчас на слайдерах демонстрационные стоковые фото — «до» и «после» сняты на разных машинах. На рабочем сайте их заменят реальные снимки клиентов с одной точки съёмки.")}
            </p>
          </div>
        }
      />
      <section aria-label="Галерея работ" className="pb-20 md:pb-28">
        <div className="container-x">
          <WorksGallery works={works} filters={filters} />
        </div>
      </section>
      <BookingCta title="Хотите так же?" lead="Пришлите фото повреждения или запишитесь на осмотр — назовём стоимость и срок до начала работ." />
    </PageTransition>
  )
}
