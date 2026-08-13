import { forwardRef } from 'react'

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

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  function FormInput(
    {
      label,
      id,
      value,
      onChange,
      type = 'text',
      placeholder,
      error,
    },
    ref
  ) {
    return (
      <div>
        {label && (
          <label htmlFor={id}>
            {label}
          </label>
        )}

        <input
          ref={ref}
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
)

export default FormInput