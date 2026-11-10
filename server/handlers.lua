Handlers = {}

local registry = {}

function Handlers.Ok(data)
    return { ok = true, data = data }
end

function Handlers.Fail(code)
    return { ok = false, error = code, message = _L('err.' .. tostring(code)) }
end

local ok, fail = Handlers.Ok, Handlers.Fail

function Handlers.Register(action, options, fn)
    registry[action] = { fn = fn, bucket = options.bucket, permission = options.permission == true }
end

function Handlers.Dispatch(src, action, payload)
    local handler = registry[action]
    if not handler then return fail('unknown_action') end
    if not Framework then return fail('not_ready') end
    if type(payload) ~= 'table' then payload = {} end

    if not RateLimit.Allow(src, handler.bucket or 'general') then return fail('rate_limited') end

    local actor = Permissions.Identity(src)
    if not actor then return fail('no_character') end

    if handler.permission then
        local allowed, why = Permissions.Check(src)
        if not allowed then return fail(why or 'no_permission') end
    end

    return handler.fn(actor, payload, src)
end

Handlers.Register('bootstrap', {}, function(actor, _, src)
    return ok({
        me = { name = actor.name },
        profile = Permissions.Summary(src),
        locale = GetLocaleTable(),
        settings = {
            locale = Config.Locale,
            version = GetResourceMetadata(Const.RESOURCE, 'version', 0) or '1.0.0',
        },
    })
end)

Handlers.Register('echo', { bucket = 'sensitive', permission = true }, function(actor, payload)
    local text = Utils.CleanString(payload.text, 80)
    if not text or text == '' then return fail('invalid_input') end
    return ok({ text = text, from = actor.name, at = os.time() })
end)
