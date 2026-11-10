import type { ReactNode } from 'react'
import { Card } from './Card'
import { SectionHeader } from './SectionHeader'

export const ViewHeader = ({ title, icon, actions, subtitle }: { title: string; icon?: ReactNode; actions?: ReactNode; subtitle?: string }) => (
  <div className="mb-6">
    <SectionHeader title={title} icon={icon} />
    {subtitle && <p className="mt-2 max-w-3xl text-sm text-zinc-400">{subtitle}</p>}
    {actions && <div className="mt-3 flex flex-wrap items-center gap-2">{actions}</div>}
  </div>
)

export const Panel = ({ title, children, right, className = '' }: { title?: string; children: ReactNode; right?: ReactNode; className?: string }) => (
  <Card className={`px-4 py-4 ${className}`}>
    {(title || right) && (
      <div className="mb-3 flex items-center justify-between gap-3">
        {title && <h3 className="text-[13px] font-bold text-zinc-200">{title}</h3>}
        {right}
      </div>
    )}
    {children}
  </Card>
)

export const Stat = ({ label, value, hint, tone = 'text-white' }: { label: string; value: ReactNode; hint?: string; tone?: string }) => (
  <Card className="px-4 py-3">
    <p className="text-xs font-semibold text-zinc-500">{label}</p>
    <p className={`mt-1 text-[26px] font-extrabold leading-tight tracking-tight ${tone}`}>{value}</p>
    {hint && <p className="mt-0.5 text-xs text-zinc-500">{hint}</p>}
  </Card>
)
