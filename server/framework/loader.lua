Framework = nil
FrameworkError = nil

local VALID = { esx = true, qbcore = true, qbox = true }

local DETECT_ORDER = { 'qbox', 'qbcore', 'esx' }

local function detect()
    local found = {}
    for _, key in ipairs(DETECT_ORDER) do
        if GetResourceState(FrameworkAdapters[key].resource) == 'started' then
            found[#found + 1] = key
        end
    end

    if #found == 0 then
        return nil, 'no supported framework is started (looked for qbx_core, qb-core, es_extended)'
    end
    if #found > 1 then
        Utils.Warn(('several frameworks are running (%s); using "%s". Set Config.Framework explicitly in config/server.lua to silence this.')
            :format(table.concat(found, ', '), found[1]))
    end
    return found[1]
end

function InitFramework()
    local wanted = type(Config.Framework) == 'string' and Config.Framework:lower() or 'auto'
    local key = wanted

    if wanted == 'auto' then
        local detected, err = detect()
        if not detected then
            FrameworkError = err
            return false
        end
        key = detected
    elseif not VALID[wanted] then
        FrameworkError = ("Config.Framework '%s' is invalid. Use 'auto', 'esx', 'qbcore' or 'qbox'."):format(tostring(Config.Framework))
        return false
    end

    local adapter = FrameworkAdapters[key]
    local ok, err = adapter.Init()
    if not ok then
        FrameworkError = ("framework '%s' selected but unavailable: %s"):format(key, err or 'unknown error')
        return false
    end

    Framework = adapter
    Utils.Info(('framework adapter: %s'):format(key))
    return true
end
