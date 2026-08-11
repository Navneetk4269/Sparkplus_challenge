import { useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import type { Task } from './TaskList'
import FilterBar from './FilterBar'
import TaskList from './TaskList'
import TaskForm from './TaskForm'

interface TaskAppProps {
  tasks?: Task[]
  setTasks?: Dispatch<SetStateAction<Task[]>>
  dispatch?: (action: { type: string; payload?: unknown }) => void
  showForm?: boolean
  countFormat?: string
  showFilterBar?: boolean
  showStatsPanel?: boolean
  onDelete?: (id: string | number) => void
  linkToTaskDetail?: boolean
  countText?: string
}

export default function TaskApp(props: TaskAppProps) {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  const [sortOrder, setSortOrder] = useState<'recent' | 'high-low' | 'low-high' | 'alphabetical'>('recent')

  const [editingId, setEditingId] = useState<string | number | null>(null)

  function handleAddTask(task: Task){
    props.setTasks?.((prevTasks) => [...prevTasks, task])
  }
  function handleToggleTask(id: string | number) {
    props.setTasks?.((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  function handleUpdateTask(
    id: string | number,
    updates: Pick<Task, 'title' | 'description' | 'priority'>
  ) {
    props.setTasks?.((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, ...updates }
          : task
      )
    )

    setEditingId(null)
  }

  function handleCancelEdit() {
    setEditingId(null)
  }


  const completedCount =
  props.tasks?.filter((task) => task.completed).length ?? 0

  const countText = props.countFormat === 'completed'
    ? `${completedCount} of ${props.tasks?.length ?? 0} completed`
    : `${props.tasks?.length ?? 0} Tasks`

  const filteredTasks =
  props.tasks?.filter((task) => {
    if (filter === 'active') {
      return !task.completed
    }

    if (filter === 'completed') {
      return task.completed
    }

    return true
  }) ?? []


  const sortedTasks = [...filteredTasks]
  if (sortOrder === 'high-low') {
    const priority = {
      High: 3,
      Medium: 2,
      Low: 1,
    }

    sortedTasks.sort(
      (a, b) => priority[b.priority] - priority[a.priority]
    )
  }

  if (sortOrder === 'low-high') {
    const priority = {
      High: 3,
      Medium: 2,
      Low: 1,
    }

    sortedTasks.sort(
      (a, b) => priority[a.priority] - priority[b.priority]
    )
  }

  if (sortOrder === 'alphabetical') {
    sortedTasks.sort((a, b) =>
      a.title.toLowerCase().localeCompare(b.title.toLowerCase())
    )
  }

  const displayCount =
  props.showFilterBar
    ? `Showing ${filteredTasks.length} of ${props.tasks?.length ?? 0} tasks`
    : countText
  return (
    <>
      {props.showForm && <TaskForm onAddTask={handleAddTask} />}
      {props.showFilterBar && (
        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
        />
      )}

      {props.showFilterBar && sortedTasks.length === 0 && (
        <p id="filter-empty-message">
          No tasks match this filter
        </p>
      )}
      <TaskList
        tasks={props.showFilterBar ? sortedTasks : props.tasks}
        countText={displayCount}
        onToggle={handleToggleTask}
        onDelete={props.onDelete}
        editingId={editingId}
        onUpdateTask={handleUpdateTask}
        onEdit={setEditingId}
        onCancelEdit={handleCancelEdit}
      />
    </>
  )
}
