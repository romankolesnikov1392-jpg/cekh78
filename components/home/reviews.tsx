"use client"

import * as React from "react"
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react"

import type { Review } from "@/content/company"

/**
 * Отзывы: нативная горизонтальная прокрутка со snap — работает пальцем, трекпадом и клавиатурой
 * (лента фокусируемая). Кнопки на десктопе листают на одну карточку.
 */
export function ReviewsScroller({ reviews }: { reviews: Review[] }) {
  const ref = React.useRef<HTMLUListElement>(null)
  const [edge, setEdge] = React.useState({ start: true, end: false })

  const update = React.useCallback(() => {
    const el = ref.current
    if (!el) return
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 })
  }, [])

  React.useEffect(() => {
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [update])

  const scroll = (dir: 1 | -1) => {
    const el = ref.current
    const card = el?.querySelector("li")
    if (!el || !card) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    el.scrollBy({ left: dir * (card.clientWidth + 12), behavior: reduce ? "auto" : "smooth" })
  }

  return (
    <div className="flex flex-col gap-6">
      <ul
        ref={ref}
        onScroll={update}
        tabIndex={0}
        aria-label="Отзывы клиентов, прокручиваются горизонтально"
        className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 outline-hidden [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-ring sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((r) => (
          <li key={r.name} className="w-[86%] shrink-0 snap-start sm:w-[calc((100%-12px)/2)] lg:w-[calc((100%-24px)/3)]">
            <figure className="flex h-full flex-col justify-between gap-10 border border-line bg-surface p-6 md:p-8">
              <div className="flex flex-col gap-5">
                <p className="tech-label flex justify-between gap-4 text-subtle">
                  <span>{r.service}</span>
                  <span>{r.date}</span>
                </p>
                <blockquote className="text-[1.0625rem] leading-relaxed text-foreground/90">
                  <span aria-hidden="true" className="mb-2 block font-display text-5xl leading-[0.5] text-brand">
                    «
                  </span>
                  {r.text}
                </blockquote>
              </div>
              <figcaption className="flex flex-col gap-0.5 border-t border-line pt-4">
                <span className="font-medium text-foreground">{r.name}</span>
                <span className="text-sm text-muted-foreground">{r.car}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <div className="hidden items-center justify-end gap-2 md:flex">
        {(
          [
            [-1, "Предыдущие отзывы", ArrowLeftIcon, edge.start],
            [1, "Следующие отзывы", ArrowRightIcon, edge.end],
          ] as const
        ).map(([dir, label, Icon, disabled]) => (
          <button
            key={label}
            type="button"
            onClick={() => scroll(dir)}
            disabled={disabled}
            aria-label={label}
            className="inline-flex size-12 items-center justify-center rounded-[2px] border border-line-strong text-foreground transition-[border-color,opacity,transform] duration-150 outline-hidden hover:border-foreground/50 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.97] disabled:opacity-35"
          >
            <Icon className="size-5" aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  )
}
