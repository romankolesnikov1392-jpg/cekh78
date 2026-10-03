"use client"

import * as React from "react"
import Image, { type StaticImageData } from "next/image"
import { useScroll, useTransform } from "motion/react"
import * as m from "motion/react-m"

/**
 * Лёгкий параллакс фона hero: картинка смещается максимум на 10 % высоты, пока hero
 * уходит вверх, — только в пределах первого экрана. Под reduced motion — статичное фото.
 * Фото — LCP-элемент: preload + без fade-in.
 */
export function ParallaxImage({
  src,
  alt,
  className,
  sizes = "100vw",
  objectPosition = "50% 50%",
}: {
  src: StaticImageData
  alt: string
  className?: string
  sizes?: string
  objectPosition?: string
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  // полная transform-строка, а не шорткат y
  const transform = useTransform(scrollYProgress, (v) => `translate3d(0, ${v * 10}%, 0)`)

  return (
    <div ref={ref} className={className ?? "absolute inset-0 overflow-hidden"}>
      <m.div
        // reduced motion отключаем в CSS (а не условием в JSX), чтобы SSR и гидрация совпадали
        className="absolute inset-x-0 -top-[2%] h-[112%] will-change-transform motion-reduce:![transform:none]"
        style={{ transform }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          preload
          sizes={sizes}
          quality={80}
          placeholder="blur"
          className="object-cover"
          style={{ objectPosition }}
        />
      </m.div>
    </div>
  )
}
