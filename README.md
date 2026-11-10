# Xeno Boilerplate

A starter for FiveM resources with a React interface: Lua client and server, ESX / QBCore / Qbox adapters, a NUI bridge with an action whitelist, rate limiting, permissions, localization and a themeable UI.

It is the structure of the Xeno Evidence & Forensics resource with every domain feature removed.

## Layout

```
fxmanifest.lua
config/
  shared.lua        language, command, key, allowed UI actions      (client + server)
  server.lua        framework, access rules, rate limits            (server only)
locales/            en.lua, bg.lua — one file per language, shared by Lua and the UI
shared/             constants.lua (event names), locale.lua (_L)
client/main.lua     opens/closes the UI, request pipeline, command + key, exports
server/
  utils.lua         logging, input cleaning
  framework/        esx / qbcore / qbox adapters + auto-detection
  ratelimit.lua     per-player buckets
  permissions.lua   job / grade / duty / ACE checks
  handlers.lua      handler registry + the example handlers `bootstrap` and `echo`
  exports.lua       server exports (Open, Notify)
  main.lua          request event, framework start-up, status command
web/                React + Vite + Tailwind interface (see web/README.md)
```

## Install

1. Put the folder in `resources/` and name it `xeno-boilerplate` (any name works; events and exports follow the folder name).
2. Build the interface once: `cd web && npm install && npm run build` (the build lands in `web/dist`, which is what the manifest serves).
3. `ensure xeno-boilerplate` after your framework in `server.cfg`.
4. In game: `/xeno` or the key from `Config.OpenKey` (default F6).

No database, inventory or ox_lib is required.

## How a request flows

```
React  request('echo', { text })
  → NUI callback 'request'                       client/main.lua   (rejected unless in Config.Actions)
  → server event  <resource>:server:request      server/main.lua
  → Handlers.Dispatch                            rate limit → character → permission → your handler
  → <resource>:client:response → NUI → promise resolves with { ok, data } or { ok:false, error, message }
```

The client and the server both validate. The client whitelist only saves a round trip; the server never trusts it.

## Add your own feature

1. **Handler** (`server/handlers.lua`):

   ```lua
   Handlers.Register('ping', { bucket = 'general', permission = true }, function(actor, payload, src)
       return Handlers.Ok({ pong = os.time(), by = actor.name })
   end)
   ```

   `actor` is `{ src, id, name }`. Return `Handlers.Ok(data)` or `Handlers.Fail('code')`; the code needs an `err.<code>` entry in the locales.
2. **Allow it** in `Config.Actions` (`config/shared.lua`).
3. **Call it** from the UI: `const result = await request<{ pong: number }>('ping')`.

## Configuration

| File | Option | What it does |
|---|---|---|
| `config/shared.lua` | `Locale`, `Debug`, `Command`, `OpenKey`, `Actions` | language, console diagnostics, how the UI opens, which actions the UI may call |
| `config/server.lua` | `Framework` | `auto`, `esx`, `qbcore` or `qbox` |
| | `Jobs`, `AcePermission`, `RequireDuty` | who passes `permission = true` handlers (empty `Jobs` = every player with a character) |
| | `RateLimits` | calls per window per player and bucket |

Admins bypass the job rule with the ACE `xeno.boilerplate`: `add_ace group.admin xeno.boilerplate allow`.

## Exports

Client: `exports['xeno-boilerplate']:Open(context)`, `:Close()`.
Server: `exports['xeno-boilerplate']:Open(source, context)`, `:Notify(source, message, 'success' | 'error' | 'info')`.

The server console command `<resource>_status` prints the detected framework.

## Languages

Copy `locales/en.lua` to `locales/<code>.lua`, rename the table to `Locales.<code>`, translate, and set `Config.Locale`. Missing keys fall back to English. The server sends the merged table to the UI inside `bootstrap`, so Lua and React share one set of strings. While developing the UI in a browser, `web/scripts/export-locale.mjs` copies `locales/en.lua` into `web/src/dev/locale.en.json`.

## UI development

```
cd web
npm run dev      # browser preview with a mock server (src/dev/mockBridge.ts)
npm run lint
npm run build    # produces web/dist for FiveM
```

Rebuild after every UI change you want to see in game, and `restart xeno-boilerplate`.
