import type { ReactNode } from 'react'

const control =
  'rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-ui-orange/60 focus:outline-none focus:ring-2 focus:ring-ui-orange/20 disabled:opacity-50'

type LabelProps = { label: string; hint?: string; children: ReactNode; className?: string }

export const Field = ({ label, hint, children, className = '' }: LabelProps) => (
  <label className={`block ${className}`}>
    <span className="mb-1.5 block text-xs font-semibold text-zinc-400">{label}</span>
    {children}
    {hint && <span className="mt-1 block text-xs text-zinc-500">{hint}</span>}
  </label>
)

type InputProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  maxLength?: number
  type?: 'text' | 'number'
  autoFocus?: boolean
  disabled?: boolean
  className?: string
  'aria-label'?: string
}

const width = (className: string) => (/(^|\s)w-/.test(className) ? '' : 'w-full')

export const Input = ({ value, onChange, className = '', ...rest }: InputProps) => (
  <input className={`${control} ${width(className)} ${className}`} value={value} onChange={(e) => onChange(e.target.value)} {...rest} />
)

type SelectProps = {
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string; disabled?: boolean }[]
  disabled?: boolean
  className?: string
  'aria-label'?: string
}

export const Select = ({ value, onChange, options, className = '', ...rest }: SelectProps) => (
  <select className={`${control} ${width(className)} ${className}`} value={value} onChange={(e) => onChange(e.target.value)} {...rest}>
    {options.map((o) => (
      <option key={o.value} value={o.value} disabled={o.disabled} className="bg-zinc-900">
        {o.label}
      </option>
    ))}
  </select>
)

type TextareaProps = { value: string; onChange: (value: string) => void; placeholder?: string; maxLength?: number; rows?: number }

export const Textarea = ({ value, onChange, rows = 3, ...rest }: TextareaProps) => (
  <textarea className={`${control} w-full`} rows={rows} value={value} onChange={(e) => onChange(e.target.value)} {...rest} />
)

type CheckProps = { checked: boolean; onChange: (checked: boolean) => void; label: string; disabled?: boolean }

export const Check = ({ checked, onChange, label, disabled }: CheckProps) => (
  <label className={`flex cursor-pointer items-center gap-2 text-sm text-zinc-200 ${disabled ? 'opacity-50' : ''}`}>
    <input
      type="checkbox"
      className="h-4 w-4 accent-[#FF7300]"
      checked={checked}
      disabled={disabled}
      onChange={(e) => onChange(e.target.checked)}
    />
    {label}
  </label>
)
