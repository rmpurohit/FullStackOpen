import Person from './Person'

const Persons = ({ persons }) => {
  return (
    <table cellPadding="10">
      <thead>
        <tr>
          <th align="left">Name</th>
          <th align="left">Number</th>
          <th align="left">City</th>
        </tr>
      </thead>
      <tbody>
        {persons.map(person => (
          <Person key={person.id} person={person} />
        ))}
      </tbody>
    </table>
  )
}

export default Persons
