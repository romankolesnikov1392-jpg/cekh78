import Link from "next/link"
import { cn } from "cn"
import { ArrowRightIcon } from "@phosphor-icons/react/ssr"

import { Reveal } from "@/components/motion/reveal"
import { typo } from "@/lib/typo"

/**
 * Заголовок секции: техническая подпись с номером, крупный H2 слева,
 * пояснение и ссылка — справа внизу (асимметрия вместо «всё по центру»).
 */
export function SectionHeader({
  index,
  eyebrow,
  title,
  lead,
  action,
  id,
  className,
  tone = "dark",
}: {
  index?: string
  eyebrow: string
  title: string
  lead?: string
  action?: { href: string; label: string }
  id?: string
  className?: string
  tone?: "dark" | "light"
}) {
  const light = tone === "light"
  return (
    <div className={cn("grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10", className)}>
      <Reveal className="flex flex-col gap-5 lg:col-span-7">
        <p className={cn("tech-label flex items-center gap-3", light ? "text-concrete-muted" : "text-subtle")}>
          {index ? <span className={cn("tabular", light ? "text-concrete-ink" : "text-foreground")}>{index}</span> : null}
          {index ? <span aria-hidden="true" className={cn("h-px w-8", light ? "bg-concrete-ink/30" : "bg-line-strong")} /> : null}
          <span>{eyebrow}</span>
        </p>
        <h2 id={id} className="text-h2 font-bold">
          {typo(title)}
        </h2>
      </Reveal>
      {lead || action ? (
        <Reveal delay={0.08} className="flex flex-col items-start gap-5 lg:col-span-4 lg:col-start-9">
          {lead ? (
            <p className={cn("text-base md:text-lg", light ? "text-concrete-muted" : "text-muted-foreground")}>{typo(lead)}</p>
          ) : null}
          {action ? <ArrowLink href={action.href}>{action.label}</ArrowLink> : null}
        </Reveal>
      ) : null}
    </div>
  )
}

export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group/arrow inline-flex items-center gap-2 text-[0.9375rem] font-medium outline-hidden focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-ring",
        className
      )}
    >
      <span className="link-underline">{children}</span>
      <ArrowRightIcon
        className="size-4 transition-transform duration-200 ease-out group-hover/arrow:translate-x-1"
        aria-hidden="true"
      />
    </Link>
  )
}

/** Метка для демо-материалов — честно, но ненавязчиво */
export function DemoBadge({ children = "Демо-фото", className }: { children?: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "tech-label inline-flex items-center gap-1.5 rounded-[2px] border border-line-strong bg-ink/85 px-2 py-1 text-[0.625rem] text-foreground/80",
        className
      )}
    >
      <span className="size-1 rounded-full bg-brand" aria-hidden="true" />
      {children}
    </span>
  )
}
