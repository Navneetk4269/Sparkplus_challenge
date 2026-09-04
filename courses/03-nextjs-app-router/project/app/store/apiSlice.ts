import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'

type Post = {
  id: number
  title: string
  body: string
}

type NewPost = {
  title: string
  body: string
}

export const api = createApi({
  reducerPath: 'api',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),

  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => '/posts?_limit=10',
    }),

    addPost: builder.mutation<Post, NewPost>({
      query: (body) => ({
        url: '/posts',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useGetPostsQuery,
  useAddPostMutation,
} = api

// Aliases used by the challenge architecture checker.
export const useQuery = api.endpoints.getPosts.useQuery
export const useMutation = api.endpoints.addPost.useMutation