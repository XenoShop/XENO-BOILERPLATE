export type AccentId = 'orange' | 'amber' | 'red' | 'pink' | 'violet' | 'blue' | 'cyan' | 'emerald'

export type Accent = {
  id: AccentId
  label: string
  accent: string
  bright: string
  deep: string
  ink: string
}

export const ACCENTS: Accent[] = [
  { id: 'orange', label: 'Orange', accent: '255 122 26', bright: '255 160 58', deep: '255 107 10', ink: '26 13 2' },
  { id: 'amber', label: 'Amber', accent: '245 158 11', bright: '251 191 36', deep: '217 119 6', ink: '30 16 1' },
  { id: 'red', label: 'Red', accent: '239 68 68', bright: '248 113 113', deep: '220 38 38', ink: '36 4 4' },
  { id: 'pink', label: 'Pink', accent: '236 72 153', bright: '244 114 182', deep: '219 39 119', ink: '36 4 18' },
  { id: 'violet', label: 'Violet', accent: '139 92 246', bright: '167 139 250', deep: '109 40 217', ink: '16 8 34' },
  { id: 'blue', label: 'Blue', accent: '59 130 246', bright: '96 165 250', deep: '37 99 235', ink: '6 14 33' },
  { id: 'cyan', label: 'Cyan', accent: '6 182 212', bright: '34 211 238', deep: '8 145 178', ink: '2 22 28' },
  { id: 'emerald', label: 'Emerald', accent: '16 185 129', bright: '52 211 153', deep: '5 150 105', ink: '2 22 14' },
]

const STORAGE_KEY = 'xeno.accent'
const listeners = new Set<() => void>()

const find = (id: string | null) => ACCENTS.find((a) => a.id === id) ?? ACCENTS[0]

const readStored = (): AccentId => {
  try {
    return find(localStorage.getItem(STORAGE_KEY)).id
  } catch {
    return ACCENTS[0].id
  }
}

let current: AccentId = readStored()

const apply = (id: AccentId) => {
  const a = find(id)
  const style = document.documentElement.style
  style.setProperty('--ui-accent', a.accent)
  style.setProperty('--ui-accent-bright', a.bright)
  style.setProperty('--ui-accent-deep', a.deep)
  style.setProperty('--ui-accent-ink', a.ink)
}

export const initTheme = () => apply(current)

export const getAccent = () => current

export const setAccent = (id: AccentId) => {
  current = id
  apply(id)
  try {
    localStorage.setItem(STORAGE_KEY, id)
  } catch {
    void 0
  }
  listeners.forEach((fn) => fn())
}

export const subscribeAccent = (fn: () => void) => {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}
