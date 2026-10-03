import type { Block } from "@/content/posts"

/** Рендер статьи из структурированных блоков — единая типографика без markdown-зависимостей. */
export function Prose({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col text-[1.0625rem] leading-[1.75] text-foreground/90">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return (
              <p key={i} className="mb-6 first:text-lead first:leading-relaxed first:text-foreground">
                {b.text}
              </p>
            )
          case "h2":
            return (
              <h2 key={i} id={b.id} className="mt-12 mb-5 scroll-mt-28 text-[2.5rem] leading-[0.95] font-bold text-foreground first:mt-0 md:text-[2.875rem]">
                {b.text}
              </h2>
            )
          case "h3":
            return (
              <h3 key={i} className="mt-8 mb-3 text-[1.75rem] leading-none font-bold text-foreground">
                {b.text}
              </h3>
            )
          case "ul":
            return (
              <ul key={i} className="mb-7 flex flex-col gap-3">
                {b.items.map((it) => (
                  <li key={it} className="grid grid-cols-[1rem_1fr] gap-2">
                    <span aria-hidden="true" className="mt-[0.7em] size-1.5 bg-brand" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            )
          case "ol":
            return (
              <ol key={i} className="mb-7 flex flex-col gap-3">
                {b.items.map((it, n) => (
                  <li key={it} className="grid grid-cols-[2rem_1fr] gap-2">
                    <span aria-hidden="true" className="tech-label pt-[0.45em] text-subtle tabular">
                      {String(n + 1).padStart(2, "0")}
                    </span>
                    <span>{it}</span>
                  </li>
                ))}
              </ol>
            )
          case "callout":
            return (
              <aside key={i} className="my-6 border-l-2 border-brand bg-surface px-6 py-5 md:px-8 md:py-6">
                <p className="tech-label mb-2 text-brand">{b.title}</p>
                <p className="text-base leading-relaxed text-foreground/90">{b.text}</p>
              </aside>
            )
          case "steps":
            return (
              <ol key={i} className="my-4 mb-8 flex flex-col border-t border-line">
                {b.items.map((s, n) => (
                  <li key={s.title} className="grid grid-cols-[3rem_1fr] gap-3 border-b border-line py-5">
                    <span className="font-display text-3xl leading-[0.9] font-bold text-subtle tabular">{String(n + 1).padStart(2, "0")}</span>
                    <span className="flex flex-col gap-1">
                      <span className="font-medium text-foreground">{s.title}</span>
                      <span className="text-base text-muted-foreground">{s.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            )
          case "table":
            return (
              <div key={i} className="my-4 mb-8">
                {/* Телефон: строки таблицы как карточки */}
                <ul className="flex flex-col border-t border-line md:hidden">
                  {b.rows.map((r) => (
                    <li key={r[0]} className="flex flex-col gap-1 border-b border-line py-4">
                      <span className="font-medium text-foreground">{r[0]}</span>
                      <span className="tech-label text-brand">{r[1]}</span>
                      <span className="text-base text-muted-foreground">{r[2]}</span>
                    </li>
                  ))}
                </ul>
                <table className="hidden w-full border-collapse text-left text-base md:table">
                  <thead>
                    <tr className="tech-label border-b border-line-strong text-subtle">
                      {b.head.map((h) => (
                        <th key={h} scope="col" className="py-3 pr-6 font-medium">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r) => (
                      <tr key={r[0]} className="border-b border-line align-top">
                        <th scope="row" className="py-4 pr-6 font-medium text-foreground">
                          {r[0]}
                        </th>
                        <td className="py-4 pr-6 whitespace-nowrap text-foreground tabular">{r[1]}</td>
                        <td className="py-4 text-muted-foreground">{r[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
        }
      })}
    </div>
  )
}
