import { DrawLine } from "@/components/motion/draw-line"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { SectionHeader } from "@/components/sections/section-header"
import { repairSteps } from "@/content/company"
import { typo } from "@/lib/typo"

/**
 * «Как проходит ремонт» — светлая «бетонная» секция для ритма страницы.
 * Десктоп: горизонтальная последовательность с прорисовкой линии. Телефон: вертикальная timeline.
 */
export function RepairProcess() {
  return (
    <section aria-labelledby="process-title" className="bg-concrete py-20 text-concrete-ink md:py-32">
      <div className="container-x flex flex-col gap-14 md:gap-20">
        <SectionHeader
          id="process-title"
          index="04"
          tone="light"
          eyebrow="Как проходит ремонт"
          title="Пять шагов. Ни одного сюрприза в счёте"
          lead="Вы знаете, что происходит с машиной, сколько это стоит и когда её можно забрать — до того, как мы возьмём ключ."
        />

        {/* Десктоп: горизонтальная схема */}
        <div className="relative hidden lg:block">
          {/* линия проходит через центры маркеров: высота цифр 3.6rem + отступ 1.5rem + половина маркера */}
          <DrawLine className="absolute top-[calc(5.1rem_+_6px)] right-0 left-0 h-px bg-concrete-ink/25" />
          <RevealGroup as="ol" className="relative grid grid-cols-5 gap-8" stagger={0.1}>
            {repairSteps.map((s, i) => (
              <RevealItem as="li" key={s.title} className="flex flex-col">
                <span className="block h-[3.6rem] font-display text-[4.5rem] leading-[0.8] font-bold tabular">0{i + 1}</span>
                <span aria-hidden="true" className="relative mt-6 block size-3 bg-concrete ring-1 ring-concrete-ink/40">
                  <span className={i === 2 ? "absolute inset-0.5 bg-brand" : "absolute inset-0.5 bg-concrete-ink"} />
                </span>
                <div className="mt-6 flex flex-col gap-2 pr-4">
                  <h3 className="text-[1.75rem] leading-[1] font-bold">{s.title}</h3>
                  <p className="text-[0.9375rem] text-concrete-muted">{s.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* Телефон и планшет: вертикальная timeline */}
        <div className="relative lg:hidden">
          <DrawLine orientation="vertical" className="absolute top-2 bottom-2 left-[0.3rem] w-px bg-concrete-ink/25" />
          <RevealGroup as="ol" className="relative flex flex-col gap-10" stagger={0.08}>
            {repairSteps.map((s, i) => (
              <RevealItem as="li" key={s.title} className="grid grid-cols-[0.75rem_1fr] gap-5">
                <span aria-hidden="true" className="relative mt-2 block size-3 bg-concrete ring-1 ring-concrete-ink/40">
                  <span className={i === 2 ? "absolute inset-0.5 bg-brand" : "absolute inset-0.5 bg-concrete-ink"} />
                </span>
                <div className="flex flex-col gap-2">
                  <span className="font-display text-5xl leading-[0.85] font-bold tabular">0{i + 1}</span>
                  <h3 className="text-[1.625rem] leading-[1] font-bold">{s.title}</h3>
                  <p className="text-[0.9375rem] text-concrete-muted">{s.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal className="grid gap-6 border-t border-concrete-ink/20 pt-10 lg:grid-cols-12">
          <p className="tech-label text-concrete-muted lg:col-span-3">Главное правило цеха</p>
          <p className="font-display text-[clamp(2rem,1.2rem+3vw,3.75rem)] leading-[0.95] font-bold lg:col-span-9">
            <span className="mr-3 inline-block size-[0.42em] -translate-y-[0.12em] bg-brand align-middle" aria-hidden="true" />
            {typo("Не начинаем дополнительные работы без согласования.")}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
