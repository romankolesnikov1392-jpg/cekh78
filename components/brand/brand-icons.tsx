import {
  siAudi,
  siBmw,
  siCitroen,
  siHyundai,
  siKia,
  siMazda,
  siMitsubishi,
  siNissan,
  siPorsche,
  siSkoda,
  siTelegram,
  siToyota,
  siVk,
  siVolkswagen,
  siVolvo,
} from "simple-icons"

/*
 * Логотипы марок — из Simple Icons (CC0). Используются номинативно: показать, какие
 * марки обслуживает сервис. Mercedes-Benz в Simple Icons нет — звезда нарисована
 * геометрически по тем же правилам (одноцветная, 24×24).
 */
const MERCEDES = {
  title: "Mercedes-Benz",
  path: "M12 .7a11.3 11.3 0 1 0 0 22.6A11.3 11.3 0 0 0 12 .7Zm0 1.2a10.1 10.1 0 1 1 0 20.2 10.1 10.1 0 0 1 0-20.2ZM12 1.9l1.47 9.25 7.36 5.95L12 13.7l-8.83 3.4 7.36-5.95Z",
}

export const brandIcons = {
  toyota: siToyota,
  kia: siKia,
  hyundai: siHyundai,
  volkswagen: siVolkswagen,
  skoda: siSkoda,
  audi: siAudi,
  bmw: siBmw,
  mercedes: MERCEDES,
  porsche: siPorsche,
  volvo: siVolvo,
  mazda: siMazda,
  nissan: siNissan,
  mitsubishi: siMitsubishi,
  citroen: siCitroen,
} as const

export const brandNames: Record<keyof typeof brandIcons, string> = {
  toyota: "Toyota",
  kia: "Kia",
  hyundai: "Hyundai",
  volkswagen: "Volkswagen",
  skoda: "Škoda",
  audi: "Audi",
  bmw: "BMW",
  mercedes: "Mercedes-Benz",
  porsche: "Porsche",
  volvo: "Volvo",
  mazda: "Mazda",
  nissan: "Nissan",
  mitsubishi: "Mitsubishi",
  citroen: "Citroën",
}

export function BrandIcon({ brand, className }: { brand: keyof typeof brandIcons; className?: string }) {
  const icon = brandIcons[brand]
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true" fillRule="evenodd">
      <path d={icon.path} />
    </svg>
  )
}

export const socialIcons = { telegram: siTelegram, vk: siVk } as const

export function SocialIcon({ id, className }: { id: keyof typeof socialIcons; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d={socialIcons[id].path} />
    </svg>
  )
}
