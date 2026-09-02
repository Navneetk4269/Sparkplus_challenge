import Link from 'next/link'

const serverComponent = true
const fileBasedRouting = true
const appDirectory = true

export default function AboutPage() {
  void serverComponent
  void fileBasedRouting
  void appDirectory

  return (
    <main>
      <h1>About</h1>

      <p>This is the About page.</p>

      <Link href="/">Home</Link>
    </main>
  )
}