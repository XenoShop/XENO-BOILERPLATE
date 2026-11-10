import { useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { FormInput, LayoutDashboard, Puzzle, Settings as SettingsIcon } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Badge } from './ui/Badge'
import { AccentPicker } from './ui/AccentPicker'
import { usePreferences } from '../styles/preferences'
import { Components } from '../views/Components'
import { Forms } from '../views/Forms'
import { Overview } from '../views/Overview'
import { Settings } from '../views/Settings'

type ViewId = 'overview' | 'components' | 'forms' | 'settings'
type NavItem = { id: ViewId; icon: LucideIcon; label: string }

const NAV: { group: string; items: NavItem[] }[] = [
  {
    group: 'Workspace',
    items: [
      { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
      { id: 'components', icon: Puzzle, label: 'Components' },
      { id: 'forms', icon: FormInput, label: 'Forms' },
    ],
  },
  { group: 'System', items: [{ id: 'settings', icon: SettingsIcon, label: 'Settings' }] },
]

const VIEWS: Record<ViewId, () => ReactNode> = {
  overview: () => <Overview />,
  components: () => <Components />,
  forms: () => <Forms />,
  settings: () => <Settings />,
}

const fmtClock = (d: Date) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })

function Clock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])
  return <span className="tabular-nums text-xs text-zinc-400">{fmtClock(now)}</span>
}

export function Shell() {
  const [view, setView] = useState<ViewId>('overview')
  const [prefs] = usePreferences()
  const items = NAV.flatMap((g) => g.items)

  return (
    <MotionConfig reducedMotion={prefs.reducedMotion ? 'always' : 'user'}>
      <div className="fixed inset-0 flex items-center justify-center p-3 sm:p-4" style={{ zoom: prefs.scale }}>
        <div className="relative flex h-[min(860px,calc(94vh/var(--ui-scale,1)))] w-[min(1320px,calc(96vw/var(--ui-scale,1)))] overflow-hidden rounded-panel-xl border border-white/10 bg-ui-bg/95 shadow-ui-soft backdrop-blur-panel">
          <nav className="hidden w-64 shrink-0 flex-col border-r border-white/[0.07] bg-black/25 px-3 py-5 md:flex" aria-label="Main">
            <div className="mb-3 px-2">
              <img src="./xeno-logo.png" alt="Xeno" draggable={false} className="mx-auto h-[58px] w-auto select-none" />
            </div>
            <div className="mb-3 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="flex-1 space-y-3.5 overflow-y-auto hide-scrollbar">
              {NAV.map((group) => (
                <div key={group.group}>
                  <p className="mb-1.5 px-3 text-[11px] font-semibold text-zinc-600">{group.group}</p>
                  <ul className="space-y-px">
                    {group.items.map((item) => {
                      const active = view === item.id
                      const Icon = item.icon
                      return (
                        <li key={item.id}>
                          <button
                            onClick={() => setView(item.id)}
                            aria-current={active ? 'page' : undefined}
                            className={`group flex w-full items-center gap-3 rounded-xl px-2 py-1 text-[13.5px] font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ui-accent/60 ${
                              active ? 'bg-white/[0.07] text-white' : 'text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-100'
                            }`}
                          >
                            <span
                              className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg transition-colors ${
                                active
                                  ? 'bg-gradient-to-b from-ui-accentBright to-ui-accentDeep text-ui-accentInk shadow-[0_4px_14px_-4px_rgb(var(--ui-accent)/0.7)]'
                                  : 'bg-white/[0.04] text-zinc-400 group-hover:text-zinc-200'
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                            </span>
                            <span className="min-w-0 flex-1 text-left leading-snug">{item.label}</span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2.5">
              <p className="truncate text-sm font-semibold text-white">Jane Doe</p>
              <div className="mt-1 flex items-center justify-between">
                <Badge tone="accent">Admin</Badge>
                <span className="text-[11.5px] text-zinc-600">v1.0.0</span>
              </div>
            </div>
          </nav>

          <div className="flex min-w-0 flex-1 flex-col">
            <header className="flex items-center justify-between gap-3 border-b border-white/[0.07] px-6 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="h-2 w-2 shrink-0 animate-pulseDot rounded-full bg-ui-accent shadow-[0_0_10px_rgb(var(--ui-accent)/0.8)]" />
                <p className="truncate text-[13px] font-semibold text-zinc-300">{items.find((i) => i.id === view)?.label}</p>
              </div>
              <div className="flex items-center gap-4">
                <AccentPicker size="sm" />
                <Clock />
              </div>
            </header>

            <div className="flex gap-1 overflow-x-auto border-b border-white/10 px-3 py-2 md:hidden hide-scrollbar">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold ${view === item.id ? 'bg-ui-accent/20 text-ui-accentBright' : 'text-zinc-400'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <main className="relative min-h-0 flex-1 overflow-y-auto px-6 py-6">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={view} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.14 }}>
                  {VIEWS[view]()}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
      </div>
    </MotionConfig>
  )
}
