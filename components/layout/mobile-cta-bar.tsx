"use client"

import { PhoneIcon } from "@phosphor-icons/react"
import { cn } from "cn"

import { BookingTrigger } from "@/components/booking/booking-trigger"
import { buttonVariants } from "@/components/ui/button"
import { site } from "@/lib/site"

/**
 * Нижняя панель на мобильной ширине: «Позвонить | Записаться».
 * Учитывает safe-area на iPhone; body получает такой же отступ снизу, чтобы панель
 * ничего не перекрывала (см. --mobile-bar-h в globals.css).
 */
export function MobileCtaBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/95 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid h-16 grid-cols-2 gap-2 px-3 py-2">
        <a href={site.phones.main.href} className={cn(buttonVariants({ variant: "outline", size: "md" }), "h-full w-full")}>
          <PhoneIcon aria-hidden="true" />
          Позвонить
        </a>
        <BookingTrigger size="md" className="h-full w-full">
          Записаться
        </BookingTrigger>
      </div>
    </div>
  )
}
