import { useSyncExternalStore } from 'react'

export type Preferences = { scale: number; reducedMotion: boolean }

const STORAGE_KEY = 'xeno.preferences'
const DEFAULTS: Preferences = { scale: 1, reducedMotion: false }
const listeners = new Set<() => void>()

const read = (): Preferences => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS
  } catch {
    return DEFAULTS
  }
}

let current = read()

const apply = (p: Preferences) => {
  document.documentElement.style.setProperty('--ui-scale', String(p.scale))
  document.documentElement.dataset.reduceMotion = p.reducedMotion ? 'true' : 'false'
}

export const initPreferences = () => apply(current)

export const setPreferences = (next: Preferences) => {
  current = next
  apply(next)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    void 0
  }
  listeners.forEach((fn) => fn())
}

const subscribe = (fn: () => void) => {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}

export const usePreferences = (): [Preferences, (next: Preferences) => void] => [
  useSyncExternalStore(subscribe, () => current),
  setPreferences,
]
