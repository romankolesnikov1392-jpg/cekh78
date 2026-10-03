"use client"

import * as React from "react"
import { AnimatePresence } from "motion/react"
import * as m from "motion/react-m"
import { cn } from "cn"

import { BeforeAfter } from "@/components/before-after"
import { BookingTrigger } from "@/components/booking/booking-trigger"
import type { ServiceSlug } from "@/content/services"
import type { Work } from "@/content/works"

type Filter = { value: "all" | ServiceSlug; label: string }

/**
 * Галерея «до/после» с фильтром по услуге.
 * — Фильтр синхронизирован с адресом (?usluga=…): ссылку можно отправить, «Назад» работает.
 * — Состояния: пустая категория, ошибка загрузки фото (в слайдере), загрузка — blur-плейсхолдеры.
 * — SSR отдаёт все кейсы (видно поисковикам), фильтр из URL применяется после гидрации.
 */
export function WorksGallery({ works, filters }: { works: Work[]; filters: Filter[] }) {
  const [active, setActive] = React.useState<Filter["value"]>("all")

  React.useEffect(() => {
    const read = () => {
      const v = new URLSearchParams(window.location.search).get("usluga")
      setActive(filters.some((f) => f.value === v) ? (v as Filter["value"]) : "all")
    }
    read()
    window.addEventListener("popstate", read)
    return () => window.removeEventListener("popstate", read)
  }, [filters])

  function select(value: Filter["value"]) {
    setActive(value)
    const url = new URL(window.location.href)
    if (value === "all") url.searchParams.delete("usluga")
    else url.searchParams.set("usluga", value)
    window.history.replaceState(null, "", url)
  }

  const visible = active === "all" ? works : works.filter((w) => w.service === active)
  const count = (v: Filter["value"]) => (v === "all" ? works.length : works.filter((w) => w.service === v).length)
  const activeLabel = filters.find((f) => f.value === active)?.label

  return (
    <div className="flex flex-col gap-10">
      <div className="sticky top-16 z-20 -mx-4 border-b border-line bg-background/95 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
        <div
          role="group"
          aria-label="Фильтр по услуге"
          className="flex gap-1 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {filters.map((f) => {
            const n = count(f.value)
            const on = active === f.value
            return (
              <button
                key={f.value}
                type="button"
                aria-pressed={on}
                onClick={() => select(f.value)}
                className={cn(
                  "inline-flex h-10 shrink-0 items-center gap-2 rounded-[2px] border px-4 text-sm font-medium transition-[background-color,border-color,color,transform] duration-150 ease-out outline-hidden active:scale-[0.97]",
                  "focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ring",
                  on ? "border-foreground bg-foreground text-ink" : "border-line text-muted-foreground hover:border-line-strong hover:text-foreground"
                )}
              >
                {f.label}
                <span className={cn("tabular text-xs", on ? "text-ink/60" : "text-subtle")}>{n}</span>
              </button>
            )
          })}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {active === "all" ? `Показаны все работы: ${visible.length}` : `${activeLabel}: ${visible.length}`}
      </p>

      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.22, ease: "easeOut" } }}
          exit={{ opacity: 0, transition: { duration: 0.12, ease: "easeOut" } }}
        >
          {visible.length === 0 ? (
            <EmptyState label={activeLabel ?? ""} onReset={() => select("all")} />
          ) : (
            <ul className="grid gap-x-6 gap-y-14 md:grid-cols-2">
              {visible.map((w) => (
                <li key={w.id}>
                  <article className="flex flex-col gap-5">
                    <BeforeAfter before={w.before} after={w.after} label={`Сравнение до и после: ${w.car}`} sizes="(min-width: 768px) 50vw, 100vw" />
                    <div className="flex flex-col gap-3">
                      <p className="tech-label flex flex-wrap gap-x-3 gap-y-1 text-subtle">
                        <span className="text-brand">{filters.find((f) => f.value === w.service)?.label}</span>
                        <span>Срок: {w.duration}</span>
                      </p>
                      <h2 className="text-[2rem] leading-[0.95] font-bold">{w.car}</h2>
                      <p className="text-[0.9375rem] text-muted-foreground">
                        <span className="text-foreground">{w.problem}</span> {w.work}. {w.result}
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </m.div>
      </AnimatePresence>
    </div>
  )
}

function EmptyState({ label, onReset }: { label: string; onReset: () => void }) {
  return (
    <div className="flex flex-col items-start gap-5 border border-dashed border-line-strong p-8 md:p-12">
      <p className="tech-label text-subtle">Пусто</p>
      <h2 className="text-h3 font-bold">В категории «{label}» пока нет опубликованных работ</h2>
      <p className="max-w-lg text-muted-foreground">
        Мы выкладываем кейсы только с согласия клиентов. Расскажите о своей задаче — покажем похожие работы на месте.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex h-12 items-center justify-center rounded-[2px] border border-line-strong px-6 text-[0.9375rem] font-medium transition-colors hover:border-foreground/50 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.97]"
        >
          Показать все работы
        </button>
        <BookingTrigger size="md">Записаться на осмотр</BookingTrigger>
      </div>
    </div>
  )
}
