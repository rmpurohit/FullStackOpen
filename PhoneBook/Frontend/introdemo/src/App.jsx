import { useEffect, useState } from 'react'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import { personsApi } from './services/persons.js'

const App = () => {
  const [persons, setPersons] = useState([])            // start empty
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  // fetch once on mount
  useEffect(() => {
    let isActive = true
    personsApi.getAll()
      .then(data => {
        if (isActive) setPersons(data)
      })
      .catch(err => {
        console.error('Failed to fetch persons:', err)
      })
    return () => { isActive = false }
  }, [])

  const handleAddPerson = (e) => {
    e.preventDefault()
    const name = newName.trim()
    const number = newNumber.trim()
    if (!name || !number) return

    const exists = persons.some(p => p.name.toLowerCase() === name.toLowerCase())
    if (exists) {
      alert(`${name} is already added to phonebook`)
      return
    }

    // local add for now (server POST comes in later exercises)
    const nextId = persons.reduce((m, p) => (Number(p.id) > m ? Number(p.id) : m), 0) + 1
    setPersons(persons.concat({ id: String(nextId), name, number }))
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

      <h2 className="section-title">Add a new</h2>
      <PersonForm
        onSubmit={handleAddPerson}
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
