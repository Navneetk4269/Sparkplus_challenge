import { createApi } from '@reduxjs/toolkit/query/react'

import { mockApi } from './mockServer'

export const apiSlice = createApi({
  reducerPath: 'api',

  baseQuery: async () => ({ data: null }),

  tagTypes: ['User', 'Post'],

  endpoints: (builder) => ({
    getUsers: builder.query({
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

    addPost: builder.mutation({
      queryFn: async () => {
        return { data: null }
      },

      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetUsersQuery,
  useAddPostMutation,
} = apiSlice