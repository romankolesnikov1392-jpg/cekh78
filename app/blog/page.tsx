import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "@phosphor-icons/react/ssr"

import { PostCard } from "@/components/blog/post-card"
import { PageTransition } from "@/components/layout/page-transition"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { PageHero } from "@/components/sections/page-hero"
import { getPosts, readingTime } from "@/content/posts"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Блог: ремонт и обслуживание автомобиля простыми словами",
  description:
    "Статьи мастеров Цех78: подготовка машины к зиме в Петербурге, признаки неисправностей ходовой, сайлентблоки, ТО по регламенту, технология покраски, проверка авто перед покупкой.",
  path: "/blog",
})

export default function BlogPage() {
  const [featured, ...rest] = getPosts()
  return (
    <PageTransition>
      <PageHero
        crumbs={[{ href: "/blog", label: "Блог" }]}
        eyebrow="Пишут мастера цеха"
        title="Блог"
        lead="Объясняем, что происходит с машиной, так же, как объясняем клиентам у подъёмника: без запугивания и без лишних работ."
      />

      <section aria-label="Статьи" className="pb-20 md:pb-28">
        <div className="container-x flex flex-col gap-16 md:gap-20">
          <Reveal>
            <article className="group relative grid gap-8 border-t border-line pt-10 lg:grid-cols-12 lg:gap-10">
              <div className="relative aspect-[16/10] overflow-hidden bg-surface-2 lg:col-span-7">
                <Image src={featured.cover.src} alt={featured.cover.alt} fill preload sizes="(min-width: 1024px) 58vw, 100vw" placeholder="blur" className="img-zoom object-cover" />
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-brand transition-transform duration-300 ease-[var(--ease-out)] group-hover:scale-x-100" />
              </div>
              <div className="flex flex-col gap-5 lg:col-span-5 lg:justify-end">
                <p className="tech-label flex flex-wrap gap-x-3 text-subtle">
                  <span className="text-brand">Новое</span>
                  <span className="text-foreground/80">{featured.category}</span>
                  <time dateTime={featured.date}>{featured.dateLabel}</time>
                  <span>{readingTime(featured)} мин чтения</span>
                </p>
                <h2 className="text-h2 font-bold">
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="outline-hidden after:absolute after:inset-0 after:content-[''] focus-visible:after:outline-2 focus-visible:after:outline-solid focus-visible:after:outline-offset-4 focus-visible:after:outline-ring"
                  >
                    {featured.title}
                  </Link>
                </h2>
                <p className="text-lead text-muted-foreground">{featured.excerpt}</p>
                <span aria-hidden="true" className="inline-flex items-center gap-2 text-[0.9375rem] font-medium">
                  Читать статью
                  <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </div>
            </article>
          </Reveal>

          <RevealGroup className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
            {rest.map((p) => (
              <RevealItem key={p.slug}>
                <PostCard post={p} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </PageTransition>
  )
}
