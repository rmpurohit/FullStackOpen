import { useState } from 'react'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '040-123456' },
    { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (e) => {
    e.preventDefault()
    const name = newName.trim()
    const number = newNumber.trim()
    if (!name || !number) return

    const exists = persons.some(p => p.name.toLowerCase() === name.toLowerCase())
    if (exists) {
      alert(`${name} is already added to phonebook`)
      return
    }

    const nextId = persons.reduce((m, p) => (p.id > m ? p.id : m), 0) + 1
    setPersons(persons.concat({ id: nextId, name, number }))
    setNewName('')
    setNewNumber('')
  }

  const personsToShow =
    filter.trim() === ''
      ? persons
      : persons.filter(p =>
          p.name.toLowerCase().includes(filter.trim().toLowerCase())
        )

  return (
    <div className="app">
      <h1>Phonebook</h1>

      <Filter value={filter} onChange={(e) => setFilter(e.target.value)} />

      <h2 className="section-title">Add a new contact</h2>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        onNameChange={(e) => setNewName(e.target.value)}
        numberValue={newNumber}
        onNumberChange={(e) => setNewNumber(e.target.value)}
      />

      <h2 className="section-title">Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App
