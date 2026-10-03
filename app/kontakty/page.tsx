import type { Metadata } from "next"
import { ArrowUpRightIcon, ClockIcon, MapPinIcon, PhoneIcon } from "@phosphor-icons/react/ssr"
import { cn } from "cn"

import { SocialIcon } from "@/components/brand/brand-icons"
import { PageTransition } from "@/components/layout/page-transition"
import { MapMock } from "@/components/map-mock"
import { Reveal } from "@/components/motion/reveal"
import { PageHero } from "@/components/sections/page-hero"
import { BookingCta } from "@/components/service/booking-cta"
import { buttonVariants } from "@/components/ui/button"
import { pageMetadata } from "@/lib/seo"
import { site } from "@/lib/site"
import { typo } from "@/lib/typo"

export const metadata: Metadata = pageMetadata({
  title: "Контакты автосервиса: адрес, телефоны, режим работы",
  description:
    "Цех78: г. Санкт-Петербург, ул. Руставели, 13. Запись и общие вопросы +7 (812) 000-78-78, кузовной цех +7 (812) 000-78-80. Пн–Сб 09:00–21:00, Вс 10:00–18:00.",
  path: "/kontakty",
})

export default function ContactsPage() {
  const phones = [site.phones.main, site.phones.body]
  return (
    <PageTransition>
      <PageHero
        crumbs={[{ href: "/kontakty", label: "Контакты" }]}
        eyebrow="Санкт-Петербург"
        title="Контакты"
        lead="Позвоните или оставьте заявку — подберём время, чтобы машину приняли без ожидания. На осмотр кузова можно приехать и без записи."
      />

      <section aria-label="Контактная информация" className="pb-20 md:pb-28">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <Reveal className="flex flex-col lg:col-span-5">
            <dl className="flex flex-col border-t border-line">
              <div className="flex flex-col gap-3 border-b border-line py-7">
                <dt className="tech-label flex items-center gap-2 text-subtle">
                  <MapPinIcon className="size-4" aria-hidden="true" />
                  Адрес
                </dt>
                <dd className="flex flex-col gap-3">
                  <address className="font-display text-[2.25rem] leading-[0.95] font-bold not-italic">
                    {site.name}
                    <br />
                    {typo(site.address.full)}
                  </address>
                  <p className="text-[0.9375rem] text-muted-foreground">{typo(site.address.note)}</p>
                  <a
                    href={site.address.routeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ variant: "outline", size: "md" }), "mt-2 w-fit")}
                  >
                    Построить маршрут
                    <ArrowUpRightIcon aria-hidden="true" />
                    <span className="sr-only">(откроется Яндекс Карты в новой вкладке)</span>
                  </a>
                </dd>
              </div>

              <div className="flex flex-col gap-4 border-b border-line py-7">
                <dt className="tech-label flex items-center gap-2 text-subtle">
                  <PhoneIcon className="size-4" aria-hidden="true" />
                  Телефоны
                </dt>
                {phones.map((p) => (
                  <dd key={p.href} className="flex flex-col gap-0.5">
                    <a href={p.href} className="link-underline w-fit text-2xl font-medium tabular outline-hidden focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-ring">
                      {p.display}
                    </a>
                    <span className="text-sm text-muted-foreground">{p.label}</span>
                  </dd>
                ))}
              </div>

              <div className="flex flex-col gap-3 border-b border-line py-7">
                <dt className="tech-label flex items-center gap-2 text-subtle">
                  <ClockIcon className="size-4" aria-hidden="true" />
                  Режим работы
                </dt>
                <dd>
                  <ul className="flex flex-col gap-1 text-lg">
                    {site.hours.map((h) => (
                      <li key={h.days} className="flex max-w-xs justify-between gap-6 tabular">
                        <span className="text-muted-foreground">{h.days}</span>
                        <span>{h.time}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-sm text-subtle">{typo("Машину можно оставить на ночь — территория охраняется.")}</p>
                </dd>
              </div>

              <div className="flex flex-col gap-3 py-7">
                <dt className="tech-label text-subtle">Мессенджеры и соцсети</dt>
                <dd className="flex gap-2">
                  {site.socials.map((s) => (
                    <a
                      key={s.id}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center gap-2 rounded-[2px] border border-line px-4 text-sm text-muted-foreground transition-colors hover:border-line-strong hover:text-foreground focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      <SocialIcon id={s.id} className="size-4" />
                      {s.label}
                      <span className="sr-only">(откроется в новой вкладке)</span>
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7">
            <MapMock className="aspect-[4/3] lg:sticky lg:top-24 lg:aspect-auto lg:h-[min(640px,calc(100svh-8rem))]" />
            <p className="mt-4 text-sm text-subtle">
              {typo("Проект демонстрационный: адрес вымышленный, бизнеса «Цех78» по нему нет. Кнопка «Построить маршрут» ведёт на реальную улицу в Яндекс Картах.")}
            </p>
          </Reveal>
        </div>
      </section>

      <BookingCta id="zapis" />
    </PageTransition>
  )
}
