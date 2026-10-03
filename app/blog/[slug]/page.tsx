import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowRightIcon, PhoneIcon } from "@phosphor-icons/react/ssr"

import { PostCard } from "@/components/blog/post-card"
import { Prose } from "@/components/blog/prose"
import { Toc } from "@/components/blog/toc"
import { BookingTrigger } from "@/components/booking/booking-trigger"
import { PageTransition } from "@/components/layout/page-transition"
import { Reveal } from "@/components/motion/reveal"
import { Breadcrumbs } from "@/components/sections/breadcrumbs"
import { ArrowLink } from "@/components/sections/section-header"
import { getPost, getPosts, readingTime } from "@/content/posts"
import { getService } from "@/content/services"
import { pageMetadata } from "@/lib/seo"
import { site } from "@/lib/site"

export const dynamicParams = false

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params
  const post = getPost(slug)
  if (!post) return {}
  const base = pageMetadata({ title: post.meta.title, description: post.meta.description, path: `/blog/${slug}`, type: "article" })
  return { ...base, openGraph: { ...base.openGraph, type: "article", publishedTime: post.date } }
}

export default async function PostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params
  const post = getPost(slug)
  if (!post) notFound()

  const service = getService(post.service)
  const toc = post.blocks.flatMap((b) => (b.type === "h2" ? [{ id: b.id, text: b.text }] : []))
  const related = getPosts().filter((p) => p.slug !== post.slug).slice(0, 3)

  const ld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.meta.description,
    datePublished: post.date,
    inLanguage: "ru",
    image: `${site.url}${post.cover.src.src}`,
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
  }

  return (
    <PageTransition>
      <article>
        <header className="container-x pt-28 md:pt-36">
          <Breadcrumbs
            className="hero-fade"
            items={[
              { href: "/blog", label: "Блог" },
              { href: `/blog/${post.slug}`, label: post.title },
            ]}
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            <div className="flex flex-col gap-6 lg:col-span-9">
              <p className="hero-fade tech-label flex flex-wrap gap-x-3 gap-y-1 text-subtle" style={{ "--i": -2 } as React.CSSProperties}>
                <span className="text-brand">{post.category}</span>
                <time dateTime={post.date}>{post.dateLabel}</time>
                <span>{readingTime(post)} мин чтения</span>
              </p>
              <h1 className="text-h1 font-bold">
                <span className="hero-line" style={{ "--i": 0 } as React.CSSProperties}>
                  <span>{post.title}</span>
                </span>
              </h1>
              <p className="hero-fade max-w-3xl text-lead text-muted-foreground" style={{ "--i": 0 } as React.CSSProperties}>
                {post.excerpt}
              </p>
            </div>
          </div>
        </header>

        <div className="hero-fade container-x mt-10 md:mt-14" style={{ "--i": 1 } as React.CSSProperties}>
          <div className="relative aspect-[4/3] overflow-hidden bg-surface-2 md:aspect-[21/9]">
            <Image src={post.cover.src} alt={post.cover.alt} fill preload sizes="(min-width: 1440px) 1360px, 100vw" placeholder="blur" className="object-cover" />
          </div>
        </div>

        <div className="container-x grid gap-12 py-14 md:py-20 lg:grid-cols-12 lg:gap-10">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28">
              <Toc items={toc} />
            </div>
          </aside>
          <div className="min-w-0 lg:col-span-7 lg:col-start-5">
            <div className="max-w-[68ch]">
              <Prose blocks={post.blocks} />
            </div>

            {/* CTA в конце статьи */}
            <Reveal className="mt-14 flex flex-col gap-6 border border-line bg-surface p-6 md:p-10">
              <span className="tech-label text-brand">{service?.shortTitle === "ТО" ? "Техобслуживание" : service?.shortTitle}</span>
              <h2 className="text-h3 font-bold md:text-[2.75rem] md:leading-[0.95]">{post.ctaTitle}</h2>
              <p className="max-w-xl text-muted-foreground">
                Запишитесь на диагностику — мастер покажет, в каком состоянии машина, и назовёт стоимость до начала работ.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <BookingTrigger service={post.service} size="lg" className="w-full sm:w-auto">
                  Записаться на диагностику
                  <ArrowRightIcon className="transition-transform duration-200 group-hover/button:translate-x-0.5" aria-hidden="true" />
                </BookingTrigger>
                <a href={site.phones.main.href} className="inline-flex items-center gap-2 font-medium tabular outline-hidden focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-ring">
                  <PhoneIcon className="size-4 text-brand" aria-hidden="true" />
                  <span className="link-underline">{site.phones.main.display}</span>
                </a>
              </div>
              {service ? <ArrowLink href={`/uslugi/${service.slug}`}>Подробнее об услуге и цены</ArrowLink> : null}
            </Reveal>
          </div>
        </div>
      </article>

      <section aria-labelledby="related-title" className="border-t border-line py-20 md:py-28">
        <div className="container-x flex flex-col gap-12">
          <div className="flex items-end justify-between gap-6">
            <h2 id="related-title" className="text-h2 font-bold">
              Читать дальше
            </h2>
            <ArrowLink href="/blog" className="mb-2 shrink-0">
              Все статьи
            </ArrowLink>
          </div>
          <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
    </PageTransition>
  )
}
