import { HomePage } from '@/pages/home'
import { SettingsPage } from '@/pages/settings'
import { useTheme } from '@/shared/hooks/useTheme'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {
  useTheme()
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='/settings' element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
