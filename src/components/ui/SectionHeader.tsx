import { type ReactNode } from 'react'

type SectionHeaderProps = {
  title: string
  lead?: string
  icon?: ReactNode
}

export const SectionHeader = ({ title, lead, icon }: SectionHeaderProps) => {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        {lead && (
          <div className="mb-1 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-ui-orange shadow-[0_0_10px_rgba(255,115,0,0.8)] animate-pulseDot" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ui-orange">{lead}</p>
          </div>
        )}
        <h2 className="text-2xl font-black tracking-wider text-white">{title}</h2>
      </div>
      {icon}
    </div>
  )
}
