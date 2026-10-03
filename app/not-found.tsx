import Link from "next/link"
import { cn } from "cn"

import { buttonVariants } from "@/components/ui/button"
import { getServices } from "@/content/services"

export const metadata = { title: "Страница не найдена" }

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80svh] flex-col justify-end gap-8 pt-36 pb-16">
      <p className="tech-label text-brand">Ошибка 404</p>
      <h1 className="text-h1 font-bold">
        Такой страницы
        <br />
        нет в цеху
      </h1>
      <p className="max-w-xl text-lead text-muted-foreground">
        Возможно, ссылка устарела или в адресе опечатка. Вот куда можно перейти:
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/" className={buttonVariants({ size: "lg" })}>
          На главную
        </Link>
        <Link href="/uslugi" className={buttonVariants({ variant: "outline", size: "lg" })}>
          Услуги и цены
        </Link>
      </div>
      <ul className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6">
        {getServices().map((s) => (
          <li key={s.slug}>
            <Link href={`/uslugi/${s.slug}`} className={cn("link-underline text-[0.9375rem] text-muted-foreground hover:text-foreground")}>
              {s.shortTitle}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
