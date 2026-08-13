import { useEffect, useState } from 'react'

interface TodoItem {
  id: string | number
  title: string
}

export default function FetchDemoView() {
  const [items, setItems] = useState<TodoItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchTodos() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch('/api/todos.json')

        if (!response.ok) {
          throw new Error('Failed to fetch todos')
        }

        const data: TodoItem[] = await response.json()

        if (!cancelled) {
          setItems(data)
          setLoading(false)
        }
      } catch {
        if (!cancelled) {
          setError('Failed to load data')
          setLoading(false)
        }
      }
    }

    fetchTodos()

    return () => {
      cancelled = true
    }
  }, [])

  if (loading) {
    return (
      <div id="fetch-loading">
        Loading...
      </div>
    )
  }

  if (error) {
    return (
      <div id="fetch-error">
        {error}
      </div>
    )
  }

  return (
    <ul id="fetch-list">
      {items.map((item) => (
        <li key={item.id}>
          {item.title}
        </li>
      ))}
    </ul>
  )
}