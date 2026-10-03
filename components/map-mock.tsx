import { cn } from "cn"

/**
 * Схема проезда — визуальный макет карты (SVG), без стороннего iframe.
 * Улицы условные: это демонстрация компонента, а не картография.
 * На реальном сайте можно подключить Яндекс Карты по API-ключу клиента.
 */
export function MapMock({ className }: { className?: string }) {
  return (
    <figure className={cn("relative overflow-hidden border border-line bg-surface", className)}>
      <svg viewBox="0 0 800 600" className="h-full w-full" role="img" aria-labelledby="map-title map-desc" preserveAspectRatio="xMidYMid slice">
        <title id="map-title">Схема проезда к автосервису Цех78</title>
        <desc id="map-desc">Условная схема: автосервис находится на улице Руставели, въезд со двора.</desc>
        <defs>
          <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0v40" fill="none" stroke="var(--line)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="800" height="600" fill="var(--surface)" />
        <rect width="800" height="600" fill="url(#map-grid)" />
        {/* кварталы */}
        <g fill="var(--surface-2)">
          <rect x="40" y="40" width="250" height="150" />
          <rect x="340" y="40" width="190" height="150" />
          <rect x="580" y="40" width="180" height="150" />
          <rect x="40" y="250" width="250" height="110" />
          <rect x="580" y="250" width="180" height="110" />
          <rect x="40" y="420" width="250" height="140" />
          <rect x="340" y="420" width="190" height="140" />
          <rect x="580" y="420" width="180" height="140" />
        </g>
        {/* территория цеха */}
        <rect x="340" y="250" width="190" height="110" fill="var(--surface-2)" stroke="var(--brand)" strokeWidth="2" strokeDasharray="6 6" />
        {/* дороги */}
        <g stroke="var(--line-strong)" strokeLinecap="square">
          <path d="M0 220H800" strokeWidth="14" />
          <path d="M0 390H800" strokeWidth="10" />
          <path d="M315 0V600" strokeWidth="10" />
          <path d="M555 0V600" strokeWidth="18" />
        </g>
        {/* подъезд со двора */}
        <path d="M555 305H530" stroke="var(--brand)" strokeWidth="4" />
        <path d="M555 600V320" stroke="var(--brand)" strokeWidth="4" strokeDasharray="2 10" strokeLinecap="round" />
        {/* подписи улиц */}
        <g fill="var(--subtle)" fontFamily="var(--font-jetbrains), monospace" fontSize="13" letterSpacing="1.5">
          <text x="572" y="586" transform="rotate(-90 572 586)">УЛ. РУСТАВЕЛИ</text>
        </g>
        {/* маркер */}
        <g transform="translate(435 305)">
          <rect x="-11" y="-11" width="22" height="22" fill="var(--brand)" />
          <rect x="-4" y="-4" width="8" height="8" fill="var(--ink)" />
        </g>
        <g fontFamily="var(--font-golos), sans-serif">
          <rect x="360" y="262" width="150" height="26" fill="var(--ink)" />
          <text x="372" y="280" fill="var(--foreground)" fontSize="14" fontWeight="600">Цех78 · д. 13</text>
        </g>
      </svg>
      <figcaption className="tech-label absolute bottom-3 left-3 bg-ink/85 px-2 py-1 text-subtle">Схема · демо</figcaption>
    </figure>
  )
}
