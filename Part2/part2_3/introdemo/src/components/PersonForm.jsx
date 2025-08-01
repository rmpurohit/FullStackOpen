const PersonForm = ({
    onSubmit,
    newName,
    handleNameChange,
    newNumber,
    handleNumberChange,
    newCity,
    handleCityChange
  }) => {
    return (
      <form onSubmit={onSubmit}>
        <table>
          <tbody>
            <tr>
              <td>name:</td>
              <td><input value={newName} onChange={handleNameChange} /></td>
            </tr>
            <tr>
              <td>number:</td>
              <td><input value={newNumber} onChange={handleNumberChange} /></td>
            </tr>
            <tr>
              <td>city:</td>
              <td><input value={newCity} onChange={handleCityChange} /></td>
            </tr>
            <tr>
              <td></td>
              <td><button type="submit">add</button></td>
            </tr>
          </tbody>
        </table>
      </form>
    )
  }
  
  export default PersonForm
  