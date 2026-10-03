"use client"

import * as React from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence, useReducedMotion } from "motion/react"
import * as m from "motion/react-m"
import { cn } from "cn"
import { ArrowLeftIcon, ArrowRightIcon, CameraIcon, XIcon } from "@phosphor-icons/react"

import { FormError, FormSuccess } from "@/components/booking/form-status"
import { FormField, Spinner, describedBy } from "@/components/booking/form-field"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { RadioCard, RadioGroup } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { getServices } from "@/content/services"
import { estimateSchema, formatPhone, submitLead, type EstimateValues } from "@/lib/lead"

type Status = { state: "idle" } | { state: "submitting" } | { state: "success"; id: string } | { state: "error"; message: string }

const STEPS = ["Услуга", "Автомобиль", "Описание и фото"] as const
const STEP_FIELDS: (keyof EstimateValues)[][] = [["service"], ["car", "year"], ["description", "name", "phone", "consent"]]
const YEARS = Array.from({ length: 2026 - 1999 }, (_, i) => String(2026 - i))
const MAX_PHOTOS = 5

/**
 * «Быстрая оценка»: три шага, без обещания точной цены.
 * Фото пока остаются в браузере (превью) — загрузка на сервер не подключена.
 */
export function EstimateForm({ className }: { className?: string }) {
  const services = getServices()
  const reduce = useReducedMotion()
  const uid = React.useId()
  const id = (n: string) => `${uid}-${n}`
  const [step, setStep] = React.useState(0)
  const [direction, setDirection] = React.useState(1)
  const [status, setStatus] = React.useState<Status>({ state: "idle" })
  const [photos, setPhotos] = React.useState<{ url: string; name: string }[]>([])
  const [dragOver, setDragOver] = React.useState(false)
  const stepHeadingRef = React.useRef<HTMLHeadingElement>(null)
  const firstRender = React.useRef(true)

  const { register, handleSubmit, control, formState, trigger, watch, reset, setValue } = useForm<EstimateValues>({
    resolver: zodResolver(estimateSchema),
    mode: "onTouched",
    defaultValues: {
      kind: "estimate",
      service: "",
      car: "",
      year: "",
      description: "",
      photos: 0,
      name: "",
      phone: "",
      consent: false,
      website: "",
    },
  })
  const errors = formState.errors
  const selected = services.find((s) => s.slug === watch("service"))

  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    stepHeadingRef.current?.focus()
  }, [step])

  // освобождаем blob-ссылки только при размонтировании (удалённые — сразу в removePhoto)
  const photosRef = React.useRef(photos)
  photosRef.current = photos
  React.useEffect(() => () => photosRef.current.forEach((p) => URL.revokeObjectURL(p.url)), [])

  function addFiles(list: FileList | null) {
    if (!list) return
    const files = Array.from(list).filter((f) => f.type.startsWith("image/"))
    setPhotos((prev) => {
      const next = [...prev, ...files.map((f) => ({ url: URL.createObjectURL(f), name: f.name }))].slice(0, MAX_PHOTOS)
      setValue("photos", next.length)
      return next
    })
  }

  function removePhoto(index: number) {
    setPhotos((prev) => {
      const removed = prev[index]
      if (removed) URL.revokeObjectURL(removed.url)
      const next = prev.filter((_, i) => i !== index)
      setValue("photos", next.length)
      return next
    })
  }

  async function next() {
    const ok = await trigger(STEP_FIELDS[step])
    if (!ok) return
    setDirection(1)
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }

  function back() {
    setDirection(-1)
    setStep((s) => Math.max(s - 1, 0))
  }

  async function onSubmit(values: EstimateValues) {
    setStatus({ state: "submitting" })
    // TODO: connect form to CRM / Telegram bot / backend — загрузка фото (multipart, до 5 файлов)
    const res = await submitLead({ ...values, photos: photos.length })
    setStatus(res.ok ? { state: "success", id: res.id } : { state: "error", message: res.message })
  }

  if (status.state === "success") {
    return (
      <FormSuccess
        className={className}
        title="Заявка получена"
        requestId={status.id}
        text={<p>Мастер свяжется с вами для уточнения деталей.</p>}
        onReset={() => {
          reset()
          setPhotos([])
          setStep(0)
          setStatus({ state: "idle" })
        }}
        resetLabel="Оценить другой ремонт"
      />
    )
  }

  const submitting = status.state === "submitting"
  const offset = reduce ? 0 : 16

  return (
    <form
      noValidate
      onSubmit={(e) => {
        if (step < STEPS.length - 1) {
          e.preventDefault()
          void next()
          return
        }
        void handleSubmit(onSubmit)(e)
      }}
      className={cn("flex flex-col gap-8", className)}
      aria-busy={submitting}
    >
      <input type="hidden" {...register("kind")} />
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <input tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      {/* Прогресс */}
      <ol className="grid grid-cols-3 gap-2" aria-label="Шаги оценки">
        {STEPS.map((label, i) => (
          <li key={label} aria-current={i === step ? "step" : undefined} className="flex flex-col gap-2.5">
            <span className="relative h-0.5 overflow-hidden bg-line">
              <span
                className="absolute inset-0 origin-left bg-brand transition-transform duration-300 ease-[var(--ease-out)]"
                style={{ transform: `scaleX(${i <= step ? 1 : 0})` }}
              />
            </span>
            <span className={cn("tech-label transition-colors", i <= step ? "text-foreground" : "text-subtle")}>
              <span className="tabular">0{i + 1}</span>
              <span className="hidden sm:inline"> · {label}</span>
            </span>
          </li>
        ))}
      </ol>

      <div className="relative min-h-[22rem]">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <m.fieldset
            key={step}
            disabled={submitting}
            custom={direction}
            initial={{ opacity: 0, transform: `translateX(${direction * offset}px)` }}
            animate={{ opacity: 1, transform: "translateX(0px)", transition: { duration: 0.22, ease: [0.23, 1, 0.32, 1] } }}
            exit={{ opacity: 0, transform: `translateX(${-direction * offset}px)`, transition: { duration: 0.12, ease: "easeOut" } }}
            className="flex flex-col gap-6"
          >
            <legend className="sr-only">
              Шаг {step + 1} из {STEPS.length}: {STEPS[step]}
            </legend>
            <h3 ref={stepHeadingRef} tabIndex={-1} className="font-display text-h3 font-bold outline-hidden">
              {step === 0 && "Что нужно сделать?"}
              {step === 1 && "Какой у вас автомобиль?"}
              {step === 2 && "Опишите задачу"}
            </h3>

            {step === 0 && (
              <>
                <Controller
                  control={control}
                  name="service"
                  render={({ field }) => (
                    <RadioGroup
                      value={field.value}
                      onValueChange={(v) => field.onChange(v as string)}
                      aria-label="Услуга"
                      aria-invalid={!!errors.service}
                      aria-describedby={describedBy(id("service"), errors.service)}
                      className="grid gap-2 sm:grid-cols-2"
                    >
                      {services.map((s) => (
                        <RadioCard key={s.slug} value={s.slug}>
                          <span className="block font-medium text-foreground">{s.shortTitle === "ТО" ? "Техническое обслуживание" : s.shortTitle}</span>
                          <span className="mt-1 block text-sm text-muted-foreground">{s.priceFrom}</span>
                        </RadioCard>
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.service ? (
                  <p id={`${id("service")}-error`} role="alert" className="text-sm text-destructive">
                    {errors.service.message}
                  </p>
                ) : (
                  <p className="text-sm text-subtle">
                    {selected
                      ? `Ориентир: ${selected.priceFrom}. Точную стоимость назовём после осмотра.`
                      : "Цена — ориентир. Точную стоимость называем только после диагностики."}
                  </p>
                )}
              </>
            )}

            {step === 1 && (
              <div className="grid gap-5 sm:grid-cols-[1fr_12rem]">
                <FormField id={id("car")} label="Марка и модель" required error={errors.car?.message}>
                  <Input
                    id={id("car")}
                    placeholder="Например, Skoda Octavia"
                    autoComplete="off"
                    aria-invalid={!!errors.car}
                    aria-describedby={describedBy(id("car"), errors.car)}
                    {...register("car")}
                  />
                </FormField>
                <FormField id={id("year")} label="Год выпуска">
                  <NativeSelect id={id("year")} {...register("year")}>
                    <NativeSelectOption value="">Не важно</NativeSelectOption>
                    {YEARS.map((y) => (
                      <NativeSelectOption key={y} value={y}>
                        {y}
                      </NativeSelectOption>
                    ))}
                    <NativeSelectOption value="older">Старше 2000</NativeSelectOption>
                  </NativeSelect>
                </FormField>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-5">
                <FormField
                  id={id("description")}
                  label="Что случилось"
                  required
                  error={errors.description?.message}
                >
                  <Textarea
                    id={id("description")}
                    placeholder="Например: вмятина на задней левой двери после парковки, краска цела…"
                    autoComplete="off"
                    aria-invalid={!!errors.description}
                    aria-describedby={describedBy(id("description"), errors.description)}
                    {...register("description")}
                  />
                </FormField>

                {/* Загрузка фото — визуальный mockup. TODO: connect upload to backend */}
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium" id={id("photos-label")}>
                    Фото повреждения <span className="ml-1 text-xs font-normal text-subtle">до {MAX_PHOTOS} шт., необязательно</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {photos.map((p, i) => (
                      <div key={p.url} className="group/photo relative size-20 overflow-hidden rounded-[2px] border border-line">
                        {/* eslint-disable-next-line @next/next/no-img-element -- локальное превью blob: */}
                        <img src={p.url} alt={`Загруженное фото ${i + 1}`} width={80} height={80} className="size-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removePhoto(i)}
                          className="absolute top-1 right-1 flex size-7 items-center justify-center rounded-[2px] bg-ink/80 text-foreground outline-hidden hover:bg-ink focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-ring"
                          aria-label={`Удалить фото ${i + 1}`}
                        >
                          <XIcon className="size-3.5" />
                        </button>
                      </div>
                    ))}
                    {photos.length < MAX_PHOTOS && (
                      <label
                        onDragOver={(e) => {
                          e.preventDefault()
                          setDragOver(true)
                        }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={(e) => {
                          e.preventDefault()
                          setDragOver(false)
                          addFiles(e.dataTransfer.files)
                        }}
                        className={cn(
                          "flex h-20 min-w-20 flex-1 cursor-pointer items-center justify-center gap-3 rounded-[2px] border border-dashed border-line-strong px-4 text-sm text-muted-foreground transition-colors duration-150 hover:border-foreground/50 hover:text-foreground focus-within:outline-2 focus-within:outline-solid focus-within:outline-offset-2 focus-within:outline-ring",
                          dragOver && "border-brand text-foreground"
                        )}
                      >
                        <CameraIcon className="size-5 shrink-0" aria-hidden="true" />
                        <span>{photos.length ? "Добавить ещё" : "Перетащите фото или выберите файл"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="sr-only"
                          aria-labelledby={id("photos-label")}
                          onChange={(e) => {
                            addFiles(e.target.files)
                            e.target.value = ""
                          }}
                        />
                      </label>
                    )}
                  </div>
                  <p className="text-xs text-subtle">Демо-режим: фото остаются на вашем устройстве и никуда не загружаются.</p>
                </div>

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
                        <span>Согласен на обработку персональных данных для связи по заявке.</span>
                      </label>
                    )}
                  />
                  {errors.consent ? (
                    <p id={`${id("consent")}-error`} role="alert" className="pl-8 text-sm text-destructive">
                      {errors.consent.message}
                    </p>
                  ) : null}
                </div>
              </div>
            )}
          </m.fieldset>
        </AnimatePresence>
      </div>

      {status.state === "error" ? <FormError message={status.message} /> : null}

      <div className="flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        {step > 0 ? (
          <Button type="button" variant="ghost" onClick={back} disabled={submitting} className="w-full sm:w-auto">
            <ArrowLeftIcon aria-hidden="true" />
            Назад
          </Button>
        ) : (
          <p className="text-sm text-subtle">Займёт меньше минуты</p>
        )}
        {step < STEPS.length - 1 ? (
          <Button type="submit" size="lg" className="w-full sm:w-auto">
            Далее
            <ArrowRightIcon className="transition-transform duration-200 ease-out group-hover/button:translate-x-0.5" aria-hidden="true" />
          </Button>
        ) : (
          <Button type="submit" size="lg" disabled={submitting} data-loading={submitting} className="w-full sm:w-auto">
            {submitting ? (
              <>
                <Spinner />
                Отправляем…
              </>
            ) : (
              <>
                Получить предварительную оценку
                <ArrowRightIcon className="transition-transform duration-200 ease-out group-hover/button:translate-x-0.5" aria-hidden="true" />
              </>
            )}
          </Button>
        )}
      </div>
    </form>
  )
}
