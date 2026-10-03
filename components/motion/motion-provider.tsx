"use client"

import { domAnimation, LazyMotion, MotionConfig } from "motion/react"

/**
 * LazyMotion + m-компоненты: в бандл попадает только domAnimation (анимации, варианты, exit, inView, hover/tap),
 * без drag и layout-анимаций — меньше JS и быстрее гидрация.
 * reducedMotion="user": при prefers-reduced-motion Motion сам отключает transform-анимации.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}
