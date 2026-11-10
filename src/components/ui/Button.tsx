import type { ReactNode } from 'react'
import { Loader2 } from 'lucide-react'

type ButtonProps = {
  children?: ReactNode
  variant?: 'primary' | 'ghost' | 'danger'
  size?: 'sm' | 'md'
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit'
  title?: string
  className?: string
  icon?: ReactNode
  onClick?: () => void
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  type = 'button',
  title,
  className = '',
  icon,
  onClick,
}: ButtonProps) => {
  const baseClass = `inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all border focus:outline-none focus-visible:ring-2 focus-visible:ring-ui-accent/70 ${
    size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2.5 text-sm'
  }`

  const variantMap = {
    primary:
      'bg-gradient-to-b from-ui-accentBright to-ui-accentDeep text-ui-accentInk border-white/20 shadow-[0_6px_18px_-6px_rgb(var(--ui-accent)/0.55)] hover:brightness-110 active:scale-[0.98]',
    ghost: 'bg-white/[0.04] text-zinc-100 border-white/10 hover:bg-white/[0.08] hover:border-white/20',
    danger: 'bg-red-500/10 text-red-300 border-red-400/25 hover:bg-red-500/20',
  }

  const inactive = disabled || loading
  const variantClass = inactive
    ? 'bg-white/[0.03] border-white/5 text-zinc-500 cursor-not-allowed'
    : variantMap[variant]

  return (
    <button
      type={type}
      title={title}
      className={`${baseClass} ${variantClass} ${className}`}
      disabled={inactive}
      aria-busy={loading || undefined}
      onClick={onClick}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
      {children}
    </button>
  )
}
