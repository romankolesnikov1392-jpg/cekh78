"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { PhoneIcon } from "@phosphor-icons/react"

import { useBooking } from "@/components/booking/booking-context"
import { BookingForm } from "@/components/booking/booking-form"
import { Dialog, DialogDescription, DialogSheet, DialogTitle } from "@/components/ui/dialog"
import { site } from "@/lib/site"

/** Панель записи: открывается из любой кнопки «Записаться», услуга подставляется. */
export function BookingDialog() {
  const { open, service: requested, setOpen } = useBooking()
  const pathname = usePathname()
  // на странице услуги подставляем её, даже если кнопка была без явной услуги (например, в шапке)
  const fromPath = pathname.match(/^\/uslugi\/([^/]+)/)?.[1]
  const service = requested ?? fromPath
  // ключ пересоздаёт форму при каждом открытии — свежие значения и подставленная услуга
  const [formKey, setFormKey] = React.useState(0)

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (next) setFormKey((k) => k + 1)
      }}
    >
      <DialogSheet className="overflow-y-auto overscroll-contain" aria-describedby={undefined}>
        <div className="flex flex-col gap-8 px-5 pt-7 pb-8 sm:px-8 md:px-10 md:pt-12">
          <div className="flex flex-col gap-3 pr-12">
            <span className="tech-label text-brand">Запись в сервис</span>
            <DialogTitle className="text-h3 md:text-[2.75rem] md:leading-[0.95]">Записаться на ремонт</DialogTitle>
            <DialogDescription className="text-base">
              Оставьте контакты — перезвоним в течение 15 минут в рабочее время и подберём удобное время.
            </DialogDescription>
            <a
              href={site.phones.main.href}
              className="mt-1 inline-flex w-fit items-center gap-2 text-base font-medium text-foreground outline-hidden focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              <PhoneIcon className="size-4 text-brand" aria-hidden="true" />
              <span className="link-underline">Или позвоните: {site.phones.main.display}</span>
            </a>
          </div>
          <BookingForm key={formKey} defaultService={service} onDone={() => setOpen(false)} />
        </div>
      </DialogSheet>
    </Dialog>
  )
}
