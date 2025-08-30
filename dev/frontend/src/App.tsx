import { Provider } from 'react-redux'
import { store } from './store'

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Home Intelligence
          </h1>
          <p className="text-lg text-gray-600">
            React + TypeScript + Vite + shadcn/ui + Redux Toolkit
          </p>
        </div>
      </div>
    </Provider>
  )
}

export default App