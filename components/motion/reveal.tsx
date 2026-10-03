"use client"

import * as React from "react"
import { useReducedMotion, type Variants } from "motion/react"
import * as m from "motion/react-m"

/**
 * Скролл-reveal: fade-up 16px при входе в вьюпорт (IntersectionObserver внутри Motion).
 * — Срабатывает один раз: повторная анимация при каждом скролле утомляет.
 * — Анимируем полный transform-строкой (аппаратное ускорение), а не x/y.
 * — prefers-reduced-motion: сдвиг убирается, остаётся мягкое проявление.
 * — Без JS блоки видны: см. <noscript> в layout.
 */
export const EASE_OUT = [0.23, 1, 0.32, 1] as const

type RevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  as?: "div" | "section" | "li" | "article" | "span" | "header" | "figure" | "tr"
  amount?: number
}

export function Reveal({ children, className, delay = 0, y = 16, as = "div", amount = 0.2 }: RevealProps) {
  const reduce = useReducedMotion()
  const Comp = m[as] as typeof m.div
  return (
    <Comp
      data-reveal=""
      className={className}
      initial={{ opacity: 0, transform: `translateY(${y}px)` }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, amount, margin: "0px 0px -8% 0px" }}
      transition={{
        opacity: { duration: reduce ? 0.3 : 0.6, ease: EASE_OUT, delay },
        transform: { duration: reduce ? 0 : 0.75, ease: EASE_OUT, delay },
      }}
    >
      {children}
    </Comp>
  )
}

const groupVariants: Variants = {
  hidden: {},
  show: (stagger: number = 0.07) => ({ transition: { staggerChildren: stagger } }),
}

type GroupProps = {
  children: React.ReactNode
  className?: string
  stagger?: number
  as?: "div" | "ul" | "ol" | "tbody" | "section"
  amount?: number
}

export function RevealGroup({ children, className, stagger = 0.07, as = "div", amount = 0.15 }: GroupProps) {
  const Comp = m[as] as typeof m.div
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount, margin: "0px 0px -8% 0px" }}
      variants={groupVariants}
      custom={stagger}
    >
      {children}
    </Comp>
  )
}

type ItemProps = {
  children: React.ReactNode
  className?: string
  y?: number
  as?: "div" | "li" | "article" | "tr" | "figure"
} & Omit<React.HTMLAttributes<HTMLElement>, "children" | "className">

export function RevealItem({ children, className, y = 16, as = "div", ...rest }: ItemProps) {
  const reduce = useReducedMotion()
  const Comp = m[as] as typeof m.div
  const variants: Variants = {
    hidden: { opacity: 0, transform: `translateY(${y}px)` },
    show: {
      opacity: 1,
      transform: "translateY(0px)",
      transition: {
        opacity: { duration: reduce ? 0.3 : 0.55, ease: EASE_OUT },
        transform: { duration: reduce ? 0 : 0.7, ease: EASE_OUT },
      },
    },
  }
  return (
    <Comp data-reveal="" className={className} variants={variants} {...(rest as object)}>
      {children}
    </Comp>
  )
}
