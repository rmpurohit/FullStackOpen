const Persons = ({ persons, onDelete }) => {
  if (!persons.length) {
    return <p className="muted">No entries match your filter.</p>;
  }

  return (
    <table className="table compact">
      <caption className="visually-hidden">Phonebook entries</caption>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Number</th>
          <th scope="col"><span className="visually-hidden">Actions</span></th>
        </tr>
      </thead>
      <tbody>
        {persons.map((p) => (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td>{p.number}</td>
            <td className="cell-right">
              <button
                type="button"
                className="btn btn--danger"
                onClick={() => onDelete(p)}
                aria-label={`Delete ${p.name}`}
              >
                delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Persons;
