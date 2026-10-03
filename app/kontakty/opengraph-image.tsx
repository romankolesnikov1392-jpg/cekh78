import { ogSize, renderOg } from "@/lib/og"

export const alt = "Контакты и схема проезда — Цех78, автосервис в Санкт-Петербурге"
export const size = ogSize
export const contentType = "image/png"

export default function Image() {
  return renderOg({ eyebrow: "Ул. Руставели, 13", title: "Контакты и схема проезда", photo: "workshop/mercedes-lift.jpg" })
}
