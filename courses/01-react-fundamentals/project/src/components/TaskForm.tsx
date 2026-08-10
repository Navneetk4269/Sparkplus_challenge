import type {Task} from './TaskList'
import {useState} from 'react'

interface TaskFormProps {
  onAddTask: (task: Task) => void
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Low')
  const [error, setError] = useState('')
  function handleSubmit(e: React.FormEvent){
    e.preventDefault()
    if (!title.trim()) {
      setError('Title is required')
      return
    }
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      priority,
      completed: false,
    }
    onAddTask(newTask)
    setTitle('')
    setDescription('')
    setPriority('Low')
    setError('')
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="task-title">Title :</label>
      <input
        id="task-title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      /><br />
      <label>Description :</label>
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      /><br />
      <label>Priority :</label>
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as 'Low' | 'Medium' | 'High')}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select><br />
      {error && (
        <p id="task-form-error">
          {error}
        </p>
      )}
      <button type="submit">Add Task</button>
    </form>
  )
}
