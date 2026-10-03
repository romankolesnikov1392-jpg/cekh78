import * as React from "react"
import { cn } from "cn"
import { CaretDownIcon } from "@phosphor-icons/react/ssr"

import { fieldBase } from "@/components/ui/input"

/** Нативный select: на телефоне открывается системный пикер — это удобнее любого кастомного. */
function NativeSelect({ className, ...props }: React.ComponentProps<"select">) {
  return (
    <div
      className={cn("relative w-full", className)}
      data-slot="native-select-wrapper"
    >
      <select
        data-slot="native-select"
        className={cn(
          fieldBase,
          "h-13 cursor-pointer appearance-none pr-11 pl-4"
        )}
        {...props}
      />
      <CaretDownIcon
        className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
    </div>
  )
}

function NativeSelectOption({ className, ...props }: React.ComponentProps<"option">) {
  return (
    <option
      data-slot="native-select-option"
      className={cn("bg-surface text-foreground", className)}
      {...props}
    />
  )
}

export { NativeSelect, NativeSelectOption }
