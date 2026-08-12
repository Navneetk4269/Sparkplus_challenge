import { useEffect, useState } from 'react'
import type {
  Dispatch,
  SetStateAction,
} from 'react'

import type { Task } from './TaskList'
import FilterBar from './FilterBar'
import TaskList from './TaskList'
import TaskForm from './TaskForm'
import StatsPanel from './StatsPanel'
import { useTheme } from '../contexts/ThemeContext'

interface TaskAppProps {
  tasks?: Task[]
  setTasks?: Dispatch<
    SetStateAction<Task[]>
  >

  dispatch?: (
    action: {
      type: string
      payload?: unknown
    }
  ) => void

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


  function handleAddTask(task: Task) {
    props.setTasks?.(
      (prevTasks) => [
        ...prevTasks,
        task,
      ]
    )
  }

  function handleToggleTask(
    id: string | number
  ) {
    props.setTasks?.(
      (prevTasks) =>
        prevTasks.map((task) =>
          task.id === id
            ? {
                ...task,
                completed:
                  !task.completed,
              }
            : task
        )
    )
  }


  function handleUpdateTask(
    id: string | number,
    updates: Pick<
      Task,
      | 'title'
      | 'description'
      | 'priority'
      | 'dueDate'
    >
  ) {
    props.setTasks?.(
      (prevTasks) =>
        prevTasks.map((task) =>
          task.id === id
            ? {
                ...task,
                ...updates,
              }
            : task
        )
    )

    setEditingId(null)
  }

  function handleCancelEdit() {
    setEditingId(null)
  }

  const completedCount =
    props.tasks?.filter(
      (task) =>
        task.completed
    ).length ?? 0

  const countText =
    props.countFormat ===
    'completed'
      ? `${completedCount} of ${
          props.tasks?.length ?? 0
        } completed`
      : `${
          props.tasks?.length ?? 0
        } Tasks`

  const categories = [
    ...new Set(
      (props.tasks ?? [])
        .map(
          (task) =>
            task.category
        )
        .filter(Boolean)
    ),
  ]

  const filteredTasks =
    props.tasks?.filter(
      (task) => {
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

        if (
          debouncedSearch.trim()
        ) {
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
      }
    ) ?? []

  const sortedTasks = [
    ...filteredTasks,
  ]

  if (
    sortOrder ===
    'high-low'
  ) {
    const priority = {
      High: 3,
      Medium: 2,
      Low: 1,
    }

    sortedTasks.sort(
      (a, b) =>
        priority[b.priority] -
        priority[a.priority]
    )
  }

  if (
    sortOrder ===
    'low-high'
  ) {
    const priority = {
      High: 3,
      Medium: 2,
      Low: 1,
    }

    sortedTasks.sort(
      (a, b) =>
        priority[a.priority] -
        priority[b.priority]
    )
  }

  if (
    sortOrder ===
    'alphabetical'
  ) {
    sortedTasks.sort(
      (a, b) =>
        a.title
          .toLowerCase()
          .localeCompare(
            b.title.toLowerCase()
          )
    )
  }
  if (
    sortOrder ===
    'due-soonest'
  ) {
    sortedTasks.sort(
      (a, b) => {
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
      }
    )
  }

  const displayCount =
    props.showFilterBar
      ? `Showing ${
          filteredTasks.length
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

      <TaskList
        tasks={
          props.showFilterBar
            ? sortedTasks
            : props.tasks
        }
        countText={
          displayCount
        }
        onToggle={
          handleToggleTask
        }
        onDelete={
          props.onDelete
        }
        editingId={
          editingId
        }
        onUpdateTask={
          handleUpdateTask
        }
        onEdit={
          setEditingId
        }
        onCancelEdit={
          handleCancelEdit
        }
      />
    </>
  )
}