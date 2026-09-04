import { configureStore } from '@reduxjs/toolkit'
import { Provider, useSelector, useDispatch } from 'react-redux'

const counterReducer = (
  state = { value: 0 },
  action: { type: string },
) => {
  switch (action.type) {
    case 'counter/increment':
      return { value: state.value + 1 }
    case 'counter/decrement':
      return { value: state.value - 1 }
    default:
      return state
  }
}

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

void Provider
void useSelector
void useDispatch