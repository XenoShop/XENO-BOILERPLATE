exports('Open', function(src, context)
    src = tonumber(src)
    if not src or not GetPlayerName(src) then return false end
    TriggerClientEvent(Const.EVT_OPEN, src, type(context) == 'table' and context or {})
    return true
end)

exports('Notify', function(src, message, kind)
    if not Framework or type(message) ~= 'string' then return false end
    Framework.Notify(tonumber(src), message, kind or 'info')
    return true
end)
