interface TaskCardProps {
  id: string | number
  title: string
  description: string
  priority: 'Low' | 'Medium' | 'High'
  completed: boolean
  onToggle?: () => void
  onDelete?: (id: string | number) => void
}

export default function TaskCard({
  id,
  title,
  description,
  priority,
  completed,
  onToggle,
  onDelete,
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
      {onDelete && (
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Are you sure?')) {
              onDelete(id!)
            }
          }}
        >
          Delete
        </button>
      )}
    </article>
  )
}