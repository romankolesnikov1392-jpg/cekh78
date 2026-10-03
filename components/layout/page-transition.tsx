import { ViewTransition } from "react"

/**
 * Переход между страницами — View Transitions API (через React <ViewTransition>):
 * старая страница гаснет за 140 мс, новая проявляется с подъёмом на 10 px за 240–320 мс.
 * Работает на композиторе (не на главном потоке), не блокирует навигацию и клики
 * (::view-transition { pointer-events: none }). В браузерах без поддержки — мгновенная смена.
 * Стили — в globals.css (.page-enter / .page-exit), включая prefers-reduced-motion.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div>{children}</div>
    </ViewTransition>
  )
}
