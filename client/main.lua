local REQUEST_TIMEOUT_MS = 10000

local isOpen = false
local pending = {}
local nextId = 0

local ALLOWED_ACTIONS = {}
for _, name in ipairs(Config.Actions) do ALLOWED_ACTIONS[name] = true end

function ServerRequest(action, payload, cb)
    nextId = nextId + 1
    local id = nextId
    pending[id] = cb

    TriggerServerEvent(Const.EVT_REQUEST, id, action, payload or {})

    SetTimeout(REQUEST_TIMEOUT_MS, function()
        local waiting = pending[id]
        if waiting then
            pending[id] = nil
            waiting({ ok = false, error = 'timeout', message = _L('err.timeout') })
        end
    end)
end

RegisterNetEvent(Const.EVT_RESPONSE, function(id, result)
    local cb = pending[id]
    if cb then
        pending[id] = nil
        cb(type(result) == 'table' and result or { ok = false, error = 'internal', message = _L('err.internal') })
    end
end)

function Notify(message)
    BeginTextCommandThefeedPost('STRING')
    AddTextComponentSubstringPlayerName(message)
    EndTextCommandThefeedPostTicker(false, true)
end

local function close()
    if not isOpen then return end
    isOpen = false
    SetNuiFocus(false, false)
    SendNUIMessage({ type = 'close' })
end

function OpenUI(context)
    if isOpen then return end
    if IsPauseMenuActive() then return end
    isOpen = true
    SetNuiFocus(true, true)
    SendNUIMessage({ type = 'open', context = context or {} })
end

RegisterNUICallback('request', function(data, cb)
    local action = type(data) == 'table' and data.action
    if type(action) ~= 'string' or not ALLOWED_ACTIONS[action] then
        cb({ ok = false, error = 'unknown_action', message = _L('err.unknown_action') })
        return
    end
    ServerRequest(action, type(data.payload) == 'table' and data.payload or {}, function(result) cb(result) end)
end)

RegisterNUICallback('close', function(_, cb)
    close()
    cb({ ok = true })
end)

RegisterNetEvent(Const.EVT_OPEN, function(context)
    OpenUI(type(context) == 'table' and context or {})
end)

RegisterNetEvent(Const.EVT_PROFILE, function(profile)
    SendNUIMessage({ type = 'profile', profile = profile })
end)

if Config.Command then
    RegisterCommand(Config.Command, function() OpenUI({}) end, false)
end

if Config.OpenKey then
    local command = ('+%s_open'):format(Const.RESOURCE)
    RegisterCommand(command, function() OpenUI({}) end, false)
    RegisterCommand(('-%s_open'):format(Const.RESOURCE), function() end, false)
    RegisterKeyMapping(command, _L('app.name'), 'keyboard', Config.OpenKey)
end

exports('Open', OpenUI)
exports('Close', close)

AddEventHandler('onResourceStop', function(resource)
    if resource ~= GetCurrentResourceName() then return end
    if isOpen then SetNuiFocus(false, false) end
end)

CreateThread(function()
    while true do
        Wait(500)
        if isOpen and (IsPauseMenuActive() or IsEntityDead(PlayerPedId())) then close() end
    end
end)
