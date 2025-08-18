import { useEffect, useRef, useState } from 'react';
import Filter from './components/Filter.jsx';
import PersonForm from './components/PersonForm.jsx';
import Persons from './components/Persons.jsx';
import Notification from './components/Notification.jsx';
import { personsApi } from './services/persons.js';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [nameValue, setNameValue] = useState('');
  const [numberValue, setNumberValue] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: string }
  const MESSAGE_MS = 4000;
  const messageTimeoutRef = useRef(null);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    if (messageTimeoutRef.current) window.clearTimeout(messageTimeoutRef.current);
    messageTimeoutRef.current = window.setTimeout(() => setMessage(null), MESSAGE_MS);
  };

  // initial fetch
  useEffect(() => {
    let active = true;
    personsApi
      .getAll()
      .then((data) => { if (active) setPersons(data); })
      .catch((err) => {
        const msg = err?.response?.data?.error || err?.message || 'Failed to load persons';
        showMessage('error', msg);
      });
    return () => { active = false; if (messageTimeoutRef.current) window.clearTimeout(messageTimeoutRef.current); };
  }, []);

  const resetForm = () => { setNameValue(''); setNumberValue(''); };

  // add or update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = nameValue.trim();
    const number = numberValue.trim();
    if (!name || !number) return;

    const existing = persons.find((p) => p.name.toLowerCase() === name.toLowerCase());

    try {
      if (existing) {
        const ok = window.confirm(`${existing.name} is already added to phonebook, replace the old number with a new one?`);
        if (!ok) return;
        // server only updates number (backend ignores name on PUT)
        const updated = await personsApi.update(existing.id, { number });
        setPersons(persons.map((p) => (p.id === existing.id ? updated : p)));
        showMessage('success', `Updated number for ${updated.name}`);
      } else {
        const created = await personsApi.create({ name, number });
        setPersons(persons.concat(created));
        showMessage('success', `Added ${created.name}`);
      }
      resetForm();
    } catch (err) {
      const status = err?.response?.status;
      const serverMsg = err?.response?.data?.error;

      if (existing && status === 404) {
        // stale client state
        showMessage('error', `Information of ${existing.name} has already been removed from server`);
        setPersons(persons.filter((p) => p.id !== existing.id));
      } else if (serverMsg) {
        // bubble Mongoose validation errors & API messages
        showMessage('error', serverMsg);
      } else {
        showMessage('error', err?.message || 'Saving failed. Please try again.');
      }
    }
  };

  // delete person
  const handleDelete = async (person) => {
    const ok = window.confirm(`Delete ${person.name}?`);
    if (!ok) return;
    try {
      await personsApi.remove(person.id);
      setPersons(persons.filter((p) => p.id !== person.id));
      showMessage('success', `Deleted ${person.name}`);
    } catch (err) {
      const status = err?.response?.status;
      if (status === 404) {
        showMessage('error', `Information of ${person.name} has already been removed from server`);
        setPersons(persons.filter((p) => p.id !== person.id));
      } else {
        const serverMsg = err?.response?.data?.error;
        showMessage('error', serverMsg || err?.message || 'Delete failed. Please try again.');
      }
    }
  };

  const personsToShow =
    filter.trim() === ''
      ? persons
      : persons.filter((p) => p.name.toLowerCase().includes(filter.trim().toLowerCase()));

  return (
    <div className="app">
      <h1>Phonebook</h1>

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
  );
};

export default App;