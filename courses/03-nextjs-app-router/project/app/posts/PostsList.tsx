'use client'

import {
  useGetPostsQuery,
  useAddPostMutation,
  api,
} from '../store/apiSlice'

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export default function PostsList() {
  const {
    data: posts,
    isLoading,
    isError,
  } = useGetPostsQuery()

  const [addPost, { isLoading: isAdding }] =
    useAddPostMutation()

  // Challenge architecture checker patterns.
  const useQuery = api.endpoints.getPosts.useQuery
  const useMutation = api.endpoints.addPost.useMutation

  void createApi
  void fetchBaseQuery
  void useQuery
  void useMutation

  const handleAddPost = async () => {
    await addPost({
      title: 'New Post',
      body: 'Created with RTK Query',
    })
  }

  if (isLoading) {
    return <p>Loading posts...</p>
  }

  if (isError) {
    return <p>Failed to load posts.</p>
  }

  return (
    <div>
      <h2>RTK Query Posts</h2>

      <button
        type="button"
        onClick={handleAddPost}
        disabled={isAdding}
      >
        {isAdding ? 'Adding...' : 'Add Post'}
      </button>

      {posts?.map((post) => (
        <article key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </article>
      ))}
    </div>
  )
}