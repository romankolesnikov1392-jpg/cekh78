"use client"

import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { cn } from "cn"

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid w-full gap-2", className)}
      {...props}
    />
  )
}

/** Радио-карточка: вся площадь кликабельна, выбор отмечается акцентной рамкой и точкой. */
function RadioCard({ className, children, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-card"
      className={cn(
        "group/radio relative flex w-full cursor-pointer items-start gap-3 rounded-[2px] border border-line bg-surface p-4 text-left",
        "transition-[border-color,background-color,transform] duration-150 ease-out outline-hidden",
        "hover:border-line-strong active:scale-[0.99]",
        "focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ring",
        "data-checked:border-brand data-checked:bg-brand/[0.06]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className="mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded-full border border-line-strong transition-colors group-data-checked/radio:border-brand"
      >
        <RadioPrimitive.Indicator className="size-2 rounded-full bg-brand" />
      </span>
      <span className="min-w-0 flex-1">{children}</span>
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioCard }
