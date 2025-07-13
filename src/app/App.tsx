import { HomePage } from '@/pages/home'
import { ErrorBoundary } from './providers'
import { SettingsPage } from '@/pages/settings'
import { useTheme } from '@/shared/hooks/useTheme'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './providers/redux/store'
import type { FC } from 'react'

interface AppProps {
  basename?: string
}

const App: FC<AppProps> = ({ basename }) => {
  useTheme()
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter basename={basename}>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path='/settings' element={<SettingsPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  )
}

export default App
