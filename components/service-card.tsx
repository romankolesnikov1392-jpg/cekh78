import Image from "next/image"
import Link from "next/link"
import { cn } from "cn"
import { ArrowRightIcon } from "@phosphor-icons/react/ssr"

import type { Service } from "@/content/services"

/**
 * Карточка услуги.
 * Hover (только мышь): подъём на 4 px, акцентная линия «прорисовывается» слева направо,
 * фото чуть увеличивается, раскрываются конкретные работы. На тач-устройствах детали видны сразу.
 * Вся карточка кликабельна через растянутую ссылку в заголовке — один таб-стоп, понятный текст ссылки.
 */
export function ServiceCard({
  service,
  variant = "default",
  className,
  sizes = "(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw",
}: {
  service: Service
  variant?: "default" | "feature"
  className?: string
  sizes?: string
}) {
  const feature = variant === "feature"
  return (
    <article
      className={cn(
        "group relative isolate flex flex-col justify-end overflow-hidden bg-surface-2",
        "transition-transform duration-300 ease-[var(--ease-out)] hover:-translate-y-1 focus-within:-translate-y-1 motion-reduce:hover:translate-y-0",
        feature ? "min-h-[440px] md:min-h-[520px] lg:min-h-[720px]" : "min-h-[380px] md:min-h-[420px]",
        className
      )}
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src={service.cardImage.src}
          alt={service.cardImage.alt}
          fill
          sizes={feature ? "(min-width: 1024px) 50vw, 100vw" : sizes}
          placeholder="blur"
          className="img-zoom object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/0 transition-opacity duration-300" />
      </div>

      {/* акцентная линия */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-brand transition-transform duration-300 ease-[var(--ease-out)] group-hover:scale-x-100 group-focus-within:scale-x-100"
      />

      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 md:p-6">
        <span className="tech-label text-foreground/80 tabular">{service.index}</span>
        <span className="tech-label rounded-[2px] bg-ink/80 px-2 py-1 text-foreground/80">{service.priceFrom}</span>
      </div>

      <div className="relative flex flex-col gap-3 p-5 md:p-6">
        <h3 className={cn("font-bold", feature ? "text-h2" : "text-h3")}>
          <Link
            href={`/uslugi/${service.slug}`}
            className="outline-hidden after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:after:outline-2 focus-visible:after:outline-solid focus-visible:after:-outline-offset-2 focus-visible:after:outline-ring"
          >
            {service.shortTitle === "ТО" ? "Техническое обслуживание" : service.shortTitle}
          </Link>
        </h3>
        {/*
          Описание и конкретные работы. С мышью — лежат в одной ячейке сетки, при наведении
          меняются кроссфейдом (opacity + transform, без анимации высоты). На тач-экранах — оба видны.
        */}
        <div className="flex flex-col gap-4 pointer-fine:grid pointer-fine:gap-0">
          <p
            className={cn(
              "text-foreground/80 transition-[opacity,transform] duration-200 ease-[var(--ease-out)] pointer-fine:[grid-area:1/1]",
              "pointer-fine:group-hover:-translate-y-1 pointer-fine:group-hover:opacity-0 pointer-fine:group-focus-within:opacity-0",
              feature ? "max-w-md text-base md:text-lg" : "text-[0.9375rem]"
            )}
          >
            {service.cardText}
          </p>
          <ul
            className={cn(
              "flex flex-col gap-1.5 border-t border-line-strong pt-4 transition-[opacity,transform] duration-200 ease-[var(--ease-out)]",
              "pointer-fine:translate-y-1.5 pointer-fine:self-end pointer-fine:border-t-0 pointer-fine:pt-0 pointer-fine:opacity-0 pointer-fine:[grid-area:1/1]",
              "pointer-fine:group-hover:translate-y-0 pointer-fine:group-hover:opacity-100 pointer-fine:group-hover:delay-75 pointer-fine:group-focus-within:translate-y-0 pointer-fine:group-focus-within:opacity-100",
              "motion-reduce:translate-y-0"
            )}
          >
            {service.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2.5 text-sm text-foreground/90">
                <span className="size-1 shrink-0 bg-brand" aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <span aria-hidden="true" className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-foreground">
          Подробнее
          <ArrowRightIcon className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  )
}
