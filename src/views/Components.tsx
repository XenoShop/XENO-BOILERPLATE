import { useState } from 'react'
import { Plus, Puzzle, Trash2 } from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Meter } from '../components/ui/Meter'
import { Panel, ViewHeader } from '../components/ui/Panel'
import { Tabs } from '../components/ui/Tabs'

type Tab = 'one' | 'two' | 'three'

export function Components() {
  const [tab, setTab] = useState<Tab>('one')

  return (
    <div>
      <ViewHeader title="Components" icon={<Puzzle className="h-5 w-5 text-ui-accent" />} subtitle="Every building block, in the active accent color." />

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Buttons">
          <div className="flex flex-wrap items-center gap-3">
            <Button icon={<Plus className="h-4 w-4" />}>Primary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger" icon={<Trash2 className="h-4 w-4" />}>
              Danger
            </Button>
            <Button disabled>Disabled</Button>
            <Button loading>Loading</Button>
            <Button size="sm">Small</Button>
          </div>
        </Panel>

        <Panel title="Badges">
          <div className="flex flex-wrap gap-2">
            <Badge tone="accent">Accent</Badge>
            <Badge tone="success">Success</Badge>
            <Badge tone="info">Info</Badge>
            <Badge tone="danger">Danger</Badge>
            <Badge tone="violet">Violet</Badge>
            <Badge tone="blue">Blue</Badge>
            <Badge tone="amber">Amber</Badge>
            <Badge tone="pink">Pink</Badge>
            <Badge tone="yellow">Yellow</Badge>
            <Badge>Neutral</Badge>
          </div>
        </Panel>

        <Panel title="Tabs">
          <Tabs
            value={tab}
            onChange={setTab}
            items={[
              { value: 'one', label: 'First', count: 4 },
              { value: 'two', label: 'Second' },
              { value: 'three', label: 'Third', count: 12 },
            ]}
          />
          <p className="mt-3 text-sm text-zinc-400">Selected tab: {tab}</p>
        </Panel>

        <Panel title="Meters">
          <div className="flex flex-col gap-3">
            <Meter value={72} />
            <Meter value={45} tone="success" />
            <Meter value={30} tone="amber" />
            <Meter value={12} tone="danger" />
          </div>
        </Panel>
      </div>
    </div>
  )
}
