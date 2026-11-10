import type { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  className?: string
}

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div
      className={`rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.035] to-white/[0.012] bg-ui-panel shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset] ${className}`}
    >
      {children}
    </div>
  )
}
