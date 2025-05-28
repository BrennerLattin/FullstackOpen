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
  const total = course.parts.reduce((accumulator, part) => accumulator + part.exercises, 0)

  return (
    <>
      <p><b>Total of {total} exercises</b></p>
    </>
  )
}

const Course = ({ course }) =>
  <div>
    <Header course={course} />
    <Content course={course} />
    <Footer course={course} />
  </div>

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App