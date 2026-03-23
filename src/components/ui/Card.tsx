import type { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  className?: string
}

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-ui-panel shadow-ui-soft backdrop-blur-panel ${className}`}
    >
      {children}
    </div>
  )
}
