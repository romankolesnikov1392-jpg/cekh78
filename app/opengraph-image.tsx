import { ogSize, renderOg } from "@/lib/og"

export const alt = "Ремонт, который видно — Цех78, автосервис в Санкт-Петербурге"
export const size = ogSize
export const contentType = "image/png"

export default function Image() {
  return renderOg({ eyebrow: "Автосервис полного цикла", title: "Ремонт, который видно", photo: "hero/porsche-lift.jpg" })
}
