import type { Dispatch, SetStateAction } from 'react'
import type { Task } from './TaskList'
import TaskList from './TaskList'

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
  return (
    <TaskList
      tasks={props.tasks}
      countText={props.tasks ? `${props.tasks.length} Tasks` : undefined}
    />
  )
}
