"use client"

import * as React from "react"
import Image, { type StaticImageData } from "next/image"
import { cn } from "cn"

import { DemoBadge } from "@/components/sections/section-header"

/*
 * Слайдер «до/после».
 * TODO: заменить на реальные фото клиента до/после — сейчас честные стоковые placeholder-пары
 * (разные автомобили, подобранные по цвету и ракурсу), поэтому на слайдере всегда видна метка «Демо-фото».
 *
 * Взаимодействие:
 * — мышь: клик переносит разделитель (плавно, 260 мс), перетаскивание — без задержек;
 * — палец: перетаскивание начинается только при горизонтальном жесте, вертикальный скролл страницы не блокируется;
 * — клавиатура: ←/→ (Shift — шаг 10 %), Home/End, PageUp/PageDown. Ручка — role="slider".
 */
type Img = { src: StaticImageData; alt: string }

export function BeforeAfter({
  before,
  after,
  label,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className,
  aspect = "aspect-[4/3]",
  preload,
  demo = true,
}: {
  before: Img
  after: Img
  label: string
  sizes?: string
  className?: string
  aspect?: string
  preload?: boolean
  demo?: boolean
}) {
  const [pos, setPos] = React.useState(50)
  const [smooth, setSmooth] = React.useState(false)
  const [dragging, setDragging] = React.useState(false)
  const [failed, setFailed] = React.useState(false)
  const rootRef = React.useRef<HTMLDivElement>(null)
  const gesture = React.useRef<{ id: number; x: number; y: number; type: string; active: boolean } | null>(null)

  const posFromClientX = (clientX: number) => {
    const rect = rootRef.current?.getBoundingClientRect()
    if (!rect) return pos
    return Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100))
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.button !== 0 || gesture.current) return // защита от второго пальца
    gesture.current = { id: e.pointerId, x: e.clientX, y: e.clientY, type: e.pointerType, active: e.pointerType === "mouse" }
    if (e.pointerType === "mouse") {
      e.preventDefault()
      e.currentTarget.setPointerCapture(e.pointerId)
      setSmooth(true)
      setPos(posFromClientX(e.clientX))
      setDragging(true)
    }
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const g = gesture.current
    if (!g || g.id !== e.pointerId) return
    if (!g.active) {
      const dx = Math.abs(e.clientX - g.x)
      const dy = Math.abs(e.clientY - g.y)
      if (dy > dx && dy > 6) {
        gesture.current = null // это скролл страницы
        return
      }
      if (dx < 6) return
      g.active = true
      e.currentTarget.setPointerCapture(e.pointerId)
      setDragging(true)
    }
    setSmooth(false)
    setPos(posFromClientX(e.clientX))
  }

  function endGesture(e: React.PointerEvent<HTMLDivElement>) {
    const g = gesture.current
    if (!g || g.id !== e.pointerId) return
    // короткий тап пальцем без движения — переносим разделитель
    if (!g.active && e.type === "pointerup" && g.type !== "mouse") {
      setSmooth(true)
      setPos(posFromClientX(e.clientX))
    }
    gesture.current = null
    setDragging(false)
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const step = e.shiftKey ? 10 : 5
    let next: number | null = null
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") next = pos - step
    else if (e.key === "ArrowRight" || e.key === "ArrowUp") next = pos + step
    else if (e.key === "PageDown") next = pos - 10
    else if (e.key === "PageUp") next = pos + 10
    else if (e.key === "Home") next = 0
    else if (e.key === "End") next = 100
    if (next === null) return
    e.preventDefault()
    setSmooth(false) // действия с клавиатуры — без анимации
    setPos(Math.min(100, Math.max(0, next)))
  }

  const transition = smooth ? "clip-path 260ms var(--ease-out), transform 260ms var(--ease-out)" : "none"

  // состояние ошибки: фото не загрузилось — честно говорим об этом вместо пустого блока
  if (failed) {
    return (
      <div className={cn("flex flex-col items-center justify-center gap-3 border border-dashed border-line-strong bg-surface p-6 text-center", aspect, className)} role="img" aria-label={`${label}: фото не загрузились`}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-subtle">
          <path d="M3 5h18v14H3zM3 15l5-5 4 4 3-3 6 6" stroke="currentColor" strokeWidth="1.5" />
          <path d="M4 4l16 16" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <p className="text-sm text-muted-foreground">Не удалось загрузить фото до и после.</p>
        <button
          type="button"
          onClick={() => setFailed(false)}
          className="link-underline text-sm font-medium text-foreground outline-hidden focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          Попробовать ещё раз
        </button>
      </div>
    )
  }

  return (
    <div
      ref={rootRef}
      className={cn(
        "group/ba relative isolate overflow-hidden bg-surface-2 select-none",
        aspect,
        dragging ? "cursor-grabbing" : "cursor-ew-resize",
        className
      )}
      style={{ touchAction: "pan-y" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endGesture}
      onPointerCancel={endGesture}
    >
      {/* «После» — нижний слой */}
      <Image
        src={after.src}
        alt={after.alt}
        fill
        sizes={sizes}
        placeholder="blur"
        preload={preload}
        draggable={false}
          onError={() => setFailed(true)}
        className="pointer-events-none object-cover"
      />
      {/* «До» — верхний слой, обрезается справа */}
      <div
        className="absolute inset-0 motion-reduce:!transition-none"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)`, transition }}
      >
        <Image
          src={before.src}
          alt={before.alt}
          fill
          sizes={sizes}
          placeholder="blur"
          preload={preload}
          draggable={false}
          onError={() => setFailed(true)}
          className="pointer-events-none object-cover"
        />
      </div>

      {/* метки */}
      <span
        aria-hidden="true"
        className="tech-label pointer-events-none absolute top-3 left-3 bg-ink/80 px-2 py-1 text-foreground transition-opacity duration-200"
        style={{ opacity: pos < 12 ? 0 : 1 }}
      >
        До
      </span>
      <span
        aria-hidden="true"
        className="tech-label pointer-events-none absolute top-3 right-3 bg-brand px-2 py-1 text-ink transition-opacity duration-200"
        style={{ opacity: pos > 88 ? 0 : 1 }}
      >
        После
      </span>
      {demo ? <DemoBadge className="pointer-events-none absolute bottom-3 left-3" /> : null}

      {/* разделитель */}
      <div
        className="pointer-events-none absolute inset-0 motion-reduce:!transition-none"
        style={{ transform: `translateX(${pos - 50}%)`, transition }}
      >
        <div className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-foreground/90 shadow-[0_0_12px_rgb(0_0_0/0.5)]" />
        <div
          role="slider"
          tabIndex={0}
          aria-label={label}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`Видно ${Math.round(pos)} % снимка «до»`}
          onKeyDown={onKeyDown}
          className={cn(
            "pointer-events-auto absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-foreground text-ink shadow-[0_6px_24px_-6px_rgb(0_0_0/0.6)]",
            "transition-transform duration-150 ease-out outline-hidden",
            "focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-3 focus-visible:outline-brand",
            dragging ? "scale-95" : "group-hover/ba:scale-105"
          )}
        >
          <svg width="22" height="12" viewBox="0 0 22 12" fill="none" aria-hidden="true">
            <path d="M6 1 1 6l5 5M16 1l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}
