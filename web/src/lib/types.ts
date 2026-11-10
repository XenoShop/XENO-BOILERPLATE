export type Result<T> = { ok: true; data: T } | { ok: false; error: string; message: string }

export type JobInfo = { name: string; label: string; grade: number; gradeLabel?: string }

export type Profile = { allowed: boolean; ace: boolean; job?: JobInfo | null }

export type Bootstrap = {
  me: { name: string }
  profile: Profile
  locale: Record<string, string>
  settings: { locale: string; version: string }
}

export type OpenContext = Record<string, unknown>
