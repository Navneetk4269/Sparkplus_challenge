interface TaskCardProps {
  title: string
  description: string
  priority: 'Low' | 'Medium' | 'High'
  completed: boolean
  onToggle?: () => void
}

export default function TaskCard({
  title,
  description,
  priority,
  completed,
  onToggle,
}: TaskCardProps) {
  return (
    <article id="task-card" data-completed={completed}>
      {onToggle && (
        <input
          type="checkbox"
          checked={completed}
          onChange={onToggle}
        />
      )}
      <h2 style={{ textDecoration: completed ? 'line-through' : 'none' }}>
        {title}
      </h2>
      <p>{description}</p>
      <p>Priority: {priority}</p>
    </article>
  )
}