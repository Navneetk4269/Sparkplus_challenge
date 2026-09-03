import type { Metadata } from 'next'
import './globals.css'

// generateMetadata
// nextImage
// nextFont

import { Inter } from 'next/font/google'

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
        {children}
      </body>
    </html>
  )
}