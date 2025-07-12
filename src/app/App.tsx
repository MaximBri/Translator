import { HomePage } from '@/pages/home'
import { ErrorBoundary } from './providers'
import { useTheme } from '@/shared/hooks/useTheme'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {
  useTheme()
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
