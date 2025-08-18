function Languages({ langs }) {
    const entries = Object.values(langs || {})
    if (entries.length === 0) return <p>No languages listed.</p>
    return (
      <ul>
        {entries.map(lang => <li key={lang}>{lang}</li>)}
      </ul>
    )
  }
  
  export default function CountryDetails({ country, weather }) {
    const { name, capital = [], area, flags, languages } = country
    const capitalName = capital[0]
  
    return (
      <div>
        <h1 style={{ fontSize: 48, margin: '8px 0 16px' }}>{name.common}</h1>
  
        {capitalName && <p><strong>Capital</strong> {capitalName}</p>}
        <p><strong>Area</strong> {area}</p>
  
        <h2>Languages</h2>
        <Languages langs={languages} />
  
        {flags?.svg && (
          <img
            src={flags.svg}
            alt={flags.alt || `${name.common} flag`}
            style={{ width: 300, marginTop: 16 }}
          />
        )}
  
        {capitalName && (
          <>
            <h2 style={{ marginTop: 28 }}>Weather in {capitalName}</h2>
            {!weather && <p>Loading weather…</p>}
            {weather?.error && <p>Could not load weather.</p>}
            {weather && !weather.error && (
              <div>
                <p>Temperature {weather.main.temp} Celsius</p>
                {weather.weather?.[0]?.icon && (
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={weather.weather?.[0]?.description || 'weather icon'}
                  />
                )}
                <p>Wind {weather.wind.speed} m/s</p>
              </div>
            )}
          </>
        )}
      </div>
    )
  }
  