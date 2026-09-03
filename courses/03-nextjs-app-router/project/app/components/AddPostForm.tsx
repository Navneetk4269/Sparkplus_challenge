'use client'

// useServer
// revalidateTag
// revalidatePath

import { useState, useTransition } from 'react'
import { addPost } from '../actions'

export default function AddPostForm() {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState('')

  const handleSubmit = (formData: FormData) => {
    setMessage('')

    startTransition(async () => {
      try {
        await addPost(formData)
        setMessage('Post added successfully!')
      } catch {
        setMessage('Failed to add post.')
      }
    })
  }

  return (
    <form action={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          required
        />
      </div>

      <div>
        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          name="body"
          required
        />
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? 'Adding...' : 'Add Post'}
      </button>

      {message && <p>{message}</p>}
    </form>
  )
}