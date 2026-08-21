import { useGetUsersQuery } from '../api/apiSlice'
import ErrorDisplay from './ErrorDisplay'

export default function UsersList() {
  const useQueryHook = useGetUsersQuery

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQueryHook(undefined)

  if (isLoading) {
    return (
      <div data-testid="users-loading">
        Loading users...
      </div>
    )
  }

  if (isError) {
    return (
      <ErrorDisplay
        error={error}
        onRetry={refetch}
      />
    )
  }

  return (
    <div data-testid="users-list">
      {data?.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.username}</p>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  )
}