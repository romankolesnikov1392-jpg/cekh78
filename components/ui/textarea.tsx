import * as React from "react"
import { cn } from "cn"

import { fieldBase } from "@/components/ui/input"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        fieldBase,
        "field-sizing-content min-h-28 resize-none px-4 py-3.5 leading-normal",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
