import { CheckIcon } from "@phosphor-icons/react/ssr"

import { EstimateForm } from "@/components/booking/estimate-form"
import { Reveal } from "@/components/motion/reveal"
import { typo } from "@/lib/typo"

const points = [
  "Ответим в течение часа в рабочее время",
  "Назовём ориентир по цене и сроку — без обязательств",
  "Фото помогают точнее оценить кузовной ремонт",
]

/** «Нужно понять примерную стоимость?» — 3 шага, без обещания точной цены. */
export function EstimateSection() {
  return (
    <section id="ocenka" aria-labelledby="estimate-title" className="border-t border-line bg-surface py-20 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="flex flex-col gap-6 lg:col-span-5">
          <p className="tech-label flex items-center gap-3 text-subtle">
            <span className="text-foreground tabular">06</span>
            <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
            <span>Быстрая оценка</span>
          </p>
          <h2 id="estimate-title" className="text-h2 font-bold">
            {typo("Нужно понять примерную стоимость?")}
          </h2>
          <p className="text-lead text-muted-foreground">
            {typo("Опишите задачу и приложите фото — мастер назовёт ориентир. Точную стоимость фиксируем после осмотра: обещать цену заочно было бы нечестно.")}
          </p>
          <ul className="mt-2 flex flex-col gap-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[0.9375rem] text-foreground/90">
                <CheckIcon className="mt-0.5 size-4 shrink-0 text-brand" weight="bold" aria-hidden="true" />
                {typo(p)}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-7">
          <div className="border border-line bg-background p-5 sm:p-8 md:p-10">
            <EstimateForm />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
