import { ogSize, renderOg } from "@/lib/og"

export const alt = "Услуги и цены — Цех78, автосервис в Санкт-Петербурге"
export const size = ogSize
export const contentType = "image/png"

export default function Image() {
  return renderOg({ eyebrow: "Пять направлений", title: "Услуги и цены", photo: "workshop/hall.jpg" })
}
