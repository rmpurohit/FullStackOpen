export default function CountryList({ countries, onShow }) {
    return (
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {countries.map(c => (
          <li key={c.cca3} style={{ marginBottom: 6 }}>
            {c.name.common}{' '}
            <button onClick={() => onShow(c)}>Show</button>
          </li>
        ))}
      </ul>
    )
  }
  