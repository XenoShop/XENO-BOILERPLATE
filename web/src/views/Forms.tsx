import { useState } from 'react'
import { FormInput, Send } from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Check, Field, Input, Select, Textarea } from '../components/ui/Field'
import { Panel, ViewHeader } from '../components/ui/Panel'
import { request } from '../lib/nui'

type Reply = { tone: 'success' | 'danger'; text: string }

export function Forms() {
  const [name, setName] = useState('')
  const [kind, setKind] = useState('a')
  const [notes, setNotes] = useState('')
  const [agree, setAgree] = useState(true)
  const [busy, setBusy] = useState(false)
  const [reply, setReply] = useState<Reply | null>(null)

  const send = async () => {
    setBusy(true)
    const result = await request<{ text: string; from: string }>('echo', { text: name })
    setBusy(false)
    setReply(result.ok ? { tone: 'success', text: `${result.data.from}: ${result.data.text}` } : { tone: 'danger', text: result.message })
  }

  return (
    <div>
      <ViewHeader title="Forms" icon={<FormInput className="h-5 w-5 text-ui-accent" />} subtitle="Inputs share one control style. The button below round-trips to the server handler 'echo'." />

      <Panel>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Name" hint="Sent to the server and echoed back.">
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
        <div className="mt-5 flex items-center justify-end gap-3">
          {reply && <Badge tone={reply.tone}>{reply.text}</Badge>}
          <Button icon={<Send className="h-4 w-4" />} loading={busy} onClick={() => void send()}>
            Send to server
          </Button>
        </div>
      </Panel>
    </div>
  )
}
