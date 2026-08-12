import type { FormEvent } from 'react'
import { useState } from 'react'
import type { Task } from './TaskList'

interface TaskFormProps {
  onAddTask: (task: Task) => void
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] =
    useState<'Low' | 'Medium' | 'High'>('Low')

  const [category, setCategory] = useState('General')
  const [tags, setTags] = useState('')
  const [dueDate, setDueDate] = useState('')

  const [error, setError] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (!title.trim()) {
      setError('Title is required')
      return
    }

    const parsedTags = tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)

    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      description,
      priority,
      completed: false,
      category,
      tags: parsedTags,
      dueDate: dueDate || undefined,
    }

    onAddTask(newTask)

    setTitle('')
    setDescription('')
    setPriority('Low')
    setCategory('General')
    setTags('')
    setDueDate('')
    setError('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="task-title">
        Title:
      </label>

      <input
        id="task-title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />

      <label htmlFor="task-description">
        Description:
      </label>

      <input
        id="task-description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br />

      <label htmlFor="task-priority">
        Priority:
      </label>

      <select
        id="task-priority"
        value={priority}
        onChange={(e) =>
          setPriority(
            e.target.value as 'Low' | 'Medium' | 'High'
          )
        }
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <br />

      <label htmlFor="task-category">
        Category:
      </label>

      <select
        id="task-category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="General">General</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>

      <br />

      <label htmlFor="task-tags-input">
        Tags:
      </label>

      <input
        id="task-tags-input"
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags, comma separated"
      />

      <br />

      <label htmlFor="task-due-date">
        Due Date:
      </label>

      <input
        id="task-due-date"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <br />

      {error && (
        <p id="task-form-error">
          {error}
        </p>
      )}

      <button type="submit">
        Add Task
      </button>
    </form>
  )
}