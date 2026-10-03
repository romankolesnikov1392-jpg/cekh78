"use client"

import * as React from "react"
import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu"
import { cn } from "cn"

/**
 * Навигационное меню (Base UI): aria-expanded, клавиатура, закрытие по Esc
 * и по уходу курсора — без самописной логики. Панель «вырастает» из триггера
 * (transform-origin = --transform-origin), 200 мс, сильный ease-out.
 */
function NavigationMenu({ className, children, ...props }: NavigationMenuPrimitive.Root.Props) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      className={cn("relative", className)}
      {...props}
    >
      {children}
      <NavigationMenuPrimitive.Portal>
        <NavigationMenuPrimitive.Positioner
          sideOffset={14}
          align="start"
          alignOffset={-16}
          collisionPadding={{ left: 16, right: 16 }}
          collisionAvoidance={{ side: "none" }}
          className="z-[70] h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) before:absolute before:inset-x-0 before:-top-4 before:h-4 before:content-['']"
        >
          <NavigationMenuPrimitive.Popup
            className={cn(
              "relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) overflow-hidden rounded-[2px] border border-line-strong bg-popover text-popover-foreground shadow-[0_24px_60px_-20px_rgb(0_0_0/0.7)] outline-hidden",
              "transition-[opacity,transform] duration-200 ease-[var(--ease-out)]",
              "data-starting-style:scale-[0.97] data-starting-style:opacity-0 data-ending-style:scale-[0.97] data-ending-style:opacity-0 data-ending-style:duration-150",
              "motion-reduce:transition-opacity motion-reduce:data-starting-style:scale-100 motion-reduce:data-ending-style:scale-100"
            )}
          >
            <NavigationMenuPrimitive.Viewport className="relative size-full" />
          </NavigationMenuPrimitive.Popup>
        </NavigationMenuPrimitive.Positioner>
      </NavigationMenuPrimitive.Portal>
    </NavigationMenuPrimitive.Root>
  )
}

function NavigationMenuList({ className, ...props }: NavigationMenuPrimitive.List.Props) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn("flex list-none items-center", className)}
      {...props}
    />
  )
}

const NavigationMenuItem = NavigationMenuPrimitive.Item

function NavigationMenuTrigger({ className, children, ...props }: NavigationMenuPrimitive.Trigger.Props) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn("group/nav-trigger inline-flex items-center gap-1.5", className)}
      {...props}
    >
      {children}
      <NavigationMenuPrimitive.Icon
        aria-hidden="true"
        className="text-muted-foreground transition-transform duration-200 ease-[var(--ease-out)] data-popup-open:rotate-180"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M1.5 3.5 5 7l3.5-3.5" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </NavigationMenuPrimitive.Icon>
    </NavigationMenuPrimitive.Trigger>
  )
}

function NavigationMenuContent({ className, ...props }: NavigationMenuPrimitive.Content.Props) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn("w-[min(720px,calc(100vw-32px))]", className)}
      {...props}
    />
  )
}

const NavigationMenuLink = NavigationMenuPrimitive.Link

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
}
