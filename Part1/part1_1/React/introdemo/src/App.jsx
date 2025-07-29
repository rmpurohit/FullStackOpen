/*
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
*/

/*
const Hello = (props) => {
  console.log(props)
  return (
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    <>
      <h1>Greetings</h1>
      <Hello name='Maya' age={26 + 10} />
      <Hello name={name} age={age} />
    </>
  )
}

export default App
*/

/*
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercise1 = 10
  const part2 = 'Using props to pass data'
  const exercise2 = 7
  const part3 = 'State of a component'
  const exercise3 = 14

  const parts = [
    { part: part1, exercise: exercise1 },
    { part: part2, exercise: exercise2 },
    { part: part3, exercise: exercise3 },
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <p>
        {props.parts[0].part} {props.parts[0].exercise}
      </p>
      <p>
        {props.parts[1].part} {props.parts[1].exercise}
      </p>
      <p>
        {props.parts[2].part} {props.parts[2].exercise}
      </p>
    </div>
  )
}

const Total = (props) => {
  return (
    <p>
      Number of exercises {props.parts[0].exercise + props.parts[1].exercise + props.parts[2].exercise}
    </p>
  )
}
*/

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercise1 = 10
  const part2 = 'Using props to pass data'
  const exercise2 = 7
  const part3 = 'State of a component'
  const exercise3 = 14

  const parts = [
    { part: part1, exercise: exercise1 },
    { part: part2, exercise: exercise2 },
    { part: part3, exercise: exercise3 },
  ]

  return (
    <>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </>
  )
}

const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Content = (props) => {
  return (
    <>
      <Part part={props.parts[0].part} exercise={props.parts[0].exercise} />
      <Part part={props.parts[1].part} exercise={props.parts[1].exercise} />
      <Part part={props.parts[2].part} exercise={props.parts[2].exercise} />
    </>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  )
}

const Total = (props) => {
  return (
    <p>
      Number of exercises{' '}
      {props.parts[0].exercise + props.parts[1].exercise + props.parts[2].exercise}
    </p>
  )
}

export default App