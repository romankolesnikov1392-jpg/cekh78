import type { Metadata, Viewport } from "next"
import { Golos_Text, JetBrains_Mono, Sofia_Sans_Extra_Condensed } from "next/font/google"
import { MotionProvider } from "@/components/motion/motion-provider"

import "./globals.css"
import { BookingProvider } from "@/components/booking/booking-context"
import { BookingDialog } from "@/components/booking/booking-dialog"
import { MobileCtaBar } from "@/components/layout/mobile-cta-bar"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { LocalBusinessJsonLd } from "@/components/seo/json-ld"
import { site } from "@/lib/site"

const sofia = Sofia_Sans_Extra_Condensed({
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700", "800"],
  variable: "--font-sofia",
  display: "swap",
})

const golos = Golos_Text({
  subsets: ["latin", "cyrillic"],
  variable: "--font-golos",
  display: "swap",
})

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Цех78 — автосервис полного цикла в Санкт-Петербурге",
    template: "%s | Цех78",
  },
  description:
    "Кузовной ремонт и покраска, ТО, ходовая, автоэлектрика, ремонт двигателя и КПП. Фиксируем цену после диагностики, фотоотчёт по ремонту, гарантия до 12 месяцев.",
  applicationName: site.name,
  // Демо-проект: бренд и адрес вымышленные, поэтому по умолчанию не индексируем.
  robots: site.indexing ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: site.name,
  },
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  themeColor: "#121314",
  colorScheme: "dark",
  viewportFit: "cover",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${sofia.variable} ${golos.variable} ${jetbrains.variable}`}>
      <head>
        <noscript>
          {/* Без JS блоки со scroll-reveal должны быть видны */}
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <LocalBusinessJsonLd />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[100] rounded-[2px] bg-brand px-4 py-3 font-medium text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Перейти к содержанию
        </a>
        <MotionProvider>
          <BookingProvider>
            <SiteHeader />
            <main id="main" tabIndex={-1} className="outline-hidden">
              {children}
            </main>
            <SiteFooter />
            <MobileCtaBar />
            <BookingDialog />
          </BookingProvider>
        </MotionProvider>
      </body>
    </html>
  )
}
