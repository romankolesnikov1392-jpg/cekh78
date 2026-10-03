"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { cn } from "cn"
import { XIcon } from "@phosphor-icons/react"

/**
 * Диалоги на Base UI: фокус-ловушка, Esc, возврат фокуса, aria-modal — из коробки.
 * Вид: на телефоне — нижний лист (iOS-кривая drawer), на десктопе — правая панель.
 * Вход 420 мс, выход быстрее (240 мс): система отвечает, пользователь не ждёт.
 */
const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogClose = DialogPrimitive.Close
const DialogPortal = DialogPrimitive.Portal

function DialogBackdrop({ className, ...props }: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-backdrop"
      className={cn(
        "fixed inset-0 z-[80] bg-black/65 transition-opacity duration-300 ease-out",
        "data-ending-style:opacity-0 data-ending-style:duration-200 data-starting-style:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function DialogSheet({
  className,
  children,
  closeLabel = "Закрыть",
  ...props
}: DialogPrimitive.Popup.Props & { closeLabel?: string }) {
  return (
    <DialogPortal>
      <DialogBackdrop />
      <DialogPrimitive.Popup
        data-slot="dialog-sheet"
        className={cn(
          "fixed z-[90] flex flex-col bg-surface text-foreground outline-hidden",
          // мобильный нижний лист
          "inset-x-0 bottom-0 max-h-[92svh] border-t border-line-strong pb-[env(safe-area-inset-bottom)]",
          // десктоп: правая панель
          "md:inset-y-0 md:right-0 md:left-auto md:max-h-none md:w-[min(560px,100vw)] md:border-t-0 md:border-l md:pb-0",
          "transition-[transform,opacity] duration-[420ms] ease-[var(--ease-drawer)]",
          "data-starting-style:translate-y-full data-ending-style:translate-y-full md:data-starting-style:translate-x-full md:data-starting-style:translate-y-0 md:data-ending-style:translate-x-full md:data-ending-style:translate-y-0",
          "data-ending-style:duration-[240ms]",
          "motion-reduce:transition-opacity motion-reduce:data-starting-style:translate-0 motion-reduce:data-ending-style:translate-0 motion-reduce:data-starting-style:opacity-0 motion-reduce:data-ending-style:opacity-0",
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          className="absolute top-3 right-3 z-10 inline-flex size-11 items-center justify-center rounded-[2px] text-muted-foreground transition-colors duration-150 hover:bg-foreground/[0.06] hover:text-foreground focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.97] md:top-5 md:right-5"
          aria-label={closeLabel}
        >
          <XIcon className="size-5" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Popup>
    </DialogPortal>
  )
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("font-display text-h3 font-bold", className)}
      {...props}
    />
  )
}

function DialogDescription({ className, ...props }: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogDescription,
  DialogPortal,
  DialogSheet,
  DialogTitle,
  DialogTrigger,
}
export { DialogPrimitive }
