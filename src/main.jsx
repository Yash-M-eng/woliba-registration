import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import { store } from './redux/store'
import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary variant="app">
        <App />
      </ErrorBoundary>
    </Provider>
  </StrictMode>,
)
