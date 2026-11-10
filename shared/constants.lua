local RESOURCE = GetCurrentResourceName()

Const = {
    RESOURCE = RESOURCE,

    EVT_REQUEST  = RESOURCE .. ':server:request',
    EVT_RESPONSE = RESOURCE .. ':client:response',
    EVT_OPEN     = RESOURCE .. ':client:open',
    EVT_PROFILE  = RESOURCE .. ':client:profile',
}
