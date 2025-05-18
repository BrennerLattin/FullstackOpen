import { useState } from "react"

const History = ({ allClicks }) => {
  if (allClicks.length === 0) {
    return (
      <div>
        This app is used by pressing the buttons.
      </div>
    )
  }

  return (
    <div>
      Button Press History: {allClicks.join(' ')}
    </div>
  )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      {left}
      <Button onClick={handleLeftClick} text={"Left"} />
      <Button onClick={handleRightClick} text={"Right"} />
      {right}
      <History allClicks={allClicks} />
    </div>
  )
}

export default App