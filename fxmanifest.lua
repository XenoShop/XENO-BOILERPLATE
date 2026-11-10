fx_version 'cerulean'
game 'gta5'
lua54 'yes'

name 'xeno-boilerplate'
author 'XenoShop'
description 'Xeno resource boilerplate — ESX / QBCore / Qbox adapters, NUI bridge and a React interface'
version '1.0.0'

ui_page 'web/dist/index.html'

shared_scripts {
    'config/shared.lua',
    'locales/*.lua',
    'shared/constants.lua',
    'shared/locale.lua',
}

client_scripts {
    'client/main.lua',
}

server_scripts {
    'config/server.lua',
    'server/utils.lua',
    'server/framework/base.lua',
    'server/framework/esx.lua',
    'server/framework/qbcore.lua',
    'server/framework/qbox.lua',
    'server/framework/loader.lua',
    'server/ratelimit.lua',
    'server/permissions.lua',
    'server/handlers.lua',
    'server/exports.lua',
    'server/main.lua',
}

files {
    'web/dist/index.html',
    'web/dist/**/*',
}

escrow_ignore {
    'config/*.lua',
    'locales/*.lua',
    'README.md',
}
