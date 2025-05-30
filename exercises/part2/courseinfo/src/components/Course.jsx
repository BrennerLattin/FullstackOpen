const Header = ({ course }) => {
  return (
    <>
    <h2>{course.name}</h2>
    </>
  )
}

const Content = ({ course }) => {
  return (
    <>
      {course.parts.map(part => <Part key={part.id} part={part} />)}
    </>
  )
}

const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Footer = ({ course }) => {
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

export default Course