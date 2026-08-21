import { createApi } from '@reduxjs/toolkit/query/react'

import { mockApi } from './mockServer'

type User = {
  id: number
  name: string
  username: string
  email: string
}

type Post = {
  id: number
  title: string
  body: string
}

export const apiSlice = createApi({
  reducerPath: 'api',

  baseQuery: async () => ({ data: null }),

  tagTypes: ['User', 'Post'],

  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      queryFn: async () => {
        try {
          const data = await mockApi.getUsers()

          return { data }
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error:
                error instanceof Error
                  ? error.message
                  : 'Failed to fetch users',
            },
          }
        }
      },

      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'User' as const,
                id,
              })),
              { type: 'User' as const, id: 'LIST' },
            ]
          : [{ type: 'User' as const, id: 'LIST' }],
    }),

    getPosts: builder.query<Post[], void>({
      queryFn: async () => {
        return {
          data: [],
        }
      },

      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'Post' as const,
                id,
              })),
              { type: 'Post' as const, id: 'LIST' },
            ]
          : [{ type: 'Post' as const, id: 'LIST' }],
    }),

    addPost: builder.mutation<Post, Omit<Post, 'id'>>({
      queryFn: async (body) => {
        try {
          return {
            data: {
              id: Date.now(),
              ...body,
            },
          }
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error:
                error instanceof Error
                  ? error.message
                  : 'Failed to add post',
            },
          }
        }
      },

      invalidatesTags: [{ type: 'Post', id: 'LIST' }],

      async onQueryStarted(
        arg,
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            'getPosts',
            undefined,
            (draft) => {
              draft.push({
                ...arg,
                id: Date.now(),
              })
            },
          ),
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),
  }),
})

export const {
  useGetUsersQuery,
  useGetPostsQuery,
  useAddPostMutation,
} = apiSlice