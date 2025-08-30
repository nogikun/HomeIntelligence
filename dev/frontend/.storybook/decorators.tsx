import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import type { Decorator } from '@storybook/react'

// Create a store for Storybook
const createMockStore = () => {
  return configureStore({
    reducer: {
      // Add your reducers here
    },
  })
}

export const withRedux: Decorator = (Story, context) => {
  const store = createMockStore()
  
  return (
    <Provider store={store}>
      <Story {...context} />
    </Provider>
  )
}