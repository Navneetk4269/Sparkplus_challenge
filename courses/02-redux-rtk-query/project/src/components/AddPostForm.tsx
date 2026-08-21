import { FormEvent, useState } from 'react'
import { useAddPostMutation } from '../api/apiSlice'

export default function AddPostForm() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const [addPost, { isLoading, isSuccess, isError }] =
    useAddPostMutation()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    await addPost({
      title,
      body,
    })

    setTitle('')
    setBody('')
  }

  return (
    <form data-testid="add-post-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          value={body}
          onChange={(event) => setBody(event.target.value)}
        />
      </div>

      <button
        type="submit"
        data-testid="add-post-submit"
        disabled={isLoading}
      >
        {isLoading ? 'Adding...' : 'Add Post'}
      </button>

      {isSuccess && <p>Post added successfully!</p>}
      {isError && <p>Failed to add post.</p>}
    </form>
  )
}