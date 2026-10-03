"use client"

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { cn } from "cn"

/**
 * FAQ-аккордеон. Base UI даёт aria-expanded / aria-controls и клавиатуру.
 * Высота панели анимируется через --accordion-panel-height (200 мс, ease-out) —
 * единственное место, где мы анимируем height: у аккордеона нет transform-альтернативы.
 */
function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col border-t border-line", className)}
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-line", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex font-sans font-medium">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/trigger flex flex-1 cursor-pointer items-start justify-between gap-6 py-6 text-left text-lg font-medium text-foreground transition-colors duration-150 outline-hidden md:py-7 md:text-xl",
          "hover:text-white focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-ring",
          className
        )}
        {...props}
      >
        <span className="min-w-0">{children}</span>
        <span
          aria-hidden="true"
          className="relative mt-1.5 size-4 shrink-0 text-muted-foreground transition-colors group-hover/trigger:text-foreground group-aria-expanded/trigger:text-brand"
        >
          <span className="absolute top-1/2 left-0 h-px w-4 -translate-y-1/2 bg-current" />
          <span className="absolute top-0 left-1/2 h-4 w-px -translate-x-1/2 bg-current transition-transform duration-200 ease-[var(--ease-out)] group-aria-expanded/trigger:scale-y-0" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className={cn(
        "h-(--accordion-panel-height) overflow-hidden transition-[height] duration-200 ease-[var(--ease-out)] data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none"
      )}
      {...props}
    >
      <div
        className={cn(
          "max-w-[68ch] pb-7 text-base leading-relaxed text-muted-foreground [&_p:not(:last-child)]:mb-3",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
