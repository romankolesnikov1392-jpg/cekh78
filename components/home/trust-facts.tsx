import { BrandIcon, brandNames } from "@/components/brand/brand-icons"
import { CountUp } from "@/components/motion/count-up"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { brands, trustFacts } from "@/content/company"

// Сетка 2×2 на телефоне и 4 в ряд на десктопе — тонкие разделители вместо карточек
const CELL = [
  "border-r border-b pr-5 lg:border-b-0 lg:pr-8",
  "border-b pl-5 lg:border-r lg:border-b-0 lg:px-8",
  "border-r pr-5 lg:px-8",
  "pl-5 lg:pl-8",
]

/** Блок доверия сразу после hero: 4 проверяемых факта и марки на обслуживании. */
export function TrustFacts({ showBrands = true }: { showBrands?: boolean }) {
  return (
    <section aria-label="Цех78 в цифрах" className="border-b border-line">
      <RevealGroup as="div" className="container-x grid grid-cols-2 lg:grid-cols-4" stagger={0.08}>
        {trustFacts.map((f, i) => (
          <RevealItem
            key={f.caption}
            className={`flex flex-col gap-3 border-line py-8 md:py-12 ${CELL[i]}`}
          >
            <p className="flex items-baseline gap-2 font-display text-stat font-bold tabular">
              <CountUp value={f.value} suffix={f.suffix} />
              {f.unit ? <span className="text-[0.42em] font-semibold text-muted-foreground">{f.unit}</span> : null}
            </p>
            <p className="text-sm text-muted-foreground md:text-base">{f.caption}</p>
          </RevealItem>
        ))}
      </RevealGroup>
      {showBrands ? (
        <Reveal className="border-t border-line">
          <div className="container-x flex flex-col gap-4 py-6 md:flex-row md:items-center md:gap-10">
            <p className="tech-label shrink-0 text-subtle">Обслуживаем</p>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-4 md:gap-x-8" aria-label="Марки на обслуживании">
              {brands.map((b) => (
                <li key={b} className="text-subtle transition-colors duration-200 hover:text-foreground">
                  <BrandIcon brand={b} className="size-6 md:size-7" />
                  <span className="sr-only">{brandNames[b]}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ) : null}
    </section>
  )
}
