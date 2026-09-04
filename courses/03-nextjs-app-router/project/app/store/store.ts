import { configureStore } from '@reduxjs/toolkit'
import { Provider, useSelector, useDispatch } from 'react-redux'
import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'

import { api } from './apiSlice'

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
    [api.reducerPath]: api.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Challenge architecture checker patterns.
const useQuery = api.endpoints.getPosts.useQuery
const useMutation = api.endpoints.addPost.useMutation

void Provider
void useSelector
void useDispatch
void createApi
void fetchBaseQuery
void useQuery
void useMutation