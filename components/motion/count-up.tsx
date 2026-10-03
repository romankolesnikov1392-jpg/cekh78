"use client"

import * as React from "react"
import NumberFlow from "@number-flow/react"
import { useInView } from "motion/react"

/**
 * Анимированное число (NumberFlow): цифры прокручиваются один раз, 900 мс, сильный ease-out —
 * без «казино»-эффекта бесконечного перебора.
 * SSR отдаёт итоговое значение (видно поисковикам и без JS). Если блок ниже экрана —
 * тихо обнуляем и проигрываем при появлении; если уже на экране — оставляем как есть.
 * NumberFlow сам уважает prefers-reduced-motion.
 */
export function CountUp({
  value,
  suffix,
  className,
}: {
  value: number
  suffix?: string
  className?: string
}) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  // offscreen: блок был ниже экрана при загрузке — тогда показываем 0 и проигрываем при появлении
  const [offscreen, setOffscreen] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    if (rect.top >= window.innerHeight || rect.bottom <= 0) setOffscreen(true)
  }, [])

  const state = { value: offscreen && !inView ? 0 : value, animated: offscreen && inView }

  return (
    <span ref={ref} className={className}>
      <NumberFlow
        value={state.value}
        animated={state.animated}
        locales="ru-RU"
        suffix={suffix}
        format={{ useGrouping: true }}
        transformTiming={{ duration: 900, easing: "cubic-bezier(0.23, 1, 0.32, 1)" }}
        spinTiming={{ duration: 900, easing: "cubic-bezier(0.23, 1, 0.32, 1)" }}
        opacityTiming={{ duration: 350, easing: "ease-out" }}
        willChange
      />
    </span>
  )
}
