local adapter = { key = 'qbox', resource = 'qbx_core' }

function adapter.Init()
    if GetResourceState(adapter.resource) ~= 'started' then
        return false, "resource 'qbx_core' is not started"
    end
    return true
end

local function getPlayer(source)
    local ok, player = pcall(function() return exports.qbx_core:GetPlayer(source) end)
    if not ok then return nil end
    return player
end

local function playerData(source)
    local player = getPlayer(source)
    return player and NormalizeQbPlayerData(player.PlayerData) or nil
end

function adapter.GetPlayer(source)
    return getPlayer(source)
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
    exports.qbx_core:CreateUseableItem(name, function(source, item)
        callback(source, item)
    end)
end

function adapter.GetOnlineSources()
    local out = {}
    for _, id in ipairs(GetPlayers()) do
        local src = tonumber(id)
        if src and getPlayer(src) then out[#out + 1] = src end
    end
    return out
end

function adapter.Notify(source, message, notifyType, duration)
    exports.qbx_core:Notify(source, message, NotifyTypes.qbox[notifyType] or 'inform', duration or 5000)
end

FrameworkAdapters.qbox = adapter
