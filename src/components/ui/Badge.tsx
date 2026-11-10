import type { ReactNode } from 'react'

export type Tone = 'accent' | 'success' | 'info' | 'danger' | 'violet' | 'blue' | 'amber' | 'pink' | 'yellow' | 'zinc'

const tones: Record<Tone, string> = {
  accent: 'border-ui-accent/30 bg-ui-accent/12 text-ui-accentBright',
  success: 'border-ui-success/40 bg-ui-success/15 text-ui-success',
  info: 'border-ui-info/40 bg-ui-info/15 text-ui-info',
  danger: 'border-ui-danger/40 bg-ui-danger/15 text-ui-danger',
  violet: 'border-ui-violet/40 bg-ui-violet/15 text-ui-violet',
  blue: 'border-ui-blue/40 bg-ui-blue/15 text-ui-blue',
  amber: 'border-ui-amber/40 bg-ui-amber/15 text-ui-amber',
  pink: 'border-ui-pink/40 bg-ui-pink/15 text-ui-pink',
  yellow: 'border-ui-yellow/40 bg-ui-yellow/15 text-ui-yellow',
  zinc: 'border-zinc-600/60 bg-zinc-700/30 text-zinc-300',
}

export const Badge = ({ tone = 'zinc', children, icon }: { tone?: Tone; children: ReactNode; icon?: ReactNode }) => (
  <span
    className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${tones[tone]}`}
  >
    {icon}
    {children}
  </span>
)
