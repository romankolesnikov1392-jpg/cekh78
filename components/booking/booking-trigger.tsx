"use client"

import * as React from "react"
import type { VariantProps } from "class-variance-authority"
import { cn } from "cn"

import { useBooking } from "@/components/booking/booking-context"
import { Magnetic } from "@/components/motion/magnetic"
import { buttonVariants } from "@/components/ui/button"

type Props = {
  service?: string
  children: React.ReactNode
  className?: string
  magnetic?: boolean
} & VariantProps<typeof buttonVariants>

/**
 * Кнопка записи. Прогрессивное улучшение: это ссылка на форму на странице «Контакты»,
 * а с JS — открывает панель записи поверх текущей страницы с выбранной услугой.
 */
export function BookingTrigger({ service, children, className, magnetic, variant, size }: Props) {
  const { openBooking } = useBooking()
  const link = (
    <a
      href="/kontakty#zapis"
      aria-haspopup="dialog"
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return
        e.preventDefault()
        openBooking(service)
      }}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {children}
    </a>
  )
  return magnetic ? <Magnetic>{link}</Magnetic> : link
}
