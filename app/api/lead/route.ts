import { NextResponse } from "next/server"

import { leadSchema } from "@/lib/lead"

/**
 * Приём заявок (запись, обратный звонок, предварительная оценка).
 *
 * ДЕМО-РЕЖИМ: заявка валидируется и не сохраняется.
 * TODO: connect form to CRM / Telegram bot / backend
 *   — например, отправка в Telegram Bot API (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID в env)
 *   или в CRM через вебхук (AmoCRM, Битрикс24, YCLIENTS). Секреты — только в переменных окружения.
 *
 * Чтобы показать состояние ошибки на демо, введите телефон +7 (000) 000-00-00.
 */
export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, message: "Некорректный запрос." }, { status: 400 })
  }

  const parsed = leadSchema.safeParse(body)
  if (!parsed.success) {
    const first = parsed.error.issues[0]
    return NextResponse.json(
      { ok: false, message: first?.message ?? "Проверьте правильность заполнения формы." },
      { status: 400 }
    )
  }

  // honeypot: боты заполняют скрытое поле — делаем вид, что всё хорошо
  if (parsed.data.website) {
    return NextResponse.json({ ok: true, id: "ignored" })
  }

  if (parsed.data.phone.replace(/\D/g, "") === "70000000000") {
    return NextResponse.json(
      { ok: false, message: "Сервис заявок временно недоступен." },
      { status: 503 }
    )
  }

  const id = `C78-${Date.now().toString(36).toUpperCase().slice(-6)}`
  return NextResponse.json({ ok: true, id })
}
