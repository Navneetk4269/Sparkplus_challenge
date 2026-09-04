import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import LikeButton from '../../components/LikeButton'

const dynamicSegment = true
const useClient = true

export const metadata: Metadata = {
  title: 'Post Detail',
  description: 'View a post and interact with it.',
}

type Post = {
  id: number
  title: string
  body: string
}

type PageProps = {
  params: {
    id: string
  }
}

async function getPost(id: string): Promise<Post | null> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      cache: 'no-store',
    },
  )

  if (!response.ok) {
    return null
  }

  return response.json()
}

export default async function PostDetailPage({
  params,
}: PageProps) {
  void dynamicSegment
  void useClient

  const post = await getPost(params.id)

  if (!post) {
    notFound()
  }

  return (
    <main data-testid="post-detail">
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <p>Post ID: {post.id}</p>

      <LikeButton />
    </main>
  )
}