import type { StaticImageData } from "next/image"
import { cn } from "cn"

import { ParallaxImage } from "@/components/motion/parallax-image"
import { Breadcrumbs } from "@/components/sections/breadcrumbs"
import { typo } from "@/lib/typo"

const delay = (i: number) => ({ "--i": i }) as React.CSSProperties

/**
 * Hero внутренних страниц: фото + построчный заголовок (CSS-анимация до гидрации),
 * хлебные крошки, подзаголовок и слот действий.
 */
export function PageHero({
  title,
  lead,
  crumbs,
  image,
  eyebrow,
  children,
  aside,
  size = "lg",
  objectPosition,
}: {
  title: string | string[]
  lead?: string
  crumbs: { href: string; label: string }[]
  image?: { src: StaticImageData; alt: string }
  eyebrow?: string
  children?: React.ReactNode
  aside?: React.ReactNode
  size?: "lg" | "md"
  objectPosition?: string
}) {
  const lines = Array.isArray(title) ? title : [title]
  return (
    <section
      className={cn(
        "relative isolate flex flex-col justify-end overflow-hidden",
        image ? (size === "lg" ? "min-h-[88svh] md:min-h-[86svh]" : "min-h-[64svh]") : "pt-10"
      )}
    >
      {image ? (
        <>
          <ParallaxImage src={image.src} alt={image.alt} objectPosition={objectPosition} />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/10" />
          <div aria-hidden="true" className="absolute inset-0 hidden bg-gradient-to-r from-ink/70 via-ink/10 to-transparent lg:block" />
        </>
      ) : null}
      <div className={cn("container-x relative pb-10 md:pb-14", image ? "pt-36" : "pt-28 md:pt-36")}>
        <Breadcrumbs items={crumbs} className="hero-fade" />
        {eyebrow ? (
          <p className="hero-fade tech-label mt-8 flex items-center gap-2 text-foreground/80" style={delay(-2)}>
            <span className="size-1.5 bg-brand" aria-hidden="true" />
            {eyebrow}
          </p>
        ) : null}
        <h1 className={cn("text-h1 font-bold", eyebrow ? "mt-4" : "mt-8")}>
          {lines.map((l, i) => (
            <span key={l} className="hero-line" style={delay(i)}>
              <span>{typo(l)}</span>
            </span>
          ))}
        </h1>
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          {lead ? (
            <p className="hero-fade max-w-2xl text-lead text-foreground/85 lg:col-span-6" style={delay(0)}>
              {typo(lead)}
            </p>
          ) : null}
          {children ? (
            <div className="hero-fade flex flex-col gap-5 lg:col-span-6 lg:items-end" style={delay(1)}>
              {children}
            </div>
          ) : null}
        </div>
        {aside ? (
          <div className="hero-fade mt-10" style={delay(2)}>
            {aside}
          </div>
        ) : null}
      </div>
    </section>
  )
}
