import { useAppDispatch, useAppSelector } from '../store/hooks'
import { decrement, increment } from '../store/slices/counterSlice'

export default function CounterView() {
  const count = useAppSelector((state) => state.counter)
  const dispatch = useAppDispatch()

  return (
    <div data-testid="counter-view">
      <h2 data-testid="counter-value">{count}</h2>

      <button
        data-testid="increment-btn"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>

      <button
        data-testid="decrement-btn"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
    </div>
  )
}