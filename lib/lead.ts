import { z } from "zod"

/** Общая схема заявок: используется и в формах (клиент), и в /api/lead (сервер). */

const phoneDigits = (v: string) => v.replace(/\D/g, "")

export const phoneSchema = z
  .string()
  .trim()
  .refine((v) => phoneDigits(v).length === 11, "Введите номер полностью: +7 и 10 цифр")

export const consentSchema = z
  .boolean()
  .refine((v) => v === true, "Нужно согласие на обработку данных — без него мы не сможем перезвонить")

export const bookingSchema = z.object({
  kind: z.literal("booking"),
  name: z.string().trim().min(2, "Как к вам обращаться? Минимум 2 буквы").max(60, "Слишком длинное имя"),
  phone: phoneSchema,
  car: z.string().trim().min(2, "Укажите марку и модель, например: Kia Rio").max(80, "Слишком длинно"),
  service: z.string().min(1, "Выберите услугу"),
  date: z.string().optional(),
  comment: z.string().trim().max(1000, "Не больше 1000 символов").optional(),
  consent: consentSchema,
  // honeypot: живые люди это поле не видят и не заполняют
  website: z.string().max(0).optional(),
})

export const callbackSchema = z.object({
  kind: z.literal("callback"),
  name: z.string().trim().min(2, "Как к вам обращаться? Минимум 2 буквы").max(60, "Слишком длинное имя"),
  phone: phoneSchema,
  consent: consentSchema,
  website: z.string().max(0).optional(),
})

export const estimateSchema = z.object({
  kind: z.literal("estimate"),
  service: z.string().min(1, "Выберите услугу"),
  car: z.string().trim().min(2, "Укажите марку и модель").max(80, "Слишком длинно"),
  year: z.string().optional(),
  description: z.string().trim().min(10, "Опишите проблему хотя бы парой фраз — так мастер поймёт, о чём речь").max(1500),
  photos: z.number().int().min(0).max(5).optional(),
  name: z.string().trim().min(2, "Как к вам обращаться? Минимум 2 буквы").max(60),
  phone: phoneSchema,
  consent: consentSchema,
  website: z.string().max(0).optional(),
})

export const leadSchema = z.discriminatedUnion("kind", [bookingSchema, callbackSchema, estimateSchema])

export type BookingValues = z.infer<typeof bookingSchema>
export type CallbackValues = z.infer<typeof callbackSchema>
export type EstimateValues = z.infer<typeof estimateSchema>
export type Lead = z.infer<typeof leadSchema>

export type SubmitResult = { ok: true; id: string } | { ok: false; message: string }

/** Отправка заявки. Минимальная задержка — чтобы состояние «отправляем» не мигало. */
export async function submitLead(lead: Lead): Promise<SubmitResult> {
  const minDelay = new Promise((r) => setTimeout(r, 650))
  try {
    const [res] = await Promise.all([
      fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      }),
      minDelay,
    ])
    const data = (await res.json().catch(() => null)) as SubmitResult | null
    if (!res.ok || !data) {
      return { ok: false, message: data && !data.ok ? data.message : "Сервер не ответил. Попробуйте ещё раз." }
    }
    return data
  } catch {
    await minDelay
    return { ok: false, message: "Нет соединения с сервером. Проверьте интернет и попробуйте ещё раз." }
  }
}

/** Маска телефона +7 (XXX) XXX-XX-XX — мягкая, не мешает вставке из буфера. */
export function formatPhone(raw: string) {
  let d = raw.replace(/\D/g, "")
  if (d.startsWith("8")) d = "7" + d.slice(1)
  if (d && !d.startsWith("7")) d = "7" + d
  d = d.slice(0, 11)
  const p = d.slice(1)
  let out = "+7"
  if (p.length > 0) out += " (" + p.slice(0, 3)
  if (p.length >= 3) out += ")"
  if (p.length > 3) out += " " + p.slice(3, 6)
  if (p.length > 6) out += "-" + p.slice(6, 8)
  if (p.length > 8) out += "-" + p.slice(8, 10)
  return d.length === 0 ? "" : out
}
