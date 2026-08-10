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
  return (
    <>
      {props.showForm && <TaskForm onAddTask={handleAddTask} />}
      <TaskList
        tasks={props.tasks}
        countText={countText}
        onToggle={handleToggleTask}
        onDelete={props.onDelete}
      />
    </>
  )
}
