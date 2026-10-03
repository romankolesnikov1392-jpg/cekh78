import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"

/** Общий вид полей: 52px, 16px шрифт (iOS не зумит), оранжевый фокус, красная ошибка. */
export const fieldBase = cn(
  "w-full min-w-0 rounded-[2px] border border-line bg-surface text-base text-foreground",
  "transition-[border-color,box-shadow,background-color] duration-150 ease-out outline-hidden",
  "placeholder:text-subtle hover:border-line-strong",
  "focus-visible:border-brand focus-visible:shadow-[0_0_0_1px_var(--brand)]",
  "aria-invalid:border-destructive aria-invalid:focus-visible:shadow-[0_0_0_1px_var(--destructive)]",
  "disabled:cursor-not-allowed disabled:opacity-50"
)

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(fieldBase, "h-13 px-4", className)}
      {...props}
    />
  )
}

export { Input }
