import TaskCard from './TaskCard'

export interface Task {
  id: string | number
  title: string
  description: string
  priority: 'Low' | 'Medium' | 'High'
  completed: boolean
}

export default function TaskList() {
  const tasks: Task[] = [
    {
      id: 1,
      title: 'Task One',
      description: 'First hardcoded task',
      priority: 'High',
      completed: false,
    },
    {
      id: 2,
      title: 'Task Two',
      description: 'Second hardcoded task',
      priority: 'Medium',
      completed: false,
    },
    {
      id: 3,
      title: 'Task Three',
      description: 'Third hardcoded task',
      priority: 'Low',
      completed: false,
    },
  ]

  return (
    <section id="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          title={task.title}
          description={task.description}
          priority={task.priority}
        />
      ))}
    </section>
  )
}