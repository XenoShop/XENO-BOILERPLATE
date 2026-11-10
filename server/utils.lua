Utils = {}

local PREFIX = ('[%s]'):format(GetCurrentResourceName())

function Utils.Info(...) print('^2' .. PREFIX .. '^7', ...) end
function Utils.Warn(...) print('^3' .. PREFIX .. '^7', ...) end
function Utils.Error(...) print('^1' .. PREFIX .. '^7', ...) end
function Utils.Debug(...)
    if Config.Debug then print('^5' .. PREFIX .. ' [debug]^7', ...) end
end

function Utils.CleanString(value, maxLen)
    if type(value) ~= 'string' then return nil end
    maxLen = maxLen or 255
    if #value > maxLen * 4 then return nil end
    if not utf8.len(value) then return nil end

    value = value:gsub('[%c]', ''):match('^%s*(.-)%s*$')
    if utf8.len(value) > maxLen then
        value = value:sub(1, utf8.offset(value, maxLen + 1) - 1)
    end
    return value
end

function Utils.ToInt(value, min, max)
    if type(value) ~= 'number' or value ~= value then return nil end
    if value % 1 ~= 0 then return nil end
    value = math.floor(value)
    if min and value < min then return nil end
    if max and value > max then return nil end
    return value
end

function Utils.Contains(list, value)
    for i = 1, #list do
        if list[i] == value then return true end
    end
    return false
end
