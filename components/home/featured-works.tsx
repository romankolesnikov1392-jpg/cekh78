"use client"

import * as React from "react"
import { Tabs } from "@base-ui/react/tabs"
import { AnimatePresence } from "motion/react"
import * as m from "motion/react-m"
import { cn } from "cn"

import { BeforeAfter } from "@/components/before-after"
import { serviceLabel } from "@/content/services"
import type { Work } from "@/content/works"

/**
 * Главный визуальный блок: 3 кейса во вкладках. Переключение — короткий кроссфейд (200 мс),
 * индикатор вкладки скользит (250 мс, ease-in-out — это перемещение по экрану).
 */
export function FeaturedWorks({ works }: { works: Work[] }) {
  const [value, setValue] = React.useState(works[0]?.id)
  const work = works.find((w) => w.id === value) ?? works[0]

  return (
    <Tabs.Root
      value={value}
      onValueChange={(v) => setValue(v as string)}
      className="flex flex-col gap-8"
    >
      <Tabs.List
        aria-label="Кейсы до и после"
        className="relative flex [scrollbar-width:none] gap-1 overflow-x-auto border-b border-line [&::-webkit-scrollbar]:hidden"
      >
        {works.map((w, i) => (
          <Tabs.Tab
            key={w.id}
            value={w.id}
            className={cn(
              "group/tab flex shrink-0 cursor-pointer items-baseline gap-3 px-1 pt-2 pb-4 text-left outline-hidden sm:px-0 sm:pr-10",
              "focus-visible:outline-2 focus-visible:outline-solid focus-visible:-outline-offset-2 focus-visible:outline-ring"
            )}
          >
            <span className="tech-label tabular text-subtle group-data-[active]/tab:text-brand">
              0{i + 1}
            </span>
            <span className="text-base font-medium text-muted-foreground transition-colors duration-150 group-hover/tab:text-foreground group-data-[active]/tab:text-foreground md:text-lg">
              {w.car.split(" (")[0].split(",")[0]}
            </span>
          </Tabs.Tab>
        ))}
        <Tabs.Indicator className="absolute bottom-0 left-(--active-tab-left) h-0.5 w-(--active-tab-width) bg-brand transition-[left,width] duration-[250ms] ease-[var(--ease-in-out)] motion-reduce:transition-none" />
      </Tabs.List>

      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={work.id}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.2, ease: "easeOut" },
          }}
          exit={{ opacity: 0, transition: { duration: 0.12, ease: "easeOut" } }}
        >
          <Tabs.Panel
            value={work.id}
            className="grid gap-8 outline-hidden focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-ring lg:grid-cols-12 lg:gap-10"
          >
            <BeforeAfter
              before={work.before}
              after={work.after}
              label={`Сравнение до и после: ${work.car}`}
              className="lg:col-span-8"
              aspect="aspect-[4/3] lg:aspect-[16/11]"
              sizes="(min-width: 1024px) 66vw, 100vw"
            />
            <div className="flex flex-col lg:col-span-4">
              <dl className="flex flex-col">
                <CaseRow term="Модель" className="pt-0">
                  <span className="font-display text-[2rem] leading-none font-bold">
                    {work.car}
                  </span>
                </CaseRow>
                <CaseRow term="Проблема">{work.problem}</CaseRow>
                <CaseRow term="Работа">{work.work}</CaseRow>
                <CaseRow term="Срок">
                  <span className="font-medium text-foreground">
                    {work.duration}
                  </span>
                </CaseRow>
                <CaseRow term="Результат" className="border-b-0">
                  <span className="text-foreground">{work.result}</span>
                </CaseRow>
              </dl>
              <p className="tech-label mt-2 text-subtle">
                {serviceLabel(work.service)}
              </p>
            </div>
          </Tabs.Panel>
        </m.div>
      </AnimatePresence>
    </Tabs.Root>
  )
}

function CaseRow({
  term,
  children,
  className,
}: {
  term: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("grid gap-1.5 border-b border-line py-4", className)}>
      <dt className="tech-label text-subtle">{term}</dt>
      <dd className="text-[0.9375rem] text-muted-foreground">{children}</dd>
    </div>
  )
}
