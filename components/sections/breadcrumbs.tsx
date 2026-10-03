import Link from "next/link"
import { cn } from "cn"

import { site } from "@/lib/site"

type Crumb = { href: string; label: string }

/** Хлебные крошки + BreadcrumbList JSON-LD. Последний пункт — текущая страница. */
export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  const all = [{ href: "/", label: "Главная" }, ...items]
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${site.url}${c.href === "/" ? "" : c.href}`,
    })),
  }
  return (
    <nav aria-label="Хлебные крошки" className={cn("tech-label", className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-foreground/70">
        {all.map((c, i) => {
          const last = i === all.length - 1
          return (
            <li key={c.href} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-foreground">
                  {c.label}
                </span>
              ) : (
                <>
                  <Link href={c.href} className="link-underline outline-hidden hover:text-foreground focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ring">
                    {c.label}
                  </Link>
                  <span aria-hidden="true" className="text-subtle">
                    /
                  </span>
                </>
              )}
            </li>
          )
        })}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
    </nav>
  )
}
