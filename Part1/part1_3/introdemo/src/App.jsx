const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const parts = [part1, part2, part3] 

  return (
    <>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </>
  )
}

const Header = (props) => {
  console.log(props)
  return <h1>{props.course}</h1>
}

const Content = (props) => {
  return (
    <>
      {props.parts.map((part, index) => (
        <Part key={index} name={part.name} exercises={part.exercises} />
      ))}
    </>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
}

const Total = (props) => {
  const total = props.parts.reduce((sum, part) => sum + part.exercises, 0)
  return <p>Number of exercises {total}</p>
}

export default App