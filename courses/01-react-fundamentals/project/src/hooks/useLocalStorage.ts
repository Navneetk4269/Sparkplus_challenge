import { useState } from 'react'

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [
  T,
  (value: T | ((prev: T) => T)) => void
] {
  const [value, setValue] = useState<T>(() => {
    try {
      const savedValue =
        localStorage.getItem(key)

      if (savedValue === null) {
        return initialValue
      }

      return JSON.parse(savedValue) as T
    } catch {
      return initialValue
    }
  })

  function setStoredValue(
    newValue: T | ((prev: T) => T)
  ) {
    setValue((prevValue) => {
      const valueToStore =
        typeof newValue === 'function'
          ? (newValue as (prev: T) => T)(
              prevValue
            )
          : newValue

      try {
        localStorage.setItem(
          key,
          JSON.stringify(valueToStore)
        )
      } catch {
        // Ignore localStorage write errors
      }

      return valueToStore
    })
  }

  return [value, setStoredValue]
}