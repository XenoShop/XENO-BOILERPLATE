local QBCore

local adapter = { key = 'qbcore', resource = 'qb-core' }

function adapter.Init()
    if GetResourceState(adapter.resource) ~= 'started' then
        return false, "resource 'qb-core' is not started"
    end

    local ok, core = pcall(function() return exports['qb-core']:GetCoreObject() end)
    if not ok or not core then
        return false, "could not obtain QBCore via exports['qb-core']:GetCoreObject()"
    end

    QBCore = core
    return true
end

local function playerData(source)
    local player = QBCore.Functions.GetPlayer(source)
    return player and NormalizeQbPlayerData(player.PlayerData) or nil
end

function adapter.GetPlayer(source)
    return QBCore.Functions.GetPlayer(source)
end

function adapter.GetCharacterIdentifier(source)
    local data = playerData(source)
    return data and data.identifier or nil
end

function adapter.GetCharacterName(source)
    local data = playerData(source)
    return data and data.name or nil
end

function adapter.GetPlayerJob(source)
    local data = playerData(source)
    return data and data.job or nil
end

function adapter.GetPlayerDutyStatus(source)
    local data = playerData(source)
    if not data or not data.job then return nil end
    return data.job.onDuty == true
end

function adapter.RegisterUsableItem(name, callback)
    QBCore.Functions.CreateUseableItem(name, function(source, item)
        callback(source, item)
    end)
end

function adapter.GetOnlineSources()
    local out = {}
    for _, src in ipairs(QBCore.Functions.GetPlayers()) do out[#out + 1] = tonumber(src) end
    return out
end

function adapter.Notify(source, message, notifyType, duration)
    TriggerClientEvent('QBCore:Notify', source, message, NotifyTypes.qbcore[notifyType] or 'primary', duration or 5000)
end

FrameworkAdapters.qbcore = adapter
