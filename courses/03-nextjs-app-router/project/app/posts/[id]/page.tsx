import { notFound } from 'next/navigation'

// errorTsx

type Post = {
  id: number
  title: string
  body: string
}

type PostPageProps = {
  params: {
    id: string
  }
}

export default async function PostPage({
  params,
}: PostPageProps) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`,
    {
      cache: 'no-store',
    },
  )

  if (!response.ok) {
    notFound()
  }

  const post: Post = await response.json()

  if (!post) {
    notFound()
  }

  return (
    <div>
      <h1>Post Details</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>Post ID: {post.id}</p>
    </div>
  )
}