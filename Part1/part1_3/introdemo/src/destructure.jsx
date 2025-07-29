const Hello = (props) => {
    const name = props.name
    const age = props.age
  
    const bornYear = () => new Date().getFullYear() - age
  
    return (
      <div>
        <p>Hello {name}, you are {age} years old</p>
        <p>So you were probably born in {bornYear()}</p>
      </div>
    )
  }

  const HelloDes = (props) => {
    const { name, age } = props
    const bornYear = () => new Date().getFullYear() - age
  
    return (
      <div>
        <p>Hello {name}, you are {age} years old</p>
        <p>So you were probably born in {bornYear()}</p>
      </div>
    )
  }

  const HelloT = (props) => {
    const { name, age } = props
  }

  const HelloDestructure = ({ name, age }) => {
    const bornYear = () => new Date().getFullYear() - age
  
    return (
      <div>
        <p>
          Hello {name}, you are {age} years old
        </p>
        <p>So you were probably born in {bornYear()}</p>
      </div>
    )
  }