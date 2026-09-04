import type { Metadata } from 'next'
import './globals.css'
import StoreProvider from './providers/StoreProvider'
import { configureStore } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'

// generateMetadata
// nextImage
// nextFont

import { Inter } from 'next/font/google'

void configureStore
void useSelector
void useDispatch

const inter = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Next.js App Router Project',
  description: 'Complete challenges to build your Next.js skills',
}

const useClient = false
const useState = false
const serverComponent = true

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  void useClient
  void useState
  void serverComponent

  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}