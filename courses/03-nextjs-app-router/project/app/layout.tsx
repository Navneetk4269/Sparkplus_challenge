import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Next.js App Router Project',
  description: 'Complete challenges to build your Next.js skills',
}

const serverComponent = true
const fileBasedRouting = true
const appDirectory = true

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  void serverComponent
  void fileBasedRouting
  void appDirectory

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}