'use client'

// errorTsx
// notFound

type ErrorPageProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  return (
    <div>
      <h2>Something went wrong!</h2>

      <p>{error.message}</p>

      <button type="button" onClick={() => reset()}>
        Try again
      </button>
    </div>
  )
}