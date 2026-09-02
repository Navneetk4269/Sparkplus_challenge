type PostPageProps = {
  params: {
    id: string
  }
}

export default function PostPage({ params }: PostPageProps) {
  return (
    <div>
      <h1>Post Details</h1>
      <p>Post ID: {params.id}</p>
    </div>
  )
}