import { useEffect, useState } from 'react'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import { personsApi } from './services/persons.js'

const App = () => {
  const [persons, setPersons] = useState([])
  const [nameValue, setNameValue] = useState('')
  const [numberValue, setNumberValue] = useState('')
  const [filter, setFilter] = useState('')

  // load initial data
  useEffect(() => {
    let active = true
    personsApi.getAll()
      .then(data => { if (active) setPersons(data) })
      .catch(err => console.error('Failed to fetch persons:', err))
    return () => { active = false }
  }, [])

  // add or update
  const handleSubmit = async (e) => {
    e.preventDefault()
    const name = nameValue.trim()
    const number = numberValue.trim()
    if (!name || !number) return

    const existing = persons.find(
      p => p.name.toLowerCase() === name.toLowerCase()
    )

    try {
      if (existing) {
        const ok = window.confirm(
          `${existing.name} is already added to phonebook, replace the old number with a new one?`
        )
        if (!ok) return

        const updated = await personsApi.update(existing.id, {
          ...existing,
          number
        })
        setPersons(persons.map(p => (p.id === existing.id ? updated : p)))
      } else {
        const created = await personsApi.create({ name, number })
        // json-server may give numeric ids; keep whatever backend returns
        setPersons(persons.concat(created))
      }

      setNameValue('')
      setNumberValue('')
    } catch (err) {
      console.error('Save failed:', err)
      alert('Saving failed. Please try again.')
    }
  }

  // delete
  const handleDelete = async (person) => {
    const ok = window.confirm(`Delete ${person.name}?`)
    if (!ok) return
    try {
      await personsApi.remove(person.id)
      setPersons(persons.filter(p => p.id !== person.id))
    } catch (err) {
      console.error('Delete failed:', err)
      alert('Delete failed. The item may have been removed already.')
      // optionally also remove locally:
      setPersons(persons.filter(p => p.id !== person.id))
    }
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
        onSubmit={handleSubmit}
        nameValue={nameValue}
        onNameChange={(e) => setNameValue(e.target.value)}
        numberValue={numberValue}
        onNumberChange={(e) => setNumberValue(e.target.value)}
      />

      <h2 className="section-title">Numbers</h2>
      <Persons persons={personsToShow} onDelete={handleDelete} />
    </div>
  )
}

export default App
