interface FormInputProps {
  label?: string
  id: string
  value: string
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void
  type?: string
  placeholder?: string
  error?: string
}

export default function FormInput({
  label,
  id,
  value,
  onChange,
  type = 'text',
  placeholder,
  error,
}: FormInputProps) {
  return (
    <div>
      {label && (
        <label htmlFor={id}>
          {label}
        </label>
      )}

      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />

      {error && (
        <p id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  )
}