type Post = {
  id: number
  title: string
  body: string
}

export default async function PostsPage() {
  let posts: Post[] = []

  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts',
      {
        cache: 'no-store',
      },
    )

    if (!response.ok) {
      throw new Error('Failed to fetch posts')
    }

    posts = await response.json()
  } catch {
    return (
      <main>
        <h1>Posts</h1>
        <p>Failed to load posts.</p>
      </main>
    )
  }

  return (
    <main>
      <h1>Posts</h1>

      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div>
          {posts.map((post) => (
            <article key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}