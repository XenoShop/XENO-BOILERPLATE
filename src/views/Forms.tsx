import { useState } from 'react'
import { FormInput } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Check, Field, Input, Select, Textarea } from '../components/ui/Field'
import { Panel, ViewHeader } from '../components/ui/Panel'

export function Forms() {
  const [name, setName] = useState('')
  const [kind, setKind] = useState('a')
  const [notes, setNotes] = useState('')
  const [agree, setAgree] = useState(true)

  return (
    <div>
      <ViewHeader title="Forms" icon={<FormInput className="h-5 w-5 text-ui-accent" />} subtitle="Inputs, selects, text areas and checkboxes share one control style." />

      <Panel>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="ghost">Cancel</Button>
          <Button>Save</Button>
        </div>
      </Panel>
    </div>
  )
}
