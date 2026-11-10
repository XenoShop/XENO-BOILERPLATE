-- ============================================================================
--  Xeno Boilerplate — SERVER configuration (never sent to clients)
-- ============================================================================
Config = Config or {}

-- Framework ---------------------------------------------------------------
-- 'auto' | 'esx' | 'qbcore' | 'qbox'. If the selected framework is missing the resource prints an error and
-- stays offline — it never silently falls back to another one.
Config.Framework = 'auto'

-- Access ------------------------------------------------------------------
-- Who may use handlers that are registered with `permission = true`.
--   Jobs: job name -> minimum grade. An empty table lets every player with a character in.
--   AcePermission: players with this ACE (add_ace group.admin xeno.boilerplate allow) always pass.
Config.Jobs = {
    -- police = 0,
    -- ambulance = 2,
}
Config.AcePermission = 'xeno.boilerplate'

-- On-duty required where the framework reports it (QBCore / Qbox). ESX has no duty flag.
Config.RequireDuty = false

-- Rate limits (per player): `limit` calls per `window` milliseconds. Handlers pick a bucket with `bucket = '...'`.
Config.RateLimits = {
    general   = { limit = 40, window = 10000 },
    sensitive = { limit = 10, window = 10000 },
}
