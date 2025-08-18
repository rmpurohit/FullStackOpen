import { useEffect, useMemo, useState } from 'react'
import * as countriesApi from './services/countries'
import * as weatherApi from './services/weather'
import Search from './components/Search'
import CountryList from './components/CountryList'
import CountryDetails from './components/CountryDetails'

export default function App() {
  const [allCountries, setAllCountries] = useState([])
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)       // a full country object
  const [weather, setWeather] = useState(null)         // weather payload
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // load all countries once
  useEffect(() => {
    let cancelled = false
    setLoading(true)
    countriesApi.getAll()
      .then(data => { if (!cancelled) { setAllCountries(data); setError(null) } })
      .catch(err => !cancelled && setError('Failed to load countries'))
      .finally(() => !cancelled && setLoading(false))
    return () => { cancelled = true }
  }, [])

  // filtered list based on query (case-insensitive)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return allCountries.filter(c =>
      c.name.common.toLowerCase().includes(q)
    )
  }, [query, allCountries])

  // if there is exactly one filtered match, show it
  useEffect(() => {
    if (filtered.length === 1) setSelected(filtered[0])
    else if (filtered.length !== 1) setSelected(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered.length])

  // load weather when a single country is selected
  useEffect(() => {
    let cancelled = false
    setWeather(null)
    if (!selected) return
    const capital = selected.capital?.[0]
    if (!capital) return

    weatherApi.getByCityName(capital)
      .then(w => { if (!cancelled) setWeather(w) })
      .catch(() => { if (!cancelled) setWeather({ error: true }) })

    return () => { cancelled = true }
  }, [selected])

  const handleShow = (country) => setSelected(country)

  return (
    <div style={{ padding: 16, lineHeight: 1.5 }}>
      <Search value={query} onChange={setQuery} />

      {loading && <p>Loading countries…</p>}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      {!loading && !error && (
        <>
          {selected ? (
            <CountryDetails country={selected} weather={weather} />
          ) : (
            <>
              {query && filtered.length > 10 && (
                <p>Too many matches, specify another filter</p>
              )}

              {query && filtered.length >= 2 && filtered.length <= 10 && (
                <CountryList countries={filtered} onShow={handleShow} />
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}
