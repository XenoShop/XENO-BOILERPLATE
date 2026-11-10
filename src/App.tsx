import { useState } from 'react'
import { motion } from 'framer-motion'
import { Palette, Rocket, Sparkles } from 'lucide-react'
import { Badge } from './components/ui/Badge'
import { Button } from './components/ui/Button'
import { Card } from './components/ui/Card'
import { Check, Field, Input, Select, Textarea } from './components/ui/Field'
import { Meter } from './components/ui/Meter'
import { SectionHeader } from './components/ui/SectionHeader'
import { Tabs } from './components/ui/Tabs'
import { colorTokens } from './styles/tokens'

type Tab = 'overview' | 'components' | 'forms'

function App() {
  const [tab, setTab] = useState<Tab>('overview')
  const [name, setName] = useState('')
  const [kind, setKind] = useState('a')
  const [notes, setNotes] = useState('')
  const [agree, setAgree] = useState(true)

  return (
    <main className="mx-auto flex w-full max-w-[1240px] flex-col gap-6 px-4 py-6 md:px-8 md:py-10">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="rounded-2xl border border-white/[0.07] bg-ui-panel px-5 py-6 md:px-8"
      >
        <SectionHeader title="Reusable Vite + React starter" icon={<Palette className="h-5 w-5 text-ui-orange" />} />
        <p className="mt-3 max-w-3xl text-sm text-zinc-400">
          The same visual language as the production UI: a deep dark base, soft raised panels, one orange accent and the Manrope typeface.
          Use it as a clean starting point and drop your own logic on top.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button>Primary Action</Button>
          <Button variant="ghost">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button size="sm" loading>
            Loading
          </Button>
        </div>
      </motion.section>

      <Tabs
        value={tab}
        onChange={setTab}
        items={[
          { value: 'overview', label: 'Overview' },
          { value: 'components', label: 'Components', count: 5 },
          { value: 'forms', label: 'Forms' },
        ]}
      />

      {tab === 'overview' && (
        <>
          <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card className="px-4 py-4">
              <div className="mb-2 flex items-center gap-2 text-ui-orange">
                <Rocket className="h-4 w-4" />
                <span className="text-[13px] font-bold">Fast start</span>
              </div>
              <p className="text-sm text-zinc-400">Vite, React, TypeScript and Tailwind are preconfigured.</p>
            </Card>
            <Card className="px-4 py-4">
              <div className="mb-2 flex items-center gap-2 text-ui-info">
                <Palette className="h-4 w-4" />
                <span className="text-[13px] font-bold">Tokenized colors</span>
              </div>
              <p className="text-sm text-zinc-400">The palette is centralized so you can reuse it across projects.</p>
            </Card>
            <Card className="px-4 py-4">
              <div className="mb-2 flex items-center gap-2 text-ui-success">
                <Sparkles className="h-4 w-4" />
                <span className="text-[13px] font-bold">Reusable components</span>
              </div>
              <p className="text-sm text-zinc-400">Buttons, cards, badges, fields, tabs and meters are ready to use.</p>
            </Card>
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-extrabold tracking-tight text-white">Color tokens</h3>
              <p className="text-xs font-semibold text-zinc-500">{colorTokens.length} tokens</p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {colorTokens.map((token) => (
                <Card key={token.name} className="px-4 py-4">
                  <div className="h-12 rounded-xl border border-white/10" style={{ background: token.value }} />
                  <p className="mt-3 text-sm font-bold text-white">{token.name}</p>
                  <p className="text-xs text-zinc-500">{token.value}</p>
                </Card>
              ))}
            </div>
          </section>
        </>
      )}

      {tab === 'components' && (
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card className="px-4 py-4">
            <p className="mb-3 text-[13px] font-bold text-zinc-200">Badges</p>
            <div className="flex flex-wrap gap-2">
              <Badge tone="orange">Accent</Badge>
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
          </Card>
          <Card className="px-4 py-4">
            <p className="mb-3 text-[13px] font-bold text-zinc-200">Meters</p>
            <div className="flex flex-col gap-3">
              <Meter value={72} />
              <Meter value={45} tone="success" />
              <Meter value={30} tone="amber" />
              <Meter value={12} tone="danger" />
            </div>
          </Card>
        </section>
      )}

      {tab === 'forms' && (
        <Card className="grid grid-cols-1 gap-4 px-4 py-4 md:grid-cols-2">
          <Field label="Name" hint="Shown on your profile.">
            <Input value={name} onChange={setName} placeholder="Jane Doe" />
          </Field>
          <Field label="Type">
            <Select
              value={kind}
              onChange={setKind}
              options={[
                { value: 'a', label: 'Option A' },
                { value: 'b', label: 'Option B' },
              ]}
            />
          </Field>
          <Field label="Notes" className="md:col-span-2">
            <Textarea value={notes} onChange={setNotes} placeholder="Anything else?" />
          </Field>
          <Check checked={agree} onChange={setAgree} label="I agree to the terms" />
        </Card>
      )}
    </main>
  )
}

export default App
