import Link from "next/link"
import { cn } from "cn"
import { ArrowRightIcon, PhoneIcon } from "@phosphor-icons/react/ssr"

import { BookingTrigger } from "@/components/booking/booking-trigger"
import { ParallaxImage } from "@/components/motion/parallax-image"
import { buttonVariants } from "@/components/ui/button"
import { photos } from "@/content/photos"
import { site } from "@/lib/site"
import { typo } from "@/lib/typo"

const delay = (i: number) => ({ "--i": i }) as React.CSSProperties

/**
 * Hero главной («Иммерсивный» — победитель прототипирования).
 * За 3–5 секунд: что (автосервис), где (СПб, адрес), что можно сделать (подзаголовок),
 * как записаться (CTA + телефон). Заголовок появляется построчно CSS-анимацией —
 * не ждёт гидрации и не задерживает LCP; фото — с лёгким параллаксом.
 */
export function HomeHero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden">
      <ParallaxImage src={photos.heroPorsche.src} alt={photos.heroPorsche.alt} objectPosition="56% 32%" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/5" />
      <div aria-hidden="true" className="absolute inset-0 hidden bg-gradient-to-r from-ink/75 via-ink/10 to-transparent lg:block" />

      <div className="container-x relative pt-36 pb-8 md:pb-12">
        <p className="hero-fade tech-label flex flex-wrap items-center gap-x-2 gap-y-1 text-foreground/85" style={delay(-3)}>
          <span className="size-1.5 bg-brand" aria-hidden="true" />
          <span>Автосервис</span>
          <span aria-hidden="true">·</span>
          <span>{typo(`Санкт-Петербург, ${site.address.street}`)}</span>
        </p>

        <h1 id="hero-title" className="mt-5 text-display font-bold">
          <span className="hero-line" style={delay(0)}>
            <span>Ремонт,</span>
          </span>
          <span className="hero-line" style={delay(1)}>
            <span>который видно</span>
          </span>
        </h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <p className="hero-fade max-w-xl text-lead text-foreground/85 lg:col-span-5" style={delay(0)}>
            {typo(site.description)}
          </p>
          <div className="hero-fade flex flex-col gap-5 lg:col-span-7 lg:items-end" style={delay(1)}>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <BookingTrigger size="lg" magnetic className="w-full sm:w-auto">
                Записаться на ремонт
                <ArrowRightIcon className="transition-transform duration-200 ease-out group-hover/button:translate-x-0.5" aria-hidden="true" />
              </BookingTrigger>
              <Link href="/raboty" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full bg-ink/40 sm:w-auto")}>
                Посмотреть работы
              </Link>
            </div>
            <a
              href={site.phones.main.href}
              className="group inline-flex w-fit items-center gap-3 text-xl font-medium tabular outline-hidden focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-ring md:text-2xl"
            >
              <PhoneIcon className="size-5 text-brand" aria-hidden="true" />
              <span className="link-underline">{site.phones.main.display}</span>
            </a>
          </div>
        </div>

        <p className="hero-fade tech-label mt-10 flex flex-wrap gap-x-3 gap-y-1 border-t border-line-strong pt-5 text-foreground/75" style={delay(2)}>
          <span>Работаем с 2016 года</span>
          <span aria-hidden="true">·</span>
          <span>2 400+ автомобилей</span>
          <span aria-hidden="true">·</span>
          <span>гарантия до 12 месяцев</span>
        </p>
      </div>
    </section>
  )
}
