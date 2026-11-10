import { Palette, Settings as SettingsIcon } from 'lucide-react'
import { AccentPicker } from '../components/ui/AccentPicker'
import { Card } from '../components/ui/Card'
import { Check, Field, Select } from '../components/ui/Field'
import { Panel, ViewHeader } from '../components/ui/Panel'
import { usePreferences } from '../styles/preferences'
import { colorTokens } from '../styles/tokens'

export function Settings() {
  const [prefs, setPrefs] = usePreferences()

  return (
    <div>
      <ViewHeader title="Settings" icon={<SettingsIcon className="h-5 w-5 text-ui-accent" />} subtitle="Appearance is stored in this browser only." />

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Accent color" right={<Palette className="h-4 w-4 text-zinc-500" />}>
          <AccentPicker />
          <p className="mt-3 text-xs text-zinc-500">Buttons, highlights, focus rings and glows follow the selected color.</p>
        </Panel>

        <Panel title="Interface">
          <div className="space-y-4">
            <Field label="Scale" hint="Resize the whole interface.">
              <Select
                value={String(prefs.scale)}
                onChange={(v) => setPrefs({ ...prefs, scale: Number(v) })}
                options={[0.85, 0.9, 1, 1.1, 1.2].map((n) => ({ value: String(n), label: `${Math.round(n * 100)}%` }))}
              />
            </Field>
            <Check checked={prefs.reducedMotion} onChange={(v) => setPrefs({ ...prefs, reducedMotion: v })} label="Reduce motion" />
          </div>
        </Panel>

        <Panel title="Color tokens" className="lg:col-span-2" right={<span className="text-xs font-semibold text-zinc-500">{colorTokens.length} tokens</span>}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {colorTokens.map((token) => (
              <Card key={token.name} className="px-3 py-3">
                <div className="h-10 rounded-lg border border-white/10" style={{ background: token.value }} />
                <p className="mt-2 text-[13px] font-bold text-white">{token.name}</p>
                <p className="truncate text-[11px] text-zinc-500">{token.value.startsWith('rgb(var') ? 'Follows accent' : token.value}</p>
              </Card>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  )
}
