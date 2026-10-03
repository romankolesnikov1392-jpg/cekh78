"use client"

import * as React from "react"

type BookingState = { open: boolean; service?: string }

type BookingContextValue = BookingState & {
  openBooking: (service?: string) => void
  setOpen: (open: boolean) => void
}

const BookingContext = React.createContext<BookingContextValue | null>(null)

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<BookingState>({ open: false })

  const value = React.useMemo<BookingContextValue>(
    () => ({
      ...state,
      openBooking: (service) => setState({ open: true, service }),
      setOpen: (open) => setState((s) => ({ ...s, open })),
    }),
    [state]
  )

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

export function useBooking() {
  const ctx = React.useContext(BookingContext)
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>")
  return ctx
}
