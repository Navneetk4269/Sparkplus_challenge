import { useEffect, useState } from 'react'
import Badge from './Badge'
import StatusIndicator from './StatusIndicator'

interface TaskCardProps {
  id: string | number
  title: string
  description: string
  priority: 'Low' | 'Medium' | 'High'
  completed: boolean

  category?: string
  tags?: string[]
  dueDate?: string

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
      dueDate?: string
    }
  ) => void
}

export default function TaskCard({
  id,
  title,
  description,
  priority,
  completed,
  category,
  tags = [],
  dueDate,
  onToggle,
  onDelete,
  editing,
  onEdit,
  onCancelEdit,
  onUpdateTask,
}: TaskCardProps) {
  const [editTitle, setEditTitle] = useState(title)
  const [editDescription, setEditDescription] =
    useState(description)

  const [editPriority, setEditPriority] =
    useState<'Low' | 'Medium' | 'High'>(priority)

  const [editDueDate, setEditDueDate] =
    useState(dueDate ?? '')

  useEffect(() => {
    if (editing) {
      setEditTitle(title)
      setEditDescription(description)
      setEditPriority(priority)
      setEditDueDate(dueDate ?? '')
    }
  }, [
    editing,
    title,
    description,
    priority,
    dueDate,
  ])

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const due = dueDate
    ? new Date(`${dueDate}T00:00:00`)
    : null

  const isOverdue =
    !!due &&
    !completed &&
    due < today

  const isDueToday =
    !!due &&
    due.getTime() === today.getTime()

  const threeDaysFromNow = new Date(today)
  threeDaysFromNow.setDate(
    today.getDate() + 3
  )

  const isDueSoon =
    !!due &&
    due > today &&
    due <= threeDaysFromNow

  function handleSave() {
    if (!editTitle.trim()) {
      return
    }

    onUpdateTask?.(id, {
      title: editTitle.trim(),
      description: editDescription,
      priority: editPriority,
      dueDate: editDueDate || undefined,
    })

    onCancelEdit?.()
  }

  function handleCancel() {
    setEditTitle(title)
    setEditDescription(description)
    setEditPriority(priority)
    setEditDueDate(dueDate ?? '')

    onCancelEdit?.()
  }

  return (
    <article
      id="task-card"
      data-completed={completed}
      data-overdue={isOverdue ? 'true' : 'false'}
    >
      {onToggle && (
        <input
          type="checkbox"
          checked={completed}
          onChange={onToggle}
        />
      )}

      <h2
        style={{
          textDecoration: completed
            ? 'line-through'
            : 'none',
        }}
      >
        {title}
      </h2>

      <p>
        {description}
      </p>

      <p>
        Priority:{' '}
        <Badge variant={priority.toLowerCase()}>
          {priority}
        </Badge>
      </p>

      <p id="task-category">
        Category:{' '}
        <Badge variant="category">
          {category}
        </Badge>
      </p>

      <div id="task-tags">
        {tags.map((tag) => (
          <span key={tag} data-tag={tag}>
            <Badge variant="tag">
              {tag}
            </Badge>
          </span>
        ))}
      </div>

      {dueDate && (
        <p
          id="task-due-date"
          data-overdue={isOverdue ? 'true' : 'false'}
        >
          Due:{' '}
          {new Date(
            `${dueDate}T00:00:00`
          ).toLocaleDateString()}

          {isOverdue && (
            <StatusIndicator status="overdue" />
          )}

          {!isOverdue && isDueToday && (
            <StatusIndicator status="due-today" />
          )}

          {!isOverdue &&
            !isDueToday &&
            isDueSoon && (
              <StatusIndicator status="due-soon" />
            )}
        </p>
      )}

      {onDelete && (
        <button
          type="button"
          onClick={() => {
            if (
              window.confirm(
                'Are you sure?'
              )
            ) {
              onDelete(id)
            }
          }}
        >
          Delete
        </button>
      )}

      {!editing && (
        <button
          type="button"
          onClick={onEdit}
        >
          Edit
        </button>
      )}

      {editing && (
        <>
          <input
            value={editTitle}
            onChange={(e) =>
              setEditTitle(e.target.value)
            }
          />

          <textarea
            value={editDescription}
            onChange={(e) =>
              setEditDescription(
                e.target.value
              )
            }
          />

          <select
            value={editPriority}
            onChange={(e) =>
              setEditPriority(
                e.target.value as
                  | 'Low'
                  | 'Medium'
                  | 'High'
              )
            }
          >
            <option value="Low">
              Low
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="High">
              High
            </option>
          </select>

          <input
            id="task-due-date"
            type="date"
            value={editDueDate}
            onChange={(e) =>
              setEditDueDate(
                e.target.value
              )
            }
          />

          <button
            type="button"
            onClick={handleSave}
          >
            Save
          </button>

          <button
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </>
      )}
    </article>
  )
}