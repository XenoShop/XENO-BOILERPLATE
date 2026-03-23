import { motion } from 'framer-motion'
import { Palette, Rocket, Sparkles } from 'lucide-react'
import { Button } from './components/ui/Button'
import { Card } from './components/ui/Card'
import { SectionHeader } from './components/ui/SectionHeader'
import { colorTokens } from './styles/tokens'

function App() {
  return (
    <main className="mx-auto flex w-full max-w-[1240px] flex-col gap-6 px-4 py-6 md:px-8 md:py-10">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="rounded-2xl border border-white/5 bg-ui-panel px-5 py-6 backdrop-blur-panel md:px-8"
      >
        <SectionHeader
          lead="STYLE SYSTEM"
          title="REUSABLE VITE + REACT STARTER"
          icon={<Palette className="h-6 w-6 text-ui-orange" />}
        />
        <p className="mt-4 max-w-3xl text-sm text-zinc-300">
          This starter keeps the full visual language from your previous project and strips all domain logic. Use
          it as a clean base for new products with glass panels, accent glows, and ready-to-use color tokens.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button>Primary Action</Button>
          <Button variant="ghost">Secondary</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </motion.section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="px-4 py-4">
          <div className="mb-2 flex items-center gap-2 text-ui-orange">
            <Rocket className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-[0.15em]">Fast Start</span>
          </div>
          <p className="text-sm text-zinc-300">Vite, React, TypeScript and Tailwind are preconfigured.</p>
        </Card>
        <Card className="px-4 py-4">
          <div className="mb-2 flex items-center gap-2 text-ui-info">
            <Palette className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-[0.15em]">Tokenized Colors</span>
          </div>
          <p className="text-sm text-zinc-300">The palette is centralized so you can reuse it across projects.</p>
        </Card>
        <Card className="px-4 py-4">
          <div className="mb-2 flex items-center gap-2 text-ui-success">
            <Sparkles className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-[0.15em]">Reusable Components</span>
          </div>
          <p className="text-sm text-zinc-300">Buttons, cards and section headers are ready for immediate use.</p>
        </Card>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-black tracking-wider text-white">COLOR TOKENS</h3>
          <p className="text-xs uppercase tracking-[0.15em] text-zinc-500">{colorTokens.length} tokens</p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {colorTokens.map((token) => (
            <Card key={token.name} className="px-4 py-4">
              <div className="h-12 rounded-xl border border-white/10" style={{ background: token.value }} />
              <p className="mt-3 text-sm font-bold text-white">{token.name}</p>
              <p className="text-xs uppercase tracking-[0.1em] text-zinc-500">{token.value}</p>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-4 text-lg font-black tracking-wider text-white">LAYOUT BLOCKS</h3>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card className="px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Hero Block</p>
            <p className="mt-2 text-xl font-black text-white">Use for page headers and CTAs</p>
            <p className="mt-2 text-sm text-zinc-400">Built on glass background, strong contrast typography and accent actions.</p>
          </Card>
          <Card className="px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Content Block</p>
            <p className="mt-2 text-xl font-black text-white">Use for metrics, lists or forms</p>
            <p className="mt-2 text-sm text-zinc-400">Same visual style, neutral semantics, no domain-specific behavior included.</p>
          </Card>
        </div>
      </section>
    </main>
  )
}

export default App
