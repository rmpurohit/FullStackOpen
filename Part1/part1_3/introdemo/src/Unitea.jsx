import { useState } from 'react'

const Unitea = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [total, setTotal] = useState(0)
  
    {/*const handleLeftClickOld = () => {
      setAll(allClicks.concat('L'))
      setLeft(left + 1)
      setTotal(left + right)
    }*/}

    {/*const handleLeftClick = () => {
        setAll(allClicks.concat('L'))
        const updatedLeft = left + 1
        setLeft(updatedLeft)
        setTotal(updatedLeft + right) 
      }*/}
    
    const goodClick = () => {
        {/*setAll(allClicks.concat('L'))*/}
        const updatedGood = good + 1
        setGood(updatedGood)
        setTotal(updatedGood + neutral + bad)
      }

    const neutralClick = () => {
        {/*setAll(allClicks.concat('L'))*/}
         {/*const updatedLeft = left + 1
        setLeft(updatedLeft)
        setTotal(updatedLeft + right) */}
        const updatedNeutral = neutral + 1
        setNeutral(updatedNeutral)
        setTotal(good + updatedNeutral + bad)
      }
      
    const badClick = () => {
        {/*setAll(allClicks.concat('L'))
        const updatedLeft = left + 1
        setLeft(updatedLeft)
        setTotal(updatedLeft + right) */}
        const updatedBad = bad + 1
        setBad(updatedBad)
        setTotal(good + neutral + updatedBad)
      }
    
  
    {/*const handleRightClickOld = () => {
      setAll(allClicks.concat('R'))
      setRight(right + 1)
      setTotal(left + right)
    }*/}

    {/*const handleRightClick = () => {
        setAll(allClicks.concat('R'));
        const updatedRight = right + 1;
        setRight(updatedRight);
        setTotal(left + updatedRight);
      }*/}
  
    return (
      <div>
        <h1> give feedback</h1>
        <Button onClick={goodClick} text='good' />
        <Button onClick={neutralClick} text='neutral' />
        <Button onClick={badClick} text='bad' />
        <h1> statistics</h1>
        <div>good {good}</div>
        <div>neutral {neutral}</div>
        <div>bad {bad}</div>
        <div>all {total}</div>
        <div>average {total/3}</div>
        {/*<button onClick={handleLeftClick}>left</button>*/}
        {/*<button onClick={handleRightClick}>right</button>*/}
        {/*<p>{allClicks.join(' ')}</p>*/}
        {/*<History allClicks={allClicks} />*/}
      </div>
    )
  }

  const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

  {/*const History = (props) => {
    if (props.allClicks.length === 0) {
      return (
        <div>
          the app is used by pressing the buttons
        </div>
      )
    }
    return (
      <div>
        button press history: {props.allClicks.join(' ')}
      </div>
    )
  }*/}

  export default Unitea