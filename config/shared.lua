-- ============================================================================
--  Xeno Boilerplate — SHARED configuration (loaded on the client AND the server)
-- ============================================================================
Config = Config or {}

-- Language of the interface and of every message. Files live in locales/<code>.lua (add your own by copying en.lua).
Config.Locale = 'en'

-- Extra diagnostics in the server console.
Config.Debug = false

-- Chat command that opens the interface (set to nil to disable) and the default key (nil = no key binding).
-- Players can rebind the key in Settings > Key Bindings > FiveM.
Config.Command = 'xeno'
Config.OpenKey = 'F6'

-- Actions the interface may call. The client rejects everything else before it ever reaches the server, so
-- add the name here AND register a handler with the same name in server/handlers.lua.
Config.Actions = { 'bootstrap', 'echo' }
