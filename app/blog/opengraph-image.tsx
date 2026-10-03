import { ogSize, renderOg } from "@/lib/og"

export const alt = "Блог о ремонте и обслуживании — Цех78, автосервис в Санкт-Петербурге"
export const size = ogSize
export const contentType = "image/png"

export default function Image() {
  return renderOg({ eyebrow: "Пишут мастера", title: "Блог о ремонте и обслуживании", photo: "blog/winter.jpg" })
}
