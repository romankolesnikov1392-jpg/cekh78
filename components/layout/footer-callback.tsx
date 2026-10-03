"use client"

import { usePathname } from "next/navigation"

/**
 * Блок «Перезвоним» в футере показываем только там, где на странице нет своей формы записи
 * (главная, блог, 404) — иначе внизу оказываются две формы подряд.
 */
const PAGES_WITH_BOOKING = ["/uslugi", "/raboty", "/o-nas", "/kontakty"]

export function FooterCallbackGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hasBooking = PAGES_WITH_BOOKING.some((p) => pathname === p || pathname.startsWith(p + "/"))
  return hasBooking ? null : <>{children}</>
}
