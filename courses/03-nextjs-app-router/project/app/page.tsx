import Link from 'next/link'
import ChallengeList from './components/ChallengeList'

const serverComponent = true
const fileBasedRouting = true
const appDirectory = true

export default function Home() {
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

      <ChallengeList />
    </main>
  )
}