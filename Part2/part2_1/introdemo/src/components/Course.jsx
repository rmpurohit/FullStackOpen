const Course = ({ course }) => {
    return (
      <div>
        <Header title={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }
  
  const Header = ({ title }) => <h2>{title}</h2>
  
  const Content = ({ parts }) => (
    <>
      {parts.map(part => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </>
  )
  
  const Part = ({ name, exercises }) => (
    <p>
      {name} {exercises}
    </p>
  )
  
  const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return <p><strong>total of {total} exercises</strong></p>
  }
  
  export default Course
  