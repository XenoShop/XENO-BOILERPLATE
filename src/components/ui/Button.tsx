import type { ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'ghost' | 'danger'
  disabled?: boolean
  onClick?: () => void
}

export const Button = ({ children, variant = 'primary', disabled = false, onClick }: ButtonProps) => {
  const baseClass = 'rounded-xl px-4 py-2 text-sm font-semibold transition-all border'

  const variantMap = {
    primary:
      'bg-gradient-to-r from-[#FF7300] to-[#FF9100] text-white border-transparent hover:shadow-[0_0_18px_rgba(255,115,0,0.45)] active:scale-[0.98]',
    ghost: 'bg-zinc-900/80 text-zinc-100 border-zinc-700/80 hover:border-zinc-500',
    danger: 'bg-[#EF4444]/20 text-[#EF4444] border-[#EF4444]/40 hover:bg-[#EF4444]/30',
  }

  const variantClass = disabled
    ? 'bg-zinc-800/90 border-zinc-700/80 text-zinc-400 cursor-not-allowed'
    : variantMap[variant]

  return (
    <button className={`${baseClass} ${variantClass}`} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}
