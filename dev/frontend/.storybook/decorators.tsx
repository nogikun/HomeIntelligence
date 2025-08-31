import { Provider } from 'react-redux'
import { store } from '../src/store'
import type { Decorator } from '@storybook/react'

export const withRedux: Decorator = (Story, context) => {
  return (
    <Provider store={store}>
      <Story {...context} />
    </Provider>
  )
}