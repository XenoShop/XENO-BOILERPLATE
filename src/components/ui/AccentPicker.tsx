import { Check } from 'lucide-react'
import { useAccent } from '../../hooks/useAccent'
import { ACCENTS } from '../../styles/themes'

export const AccentPicker = ({ size = 'md' }: { size?: 'sm' | 'md' }) => {
  const [accent, setAccent] = useAccent()
  const box = size === 'sm' ? 'h-5 w-5' : 'h-8 w-8'

  return (
    <div role="radiogroup" aria-label="Accent color" className="flex flex-wrap items-center gap-2">
      {ACCENTS.map((a) => {
        const active = a.id === accent
        return (
          <button
            key={a.id}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={a.label}
            title={a.label}
            onClick={() => setAccent(a.id)}
            className={`grid ${box} place-items-center rounded-full border transition-all focus:outline-none ${
              active ? 'scale-110 border-white/70' : 'border-white/10 hover:border-white/40'
            }`}
            style={{
              background: `linear-gradient(to bottom, rgb(${a.bright}), rgb(${a.deep}))`,
              boxShadow: active ? `0 0 14px rgb(${a.accent} / 0.55)` : undefined,
            }}
          >
            {active && size === 'md' && <Check className="h-4 w-4" style={{ color: `rgb(${a.ink})` }} />}
          </button>
        )
      })}
    </div>
  )
}
