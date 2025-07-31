import { useState } from 'react'

const Eighth = () => {
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [allClicks, setAll] = useState([])
    const [total, setTotal] = useState(0)
  
    const handleLeftClickOld = () => {
      setAll(allClicks.concat('L'))
      setLeft(left + 1)
      setTotal(left + right)
    }

    const handleLeftClick = () => {
        setAll(allClicks.concat('L'))
        const updatedLeft = left + 1
        setLeft(updatedLeft)
        setTotal(updatedLeft + right) 
      }
    
  
    const handleRightClickOld = () => {
      setAll(allClicks.concat('R'))
      setRight(right + 1)
      setTotal(left + right)
    }

    const handleRightClick = () => {
        setAll(allClicks.concat('R'));
        const updatedRight = right + 1;
        setRight(updatedRight);
        setTotal(left + updatedRight);
      }
  
    return (
      <div>
        {left}
        <Button onClick={handleLeftClick} text='left' />
        <Button onClick={handleRightClick} text='right' />
        {/*<button onClick={handleLeftClick}>left</button>*/}
        {/*<button onClick={handleRightClick}>right</button>*/}
        {right}
        {/*<p>{allClicks.join(' ')}</p>*/}
        <History allClicks={allClicks} />
        <p>total {total}</p>
      </div>
    )
  }

  const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

  const History = (props) => {
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
  }

  export default Eighth