import { useEffect, useState } from 'react'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import Notification from './components/Notification.jsx'
import { personsApi } from './services/persons.js'

const App = () => {
  const [persons, setPersons] = useState([])
  const [nameValue, setNameValue] = useState('')
  const [numberValue, setNumberValue] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null) // { type: 'success'|'error', text: string }
  const MESSAGE_MS = 4000

  // helper to show auto-dismissing messages
  const showMessage = (type, text) => {
    setMessage({ type, text })
    window.clearTimeout(showMessage._t)
    showMessage._t = window.setTimeout(() => setMessage(null), MESSAGE_MS)
  }

  // initial fetch
  useEffect(() => {
    let active = true
    personsApi.getAll()
      .then(data => { if (active) setPersons(data) })
      .catch(() => showMessage('error', 'Failed to load persons'))
    return () => { active = false }
  }, [])

  // add or update
  const handleSubmit = async (e) => {
    e.preventDefault()
    const name = nameValue.trim()
    const number = numberValue.trim()
    if (!name || !number) return

    const existing = persons.find(p => p.name.toLowerCase() === name.toLowerCase())

    try {
      if (existing) {
        const ok = window.confirm(
          `${existing.name} is already added to phonebook, replace the old number with a new one?`
        )
        if (!ok) return

        const updated = await personsApi.update(existing.id, { ...existing, number })
        setPersons(persons.map(p => (p.id === existing.id ? updated : p)))
        showMessage('success', `Updated number for ${updated.name}`)
      } else {
        const created = await personsApi.create({ name, number })
        setPersons(persons.concat(created))
        showMessage('success', `Added ${created.name}`)
      }
      setNameValue('')
      setNumberValue('')
    } catch (err) {
      // If resource vanished on server (e.g., 404 on update)
      if (existing && err?.response?.status === 404) {
        showMessage('error', `Information of ${existing.name} has already been removed from server`)
        // keep UI consistent with server:
        setPersons(persons.filter(p => p.id !== existing.id))
      } else {
        showMessage('error', 'Saving failed. Please try again.')
      }
    }
  }

  // delete person
  const handleDelete = async (person) => {
    const ok = window.confirm(`Delete ${person.name}?`)
    if (!ok) return
    try {
      await personsApi.remove(person.id)
      setPersons(persons.filter(p => p.id !== person.id))
      showMessage('success', `Deleted ${person.name}`)
    } catch (err) {
      // If already removed on server
      if (err?.response?.status === 404) {
        showMessage('error', `Information of ${person.name} has already been removed from server`)
        setPersons(persons.filter(p => p.id !== person.id))
      } else {
        showMessage('error', 'Delete failed. Please try again.')
      }
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

      {/* success/error banner */}
      <Notification message={message} />

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
