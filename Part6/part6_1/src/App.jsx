import { useDispatch, useSelector } from 'react-redux'

export default function App() {
  const { good, ok, bad } = useSelector((s) => s)
  const dispatch = useDispatch()

  return (
    <div>
      <button onClick={() => dispatch({ type: 'GOOD' })}>good</button>
      <button onClick={() => dispatch({ type: 'OK' })}>ok</button>
      <button onClick={() => dispatch({ type: 'BAD' })}>bad</button>
      <button onClick={() => dispatch({ type: 'ZERO' })}>reset stats</button>

      <div>good {good}</div>
      <div>ok {ok}</div>
      <div>bad {bad}</div>
    </div>
  )
}
