import { Suspense } from 'react'

const loadingTsx = (
  <div>
    <p>Loading posts...</p>
  </div>
)

async function PostsContent() {
  return (
    <div>
      <h1>Posts</h1>
      <p>Posts will be displayed here.</p>
    </div>
  )
}

export default function PostsPage() {
  return (
    <Suspense fallback={loadingTsx}>
      <PostsContent />
    </Suspense>
  )
}