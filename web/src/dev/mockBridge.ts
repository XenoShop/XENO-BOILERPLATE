import locale from './locale.en.json'
import type { Result } from '../lib/types'

const ok = <T>(data: T): Result<T> => ({ ok: true, data })

export async function handle(action: string, payload: Record<string, unknown>): Promise<Result<unknown>> {
  await new Promise((resolve) => setTimeout(resolve, 120))

  switch (action) {
    case 'bootstrap':
      return ok({
        me: { name: 'Jane Doe' },
        profile: { allowed: true, ace: false, job: { name: 'police', label: 'Police', grade: 2, gradeLabel: 'Sergeant' } },
        locale,
        settings: { locale: 'en', version: '1.0.0' },
      })
    case 'echo':
      return typeof payload.text === 'string' && payload.text.trim()
        ? ok({ text: payload.text.trim(), from: 'Jane Doe', at: Math.floor(Date.now() / 1000) })
        : { ok: false, error: 'invalid_input', message: locale['err.invalid_input'] }
    default:
      return { ok: false, error: 'unknown_action', message: locale['err.unknown_action'] }
  }
}
