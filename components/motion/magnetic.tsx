"use client"

import * as React from "react"
import { useMotionValue, useReducedMotion, useSpring } from "motion/react"
import * as m from "motion/react-m"

/**
 * «Магнитная» обёртка для крупных CTA: кнопка чуть тянется к курсору (не больше 6 px)
 * и пружиной возвращается на место. Только для точного указателя (мышь), без
 * prefers-reduced-motion. На тач-устройствах — обычная кнопка.
 */
export function Magnetic({
  children,
  strength = 0.22,
  max = 6,
  className,
}: {
  children: React.ReactNode
  strength?: number
  max?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLSpanElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 })
  const [enabled, setEnabled] = React.useState(false)

  React.useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)")
    const update = () => setEnabled(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  const active = enabled && !reduce
  const clamp = (v: number) => Math.max(-max, Math.min(max, v))

  return (
    <m.span
      ref={ref}
      className={className ?? "inline-flex"}
      style={active ? { x: sx, y: sy } : undefined}
      onPointerMove={(e) => {
        if (!active || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        x.set(clamp((e.clientX - (r.left + r.width / 2)) * strength))
        y.set(clamp((e.clientY - (r.top + r.height / 2)) * strength))
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </m.span>
  )
}
