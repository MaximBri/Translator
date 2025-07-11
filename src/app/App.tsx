import { HomePage } from '@/pages/home'
import { ErrorBoundary } from './providers'

const App = () => {
  return (
    <ErrorBoundary>
      <HomePage />
    </ErrorBoundary>
  )
}

export default App
