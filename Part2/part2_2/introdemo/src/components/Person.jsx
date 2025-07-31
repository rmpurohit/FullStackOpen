const Person = ({ person }) => {
    return (
      <tr>
        <td>{person.name}</td>
        <td>{person.number}</td>
        <td>{person.city}</td>
      </tr>
    )
  }
  
  export default Person
  