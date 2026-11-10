import { type ReactNode } from 'react'

type SectionHeaderProps = {
  title: string
  lead?: string
  icon?: ReactNode
}

export const SectionHeader = ({ title, icon }: SectionHeaderProps) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="text-[28px] font-extrabold leading-tight tracking-tight text-white">{title}</h2>
      {icon && <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-ui-accent/25 bg-ui-accent/10">{icon}</span>}
    </div>
  )
}
