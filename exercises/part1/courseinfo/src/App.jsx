const Header = ({course}) => {
  return (
    <>
    <h1>{course.name}</h1>
    </>
  )
}

const Content = ({course}) => {
  return (
    <>
      {course.parts.map((part, index) => <Part key={index} part={part} />)}
    </>
  )
}

const Part = ({part}) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Footer = ({course}) => {
  const exercises = course.parts.map(part => part.exercises)

  return (
    <>
      <p>Number of exercises {exercises.reduce((accumulator, exercises) => accumulator + exercises, 0)}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {name: 'Fundamentals of React', exercises: 10},
      {name: 'Using props to pass data', exercises: 7},
      {name: 'State of a component', exercises: 14},
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Footer course={course} />
    </div>
  )
}

export default App