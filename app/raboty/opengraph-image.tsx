import { ogSize, renderOg } from "@/lib/og"

export const alt = "Работы до и после ремонта — Цех78, автосервис в Санкт-Петербурге"
export const size = ogSize
export const contentType = "image/png"

export default function Image() {
  return renderOg({ eyebrow: "До и после", title: "Работы до и после ремонта", photo: "services/kuzov-hero.jpg" })
}
