local ESX

local adapter = { key = 'esx', resource = 'es_extended' }

function adapter.Init()
    if GetResourceState(adapter.resource) ~= 'started' then
        return false, "resource 'es_extended' is not started"
    end

    local ok, shared = pcall(function() return exports['es_extended']:getSharedObject() end)
    if not ok or not shared then
        return false, "could not obtain ESX via exports['es_extended']:getSharedObject() (ESX Legacy 1.6+ required)"
    end

    ESX = shared
    return true
end

function adapter.GetPlayer(source)
    return ESX.GetPlayerFromId(source)
end

function adapter.GetCharacterIdentifier(source)
    local xPlayer = ESX.GetPlayerFromId(source)
    return xPlayer and xPlayer.identifier or nil
end

function adapter.GetCharacterName(source)
    local xPlayer = ESX.GetPlayerFromId(source)
    if not xPlayer then return nil end

    local name = xPlayer.getName and xPlayer.getName() or xPlayer.name
    if type(name) == 'string' and name ~= '' then return name end

    local vars = xPlayer.variables
    if vars and vars.firstName then
        return (vars.firstName .. ' ' .. (vars.lastName or '')):match('^%s*(.-)%s*$')
    end
    return nil
end

function adapter.GetPlayerJob(source)
    local xPlayer = ESX.GetPlayerFromId(source)
    if not xPlayer then return nil end

    local job = xPlayer.getJob and xPlayer.getJob() or xPlayer.job
    if not job or not job.name then return nil end

    return {
        name = job.name,
        label = job.label or job.name,
        grade = tonumber(job.grade) or 0,
        gradeLabel = job.grade_label or job.grade_name or tostring(job.grade or 0),
    }
end

function adapter.GetPlayerDutyStatus()
    return nil
end

function adapter.RegisterUsableItem(name, callback)
    ESX.RegisterUsableItem(name, function(source, item)
        callback(source, item)
    end)
end

function adapter.GetOnlineSources()
    local out = {}
    for _, id in ipairs(GetPlayers()) do
        local src = tonumber(id)
        if src and ESX.GetPlayerFromId(src) then out[#out + 1] = src end
    end
    return out
end

function adapter.Notify(source, message, notifyType, duration)
    TriggerClientEvent('esx:showNotification', source, message, NotifyTypes.esx[notifyType] or 'info', duration or 5000)
end

FrameworkAdapters.esx = adapter
