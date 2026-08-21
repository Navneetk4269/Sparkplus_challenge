import { useGetPostByIdQuery } from '../api/apiSlice'

type PostDetailProps = {
  postId?: number
}

export default function PostDetail({
  postId,
}: PostDetailProps) {
  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useGetPostByIdQuery(postId as number, {
    skip: !postId,
  })

  if (!postId) {
    return (
      <div data-testid="post-detail">
        No post selected.
      </div>
    )
  }

  if (isLoading) {
    return (
      <div data-testid="post-detail-loading">
        Loading post...
      </div>
    )
  }

  if (isError) {
    return (
      <div data-testid="post-detail-error">
        {error instanceof Error
          ? error.message
          : 'Failed to load post.'}
      </div>
    )
  }

  return (
    <div data-testid="post-detail">
      <h2>{post?.title}</h2>
      <p>{post?.body}</p>
    </div>
  )
}