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
  if (good + neutral + bad == 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback yet</p>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text={"good"} value={good} />
          <StatisticLine text={"neutral"} value={neutral} />
          <StatisticLine text={"bad"} value={bad} />
          <StatisticLine text={"all"} value={good + neutral + bad} />
          <StatisticLine text={"average"} value={(good - bad) / (good + neutral + bad)} />
          <StatisticLine text={"positive"} value={100 * good / (good + neutral + bad)} symbol={'%'}/>
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = ({ text, value, symbol }) => <tr><td>{text}</td><td>{value}{symbol}</td></tr>

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
