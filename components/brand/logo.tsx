import Link from "next/link"
import { cn } from "cn"

/**
 * Логотип: «ЦЕХ» + «78» в рамке — отсылка к коду региона на петербургских номерах.
 * Рамка — единственный акцентный элемент знака.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn("inline-flex items-stretch font-display leading-none font-extrabold select-none", className)}
      aria-hidden="true"
      translate="no"
    >
      <span className="flex items-center pr-[0.18em] tracking-[0.02em]">ЦЕХ</span>
      <span className="flex items-center border-[0.09em] border-brand px-[0.16em] pt-[0.04em] tracking-[0.02em]">
        78
      </span>
    </span>
  )
}

export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Цех78 — на главную"
      className={cn(
        "inline-flex items-center rounded-[2px] text-[1.75rem] text-foreground outline-hidden focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-ring",
        className
      )}
    >
      <LogoMark />
    </Link>
  )
}
