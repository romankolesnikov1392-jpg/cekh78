"use client"

import { useReducedMotion } from "motion/react"
import * as m from "motion/react-m"
import { cn } from "cn"

/**
 * Линия, которая «прорисовывается» при входе в вьюпорт (scaleX / scaleY).
 * Объясняющая анимация для схемы этапов: один раз, 1,1 с, ease-in-out (движение по экрану).
 */
export function DrawLine({
  orientation = "horizontal",
  className,
  delay = 0.1,
}: {
  orientation?: "horizontal" | "vertical"
  className?: string
  delay?: number
}) {
  const reduce = useReducedMotion()
  const horizontal = orientation === "horizontal"
  return (
    <m.span
      aria-hidden="true"
      className={cn("block", horizontal ? "origin-left" : "origin-top", className)}
      initial={{ transform: horizontal ? "scaleX(0)" : "scaleY(0)" }}
      whileInView={{ transform: horizontal ? "scaleX(1)" : "scaleY(1)" }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: reduce ? 0 : 1.1, ease: [0.77, 0, 0.175, 1], delay }}
      data-reveal=""
    />
  )
}
