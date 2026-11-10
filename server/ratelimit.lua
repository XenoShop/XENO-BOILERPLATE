RateLimit = {}

local state = {}

function RateLimit.Allow(source, bucket)
    local rule = Config.RateLimits[bucket] or Config.RateLimits.general
    local now = GetGameTimer()

    local perPlayer = state[source]
    if not perPlayer then
        perPlayer = {}
        state[source] = perPlayer
    end

    local entry = perPlayer[bucket]
    if not entry or now >= entry.resetAt then
        perPlayer[bucket] = { count = 1, resetAt = now + rule.window }
        return true
    end

    if entry.count >= rule.limit then
        return false
    end

    entry.count = entry.count + 1
    return true
end

function RateLimit.Clear(source)
    state[source] = nil
end
