const Header = (props) => {
  return (
    <>
    <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      {props.parts.map((part, index) => <Part key={index} part={part} />)}
    </>
  )
}

const Part = (props) => {
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )
}

const Footer = (props) => {
  return (
    <>
      <p>Number of exercises {props.exercises.reduce((accumulator, exercises) => accumulator + exercises, 0)}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {name: 'Fundamentals of React', exercises: 10},
    {name: 'Using props to pass data', exercises: 7},
    {name: 'State of a component', exercises: 14}
  ]
  const exercises = parts.map(part => part.exercises)

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Footer exercises={exercises} />
    </div>
  )
}

export default App