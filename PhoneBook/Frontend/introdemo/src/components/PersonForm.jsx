const PersonForm = ({
  onSubmit,
  nameValue,
  onNameChange,
  numberValue,
  onNumberChange,
}) => (
  <form onSubmit={onSubmit} className="grid-2 form">
    <label htmlFor="name">Name</label>
    <input
      id="name"
      value={nameValue}
      onChange={onNameChange}
      minLength={3}
      required
    />

    <label htmlFor="number">Number</label>
    <input
      id="number"
      type="tel"
      value={numberValue}
      onChange={onNumberChange}
      // loosely guide the format; server does the real validation
      pattern="[0-9]{2,3}-[0-9]+"
      placeholder="09-123456 or 040-555"
      required
    />

    <div />
    <button type="submit" className="btn">Add</button>
  </form>
);

export default PersonForm;