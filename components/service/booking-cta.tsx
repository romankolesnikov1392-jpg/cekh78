import { ClockIcon, MapPinIcon, PhoneIcon } from "@phosphor-icons/react/ssr"

import { BookingForm } from "@/components/booking/booking-form"
import { Reveal } from "@/components/motion/reveal"
import { site } from "@/lib/site"
import { typo } from "@/lib/typo"

/** CTA-блок записи в конце страницы: форма с подставленной услугой + контакты. */
export function BookingCta({
  title = "Записаться на ремонт",
  lead = "Оставьте заявку — мастер-приёмщик перезвонит в течение 15 минут, уточнит детали и предложит время.",
  service,
  phone = site.phones.main,
  id = "zapis",
}: {
  title?: string
  lead?: string
  service?: string
  phone?: { label: string; display: string; href: string }
  id?: string
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line bg-surface py-20 md:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="flex flex-col gap-6 lg:col-span-5">
          <span className="tech-label text-brand">Запись в сервис</span>
          <h2 id={`${id}-title`} className="text-h2 font-bold">
            {typo(title)}
          </h2>
          <p className="max-w-md text-lead text-muted-foreground">{typo(lead)}</p>
          <ul className="mt-4 flex flex-col gap-4 border-t border-line pt-6 text-[0.9375rem]">
            <li className="flex items-start gap-3">
              <PhoneIcon className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
              <span className="flex flex-col">
                <a href={phone.href} className="link-underline w-fit text-lg font-medium tabular">
                  {phone.display}
                </a>
                <span className="text-sm text-subtle">{phone.label}</span>
              </span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <ClockIcon className="mt-0.5 size-5 shrink-0 text-subtle" aria-hidden="true" />
              {site.hours.map((h) => `${h.days} ${h.time}`).join(" · ")}
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <MapPinIcon className="mt-0.5 size-5 shrink-0 text-subtle" aria-hidden="true" />
              {typo(site.address.full)}
            </li>
          </ul>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-7">
          <div className="border border-line bg-background p-5 sm:p-8 md:p-10">
            <BookingForm defaultService={service} layout="grid" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
