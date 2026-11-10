local RESOURCE = Const.RESOURCE
local FRAMEWORK_RETRIES = 10
local FRAMEWORK_RETRY_MS = 2000

RegisterNetEvent(Const.EVT_REQUEST, function(requestId, action, payload)
    local src = source
    if type(requestId) ~= 'number' or type(action) ~= 'string' or #action > 32 then return end

    local ok, result = pcall(Handlers.Dispatch, src, action, payload)
    if not ok then
        Utils.Error(('handler "%s" failed: %s'):format(action, tostring(result)))
        result = Handlers.Fail('internal')
    end

    TriggerClientEvent(Const.EVT_RESPONSE, src, requestId, result)
end)

AddEventHandler('playerDropped', function()
    RateLimit.Clear(source)
end)

local function pushProfile(src)
    if not Framework then return end
    TriggerClientEvent(Const.EVT_PROFILE, src, Permissions.Summary(src))
end
AddEventHandler('QBCore:Server:OnJobUpdate', function(src) if tonumber(src) then pushProfile(src) end end)
AddEventHandler('qbx_core:server:onJobUpdate', function(src) if tonumber(src) then pushProfile(src) end end)
AddEventHandler('esx:setJob', function(src) if tonumber(src) then pushProfile(src) end end)

CreateThread(function()
    local ready = InitFramework()
    local attempts = 1
    while not ready and attempts < FRAMEWORK_RETRIES do
        Wait(FRAMEWORK_RETRY_MS)
        attempts = attempts + 1
        ready = InitFramework()
    end

    if not ready then
        Utils.Error('cannot start: ' .. tostring(FrameworkError))
        Utils.Error('Set Config.Framework in config/server.lua and make sure the framework starts BEFORE ' .. RESOURCE .. '.')
        return
    end

    Utils.Info('online')
end)

RegisterCommand(RESOURCE .. '_status', function(source)
    if source ~= 0 and not IsPlayerAceAllowed(tostring(source), Config.AcePermission) then return end
    print(('[%s] framework=%s'):format(RESOURCE, Framework and Framework.key or 'none'))
end, false)
