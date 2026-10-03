"use client"

import * as React from "react"
import { cn } from "cn"
import { CheckIcon, WarningIcon } from "@phosphor-icons/react"

import { site } from "@/lib/site"

/** Экран успеха: заменяет форму. Фокус переносится на заголовок, чтобы скринридер его прочитал. */
export function FormSuccess({
  title,
  text,
  requestId,
  onReset,
  resetLabel = "Отправить ещё одну заявку",
  className,
}: {
  title: string
  text: React.ReactNode
  requestId?: string
  onReset?: () => void
  resetLabel?: string
  className?: string
}) {
  const ref = React.useRef<HTMLHeadingElement>(null)
  React.useEffect(() => {
    ref.current?.focus()
  }, [])
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-5 animate-in duration-300 fade-in-0 slide-in-from-bottom-2 motion-reduce:slide-in-from-bottom-0",
        className
      )}
    >
      <span className="flex size-12 items-center justify-center rounded-full border border-success/40 text-success">
        <CheckIcon className="size-6" weight="bold" aria-hidden="true" />
      </span>
      <h3 ref={ref} tabIndex={-1} className="font-display text-h3 font-bold outline-hidden">
        {title}
      </h3>
      <div className="max-w-md text-base text-muted-foreground">{text}</div>
      {requestId ? (
        <p className="tech-label text-subtle">
          Номер заявки: <span className="text-foreground">{requestId}</span>
        </p>
      ) : null}
      {onReset ? (
        <button
          type="button"
          onClick={onReset}
          className="link-underline text-sm font-medium text-foreground outline-hidden focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          {resetLabel}
        </button>
      ) : null}
    </div>
  )
}

/** Ошибка отправки: данные формы сохраняются, можно повторить или позвонить. */
export function FormError({ message, className }: { message: string; className?: string }) {
  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-3 rounded-[2px] border border-destructive/40 bg-destructive/[0.07] p-4 text-sm animate-in duration-300 fade-in-0",
        className
      )}
    >
      <WarningIcon className="mt-0.5 size-5 shrink-0 text-destructive" aria-hidden="true" />
      <div>
        <p className="font-medium text-foreground">Заявка не отправилась</p>
        <p className="mt-1 text-muted-foreground">
          {message} Данные в форме сохранены — можно отправить ещё раз или позвонить{" "}
          <a href={site.phones.main.href} className="prose-link whitespace-nowrap text-foreground">
            {site.phones.main.display}
          </a>
          .
        </p>
      </div>
    </div>
  )
}
