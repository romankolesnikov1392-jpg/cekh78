import Image from "next/image"

import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { DemoBadge } from "@/components/sections/section-header"
import { photos } from "@/content/photos"
import { getWorks } from "@/content/works"
import { typo } from "@/lib/typo"

/** «Вы знаете, что происходит с автомобилем»: фотоотчёт до / процесс / результат. */
export function Transparency() {
  const fender = getWorks().find((w) => w.id === "octavia-fender")!
  const report = [
    { label: "До ремонта", time: "Пн, 10:24", photo: fender.before, note: "Дефектовка: вмятина на заднем крыле, трещины покрытия. Металл не растянут." },
    { label: "В процессе", time: "Вт, 16:05", photo: photos.sanding, note: "Подготовка: шпатлёвка тонким слоем, выведена «в ноль», грунт." },
    { label: "Результат", time: "Чт, 18:40", photo: fender.after, note: "Покраска с переходом на дверь, полировка. Готово к выдаче." },
  ]
  return (
    <section aria-labelledby="transparency-title" className="py-20 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="flex flex-col gap-6 lg:col-span-4 lg:pt-2">
          <p className="tech-label flex items-center gap-3 text-subtle">
            <span className="text-foreground tabular">05</span>
            <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
            <span>Прозрачность</span>
          </p>
          <h2 id="transparency-title" className="text-h2 font-bold">
            {typo("Вы знаете, что происходит с автомобилем")}
          </h2>
          <p className="text-lead text-muted-foreground">
            {typo("Отправляем фото ключевых этапов ремонта по запросу клиента.")}
          </p>
          <p className="text-[0.9375rem] text-subtle">
            {typo("В мессенджер, который вам удобен. Если при разборке нашли скрытое повреждение, пришлём фото вместе с вопросом, делать ли ремонт.")}
          </p>
        </Reveal>
        <div className="flex flex-col gap-4 lg:col-span-8">
          <RevealGroup as="ol" className="grid gap-3 sm:grid-cols-3" stagger={0.1}>
            {report.map((r, i) => (
              <RevealItem as="li" key={r.label}>
                <figure className="flex flex-col gap-3">
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface-2 sm:aspect-[4/5]">
                    <Image src={r.photo.src} alt={r.photo.alt} fill sizes="(min-width: 1024px) 22vw, (min-width: 640px) 33vw, 100vw" placeholder="blur" className="object-cover" />
                    <span className="tech-label absolute top-3 left-3 bg-ink/80 px-2 py-1 text-foreground">
                      0{i + 1} · {r.label}
                    </span>
                  </div>
                  <figcaption className="flex flex-col gap-1">
                    <span className="tech-label text-brand tabular">{r.time}</span>
                    <span className="text-sm text-muted-foreground">{typo(r.note)}</span>
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </RevealGroup>
          <DemoBadge className="w-fit">Пример отчёта на демо-фото</DemoBadge>
        </div>
      </div>
    </section>
  )
}
