'use client'

// Tiny pub/sub so every section can wait for the intro curtain to open.
type Listener = () => void

let done = false
const listeners = new Set<Listener>()

export const markIntroDone = () => {
  if (done) return
  done = true
  document.documentElement.classList.remove('is-intro')
  listeners.forEach((listener) => listener())
  listeners.clear()
}

export const onIntroDone = (listener: Listener) => {
  if (done) {
    listener()
    return () => {}
  }
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Party mode (konami code) is read by the hero shader.
let party = false
const partyListeners = new Set<(value: boolean) => void>()

export const togglePartyMode = () => {
  party = !party
  partyListeners.forEach((listener) => listener(party))
  return party
}

export const onPartyMode = (listener: (value: boolean) => void) => {
  partyListeners.add(listener)
  return () => {
    partyListeners.delete(listener)
  }
}
