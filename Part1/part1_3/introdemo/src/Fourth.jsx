import { useState } from 'react'

const Fourth = () => {
    const [counter, setCounter] = useState(0)
    console.log('rendering with counter value', counter)
  
    const increaseByOne = () => {
      console.log('increasing, value before', counter)
      setCounter(counter + 1)
    }
  
    const decreaseByOne = () => { 
      console.log('decreasing, value before', counter)
      setCounter(counter - 1)
    }
  
    const setToZero = () => {
      console.log('resetting to zero, value before', counter)
      setCounter(0)
    }
  
    return (
      <div>
        <Display counter={counter} />
        <Button onClick={increaseByOne} text="plus" />
        <Button onClick={setToZero} text="zero" />
        <Button onClick={decreaseByOne} text="minus" />
      </div>
    )
  } 

  const DisplayV1 = (props) => {
    return (
      <div>{props.counter}</div>
    )
  }

  const DisplayV2 = ({ counter }) => {
    return (
      <div>{counter}</div>
    )
  }

  const Display = ({ counter }) => <div>{counter}</div>

  const ButtonV1 = (props) => {
    return (
      <button onClick={props.onClick}>
        {props.text}
      </button>
    )
  }

  const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

  export default Fourth