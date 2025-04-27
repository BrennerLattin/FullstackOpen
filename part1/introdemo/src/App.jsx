const Hello = (props) => {
  console.log(props)
  return (
    <>
      <p>Hello {props.name}! You are {props.age} years old.</p>
    </>
  )
}

const App = () => {
  const a = 10
  const b = 20

  const name = 'Brenner'
  const age = 26

  return (
    <>
      <Hello name={name} age={age} />
      <Hello name='Maya' age={a + b + 6} />
      <p>{a} + {b} is {a + b}.</p>
    </>
  )
}

export default App