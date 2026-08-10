import type { Dispatch, SetStateAction } from 'react'
import type { Task } from './TaskList'
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
  function handleAddTask(task: Task){
    props.setTasks?.((prevTasks) => [...prevTasks, task])
  }
  return (
    <>
      {props.showForm && <TaskForm onAddTask={handleAddTask} />}
      <TaskList
        tasks={props.tasks}
        countText={props.tasks ? `${props.tasks.length} Tasks` : undefined}
      />
    </>
  )
}
