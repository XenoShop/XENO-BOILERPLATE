import type { OpenContext, Profile, Result } from './types'

type Mock = { handle: (action: string, payload: Record<string, unknown>) => Promise<Result<unknown>> }

declare global {
  interface Window {
    GetParentResourceName?: () => string
  }
}

export const inGame = typeof window.GetParentResourceName === 'function'

let mock: Mock | null = null
let mockLoading: Promise<Mock | null> | null = null

async function loadMock(): Promise<Mock | null> {
  if (!import.meta.env.DEV) return null
  if (mock) return mock
  mockLoading ??= import('../dev/mockBridge').then((m) => {
    mock = m as Mock
    return mock
  })
  return mockLoading
}

const TIMEOUT_MS = 12000

export async function request<T>(action: string, payload: Record<string, unknown> = {}): Promise<Result<T>> {
  if (!inGame) {
    const m = await loadMock()
    if (m) return (await m.handle(action, payload)) as Result<T>
    return { ok: false, error: 'internal', message: 'Not running inside FiveM' }
  }

  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(`https://${window.GetParentResourceName!()}/request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ action, payload }),
      signal: controller.signal,
    })
    return (await res.json()) as Result<T>
  } catch {
    return { ok: false, error: 'timeout', message: 'timeout' }
  } finally {
    window.clearTimeout(timer)
  }
}

export function closeUI() {
  if (!inGame) return
  void fetch(`https://${window.GetParentResourceName!()}/close`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: '{}',
  }).catch(() => undefined)
}

export type UiMessage =
  | { type: 'open'; context: OpenContext }
  | { type: 'close' }
  | { type: 'profile'; profile: Profile }

export function onMessage(handler: (msg: UiMessage) => void): () => void {
  const listener = (event: MessageEvent<UiMessage>) => {
    if (event.data && typeof event.data.type === 'string') handler(event.data)
  }
  window.addEventListener('message', listener)
  return () => window.removeEventListener('message', listener)
}
