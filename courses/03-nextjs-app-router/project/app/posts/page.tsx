import { Suspense } from 'react'

import AddPostForm from '../components/AddPostForm'

// useServer
// revalidateTag
// revalidatePath

export const dynamic = 'force-dynamic'

const loadingTsx = (
  <div>
    <p>Loading posts...</p>
  </div>
)

async function PostsContent() {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=5',
    {
      cache: 'no-store',
    },
  )

  const posts = await response.json()

  return (
    <div>
      <h1>Posts</h1>

      {posts.map(
        (post: {
          id: number
          title: string
          body: string
        }) => (
          <article key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </article>
        ),
      )}
    </div>
  )
}

export default function PostsPage() {
  return (
    <>
      <AddPostForm />

      <Suspense fallback={loadingTsx}>
        <PostsContent />
      </Suspense>
    </>
  )
}