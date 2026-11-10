import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const source = readFileSync(resolve(here, '../../locales/en.lua'), 'utf8')

const table = {}
const pattern = /\['([^']+)'\]\s*=\s*'((?:[^'\\]|\\.)*)'/g
for (const match of source.matchAll(pattern)) {
  table[match[1]] = match[2].replace(/\\'/g, "'").replace(/\\n/g, '\n')
}

const out = resolve(here, '../src/dev/locale.en.json')
mkdirSync(dirname(out), { recursive: true })
writeFileSync(out, JSON.stringify(table, null, 2))
console.log(`locale export: ${Object.keys(table).length} keys → src/dev/locale.en.json`)
