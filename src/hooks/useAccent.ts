import { useSyncExternalStore } from 'react'
import { getAccent, setAccent, subscribeAccent, type AccentId } from '../styles/themes'

export const useAccent = (): [AccentId, (id: AccentId) => void] => [
  useSyncExternalStore(subscribeAccent, getAccent),
  setAccent,
]
