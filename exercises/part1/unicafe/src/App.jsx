import { useState } from 'react'

const Feedback = ({ incGood, incNeutral, incBad }) => {

  return (
    <div>
      <h1>give feedback</h1>
      <Button label={"good"} onClick={incGood} />
      <Button label={"neural"} onClick={incNeutral} />
      <Button label={"bad"} onClick={incBad} />
    </div>
  )
}

const Button = ({ label, onClick }) => <button onClick={onClick}>{label}</button>

const Statistics = ({ good, neutral, bad }) => {
  return (
    <div>
      <h1>statistics</h1>
      <Counter label={"good"} count={good} />
      <Counter label={"neutral"} count={neutral} />
      <Counter label={"bad"} count={bad} />
      <Counter label={"all"} count={good + neutral + bad} />
      <p>average {(good - bad) / (good + neutral + bad)}</p>
      <p>positive {100 * good / (good + neutral + bad)}%</p>
    </div>
  )
}

const Counter = ({ label, count }) => <div>{label} {count}</div>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incGood = () => setGood(good + 1)
  const incNeutral = () => setNeutral(neutral + 1)
  const incBad = () => setBad(bad + 1)

  return (
    <div>
      <Feedback incGood={incGood} incNeutral={incNeutral} incBad={incBad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
