import TaskCard from './TaskCard'

export interface Task {
  id: string | number
  title: string
  description: string
  priority: 'Low' | 'Medium' | 'High'
  completed: boolean
}

const HARDCODED_TASKS: Task[] = [
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

interface TaskListProps {
  tasks?: Task[]
  countText?: string
}

export default function TaskList({ tasks, countText }: TaskListProps) {
  const list = tasks ?? HARDCODED_TASKS
  return (
    <div>
      {countText && (
        <p id="task-count">
          {countText}
        </p>
      )}
      <section id="task-list">
        {list.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            description={task.description}
            priority={task.priority}
          />
        ))}
      </section>
    </div>
  )
}