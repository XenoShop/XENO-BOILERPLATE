import { LayoutDashboard } from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { Meter } from '../components/ui/Meter'
import { Panel, Stat, ViewHeader } from '../components/ui/Panel'

const ACTIVITY = [
  { id: 1, title: 'Project created', meta: '2 min ago', tone: 'success' as const, label: 'Done' },
  { id: 2, title: 'Deployment queued', meta: '14 min ago', tone: 'info' as const, label: 'Queued' },
  { id: 3, title: 'Build failed on staging', meta: '1 h ago', tone: 'danger' as const, label: 'Failed' },
  { id: 4, title: 'Review requested', meta: '3 h ago', tone: 'amber' as const, label: 'Pending' },
]

export function Overview() {
  return (
    <div>
      <ViewHeader
        title="Overview"
        icon={<LayoutDashboard className="h-5 w-5 text-ui-accent" />}
        subtitle="A starting point for dashboards: stat tiles, panels, lists and progress meters."
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Active items" value="128" hint="12 added this week" />
        <Stat label="Needs attention" value="5" hint="Review these first" tone="text-ui-amber" />
        <Stat label="Success rate" value="97%" hint="Last 30 days" tone="text-ui-success" />
        <Stat label="Open issues" value="3" hint="1 critical" tone="text-ui-danger" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Panel title="Recent activity">
          <ul className="space-y-2">
            {ACTIVITY.map((a) => (
              <li key={a.id} className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-zinc-900/60 px-3 py-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-zinc-200">{a.title}</p>
                  <p className="text-xs text-zinc-500">{a.meta}</p>
                </div>
                <Badge tone={a.tone}>{a.label}</Badge>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Capacity">
          <div className="space-y-4">
            {[
              { label: 'Storage', value: 72, tone: 'accent' as const },
              { label: 'Bandwidth', value: 45, tone: 'success' as const },
              { label: 'Memory', value: 88, tone: 'amber' as const },
              { label: 'Errors', value: 12, tone: 'danger' as const },
            ].map((m) => (
              <div key={m.label}>
                <div className="mb-1.5 flex justify-between text-xs">
                  <span className="font-semibold text-zinc-300">{m.label}</span>
                  <span className="text-zinc-500">{m.value}%</span>
                </div>
                <Meter value={m.value} tone={m.tone} />
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  )
}
