import { useState } from 'react'

const Second = () => {
    const [ counter, setCounter ] = useState(0)
  
    setTimeout(
      () => setCounter(counter + 1),
      1000
    )
  
    console.log('rendering...', counter)
  
    return (
      <div>{counter}</div>
    )
  }

export default Second