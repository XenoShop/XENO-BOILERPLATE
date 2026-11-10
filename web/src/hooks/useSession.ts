import { useCallback, useEffect, useState } from 'react'
import { setLocale } from '../lib/i18n'
import { closeUI, inGame, onMessage, request } from '../lib/nui'
import type { Bootstrap, Profile } from '../lib/types'

export function useSession() {
  const [visible, setVisible] = useState(!inGame)
  const [boot, setBoot] = useState<Bootstrap | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    const result = await request<Bootstrap>('bootstrap')
    if (result.ok) {
      setLocale(result.data.locale)
      setBoot(result.data)
      setProfile(result.data.profile)
      setError(null)
    } else {
      setError(result.message)
    }
  }, [])

  const close = useCallback(() => {
    setVisible(false)
    closeUI()
  }, [])

  useEffect(() => {
    const off = onMessage((msg) => {
      if (msg.type === 'open') {
        setVisible(true)
        void load()
      } else if (msg.type === 'close') {
        setVisible(false)
      } else if (msg.type === 'profile') {
        setProfile(msg.profile)
      }
    })
    const first = inGame ? 0 : window.setTimeout(() => void load(), 0)
    return () => {
      off()
      window.clearTimeout(first)
    }
  }, [load])

  useEffect(() => {
    if (!visible) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [visible, close])

  return { visible, boot, profile, error, reload: load, close }
}
