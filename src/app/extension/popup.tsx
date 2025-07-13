import ReactDOM from 'react-dom/client'
import App from '../App'
import '@/app/index.css'

const root = document.getElementById('root')!
root.classList.add('max-w-md', 'mx-auto', 'mt-4')

ReactDOM.createRoot(root).render(<App />)
