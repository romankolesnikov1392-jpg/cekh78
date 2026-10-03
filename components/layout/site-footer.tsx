import Link from "next/link"
import { ArrowUpRightIcon, PhoneIcon } from "@phosphor-icons/react/ssr"

import { CallbackForm } from "@/components/booking/callback-form"
import { FooterCallbackGate } from "@/components/layout/footer-callback"
import { SocialIcon } from "@/components/brand/brand-icons"
import { LogoMark } from "@/components/brand/logo"
import { getPosts } from "@/content/posts"
import { getServices } from "@/content/services"
import { site } from "@/lib/site"
import { typo } from "@/lib/typo"

const linkClass =
  "link-underline text-[0.9375rem] text-muted-foreground transition-colors duration-150 hover:text-foreground outline-hidden focus-visible:text-foreground focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-ring rounded-[1px]"

function Column({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="tech-label font-mono text-subtle">{title}</h2>
      {children}
    </div>
  )
}

export function SiteFooter() {
  const services = getServices()
  const posts = getPosts().slice(0, 3)

  return (
    <footer className="border-t border-line bg-surface">
      <FooterCallbackGate>
        <section
          aria-labelledby="callback-title"
          className="container-x grid gap-12 border-b border-line py-16 md:py-24 lg:grid-cols-12"
        >
          <div className="flex flex-col gap-6 lg:col-span-5">
            <span className="tech-label text-brand">Обратный звонок</span>
            <h2 id="callback-title" className="font-display text-h2 font-bold">
              {typo("Не знаете, с чего начать? Перезвоним")}
            </h2>
            <p className="max-w-md text-lead text-muted-foreground">
              {typo(
                "Опишите проблему мастеру-приёмщику — он подскажет, что проверить и сколько это может стоить. Без обязательств."
              )}
            </p>
            <a
              href={site.phones.main.href}
              className="group tabular inline-flex w-fit items-center gap-3 text-2xl font-medium outline-hidden focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-ring md:text-3xl"
            >
              <PhoneIcon className="size-6 text-brand" aria-hidden="true" />
              <span className="link-underline">{site.phones.main.display}</span>
            </a>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-10">
            <CallbackForm />
          </div>
        </section>
      </FooterCallbackGate>

      <div className="container-x grid grid-cols-2 gap-x-6 gap-y-12 py-14 md:grid-cols-4 lg:grid-cols-12 lg:py-20">
        <div className="col-span-2 flex flex-col gap-6 md:col-span-4 lg:col-span-4">
          <LogoMark className="text-[2.25rem] text-foreground" />
          <p className="max-w-xs text-[0.9375rem] text-muted-foreground">
            {typo(
              "Ремонт, который видно. Автосервис полного цикла в Санкт-Петербурге с 2016 года."
            )}
          </p>
          <ul className="flex gap-2" aria-label="Мы в соцсетях">
            {site.socials.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} (откроется в новой вкладке)`}
                  className="inline-flex size-11 items-center justify-center rounded-[2px] border border-line text-muted-foreground transition-colors duration-150 hover:border-line-strong hover:text-foreground focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <SocialIcon id={s.id} className="size-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <Column title="Услуги">
            <ul className="flex flex-col gap-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/uslugi/${s.slug}`} className={linkClass}>
                    {s.shortTitle === "ТО" ? "Техобслуживание" : s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </Column>
        </div>

        <div className="lg:col-span-2">
          <Column title="Компания">
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/o-nas" className={linkClass}>
                  О нас и наш цех
                </Link>
              </li>
              <li>
                <Link href="/raboty" className={linkClass}>
                  Работы до и после
                </Link>
              </li>
              <li>
                <Link href="/uslugi" className={linkClass}>
                  Цены на услуги
                </Link>
              </li>
              <li>
                <Link href="/kontakty" className={linkClass}>
                  Контакты
                </Link>
              </li>
            </ul>
          </Column>
        </div>

        <div className="lg:col-span-2">
          <Column title="Полезное">
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/blog" className={linkClass}>
                  Все статьи
                </Link>
              </li>
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className={linkClass}>
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Column>
        </div>

        <div className="lg:col-span-2">
          <Column title="Контакты">
            <address className="flex flex-col gap-4 text-[0.9375rem] text-muted-foreground not-italic">
              <span>{typo(site.address.full)}</span>
              <span className="flex flex-col gap-1">
                <a
                  href={site.phones.main.href}
                  className={linkClass + " tabular w-fit"}
                >
                  {site.phones.main.display}
                </a>
                <span className="text-xs text-subtle">
                  {site.phones.main.label}
                </span>
              </span>
              <span className="flex flex-col gap-1">
                <a
                  href={site.phones.body.href}
                  className={linkClass + " tabular w-fit"}
                >
                  {site.phones.body.display}
                </a>
                <span className="text-xs text-subtle">
                  {site.phones.body.label}
                </span>
              </span>
              <span>
                {site.hours.map((h) => (
                  <span key={h.days} className="tabular block">
                    {h.days} {h.time}
                  </span>
                ))}
              </span>
              <a
                href={site.address.routeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-fit items-center gap-1.5 font-medium text-foreground outline-hidden focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                <span className="link-underline">Построить маршрут</span>
                <ArrowUpRightIcon
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </address>
          </Column>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-2 py-6 text-sm text-subtle md:flex-row md:items-center md:justify-between">
          <p>© 2026 Цех78 · Демонстрационный проект</p>
          <p>
            {typo(
              "Бренд, адрес и телефоны вымышленные. Фотографии — Unsplash."
            )}
          </p>
        </div>
      </div>
    </footer>
  )
}
