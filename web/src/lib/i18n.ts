let table: Record<string, string> = {}

export function setLocale(next: Record<string, string>) {
  table = next
}

export type Params = Record<string, string | number | boolean | null | undefined>

export function t(key: string, params?: Params): string {
  const raw = table[key] ?? key
  if (!params) return raw
  return raw.replace(/\{(\w+)\}/g, (_, name: string) => {
    const value = params[name]
    return value === undefined || value === null ? `{${name}}` : String(value)
  })
}
