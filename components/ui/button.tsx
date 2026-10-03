import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

/**
 * Кнопки Цех78.
 * — primary: единственное место, где акцент живёт крупной заливкой (CTA записи).
 * — outline / ghost: всё остальное.
 * Нажатие: scale(0.97) за 160 мс; hover в Tailwind v4 срабатывает только на устройствах с hover.
 */
const buttonVariants = cva(
  [
    "group/button relative inline-flex shrink-0 items-center justify-center gap-2.5 rounded-[2px] border font-medium whitespace-nowrap select-none",
    "transition-[background-color,border-color,color,opacity,transform] duration-[160ms] ease-out",
    "outline-hidden focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-3 focus-visible:outline-ring",
    "active:scale-[0.97] disabled:pointer-events-none disabled:opacity-45 aria-disabled:pointer-events-none aria-disabled:opacity-45",
    "data-[loading=true]:cursor-progress [&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary:
          "border-transparent bg-brand text-ink hover:bg-brand-strong",
        outline:
          "border-line-strong bg-transparent text-foreground hover:border-foreground/45 hover:bg-foreground/[0.04]",
        light:
          "border-transparent bg-foreground text-ink hover:bg-white",
        ghost:
          "border-transparent bg-transparent text-foreground hover:bg-foreground/[0.06]",
        dark: "border-transparent bg-ink text-foreground hover:bg-black",
      },
      size: {
        sm: "h-10 px-4 text-sm [&_svg:not([class*='size-'])]:size-4",
        md: "h-12 px-6 text-[0.9375rem] [&_svg:not([class*='size-'])]:size-[18px]",
        lg: "h-14 px-7 text-base [&_svg:not([class*='size-'])]:size-5",
        icon: "size-11 [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

function Button({
  className,
  variant,
  size,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
