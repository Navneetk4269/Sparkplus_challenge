interface BadgeProps {
  children: React.ReactNode
  variant?: string
}

export default function Badge({
  children,
  variant = 'default',
}: BadgeProps) {
  return (
    <span
      className="badge"
      data-variant={variant}
    >
      {children}
    </span>
  )
}