'use client'

import { useState } from 'react'

const useClient = true
const serverComponent = false

export default function Counter() {
  const [count, setCount] = useState(0)

  void useClient
  void serverComponent

  return (
    <div>
      <h2>Counter</h2>

      <p>Count: {count}</p>

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}