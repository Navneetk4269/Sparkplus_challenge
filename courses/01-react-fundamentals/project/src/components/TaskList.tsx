import TaskCard from './TaskCard'

export interface Task {
  id: string | number
  title: string
  description: string
  priority: 'Low' | 'Medium' | 'High'
  completed: boolean
  category?: string
  tags?: string[]
}

const HARDCODED_TASKS: Task[] = [
    {
      id: 1,
      title: 'Task One',
      description: 'First hardcoded task',
      priority: 'High',
      completed: false,
      category: 'Work',
      tags: ['important', 'project'],
    },
    {
      id: 2,
      title: 'Task Two',
      description: 'Second hardcoded task',
      priority: 'Medium',
      completed: false,
      category: 'Personal',
      tags: ['home'],
    },
    {
      id: 3,
      title: 'Task Three',
      description: 'Third hardcoded task',
      priority: 'Low',
      completed: false,
      category: 'General',
      tags: [],
    },
  ]

interface TaskListProps {
  tasks?: Task[]
  countText?: string
  onToggle?: (id: string | number) => void
  onDelete?: (id: string | number) => void
  onUpdateTask?: (
    id: string | number,
    updates: {
      title: string
      description: string
      priority: 'Low' | 'Medium' | 'High'
    }
  ) => void
  editingId?: string | number | null
  onEdit?: (id: string | number) => void
  onCancelEdit?: () => void
}

export default function TaskList({ 
  tasks, countText, onToggle, onDelete, 
  onUpdateTask, editingId, onEdit, onCancelEdit }: TaskListProps) {

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
            id={task.id}
            title={task.title}
            description={task.description}
            priority={task.priority}
            category={task.category}
            tags={task.tags}
            completed={task.completed}
            onToggle={onToggle ? () => onToggle(task.id) : undefined}
            onDelete={onDelete}
            onUpdateTask={onUpdateTask}
            editing={editingId === task.id}
            onEdit={() => onEdit?.(task.id)}
            onCancelEdit={onCancelEdit}
          />
        ))}
      </section>
    </div>
  )
}