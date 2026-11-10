Permissions = {}

function Permissions.Identity(src)
    if not Framework then return nil end
    local id = Framework.GetCharacterIdentifier(src)
    if not id then return nil end
    return { src = src, id = id, name = Framework.GetCharacterName(src) or GetPlayerName(src) or 'Unknown' }
end

local function hasAce(src)
    return Config.AcePermission and IsPlayerAceAllowed(tostring(src), Config.AcePermission) or false
end

function Permissions.Check(src)
    if hasAce(src) then return true end

    if next(Config.Jobs) ~= nil then
        local job = Framework and Framework.GetPlayerJob(src)
        local minGrade = job and Config.Jobs[job.name]
        if minGrade == nil or job.grade < minGrade then return false, 'no_permission' end
    end

    if Config.RequireDuty and Framework.GetPlayerDutyStatus(src) == false then
        return false, 'off_duty'
    end
    return true
end

function Permissions.Summary(src)
    local allowed = Permissions.Check(src)
    local job = Framework and Framework.GetPlayerJob(src)
    return { allowed = allowed, ace = hasAce(src), job = job and { name = job.name, label = job.label, grade = job.grade, gradeLabel = job.gradeLabel } or nil }
end
