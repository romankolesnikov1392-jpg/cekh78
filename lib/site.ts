/**
 * Конфигурация бренда.
 *
 * ВАЖНО: «Цех78» — вымышленный бренд, демонстрационный проект для портфолио.
 * Адрес выбран как правдоподобный, но бизнеса по нему нет; телефоны с кодом 000
 * в Санкт-Петербурге не существуют. Перед запуском реального сайта всё здесь
 * заменяется данными клиента.
 */

const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined

export const site = {
  name: "Цех78",
  tagline: "Ремонт, который видно",
  description:
    "Автосервис полного цикла в Санкт-Петербурге — от диагностики и ТО до кузовного ремонта и покраски.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? productionUrl ?? "http://localhost:3000",
  /** Индексация выключена по умолчанию: бренд и адрес вымышленные. Включается SITE_INDEXING=true. */
  indexing: process.env.SITE_INDEXING === "true",
  founded: 2016,
  city: "Санкт-Петербург",
  address: {
    street: "ул. Руставели, 13",
    city: "Санкт-Петербург",
    full: "г. Санкт-Петербург, ул. Руставели, 13",
    note: "Въезд со двора, ворота с табличкой «Цех78». Парковка для клиентов — 6 мест.",
    // Маршрут в Яндекс Картах: от текущего местоположения до адреса
    routeUrl: `https://yandex.ru/maps/?rtext=~${encodeURIComponent("Санкт-Петербург, улица Руставели, 13")}&rtt=auto`,
  },
  phones: {
    main: {
      label: "Общие вопросы и запись",
      display: "+7 (812) 000-78-78",
      href: "tel:+78120007878",
    },
    body: {
      label: "Кузовной цех и покраска",
      display: "+7 (812) 000-78-80",
      href: "tel:+78120007880",
    },
  },
  hours: [
    { days: "Пн–Сб", time: "09:00–21:00" },
    { days: "Вс", time: "10:00–18:00" },
  ],
  /** Для JSON-LD (schema.org/OpeningHoursSpecification) */
  openingHoursSpec: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "21:00" },
    { days: ["Sunday"], opens: "10:00", closes: "18:00" },
  ],
  // TODO: заменить на реальные аккаунты клиента. Сейчас ведут на главные страницы площадок.
  socials: [
    { id: "telegram", label: "Telegram", href: "https://t.me/" },
    { id: "vk", label: "ВКонтакте", href: "https://vk.com/" },
  ],
  stats: {
    years: 10,
    cars: 2400,
    brands: 14,
    warrantyMonths: 12,
  },
} as const

export const mainNav = [
  { href: "/uslugi", label: "Услуги" },
  { href: "/raboty", label: "Работы" },
  { href: "/o-nas", label: "О нас" },
  { href: "/blog", label: "Блог" },
  { href: "/kontakty", label: "Контакты" },
] as const

export type SiteConfig = typeof site
