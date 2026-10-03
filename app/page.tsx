import type { Metadata } from "next"

import { PostCard } from "@/components/blog/post-card"
import { EstimateSection } from "@/components/home/estimate-section"
import { FeaturedWorks } from "@/components/home/featured-works"
import { HomeHero } from "@/components/home/home-hero"
import { RepairProcess } from "@/components/home/repair-process"
import { ReviewsScroller } from "@/components/home/reviews"
import { ServicesShowcase } from "@/components/home/services-showcase"
import { Transparency } from "@/components/home/transparency"
import { TrustFacts } from "@/components/home/trust-facts"
import { TrustPoints } from "@/components/home/trust-points"
import { WorkshopTeaser } from "@/components/home/workshop-teaser"
import { PageTransition } from "@/components/layout/page-transition"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { SectionHeader } from "@/components/sections/section-header"
import { reviews } from "@/content/company"
import { getPosts } from "@/content/posts"
import { getFeaturedWorks, getWorks } from "@/content/works"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Цех78 — автосервис полного цикла в Санкт-Петербурге",
  absoluteTitle: true,
  description:
    "Кузовной ремонт и покраска, ТО, ходовая, автоэлектрика, ремонт двигателя и КПП на ул. Руставели. Фиксируем цену после диагностики, фотоотчёт, гарантия до 12 месяцев.",
  path: "/",
})

export default function HomePage() {
  const posts = getPosts().slice(0, 3)
  return (
    <PageTransition>
      <HomeHero />
      <TrustFacts />
      <ServicesShowcase />

      <section aria-labelledby="works-title" className="border-t border-line py-20 md:py-32">
        <div className="container-x flex flex-col gap-12 md:gap-16">
          <SectionHeader
            id="works-title"
            index="02"
            eyebrow="До и после"
            title="Ремонт, который видно — буквально"
            lead="Потяните разделитель, чтобы сравнить. Сейчас здесь демонстрационные фото: на рабочем сайте — реальные машины клиентов."
            action={{ href: "/raboty", label: `Все работы (${getWorks().length})` }}
          />
          <Reveal>
            <FeaturedWorks works={getFeaturedWorks()} />
          </Reveal>
        </div>
      </section>

      <TrustPoints />
      <RepairProcess />
      <Transparency />
      <EstimateSection />
      <WorkshopTeaser />

      <section aria-labelledby="reviews-title" className="border-t border-line py-20 md:py-32">
        <div className="container-x flex flex-col gap-12 md:gap-16">
          <SectionHeader
            id="reviews-title"
            index="08"
            eyebrow="Отзывы"
            title="Возвращаются и привозят машины родственников"
            lead="Отзывы на этой странице демонстрационные. На рабочем сайте здесь будут отзывы с Яндекс Карт и 2ГИС со ссылками на оригиналы."
          />
          <Reveal>
            <ReviewsScroller reviews={reviews} />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="blog-title" className="border-t border-line py-20 md:py-32">
        <div className="container-x flex flex-col gap-12 md:gap-16">
          <SectionHeader
            id="blog-title"
            index="09"
            eyebrow="Блог"
            title="Объясняем так же, как клиентам у подъёмника"
            action={{ href: "/blog", label: "Все статьи" }}
          />
          <RevealGroup className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {posts.map((p, i) => (
              <RevealItem key={p.slug} className={i === 2 ? "sm:col-span-2 lg:col-span-1" : undefined}>
                <PostCard post={p} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </PageTransition>
  )
}
