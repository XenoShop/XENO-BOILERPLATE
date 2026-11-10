import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/manrope/wght.css'
import './index.css'
import App from './App.tsx'
import { inGame } from './lib/nui'
import { initPreferences } from './styles/preferences'
import { initTheme } from './styles/themes'

document.documentElement.dataset.ingame = inGame ? 'true' : 'false'

initTheme()
initPreferences()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
