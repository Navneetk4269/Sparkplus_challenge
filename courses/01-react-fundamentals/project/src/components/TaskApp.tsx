import { useEffect, useState, useCallback, useMemo} from 'react'
import type {Dispatch} from 'react'
import type { TaskAction } from '../reducers/taskReducer'
import type { Task } from './TaskList'
import FilterBar from './FilterBar'
import TaskList from './TaskList'
import TaskForm from './TaskForm'
import StatsPanel from './StatsPanel'
import { useTheme } from '../contexts/ThemeContext'
import ErrorBoundary from './ErrorBoundary'

interface TaskAppProps {
  tasks?: Task[]
  dispatch?: Dispatch<TaskAction>

  showForm?: boolean
  countFormat?: string
  showFilterBar?: boolean
  showStatsPanel?: boolean

  onDelete?: (
    id: string | number
  ) => void

  linkToTaskDetail?: boolean
  countText?: string
}

type SortOrder =
  | 'recent'
  | 'high-low'
  | 'low-high'
  | 'alphabetical'
  | 'due-soonest'

export default function TaskApp(
  props: TaskAppProps
) {
  const [filter, setFilter,] = useState<'all' | 'active' | 'completed'>('all')

  const [sortOrder, setSortOrder,] = useState<SortOrder>('recent')

  const [editingId, setEditingId,] = useState<string | number | null>(null)

  const [search, setSearch,] = useState('')

  const [debouncedSearch, setDebouncedSearch,] = useState('')

  const [category, setCategory,] = useState('')

  const { theme, toggleTheme } = useTheme()


  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search)
    }, 300)

    return () => {
      clearTimeout(timeout)
    }
  }, [search])

  const isSearching =
    search !== debouncedSearch


  const handleAddTask = useCallback(
    (task: Task) => {
      props.dispatch?.({
        type: 'ADD_TASK',
        payload: task,
      })
    },
    [props.dispatch]
  )

  const handleToggleTask = useCallback(
    (id: string | number) => {
      props.dispatch?.({
        type: 'TOGGLE_TASK',
        payload: id,
      })
    },
    [props.dispatch]
  )


  const handleUpdateTask = useCallback(
    (
      id: string | number,
      updates: Pick<
        Task,
        | 'title'
        | 'description'
        | 'priority'
        | 'dueDate'
      >
    ) => {
      props.dispatch?.({
        type: 'UPDATE_TASK',
        payload: {
          id,
          ...updates,
        },
      })

      setEditingId(null)
    },
    [props.dispatch]
  )

  const handleCancelEdit = useCallback(() => {
    setEditingId(null)
  }, [])

  const completedCount = useMemo(
    () =>
      props.tasks?.filter(
        (task) => task.completed
      ).length ?? 0,
    [props.tasks]
  )

  const countText =
    props.countFormat ===
    'completed'
      ? `${completedCount} of ${
          props.tasks?.length ?? 0
        } completed`
      : `${
          props.tasks?.length ?? 0
        } Tasks`

  const categories = useMemo(
    () => [
      ...new Set(
        (props.tasks ?? [])
          .map(
            (task) => task.category
          )
          .filter(Boolean)
      ),
    ],
    [props.tasks]
  )

  const sortedTasks = useMemo(() => {
    const filteredTasks =
      props.tasks?.filter((task) => {
        if (
          filter === 'active' &&
          task.completed
        ) {
          return false
        }

        if (
          filter === 'completed' &&
          !task.completed
        ) {
          return false
        }

        if (
          category &&
          task.category !== category
        ) {
          return false
        }

        if (debouncedSearch.trim()) {
          const searchTerm =
            debouncedSearch
              .trim()
              .toLowerCase()

          return (
            task.title
              .toLowerCase()
              .includes(searchTerm) ||
            task.description
              .toLowerCase()
              .includes(searchTerm)
          )
        }

        return true
      }) ?? []

    const result = [...filteredTasks]

    if (sortOrder === 'high-low') {
      const priority = {
        High: 3,
        Medium: 2,
        Low: 1,
      }

      result.sort(
        (a, b) =>
          priority[b.priority] -
          priority[a.priority]
      )
    }

    if (sortOrder === 'low-high') {
      const priority = {
        High: 3,
        Medium: 2,
        Low: 1,
      }

      result.sort(
        (a, b) =>
          priority[a.priority] -
          priority[b.priority]
      )
    }

    if (sortOrder === 'alphabetical') {
      result.sort(
        (a, b) =>
          a.title
            .toLowerCase()
            .localeCompare(
              b.title.toLowerCase()
            )
      )
    }

    if (sortOrder === 'due-soonest') {
      result.sort((a, b) => {
        if (
          !a.dueDate &&
          !b.dueDate
        ) {
          return 0
        }

        if (!a.dueDate) {
          return 1
        }

        if (!b.dueDate) {
          return -1
        }

        return (
          new Date(
            a.dueDate
          ).getTime() -
          new Date(
            b.dueDate
          ).getTime()
        )
      })
    }

    return result
  }, [
    props.tasks,
    filter,
    category,
    debouncedSearch,
    sortOrder,
  ])

  const displayCount =
    props.showFilterBar
      ? `Showing ${
          sortedTasks.length
        } of ${
          props.tasks?.length ?? 0
        } tasks`
      : countText

  return (
    <>
      <button
        id="theme-toggle"
        type="button"
        onClick={toggleTheme}
      >
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </button>
      {props.showForm && (
        <TaskForm
          onAddTask={
            handleAddTask
          }
        />
      )}

      {props.showFilterBar && (
        <FilterBar
          filter={filter}
          onFilterChange={
            setFilter
          }
          sortOrder={
            sortOrder
          }
          onSortChange={
            setSortOrder
          }
          search={search}
          onSearchChange={
            setSearch
          }
          categories={
            categories
          }
          category={
            category
          }
          onCategoryChange={
            setCategory
          }
        />
      )}

      {isSearching &&
        search && (
          <p id="searching-indicator">
            Searching...
          </p>
        )}

      {props.showFilterBar &&
        sortedTasks.length ===
          0 && (
          <p id="filter-empty-message">
            {search
              ? 'No tasks found'
              : 'No tasks match this filter'}
          </p>
        )}

      {props.showStatsPanel && (
        <StatsPanel tasks={props.tasks ?? []} />
      )}

      <ErrorBoundary>
        <TaskList
          tasks={
            props.showFilterBar
              ? sortedTasks
              : props.tasks
          }
          countText={displayCount}
          onToggle={handleToggleTask}
          onDelete={props.onDelete}
          editingId={editingId}
          onUpdateTask={handleUpdateTask}
          onEdit={setEditingId}
          onCancelEdit={handleCancelEdit}
        />
      </ErrorBoundary>
    </>
  )
}