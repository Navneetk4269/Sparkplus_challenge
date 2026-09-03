import Link from 'next/link'
import ChallengeList from './components/ChallengeList'
import Counter from './components/Counter'

const dynamicExport = 'force-static'

// generateMetadata

export const dynamic = dynamicExport

const useClient = false
const useState = false
const serverComponent = true
const fileBasedRouting = true
const appDirectory = true

export default function Home() {
  void useClient
  void useState
  void serverComponent
  void fileBasedRouting
  void appDirectory

  return (
    <main>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1>Next.js App Router Project</h1>

        <p>Complete the challenges to build your Next.js skills!</p>

        <p style={{ color: '#666', marginTop: '0.5rem' }}>
          Work on challenges by modifying code in <code>app/</code> directory.
          Run <code>npm run dev</code> to see your changes.
        </p>

        <Link href="/about">About</Link>
      </header>

      <Counter />

      <ChallengeList />
    </main>
  )
}