import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRightIcon, PhoneIcon } from "@phosphor-icons/react/ssr"

import { BeforeAfter } from "@/components/before-after"
import { BookingTrigger } from "@/components/booking/booking-trigger"
import { PageTransition } from "@/components/layout/page-transition"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { PageHero } from "@/components/sections/page-hero"
import { ArrowLink, SectionHeader } from "@/components/sections/section-header"
import { BookingCta } from "@/components/service/booking-cta"
import { Faq } from "@/components/service/faq"
import { PriceTable } from "@/components/service/price-table"
import { photos } from "@/content/photos"
import { getService, getServices, type Service } from "@/content/services"
import { getWorksByService } from "@/content/works"
import { pageMetadata } from "@/lib/seo"
import { site } from "@/lib/site"
import { typo } from "@/lib/typo"

export const dynamicParams = false

export function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }))
}

export async function generateMetadata(props: PageProps<"/uslugi/[slug]">): Promise<Metadata> {
  const { slug } = await props.params
  const service = getService(slug)
  if (!service) return {}
  return pageMetadata({ title: service.meta.title, description: service.meta.description, path: `/uslugi/${slug}` })
}

/** Этапы покраски — расширенный блок флагманской страницы кузовного ремонта. */
const paintSteps = [
  { title: "Дефектовка", text: "Осмотр при дневном свете и в световом тоннеле, замер толщины покрытия, фото всех повреждений." },
  { title: "Разборка", text: "Снимаем ручки, молдинги, фонари и эмблемы — не заклеиваем их малярным скотчем." },
  { title: "Рихтовка и подготовка", text: "Вытягиваем металл, шпатлюем тонким слоем, грунтуем и полностью сушим, выводим края «в ноль»." },
  { title: "Подбор цвета", text: "Спектрофотометр, коррекция формулы колористом и выкрас на тест-пластине при разном свете." },
  { title: "Окраска в камере", text: "База с плавным переходом на соседний элемент, лак — на детали целиком." },
  { title: "Сушка и полировка", text: "Сушка при 60 °C, полировка зоны перехода, выравнивание фактуры под заводской лак." },
  { title: "Контроль и сборка", text: "Проверяем в световом тоннеле вместе с вами, собираем и выдаём с гарантией 12 месяцев." },
]

export default async function ServicePage(props: PageProps<"/uslugi/[slug]">) {
  const { slug } = await props.params
  const service = getService(slug)
  if (!service) notFound()

  const isBody = service.slug === "kuzovnoy-remont"
  const works = getWorksByService(service.slug)
  const shownWorks = isBody ? works.slice(0, 4) : works
  const phone = isBody ? site.phones.body : site.phones.main
  const others = getServices().filter((s) => s.slug !== service.slug)
  const title = service.shortTitle === "ТО" ? "Техническое обслуживание" : service.title

  return (
    <PageTransition>
      <PageHero
        crumbs={[
          { href: "/uslugi", label: "Услуги" },
          { href: `/uslugi/${service.slug}`, label: service.shortTitle === "ТО" ? "ТО" : service.shortTitle },
        ]}
        eyebrow={`Услуга ${service.index} · Цех78`}
        title={title}
        lead={service.heroLead}
        image={service.heroImage}
        aside={
          <dl className="grid grid-cols-1 border-t border-line-strong sm:grid-cols-3">
            {service.heroFacts.map((f, i) => (
              <div key={f.label} className={i > 0 ? "flex flex-col gap-1 border-line-strong py-4 sm:border-l sm:pl-6" : "flex flex-col gap-1 py-4 sm:pr-6"}>
                <dt className="tech-label order-2 text-foreground/70">{f.label}</dt>
                <dd className="font-display text-[1.75rem] leading-none font-bold">{f.value}</dd>
              </div>
            ))}
          </dl>
        }
      >
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <BookingTrigger service={service.slug} size="lg" magnetic className="w-full sm:w-auto">
            Записаться на ремонт
            <ArrowRightIcon className="transition-transform duration-200 group-hover/button:translate-x-0.5" aria-hidden="true" />
          </BookingTrigger>
        </div>
        <a
          href={phone.href}
          className="inline-flex w-fit items-center gap-3 text-xl font-medium tabular outline-hidden focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <PhoneIcon className="size-5 text-brand" aria-hidden="true" />
          <span className="link-underline">{phone.display}</span>
        </a>
      </PageHero>

      {/* 1. Что входит */}
      <section aria-labelledby="includes-title" className="py-20 md:py-28">
        <div className="container-x flex flex-col gap-12">
          <SectionHeader
            id="includes-title"
            index="01"
            eyebrow="Что входит"
            title={isBody ? "Работы кузовного цеха" : "Что мы делаем по этому направлению"}
            lead="Конкретные работы, а не «ремонт любой сложности». Если вашей задачи нет в списке — позвоните, скажем честно, берёмся или нет."
          />
          <RevealGroup as="ol" className="grid border-t border-line md:grid-cols-2" stagger={0.05}>
            {service.includes.map((item, i) => (
              <RevealItem
                as="li"
                key={item.title}
                className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-line py-6 md:py-8 md:odd:border-r md:odd:pr-10 md:even:pl-10"
              >
                <span aria-hidden="true" className="tech-label pt-1.5 text-subtle tabular">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[1.75rem] leading-[1] font-bold">{item.title}</h3>
                  <p className="text-[0.9375rem] text-muted-foreground">{item.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 2. До / после */}
      {shownWorks.length > 0 ? (
        <section aria-labelledby="works-title" className="border-t border-line py-20 md:py-28">
          <div className="container-x flex flex-col gap-12">
            <SectionHeader
              id="works-title"
              index="02"
              eyebrow={isBody ? "До и после" : "Детали и процесс"}
              title={isBody ? "Результат, который можно сравнить" : "Что меняем и как это выглядит"}
              lead={
                isBody
                  ? "Потяните разделитель на фото. Сейчас здесь демонстрационные снимки; на рабочем сайте — реальные автомобили клиентов."
                  : "Деталь до замены и после, процесс работы. Сейчас здесь демонстрационные снимки."
              }
              action={{ href: `/raboty?usluga=${service.slug}`, label: isBody ? `Все кузовные работы (${works.length})` : "Все работы" }}
            />
            <RevealGroup className="grid gap-x-6 gap-y-12 md:grid-cols-2" stagger={0.08}>
              {shownWorks.map((w) => (
                <RevealItem key={w.id} className="flex flex-col gap-5">
                  <BeforeAfter before={w.before} after={w.after} label={`Сравнение до и после: ${w.car}`} sizes="(min-width: 768px) 50vw, 100vw" />
                  <div className="flex flex-col gap-2">
                    <p className="tech-label text-subtle">
                      {w.car} · {w.duration}
                    </p>
                    <h3 className="text-[1.625rem] leading-[1.05] font-bold">{w.problem}</h3>
                    <p className="text-[0.9375rem] text-muted-foreground">
                      {w.work}. {w.result}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      ) : null}

      {/* 3. Как мы работаем */}
      <section aria-labelledby="process-title" className="bg-concrete py-20 text-concrete-ink md:py-28">
        <div className="container-x flex flex-col gap-12">
          <SectionHeader id="process-title" index="03" tone="light" eyebrow="Как мы работаем" title="Диагностика → решение → результат" />
          <RevealGroup as="ol" className="grid gap-8 md:grid-cols-3 md:gap-10" stagger={0.1}>
            {service.process.steps.map((s, i) => (
              <RevealItem as="li" key={s.title} className="flex flex-col gap-4 border-t border-concrete-ink/25 pt-6">
                <span className="font-display text-6xl leading-[0.8] font-bold tabular">0{i + 1}</span>
                <h3 className="text-[1.875rem] leading-none font-bold">{s.title}</h3>
                <p className="text-[0.9375rem] text-concrete-muted">{s.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal>
            <CaseExample service={service} />
          </Reveal>
        </div>
      </section>

      {/* 3a. Флагман: технология покраски */}
      {isBody ? (
        <section aria-labelledby="paint-title" className="py-20 md:py-28">
          <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="flex flex-col gap-8 lg:col-span-5">
              <SectionHeader
                id="paint-title"
                eyebrow="Технология"
                title="Почему не видно границ ремонта"
                className="lg:grid-cols-1"
              />
              <Reveal className="flex flex-col gap-4">
                <p className="text-lead text-muted-foreground">
                  {typo("Граница видна, когда цвет пытаются подогнать «стык в стык». Мы делаем плавный переход базы на соседний элемент и кроем лаком детали целиком — глазу не за что зацепиться.")}
                </p>
                <ArrowLink href="/blog/kak-my-krasim">Подробно о технологии в блоге</ArrowLink>
              </Reveal>
              <Reveal className="relative aspect-[16/10] overflow-hidden bg-surface-2">
                <Image src={photos.lightTunnel.src} alt={photos.lightTunnel.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" placeholder="blur" className="object-cover" />
                <span className="tech-label absolute bottom-3 left-3 bg-ink/80 px-2 py-1 text-foreground/85">Контроль в световом тоннеле</span>
              </Reveal>
            </div>
            <RevealGroup as="ol" className="flex flex-col lg:col-span-6 lg:col-start-7" stagger={0.06}>
              {paintSteps.map((s, i) => (
                <RevealItem as="li" key={s.title} className="grid grid-cols-[3.5rem_1fr] gap-4 border-b border-line py-6 first:border-t">
                  <span className="font-display text-4xl leading-[0.85] font-bold text-subtle tabular">{String(i + 1).padStart(2, "0")}</span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-[1.5rem] leading-none font-bold">{s.title}</h3>
                    <p className="text-[0.9375rem] text-muted-foreground">{typo(s.text)}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      ) : null}

      {/* 4. Оборудование */}
      <section aria-labelledby="equipment-title" className="border-t border-line py-20 md:py-28">
        <div className="container-x flex flex-col gap-12">
          <SectionHeader
            id="equipment-title"
            index="04"
            eyebrow="Оборудование"
            title="Чем работаем"
            action={{ href: "/o-nas#oborudovanie", label: "Всё оборудование цеха" }}
          />
          <RevealGroup className={service.equipment.length === 2 ? "grid gap-6 md:grid-cols-2" : "grid gap-6 md:grid-cols-3"} stagger={0.08}>
            {service.equipment.map((e) => (
              <RevealItem key={e.title}>
                <figure className="group flex flex-col gap-4">
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
                    <Image src={e.photo.src} alt={e.photo.alt} fill sizes="(min-width: 768px) 33vw, 100vw" placeholder="blur" className="img-zoom object-cover" />
                  </div>
                  <figcaption className="flex flex-col gap-1.5">
                    <span className="text-lg font-medium text-foreground">{e.title}</span>
                    <span className="text-[0.9375rem] text-muted-foreground">{e.caption}</span>
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 5. Прайс */}
      <section aria-labelledby="prices-title" id="ceny" className="border-t border-line py-20 md:py-28">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-4">
            <SectionHeader id="prices-title" index="05" eyebrow="Цены" title="Прайс-лист" className="lg:grid-cols-1" />
            <Reveal className="flex flex-col gap-5">
              <p className="text-[0.9375rem] text-muted-foreground">{service.priceNote}</p>
              <BookingTrigger service={service.slug} variant="outline" size="md" className="w-fit">
                Узнать точную стоимость
              </BookingTrigger>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <PriceTable rows={service.prices} caption={`Цены: ${title}`} />
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section aria-labelledby="faq-title" className="border-t border-line py-20 md:py-28">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader id="faq-title" index="06" eyebrow="Вопросы" title="Частые вопросы" className="lg:grid-cols-1" />
          </div>
          <Reveal className="lg:col-span-7 lg:col-start-6">
            <Faq items={service.faq} />
          </Reveal>
        </div>
      </section>

      {/* Другие услуги */}
      <nav aria-label="Другие услуги" className="border-t border-line">
        <ul className="container-x grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((s) => (
            <li key={s.slug} className="border-b border-line sm:px-6 max-lg:sm:odd:border-r max-lg:sm:odd:pl-0 max-lg:sm:even:pr-0 lg:border-b-0 lg:border-r lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0">
              <Link
                href={`/uslugi/${s.slug}`}
                className="group flex items-center justify-between gap-4 py-6 outline-hidden focus-visible:outline-2 focus-visible:outline-solid focus-visible:-outline-offset-2 focus-visible:outline-ring"
              >
                <span className="flex flex-col gap-1">
                  <span className="tech-label text-subtle">Услуга {s.index}</span>
                  <span className="text-lg font-medium">{s.shortTitle === "ТО" ? "Техобслуживание" : s.shortTitle}</span>
                </span>
                <ArrowRightIcon className="size-5 text-subtle transition-transform duration-200 group-hover:translate-x-1 group-hover:text-foreground" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* 7. Запись */}
      <BookingCta
        service={service.slug}
        title={isBody ? "Запишитесь на осмотр кузова" : "Записаться на ремонт"}
        lead={
          isBody
            ? "Осмотр и замер толщины покрытия — бесплатно. Назовём стоимость и срок до начала работ и зафиксируем их в заказ-наряде."
            : undefined
        }
        phone={phone}
      />
    </PageTransition>
  )
}

function CaseExample({ service }: { service: Service }) {
  const e = service.process.example
  const rows = [
    ["Проблема", e.problem],
    ["Диагностика", e.diagnosis],
    ["Решение", e.solution],
    ["Результат", e.result],
  ]
  return (
    <article className="grid gap-8 bg-ink p-6 text-foreground md:p-10 lg:grid-cols-12">
      <div className="flex flex-col gap-4 lg:col-span-4">
        <span className="tech-label text-brand">Пример из практики</span>
        <h3 className="text-h3 font-bold">{e.car}</h3>
        <dl className="mt-auto grid grid-cols-2 gap-4 border-t border-line pt-5">
          <div className="flex flex-col gap-1">
            <dt className="tech-label text-subtle">Срок</dt>
            <dd className="font-medium">{e.duration}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="tech-label text-subtle">Стоимость</dt>
            <dd className="font-medium">{e.price}</dd>
          </div>
        </dl>
      </div>
      <dl className="flex flex-col lg:col-span-8">
        {rows.map(([t, d]) => (
          <div key={t} className="grid gap-1.5 border-b border-line py-4 first:pt-0 last:border-b-0 md:grid-cols-[9rem_1fr] md:gap-6">
            <dt className="tech-label pt-1 text-subtle">{t}</dt>
            <dd className={t === "Результат" ? "text-[0.9375rem] text-foreground" : "text-[0.9375rem] text-muted-foreground"}>{d}</dd>
          </div>
        ))}
      </dl>
    </article>
  )
}
