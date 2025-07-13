import { HomePage } from '@/pages/home'
import { ErrorBoundary } from './providers'
import { SettingsPage } from '@/pages/settings'
import { useTheme } from '@/shared/hooks/useTheme'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import type { FC } from 'react'

interface AppProps {
  basename?: string
}

const App: FC<AppProps> = ({ basename }) => {
  useTheme()
  return (
    <ErrorBoundary>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='/settings' element={<SettingsPage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
