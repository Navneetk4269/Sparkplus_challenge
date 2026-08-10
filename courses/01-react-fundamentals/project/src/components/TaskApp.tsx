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
        />
      )}

      {props.showFilterBar && filteredTasks.length === 0 && (
        <p id="filter-empty-message">
          No tasks match this filter
        </p>
      )}
      <TaskList
        tasks={props.showFilterBar ? filteredTasks : props.tasks}
        countText={displayCount}
        onToggle={handleToggleTask}
        onDelete={props.onDelete}
      />
    </>
  )
}
