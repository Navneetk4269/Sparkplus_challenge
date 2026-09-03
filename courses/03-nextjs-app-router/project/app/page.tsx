import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ChallengeList from './components/ChallengeList'
import Counter from './components/Counter'

// nextImage
// nextFont

export const metadata: Metadata = {
  title: 'Home | Next.js App Router Project',
  description: 'Learn Next.js App Router concepts through practical challenges.',
}

export const dynamic = 'force-static'

export default function Home() {
  return (
    <main>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1>Next.js App Router Project</h1>

        <Image
          src="/logo.png"
          alt="Next.js App Router placeholder"
          width={600}
          height={300}
        />

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