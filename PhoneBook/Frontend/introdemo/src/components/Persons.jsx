const Persons = ({ persons, onDelete }) => (
  <table className="table compact">
    <thead>
      <tr>
        <th>Name</th>
        <th>Number</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {persons.map((p) => (
        <tr key={p.id}>
          <td>{p.name}</td>
          <td>{p.number}</td>
          <td>
            <button
              type="button"
              className="btn btn--danger"
              onClick={() => onDelete(p)}
            >
              delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Persons;