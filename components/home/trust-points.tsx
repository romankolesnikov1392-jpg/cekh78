import Image from "next/image"
import { CheckIcon } from "@phosphor-icons/react/ssr"

import { RevealGroup, RevealItem } from "@/components/motion/reveal"
import { SectionHeader } from "@/components/sections/section-header"
import { trustPoints } from "@/content/company"
import { photos } from "@/content/photos"

type Visual = (typeof trustPoints)[number]["visual"]

/** Мини-иллюстрации — «доказательство» к каждому пункту, свёрстаны HTML, без картинок-заглушек. */
function PointVisual({ kind }: { kind: Visual }) {
  switch (kind) {
    case "estimate":
      return (
        <div className="w-full max-w-[260px] border border-line bg-ink/60 p-3.5 font-mono text-[0.6875rem] leading-relaxed text-muted-foreground">
          <div className="mb-2 flex justify-between text-subtle">
            <span>ЗАКАЗ-НАРЯД № 4127</span>
            <span>14.10</span>
          </div>
          <div className="flex justify-between"><span>Рихтовка двери</span><span className="tabular">8 500</span></div>
          <div className="flex justify-between"><span>Покраска с переходом</span><span className="tabular">16 400</span></div>
          <div className="flex justify-between"><span>Полировка</span><span className="tabular">2 500</span></div>
          <div className="mt-2 flex items-center justify-between border-t border-dashed border-line-strong pt-2 text-foreground">
            <span>ИТОГО</span>
            <span className="tabular">27 400 ₽</span>
          </div>
          <span className="mt-2 inline-block border border-brand px-1.5 py-0.5 text-[0.625rem] text-brand">ЦЕНА ЗАФИКСИРОВАНА</span>
        </div>
      )
    case "photos":
      return (
        <div className="flex gap-2">
          {[
            { p: photos.kuzovHero, t: "09:12" },
            { p: photos.sanding, t: "13:40" },
            { p: photos.paintBooth, t: "17:05" },
          ].map(({ p, t }) => (
            <figure key={t} className="flex flex-col gap-1.5">
              <div className="relative size-[72px] overflow-hidden border border-line">
                <Image src={p.src} alt="" fill sizes="72px" className="object-cover" />
              </div>
              <figcaption className="font-mono text-[0.625rem] text-subtle tabular">{t}</figcaption>
            </figure>
          ))}
        </div>
      )
    case "warranty":
      return (
        <div className="flex items-end gap-3">
          <span className="font-display text-[5.5rem] leading-[0.8] font-bold text-foreground">12</span>
          <span className="mb-1 flex flex-col font-mono text-[0.6875rem] text-muted-foreground uppercase">
            <span>месяцев</span>
            <span className="text-subtle">в заказ-наряде</span>
          </span>
        </div>
      )
    case "free":
      return (
        <div className="flex items-baseline gap-4 font-display font-bold">
          <span className="relative text-5xl text-subtle">
            800 ₽
            <span aria-hidden="true" className="absolute top-1/2 left-[-4%] h-0.5 w-[108%] -rotate-6 bg-brand" />
          </span>
          <span className="text-6xl text-foreground">0 ₽</span>
        </div>
      )
    case "approve":
      return (
        <div className="flex w-full max-w-[270px] flex-col gap-2 text-[0.8125rem]">
          <p className="w-fit max-w-[90%] rounded-[2px] bg-surface-2 px-3 py-2 text-muted-foreground">
            {"Нашли течь сальника, +3 500 ₽. Делаем?"}
          </p>
          <p className="flex w-fit items-center gap-1.5 self-end rounded-[2px] bg-brand/15 px-3 py-2 text-foreground">
            Да, делайте
            <CheckIcon className="size-3.5 text-brand" weight="bold" aria-hidden="true" />
          </p>
        </div>
      )
    case "equipment":
      return (
        <ul className="grid w-full max-w-[280px] grid-cols-2 gap-x-4 gap-y-1.5 font-mono text-[0.6875rem] text-muted-foreground uppercase">
          {["Дилерские сканеры", "Мультимарка", "Осциллограф", "Люфт-детектор", "3D-развал", "Толщиномер"].map((x) => (
            <li key={x} className="flex items-center gap-1.5">
              <span className="size-1 bg-brand" aria-hidden="true" />
              {x}
            </li>
          ))}
        </ul>
      )
  }
}

export function TrustPoints() {
  return (
    <section aria-labelledby="trust-title" className="border-t border-line py-20 md:py-32">
      <div className="container-x flex flex-col gap-12 md:gap-16">
        <SectionHeader
          id="trust-title"
          index="03"
          eyebrow="Почему нам доверяют"
          title="Обещаем только то, что можно проверить"
          lead="Никаких «индивидуальных подходов». Вот что вы получаете на деле — и где это зафиксировано."
        />
        <RevealGroup as="ul" className="grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {trustPoints.map((p, i) => (
            <RevealItem
              as="li"
              key={p.title}
              className="flex flex-col gap-6 border-r border-b border-line p-6 md:p-8"
            >
              <div className="flex h-36 items-center">
                <PointVisual kind={p.visual} />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="flex gap-3 text-[1.75rem] leading-[1] font-bold">
                  <span aria-hidden="true" className="tech-label pt-1.5 font-mono text-subtle tabular">0{i + 1}</span>
                  {p.title}
                </h3>
                <p className="text-[0.9375rem] text-muted-foreground">{p.text}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
