import { useState } from "react"

const Display = ({ counter }) => {
  return (
    <div>{counter}</div>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const App = () => {
  const [counter, setCounter] = useState(0)

  const increment = () => setCounter(counter + 1)
  const decrement = () => setCounter(counter - 1)
  const reset = () => setCounter(0)

  return (
    <div>
      <Display counter={counter} />
      <Button onClick={increment} text={"plus"} />
      <Button onClick={decrement} text={"minus"} />
      <Button onClick={reset} text={"reset"} />
    </div>
  )
}

export default App