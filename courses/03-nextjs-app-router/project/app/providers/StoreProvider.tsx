'use client'

import { configureStore } from '@reduxjs/toolkit'
import { Provider, useSelector, useDispatch } from 'react-redux'

import { store } from '../store/store'

type StoreProviderProps = {
  children: React.ReactNode
}

export default function StoreProvider({
  children,
}: StoreProviderProps) {
  void configureStore
  void useSelector
  void useDispatch

  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}