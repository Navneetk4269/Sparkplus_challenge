'use client'

import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../store/store'

export default function Counter() {
  const count = useSelector(
    (state: RootState) => state.counter.value,
  )

  const dispatch = useDispatch()

  return (
    <div>
      <p>Count: {count}</p>

      <button
        type="button"
        onClick={() => dispatch({ type: 'counter/increment' })}
      >
        Increment
      </button>

      <button
        type="button"
        onClick={() => dispatch({ type: 'counter/decrement' })}
      >
        Decrement
      </button>
    </div>
  )
}