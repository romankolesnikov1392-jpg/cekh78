"use client"

import * as React from "react"
import { cn } from "cn"

/** Оглавление статьи с подсветкой текущего раздела (IntersectionObserver). */
export function Toc({ items }: { items: { id: string; text: string }[] }) {
  const [active, setActive] = React.useState(items[0]?.id)

  React.useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: "-80px 0px -65% 0px" }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items])

  return (
    <nav aria-label="Содержание статьи" className="flex flex-col gap-4">
      <p className="tech-label text-subtle">Содержание</p>
      <ol className="flex flex-col border-l border-line">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              aria-current={active === i.id ? "location" : undefined}
              className={cn(
                "-ml-px block border-l py-1.5 pl-4 text-sm transition-colors duration-150 outline-hidden focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-ring",
                active === i.id ? "border-brand text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {i.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
