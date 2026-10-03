/**
 * Русская экранная типографика: не даём коротким словам «висеть» в конце строки,
 * склеиваем числа с единицами и разряды, ставим неразрывный пробел перед тире.
 * Применяется к контенту при рендере — исходные тексты остаются читаемыми.
 */
const NBSP = " "

const SHORT_WORDS =
  "а|в|во|и|к|ко|о|об|обо|от|до|по|с|со|у|за|из|на|не|ни|но|для|без|при|под|над|или|что|как|где|это|мы|вы|он|её|их|ее|да|уже|ещё|если|чем|так|все|всё|раз|под|про|через|после"

const shortWordRe = new RegExp(`(^|[\\s(«„"—–-])(${SHORT_WORDS})\\s+`, "giu")

export function typo(input: string): string {
  if (!input) return input
  let s = input
  // Два прохода — чтобы цепочки «и в», «а не» тоже склеились
  s = s.replace(shortWordRe, `$1$2${NBSP}`)
  s = s.replace(shortWordRe, `$1$2${NBSP}`)
  // Разряды: 48 000 → 48 000 (неразрывный)
  s = s.replace(/(\d)\s(?=\d{3}(?!\d))/g, `$1${NBSP}`)
  // Число + единица/знак: 12 мес., 3 дня, 1800 ₽, 60 °C
  s = s.replace(/(\d)\s+(?=[\p{L}₽%°×+])/gu, `$1${NBSP}`)
  // № 1, § 2
  s = s.replace(/([№§])\s+(?=\d)/g, `$1${NBSP}`)
  // Неразрывный пробел перед тире
  s = s.replace(/\s+—/g, `${NBSP}—`)
  // Сокращения в адресах: г. Санкт-Петербург, ул. Руставели, пр. Науки
  s = s.replace(/(^|[\s(])(г|ул|пр|просп|д|стр|корп|наб|пер|ш|им|ст|м)\.\s+/gu, `$1$2.${NBSP}`)
  // Санкт-Петербург не переносим по дефису (word joiner после дефиса)
  s = s.replace(/Санкт-(?=Петербург)/g, "Санкт-⁠")
  // Сокращения: т. е., т. д., и т. п.
  s = s.replace(/т\.\s?(е|д|п)\./g, `т.${NBSP}$1.`)
  return s
}

/** Глубокое применение typo к строкам объекта (для контент-файлов). */
const SKIP_KEYS = new Set([
  "slug",
  "href",
  "id",
  "src",
  "blurDataURL",
  "service",
  "services",
  "icon",
  "category",
  "date",
  "image",
  "cover",
  "before",
  "after",
  "phoneHref",
  "value",
  // мета-теги и title не типографим: неразрывные пробелы и word joiner там не нужны
  "meta",
])

export function typoDeep<T>(value: T, key?: string): T {
  if (key && SKIP_KEYS.has(key)) return value
  if (typeof value === "string") return typo(value) as T
  if (Array.isArray(value)) return value.map((v) => typoDeep(v)) as T
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value)) out[k] = typoDeep(v, k)
    return out as T
  }
  return value
}

/** «3 рабочих дня», «1 день»… */
export function plural(n: number, forms: [string, string, string]) {
  const n10 = n % 10
  const n100 = n % 100
  if (n10 === 1 && n100 !== 11) return forms[0]
  if (n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14)) return forms[1]
  return forms[2]
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("ru-RU").format(value).replace(/\s/g, NBSP)
}
