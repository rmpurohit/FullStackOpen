const Persons = ({ persons }) => (
    <table className="table compact">
      <thead>
        <tr>
          <th>Name</th>
          <th>Number</th>
        </tr>
      </thead>
      <tbody>
        {persons.map(p => (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td>{p.number}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
  
  export default Persons
  