import { cn } from "cn"

import { RevealGroup, RevealItem } from "@/components/motion/reveal"
import type { PriceRow } from "@/content/services"
import { formatPrice, typo } from "@/lib/typo"

function priceLabel(row: PriceRow) {
  if (typeof row.price === "string") return { prefix: "", value: typo(row.price) }
  if (row.price === 0) return { prefix: "", value: "бесплатно" }
  return { prefix: row.exact ? "" : "от", value: `${formatPrice(row.price)} ₽` }
}

/**
 * Прайс «услуга / цена от». Семантическая таблица; на телефоне строка перестраивается
 * в два уровня (название, ниже — цена справа). Строки проявляются по очереди (40 мс).
 */
export function PriceTable({ rows, caption, className }: { rows: PriceRow[]; caption: string; className?: string }) {
  return (
    <table className={cn("w-full border-collapse text-left", className)}>
      <caption className="sr-only">{caption}</caption>
      <thead>
        <tr className="tech-label border-b border-line-strong text-subtle">
          <th scope="col" className="py-3 pr-4 font-medium">
            Услуга
          </th>
          <th scope="col" className="py-3 text-right font-medium">
            Цена
          </th>
        </tr>
      </thead>
      <RevealGroup as="tbody" stagger={0.04} amount={0.05}>
        {rows.map((row) => {
          const p = priceLabel(row)
          return (
            <RevealItem as="tr" y={8} key={row.name} className="group border-b border-line transition-colors duration-150 hover:bg-foreground/[0.025]">
              <th scope="row" className="py-4 pr-4 align-baseline text-[0.9375rem] font-normal text-foreground md:py-5 md:text-base">
                {typo(row.name)}
                {row.unit ? <span className="ml-2 text-sm text-subtle">{row.unit}</span> : null}
              </th>
              <td className={cn("py-4 text-right align-baseline md:py-5", typeof row.price === "string" ? "max-w-[9.5rem] sm:max-w-none" : "whitespace-nowrap")}>
                {p.prefix ? <span className="mr-1.5 text-sm text-subtle">{p.prefix}</span> : null}
                <span className={cn("font-medium tabular", row.price === 0 ? "text-success" : "text-foreground")}>{p.value}</span>
              </td>
            </RevealItem>
          )
        })}
      </RevealGroup>
    </table>
  )
}
