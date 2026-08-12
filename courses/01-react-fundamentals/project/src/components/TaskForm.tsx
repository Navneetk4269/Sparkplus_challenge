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
  const [category, setCategory] = useState('General')
  const [tags, setTags] = useState('')
  function handleSubmit(e: React.FormEvent){
    e.preventDefault()
    const parsedTags = tags
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
    if (!title.trim()) {
      setError('Title is required')
      return
    }
    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      description,
      priority,
      completed: false,
      category,
      tags: parsedTags,
    }
    onAddTask(newTask)
    setTitle('')
    setDescription('')
    setPriority('Low')
    setCategory('General')
    setTags('')
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
      <select
        id="task-category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="General">General</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select><br/>
      <input
        id="task-tags-input"
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags, comma separated"
      /><br/>
      {error && (
        <p id="task-form-error">
          {error}
        </p>
      )}
      <button type="submit">Add Task</button>
    </form>
  )
}
