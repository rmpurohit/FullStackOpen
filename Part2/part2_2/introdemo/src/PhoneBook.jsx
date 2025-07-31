import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const PhoneBook = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', city: 'Boston', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', city: 'Chicago', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', city: 'New York', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', city: 'Miami', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newCity, setNewCity] = useState('')
  const [filter, setFilter] = useState('')

  const handleAddPerson = (event) => {
    event.preventDefault()

    const nameExists = persons.some(
      person => person.name.toLowerCase() === newName.toLowerCase()
    )

    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = {
      name: newName.trim(),
      number: newNumber.trim(),
      city: newCity.trim(),
      id: persons.length + 1
    }

    setPersons([...persons, newPerson])
    setNewName('')
    setNewNumber('')
    setNewCity('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)
  const handleCityChange = (event) => setNewCity(event.target.value)

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
  
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={handleAddPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        newCity={newCity}
        handleCityChange={handleCityChange}
      />
  
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default PhoneBook
