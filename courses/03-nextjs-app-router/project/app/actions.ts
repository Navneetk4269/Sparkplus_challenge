'use server'

// useServer
// revalidateTag
// revalidatePath

import { revalidatePath } from 'next/cache'

export async function addPost(formData: FormData) {
  const title = formData.get('title')
  const body = formData.get('body')

  if (!title || !body) {
    throw new Error('Title and body are required')
  }

  await Promise.resolve()

  revalidatePath('/posts')
}