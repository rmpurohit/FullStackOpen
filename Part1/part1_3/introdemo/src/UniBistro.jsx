import { useState } from 'react'

const UniBistro = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad
  const average = total === 0 ? 0 : ((good - bad) / total).toFixed(2)
  const positivePercentage = total === 0 ? '0%' : ((good / total) * 100).toFixed(1) + '%'

  const resetFeedback = () => {
    setGood(0)
    setNeutral(0)
    setBad(0)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Button onClick={resetFeedback} text="reset" />

      <h1>statistics</h1>

      {total === 0 ? (
        <p>No feedback given</p>
      ) : (
        <>
          <Statistic label="good" value={good} />
          <Statistic label="neutral" value={neutral} />
          <Statistic label="bad" value={bad} />
          <Statistic label="all" value={total} />
          <Statistic label="average" value={average} />
          <Statistic label="positive" value={positivePercentage} />
        </>
      )}
    </div>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

const Statistic = ({ label, value }) => (
  <div>{label} {value}</div>
)

export default UniBistro
