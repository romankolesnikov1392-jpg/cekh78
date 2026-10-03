"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "cn"
import { PhoneIcon, XIcon } from "@phosphor-icons/react"

import { useBooking } from "@/components/booking/booking-context"
import { Logo } from "@/components/brand/logo"
import { buttonVariants } from "@/components/ui/button"
import { DialogPrimitive } from "@/components/ui/dialog"
import { getServices } from "@/content/services"
import { mainNav, site } from "@/lib/site"
import { typo } from "@/lib/typo"

/**
 * Мобильное меню на Base UI Dialog: фокус-ловушка, Esc, возврат фокуса на кнопку.
 * Вход: фон проявляется за 220 мс, пункты поднимаются по очереди с шагом 35 мс.
 * Выход быстрее (160 мс) и без стаггера — система отвечает, а не показывает анимацию.
 */
export function MobileMenu({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const pathname = usePathname()
  const { openBooking } = useBooking()
  const services = getServices()
  const close = () => onOpenChange(false)
  let i = 0
  const item = () => ({ "--i": i++ }) as React.CSSProperties

  const itemClass =
    "transition-[opacity,transform] duration-[380ms] ease-[var(--ease-out)] [transition-delay:calc(60ms_+_var(--i)_*_35ms)] group-data-[starting-style]/menu:translate-y-3 group-data-[starting-style]/menu:opacity-0 motion-reduce:group-data-[starting-style]/menu:translate-y-0"

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Popup
          aria-label="Меню сайта"
          className={cn(
            "group/menu fixed inset-0 z-[75] flex flex-col overflow-y-auto overscroll-contain bg-ink text-foreground outline-hidden",
            "transition-opacity duration-[220ms] ease-out data-ending-style:opacity-0 data-ending-style:duration-150 data-starting-style:opacity-0"
          )}
        >
          <div className="container-x flex h-16 shrink-0 items-center justify-between border-b border-line">
            <Logo onClick={close} />
            <DialogPrimitive.Close
              aria-label="Закрыть меню"
              className="-mr-2 inline-flex size-11 items-center justify-center rounded-[2px] outline-hidden transition-colors hover:bg-foreground/[0.06] focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-ring active:scale-[0.97]"
            >
              <XIcon className="size-6" />
            </DialogPrimitive.Close>
          </div>

          <nav aria-label="Основная навигация" className="container-x flex flex-1 flex-col py-6">
            <ul className="flex flex-col">
              {mainNav.map((link, idx) => {
                const active = pathname === link.href || pathname.startsWith(link.href + "/")
                return (
                  <li key={link.href} style={item()} className={cn(itemClass, "border-b border-line")}>
                    <Link
                      href={link.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className="flex items-baseline gap-4 py-3.5 outline-hidden focus-visible:outline-2 focus-visible:outline-solid focus-visible:-outline-offset-2 focus-visible:outline-ring"
                    >
                      <span className="tech-label w-6 text-subtle tabular">0{idx + 1}</span>
                      <span
                        className={cn(
                          "font-display text-[2.5rem] leading-none font-bold sm:text-5xl",
                          active ? "text-brand" : "text-foreground"
                        )}
                      >
                        {link.label}
                      </span>
                    </Link>
                    {link.href === "/uslugi" ? (
                      <ul className="flex flex-wrap gap-x-4 gap-y-1 pb-4 pl-10">
                        {services.map((s) => (
                          <li key={s.slug}>
                            <Link
                              href={`/uslugi/${s.slug}`}
                              onClick={close}
                              className="inline-flex min-h-11 items-center text-[0.9375rem] text-muted-foreground outline-hidden hover:text-foreground focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-ring"
                            >
                              {s.shortTitle}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                )
              })}
            </ul>

            <div style={item()} className={cn(itemClass, "mt-auto flex flex-col gap-5 pt-10 pb-[max(1.5rem,env(safe-area-inset-bottom))]")}>
              <a href={site.phones.main.href} className="flex items-center gap-3 text-2xl font-medium tabular outline-hidden focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-ring">
                <PhoneIcon className="size-5 text-brand" aria-hidden="true" />
                {site.phones.main.display}
              </a>
              <p className="text-sm text-muted-foreground">
                {site.hours.map((h) => `${h.days} ${h.time}`).join(" · ")}
                <br />
                {typo(site.address.full)}
              </p>
              <a
                href="/kontakty#zapis"
                onClick={(e) => {
                  e.preventDefault()
                  close()
                  openBooking()
                }}
                className={cn(buttonVariants({ size: "lg" }), "w-full")}
              >
                Записаться на ремонт
              </a>
            </div>
          </nav>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
