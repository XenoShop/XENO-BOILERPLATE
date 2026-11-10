local function interpolate(str, params)
    if not params then return str end
    return (str:gsub('{(%w+)}', function(key)
        local value = params[key]
        if value == nil then return '{' .. key .. '}' end
        return tostring(value)
    end))
end

function _L(key, params)
    local active = Locales[Config.Locale]
    local str = (active and active[key]) or (Locales.en and Locales.en[key]) or key
    return interpolate(str, params)
end

function GetLocaleTable()
    local merged = {}
    for k, v in pairs(Locales.en or {}) do merged[k] = v end
    local active = Locales[Config.Locale]
    if active and active ~= Locales.en then
        for k, v in pairs(active) do merged[k] = v end
    end
    return merged
end
