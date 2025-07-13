import { HomePage } from '@/pages/home'
import { ErrorBoundary } from './providers'
import { SettingsPage } from '@/pages/settings'
import { useTheme } from '@/shared/hooks/useTheme'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {
  useTheme()
  return (
    <ErrorBoundary>
      <BrowserRouter basename='/src/app/extension/popup.html'>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='/settings' element={<SettingsPage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
