'use client'

// Tiny event bus for easter eggs (matrix mode, ripples…)
type Handler = (payload?: unknown) => void
const handlers = new Map<string, Set<Handler>>()

export const emit = (event: string, payload?: unknown) => {
  handlers.get(event)?.forEach((handler) => handler(payload))
}

export const on = (event: string, handler: Handler) => {
  if (!handlers.has(event)) handlers.set(event, new Set())
  handlers.get(event)!.add(handler)
  return () => {
    handlers.get(event)?.delete(handler)
  }
}
