import { useEffect, useMemo, useRef, useState } from 'react';
import Filter from './components/Filter.jsx';
import PersonForm from './components/PersonForm.jsx';
import Persons from './components/Persons.jsx';
import Notification from './components/Notification.jsx';
import Spinner from './components/Spinner.jsx';
import { personsApi } from './services/persons.js';

// simple debounce hook to avoid filtering every keystroke
function useDebounced(value, delay = 250) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return v;
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [nameValue, setNameValue] = useState('');
  const [numberValue, setNumberValue] = useState('');
  const [filter, setFilter] = useState('');
  const debouncedFilter = useDebounced(filter, 200);
  const [message, setMessage] = useState(null); // { type: 'success' | 'error' | 'info', text }
  const [loading, setLoading] = useState(true);
  const [initialError, setInitialError] = useState(null);
  const MESSAGE_MS = 4000;
  const messageTimeoutRef = useRef(null);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    if (messageTimeoutRef.current) window.clearTimeout(messageTimeoutRef.current);
    messageTimeoutRef.current = window.setTimeout(() => setMessage(null), MESSAGE_MS);
  };

  // initial fetch
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const data = await personsApi.getAll();
        if (!mounted) return;
        setPersons(data);
      } catch (e) {
        const n = personsApi.normalizeError(e);
        if (!mounted) return;
        setInitialError(n.message);
        showMessage('error', n.message);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
      if (messageTimeoutRef.current) window.clearTimeout(messageTimeoutRef.current);
    };
  }, []);

  const resetForm = () => {
    setNameValue('');
    setNumberValue('');
  };

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
        const updated = await personsApi.update(existing.id, { number }); // backend only accepts number
        setPersons((prev) => prev.map((p) => (p.id === existing.id ? updated : p)));
        showMessage('success', `Updated number for ${updated.name}`);
      } else {
        const created = await personsApi.create({ name, number });
        setPersons((prev) => prev.concat(created));
        showMessage('success', `Added ${created.name}`);
      }
      resetForm();
    } catch (e) {
      const n = personsApi.normalizeError(e);

      if (existing && n.status === 404) {
        showMessage('error', `Information of ${existing.name} has already been removed from server`);
        setPersons((prev) => prev.filter((p) => p.id !== existing.id));
        return;
      }

      if (n.code === 'DUPLICATE_KEY') {
        showMessage('error', 'Name must be unique');
      } else if (n.code === 'VALIDATION_ERROR' || n.status === 400) {
        showMessage('error', n.message);
      } else {
        showMessage('error', n.message || 'Saving failed. Please try again.');
      }
    }
  };

  // delete person
  const handleDelete = async (person) => {
    const ok = window.confirm(`Delete ${person.name}?`);
    if (!ok) return;
    try {
      await personsApi.remove(person.id);
      setPersons((prev) => prev.filter((p) => p.id !== person.id));
      showMessage('success', `Deleted ${person.name}`);
    } catch (e) {
      const n = personsApi.normalizeError(e);
      if (n.status === 404) {
        showMessage('error', `Information of ${person.name} has already been removed from server`);
        setPersons((prev) => prev.filter((p) => p.id !== person.id));
      } else {
        showMessage('error', n.message || 'Delete failed. Please try again.');
      }
    }
  };

  const personsToShow = useMemo(() => {
    const q = debouncedFilter.trim().toLowerCase();
    if (!q) return persons;
    return persons.filter((p) => p.name.toLowerCase().includes(q));
  }, [persons, debouncedFilter]);

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

      {loading ? (
        <Spinner />
      ) : initialError ? (
        <p className="error-text">Could not load people: {initialError}</p>
      ) : (
        <Persons persons={personsToShow} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default App;
