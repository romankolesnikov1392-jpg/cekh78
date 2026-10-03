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
import { callbackSchema, formatPhone, submitLead, type CallbackValues } from "@/lib/lead"

type Status = { state: "idle" } | { state: "submitting" } | { state: "success"; id: string } | { state: "error"; message: string }

/** Короткая форма «Перезвоните мне»: имя, телефон, согласие. */
export function CallbackForm({ className }: { className?: string }) {
  const uid = React.useId()
  const id = (n: string) => `${uid}-${n}`
  const [status, setStatus] = React.useState<Status>({ state: "idle" })
  const { register, handleSubmit, control, formState, reset, getValues } = useForm<CallbackValues>({
    resolver: zodResolver(callbackSchema),
    mode: "onTouched",
    defaultValues: { kind: "callback", name: "", phone: "", consent: false, website: "" },
  })
  const errors = formState.errors

  async function onSubmit(values: CallbackValues) {
    setStatus({ state: "submitting" })
    const res = await submitLead(values)
    setStatus(res.ok ? { state: "success", id: res.id } : { state: "error", message: res.message })
  }

  if (status.state === "success") {
    return (
      <FormSuccess
        className={className}
        title="Перезвоним"
        requestId={status.id}
        text={<p>{getValues("name")}, мастер-приёмщик позвонит в течение 15 минут в рабочее время.</p>}
        onReset={() => {
          reset()
          setStatus({ state: "idle" })
        }}
      />
    )
  }

  const submitting = status.state === "submitting"

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className={cn("flex flex-col gap-5", className)} aria-busy={submitting}>
      <input type="hidden" {...register("kind")} />
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <input tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>
      <fieldset disabled={submitting} className="contents">
        <div className="grid gap-5 sm:grid-cols-2">
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
                <span>Согласен на обработку персональных данных для обратного звонка.</span>
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
      <Button type="submit" size="lg" disabled={submitting} data-loading={submitting} className="w-full sm:w-fit">
        {submitting ? (
          <>
            <Spinner />
            Отправляем…
          </>
        ) : (
          <>
            Перезвоните мне
            <ArrowRightIcon className="transition-transform duration-200 ease-out group-hover/button:translate-x-0.5" aria-hidden="true" />
          </>
        )}
      </Button>
    </form>
  )
}
