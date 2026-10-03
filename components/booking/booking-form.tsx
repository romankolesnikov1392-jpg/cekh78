"use client"

import * as React from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "cn"
import { ArrowRightIcon } from "@phosphor-icons/react"

import { FormError, FormSuccess } from "@/components/booking/form-status"
import { FormField, Spinner, describedBy } from "@/components/booking/form-field"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Textarea } from "@/components/ui/textarea"
import { serviceLabel, serviceOptions } from "@/content/services"
import { bookingSchema, formatPhone, submitLead, type BookingValues } from "@/lib/lead"

type Status = { state: "idle" } | { state: "submitting" } | { state: "success"; id: string } | { state: "error"; message: string }

/**
 * Единая форма записи. Состояния: default → focus → loading → success / error.
 * Валидация — при уходе с поля, затем на лету. Ошибки связаны с полями через aria.
 */
export function BookingForm({
  defaultService,
  className,
  onDone,
  layout = "stack",
}: {
  defaultService?: string
  className?: string
  onDone?: () => void
  layout?: "stack" | "grid"
}) {
  const uid = React.useId()
  const id = (name: string) => `${uid}-${name}`
  const [status, setStatus] = React.useState<Status>({ state: "idle" })
  const [minDate, setMinDate] = React.useState<string>()

  React.useEffect(() => {
    // минимальная дата — сегодня (считаем на клиенте, чтобы не было расхождения при гидрации)
    const d = new Date()
    setMinDate(new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10))
  }, [])

  const form = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    mode: "onTouched",
    defaultValues: {
      kind: "booking",
      name: "",
      phone: "",
      car: "",
      service: defaultService ?? "",
      date: "",
      comment: "",
      consent: false,
      website: "",
    },
  })
  const { register, handleSubmit, control, formState, reset, watch } = form
  const errors = formState.errors

  async function onSubmit(values: BookingValues) {
    setStatus({ state: "submitting" })
    const result = await submitLead(values)
    setStatus(result.ok ? { state: "success", id: result.id } : { state: "error", message: result.message })
  }

  if (status.state === "success") {
    const values = watch()
    return (
      <FormSuccess
        className={className}
        title="Заявка принята"
        requestId={status.id}
        text={
          <>
            <p>
              {values.name}, мастер-приёмщик перезвонит вам в течение 15 минут в рабочее время, чтобы подтвердить время
              записи.
            </p>
            <p className="mt-3 text-foreground">
              {[serviceLabel(values.service), values.car].filter(Boolean).join(" · ")}
            </p>
            <p className="mt-3 text-sm text-subtle">Демонстрационный режим: заявка никуда не отправлена.</p>
          </>
        }
        onReset={() => {
          reset()
          setStatus({ state: "idle" })
          onDone?.()
        }}
        resetLabel={onDone ? "Закрыть" : "Отправить ещё одну заявку"}
      />
    )
  }

  const submitting = status.state === "submitting"

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      aria-busy={submitting}
    >
      <input type="hidden" {...register("kind")} />
      {/* honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Сайт
          <input tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      <fieldset disabled={submitting} className="contents">
        <div className={cn("grid gap-5", layout === "grid" && "md:grid-cols-2")}>
          <FormField id={id("name")} label="Имя" required error={errors.name?.message}>
            <Input
              id={id("name")}
              autoComplete="given-name"
              placeholder="Как к вам обращаться…"
              aria-invalid={!!errors.name}
              aria-describedby={describedBy(id("name"), errors.name)}
              {...register("name")}
            />
          </FormField>

          <FormField id={id("phone")} label="Телефон" required error={errors.phone?.message}>
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <Input
                  id={id("phone")}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+7 (___) ___-__-__"
                  aria-invalid={!!errors.phone}
                  aria-describedby={describedBy(id("phone"), errors.phone)}
                  name={field.name}
                  ref={field.ref}
                  value={field.value}
                  onBlur={field.onBlur}
                  onChange={(e) => field.onChange(formatPhone(e.target.value))}
                />
              )}
            />
          </FormField>

          <FormField id={id("car")} label="Марка и модель автомобиля" required error={errors.car?.message}>
            <Input
              id={id("car")}
              placeholder="Например, Kia Rio 2019"
              autoComplete="off"
              aria-invalid={!!errors.car}
              aria-describedby={describedBy(id("car"), errors.car)}
              {...register("car")}
            />
          </FormField>

          <FormField id={id("service")} label="Какая услуга нужна?" required error={errors.service?.message}>
            <NativeSelect
              id={id("service")}
              aria-invalid={!!errors.service}
              aria-describedby={describedBy(id("service"), errors.service)}
              {...register("service")}
            >
              <NativeSelectOption value="" disabled>
                Выберите услугу
              </NativeSelectOption>
              {serviceOptions.map((o) => (
                <NativeSelectOption key={o.value} value={o.value}>
                  {o.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </FormField>

          <FormField
            id={id("date")}
            label="Желаемая дата"
            hint="Время подберём по телефону"
            error={errors.date?.message}
          >
            <Input
              id={id("date")}
              type="date"
              min={minDate}
              aria-describedby={describedBy(id("date"), errors.date, true)}
              {...register("date")}
            />
          </FormField>

          <FormField
            id={id("comment")}
            label="Комментарий"
            className={cn(layout === "grid" && "md:col-span-2")}
            error={errors.comment?.message}
          >
            <Textarea
              id={id("comment")}
              placeholder="Что беспокоит: стук спереди справа, вмятина на двери, пора на ТО…"
              autoComplete="off"
              aria-invalid={!!errors.comment}
              aria-describedby={describedBy(id("comment"), errors.comment)}
              {...register("comment")}
            />
          </FormField>
        </div>

        <div className="flex flex-col gap-2">
          <Controller
            control={control}
            name="consent"
            render={({ field }) => (
              <label className="flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(v) => field.onChange(v === true)}
                  onBlur={field.onBlur}
                  inputRef={field.ref}
                  aria-invalid={!!errors.consent}
                  aria-describedby={describedBy(id("consent"), errors.consent)}
                  className="mt-0.5"
                />
                <span>
                  Согласен на обработку персональных данных для связи по заявке.{" "}
                  <span className="text-subtle">Данные не передаются третьим лицам.</span>
                </span>
              </label>
            )}
          />
          {errors.consent ? (
            <p id={`${id("consent")}-error`} role="alert" className="pl-8 text-sm text-destructive">
              {errors.consent.message}
            </p>
          ) : null}
        </div>
      </fieldset>

      {status.state === "error" ? <FormError message={status.message} /> : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={submitting} data-loading={submitting} className="w-full sm:w-auto">
          {submitting ? (
            <>
              <Spinner />
              Отправляем…
            </>
          ) : (
            <>
              Записаться на ремонт
              <ArrowRightIcon className="transition-transform duration-200 ease-out group-hover/button:translate-x-0.5" aria-hidden="true" />
            </>
          )}
        </Button>
        <p className="text-sm text-subtle">Перезвоним в течение 15 минут</p>
      </div>
      <p className="sr-only" aria-live="polite">
        {submitting ? "Отправляем заявку" : ""}
      </p>
    </form>
  )
}
