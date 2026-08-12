import { useState } from "react"

interface TaskCardProps {
  id: string | number
  title: string
  description: string
  priority: 'Low' | 'Medium' | 'High'
  completed: boolean
  onToggle?: () => void
  onDelete?: (id: string | number) => void
  editing?: boolean
  onEdit?: () => void
  onCancelEdit?: () => void
  onUpdateTask?: (
    id: string | number,
    updates: {
      title: string
      description: string
      priority: 'Low' | 'Medium' | 'High'
    }
  ) => void
  category?: string
  tags?: string[]
}

export default function TaskCard({
  id,
  title,
  description,
  priority,
  completed,
  onToggle,
  onDelete,
  editing,
  onEdit,
  onCancelEdit,
  onUpdateTask,
  category,
  tags = []
}: TaskCardProps) {
  const [editTitle, setEditTitle] = useState(title)
  const [editDescription, setEditDescription] = useState(description)
  const [editPriority, setEditPriority] = useState<'Low' | 'Medium' | 'High'>(priority)

  function handleSave() {
    if (!editTitle.trim()) {
      return
    }

    onUpdateTask?.(id, {
      title: editTitle,
      description: editDescription,
      priority: editPriority,
    })

    onCancelEdit?.()
  }

  function handleCancel() {
    setEditTitle(title)
    setEditDescription(description)
    setEditPriority(priority)
    onCancelEdit?.()
  }

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
      <p id="task-category">
        Category: {category}
      </p>
      <div id="task-tags">
        {tags.map((tag) => (
          <span key={tag} data-tag={tag}>
            {tag}
          </span>
        ))}
      </div>
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
      {!editing && (
        <button type="button" onClick={onEdit}>
          Edit
        </button>
      )}
      {editing && (
        <>
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />

          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />

          <select
            value={editPriority}
            onChange={(e) =>
              setEditPriority(
                e.target.value as 'Low' | 'Medium' | 'High'
              )
            }
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button type="button" onClick={handleSave}>
            Save
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </>
      )}
    </article>
  )
}