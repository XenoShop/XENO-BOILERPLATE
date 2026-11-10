FrameworkAdapters = FrameworkAdapters or {}

NotifyTypes = {
    esx = { success = 'success', error = 'error', info = 'info' },
    qbcore = { success = 'success', error = 'error', info = 'primary' },
    qbox = { success = 'success', error = 'error', info = 'inform' },
}

function NormalizeQbPlayerData(playerData)
    if not playerData then return nil end

    local charinfo = playerData.charinfo or {}
    local name = ((charinfo.firstname or '') .. ' ' .. (charinfo.lastname or '')):match('^%s*(.-)%s*$')

    local job = playerData.job
    local jobInfo
    if job and job.name then
        local grade = job.grade or {}
        jobInfo = {
            name = job.name,
            label = job.label or job.name,
            grade = tonumber(grade.level) or 0,
            gradeLabel = grade.name or tostring(grade.level or 0),
            onDuty = job.onduty,
        }
    end

    return {
        identifier = playerData.citizenid,
        name = name ~= '' and name or nil,
        job = jobInfo,
    }
end
