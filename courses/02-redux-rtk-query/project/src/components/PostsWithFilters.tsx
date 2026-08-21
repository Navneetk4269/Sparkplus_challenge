import { useGetPostsQuery } from '../api/apiSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setSortBy } from '../store/slices/filtersSlice'

export default function PostsWithFilters() {
  const { data: posts = [], isLoading, error } = useGetPostsQuery()

  const dispatch = useAppDispatch()
  const { sortBy } = useAppSelector((state) => state.filters)

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === 'newest') {
      return b.id - a.id
    }

    if (sortBy === 'oldest') {
      return a.id - b.id
    }

    return a.title.localeCompare(b.title)
  })

  if (isLoading) {
    return <div>Loading posts...</div>
  }

  if (error) {
    return <div>Error loading posts.</div>
  }

  return (
    <div data-testid="posts-with-filters">
      <div data-testid="filter-controls">
        <label htmlFor="sortBy">Sort by: </label>

        <select
          id="sortBy"
          value={sortBy}
          onChange={(event) =>
            dispatch(
              setSortBy(
                event.target.value as 'newest' | 'oldest' | 'title',
              ),
            )
          }
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="title">Title</option>
        </select>
      </div>

      <div>
        {sortedPosts.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}