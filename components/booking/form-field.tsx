import * as React from "react"
import { cn } from "cn"
import { WarningCircleIcon } from "@phosphor-icons/react/ssr"

/**
 * Обёртка поля: подпись, подсказка, ошибка. Ошибка связана с полем через aria-describedby
 * (id передаётся в поле снаружи), объявляется скринридером через role="alert".
 */
export function FormField({
  id,
  label,
  required,
  hint,
  error,
  className,
  children,
}: {
  id: string
  label: React.ReactNode
  required?: boolean
  hint?: React.ReactNode
  error?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {required ? (
          <span className="ml-0.5 text-brand" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1.5 text-xs font-normal text-subtle">необязательно</span>
        )}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="flex items-start gap-1.5 text-sm text-destructive">
          <WarningCircleIcon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-sm text-subtle">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

export function describedBy(id: string, error?: unknown, hint?: unknown) {
  if (error) return `${id}-error`
  if (hint) return `${id}-hint`
  return undefined
}

export function Spinner({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-5 animate-spin [animation-duration:700ms]", className)}
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.5" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}
