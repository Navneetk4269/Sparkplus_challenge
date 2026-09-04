import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'

import PostsList from './PostsList'

import AddPostForm from '../components/AddPostForm'

export const metadata: Metadata = {
  title: 'Posts | Next.js App Router Project',
  description: 'View and search posts.',
}

const loadingTsx = (
  <div>
    <p>Loading posts...</p>
  </div>
)

type Post = {
  id: number
  title: string
  body: string
}

type PostsPageProps = {
  searchParams: {
    q?: string
    page?: string
  }
}

async function PostsContent({
  searchParams,
}: PostsPageProps) {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/posts',
    {
      next: {
        revalidate: 60,
      },
    },
  )

  const posts: Post[] = await response.json()

  const searchQuery = searchParams.q?.toLowerCase() || ''
  const currentPage = Number(searchParams.page) || 1
  const postsPerPage = 5

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery),
  )

  const totalPages = Math.ceil(
    filteredPosts.length / postsPerPage,
  )

  const safePage = Math.min(
    Math.max(currentPage, 1),
    Math.max(totalPages, 1),
  )

  const startIndex = (safePage - 1) * postsPerPage

  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage,
  )

  return (
    <div>
      <h1>Posts</h1>

      <form method="GET">
        <input
          type="text"
          name="q"
          placeholder="Search posts..."
          defaultValue={searchParams.q || ''}
        />

        <button type="submit">
          Search
        </button>
      </form>

      <div>
        {paginatedPosts.length > 0 ? (
          paginatedPosts.map((post) => (
            <article key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </article>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>

      <div>
        {safePage > 1 && (
          <Link
            href={`/posts?q=${encodeURIComponent(searchQuery)}&page=${safePage - 1}`}
          >
            Previous
          </Link>
        )}

        <span>
          {' '} Page {safePage} of {totalPages || 1} {' '}
        </span>

        {safePage < totalPages && (
          <Link
            href={`/posts?q=${encodeURIComponent(searchQuery)}&page=${safePage + 1}`}
          >
            Next
          </Link>
        )}
      </div>
    </div>
  )
}

export default function PostsPage({
  searchParams,
}: PostsPageProps) {
  return (
    <>
      <AddPostForm />

      <PostsList />

      <Suspense fallback={loadingTsx}>
        <PostsContent searchParams={searchParams} />
      </Suspense>
    </>
  )
}