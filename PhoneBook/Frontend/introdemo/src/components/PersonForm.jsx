const PersonForm = ({
    onSubmit,
    nameValue,
    onNameChange,
    numberValue,
    onNumberChange
  }) => (
    <form onSubmit={onSubmit} className="grid-2 form">
      <label htmlFor="name">Name</label>
      <input id="name" value={nameValue} onChange={onNameChange} />
  
      <label htmlFor="number">Number</label>
      <input id="number" value={numberValue} onChange={onNumberChange} />
  
      <div /> {/* keeps button aligned under inputs */}
      <button type="submit" className="btn">Add</button>
    </form>
  )
  
  export default PersonForm
  