"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "cn"
import { ArrowRightIcon, ListIcon } from "@phosphor-icons/react"

import { BookingTrigger } from "@/components/booking/booking-trigger"
import { Logo } from "@/components/brand/logo"
import { MobileMenu } from "@/components/layout/mobile-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { getServices } from "@/content/services"
import { mainNav, site } from "@/lib/site"

const navLinkClass =
  "relative inline-flex h-10 items-center px-3 text-[0.9375rem] text-muted-foreground transition-colors duration-150 outline-hidden hover:text-foreground focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ring rounded-[2px] data-[active=true]:text-foreground"

function ActiveMark({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute inset-x-3 -bottom-px h-px origin-left bg-brand transition-transform duration-300 ease-[var(--ease-out)]",
        active ? "scale-x-100" : "scale-x-0"
      )}
    />
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const services = getServices()

  React.useEffect(() => {
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 24))
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  // закрываем мобильное меню при переходе на другую страницу (корректировка состояния во время рендера)
  const [menuPath, setMenuPath] = React.useState(pathname)
  if (menuPath !== pathname) {
    setMenuPath(pathname)
    setMenuOpen(false)
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/")

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ease-out",
        scrolled
          ? "border-b border-line bg-ink/88 backdrop-blur-md supports-[backdrop-filter]:bg-ink/75"
          : "border-b border-transparent bg-gradient-to-b from-black/55 to-transparent"
      )}
    >
      <div
        className={cn(
          "container-x flex h-16 items-center gap-6 md:h-[4.5rem]"
        )}
      >
        <Logo className="shrink-0" />

        <NavigationMenu className="ml-6 hidden lg:block" aria-label="Основная навигация">
          <NavigationMenuList className="gap-0.5">
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(navLinkClass, "cursor-pointer gap-1.5")}
                data-active={isActive("/uslugi")}
              >
                Услуги
                <ActiveMark active={isActive("/uslugi")} />
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid grid-cols-[1.35fr_1fr]">
                  <ul className="flex flex-col p-2">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <NavigationMenuLink
                          render={<Link href={`/uslugi/${s.slug}`} />}
                          className="group/item flex items-start gap-4 rounded-[2px] px-4 py-3.5 outline-hidden transition-colors duration-150 hover:bg-foreground/[0.05] focus-visible:bg-foreground/[0.05] focus-visible:outline-2 focus-visible:outline-solid focus-visible:-outline-offset-2 focus-visible:outline-ring"
                        >
                          <span className="tech-label pt-1 text-subtle tabular group-hover/item:text-brand">{s.index}</span>
                          <span className="flex flex-col gap-1">
                            <span className="text-[0.9375rem] font-medium text-foreground">{s.shortTitle === "ТО" ? "Техническое обслуживание" : s.shortTitle}</span>
                            <span className="text-sm text-muted-foreground">{s.highlights.slice(0, 2).join(" · ")}</span>
                          </span>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col justify-between gap-6 border-l border-line bg-surface-2/60 p-6">
                    <div className="flex flex-col gap-3">
                      <span className="tech-label text-brand">Без сюрпризов</span>
                      <p className="font-display text-[1.75rem] leading-[1] font-bold text-balance">
                        Цену фиксируем после диагностики
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Диагностика ходовой — 0 ₽ при ремонте. Дополнительные работы — только после вашего «да».
                      </p>
                    </div>
                    <NavigationMenuLink
                      render={<Link href="/uslugi" />}
                      className="group/all inline-flex items-center gap-2 text-sm font-medium text-foreground outline-hidden focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-ring"
                    >
                      <span className="link-underline">Все услуги и цены</span>
                      <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover/all:translate-x-0.5" aria-hidden="true" />
                    </NavigationMenuLink>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {mainNav.slice(1).map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink
                  render={<Link href={item.href} />}
                  className={navLinkClass}
                  data-active={isActive(item.href)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                  <ActiveMark active={isActive(item.href)} />
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center gap-2 sm:gap-5">
          <a
            href={site.phones.main.href}
            className="hidden flex-col items-end leading-tight outline-hidden focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-ring xl:flex"
          >
            <span className="text-[0.9375rem] font-medium tabular text-foreground">{site.phones.main.display}</span>
            <span className="tech-label mt-1 text-subtle">Пн–Сб 9–21 · Вс 10–18</span>
          </a>
          <BookingTrigger size="sm" className="px-4 sm:px-5">
            Записаться
          </BookingTrigger>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Открыть меню"
            aria-expanded={menuOpen}
            aria-haspopup="dialog"
            className="-mr-2 inline-flex size-11 items-center justify-center rounded-[2px] text-foreground outline-hidden transition-colors hover:bg-foreground/[0.06] focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-ring active:scale-[0.97] lg:hidden"
          >
            <ListIcon className="size-6" />
          </button>
        </div>
      </div>
      <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} />
    </header>
  )
}
