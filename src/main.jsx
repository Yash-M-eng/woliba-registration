import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import { store } from './redux/store'
import 'react-toastify/dist/ReactToastify.css'
import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary variant="app">
        <App />
        <ToastContainer newestOnTop />
      </ErrorBoundary>
    </Provider>
  </StrictMode>,
)
