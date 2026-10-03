import { ogSize, renderOg } from "@/lib/og"

export const alt = "О нас и наш цех — Цех78, автосервис в Санкт-Петербурге"
export const size = ogSize
export const contentType = "image/png"

export default function Image() {
  return renderOg({ eyebrow: "С 2016 года", title: "О нас и наш цех", photo: "workshop/osb-bay.jpg" })
}
