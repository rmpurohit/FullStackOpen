export default function Search({ value, onChange }) {
    return (
      <label style={{ display: 'block', marginBottom: 12 }}>
        <span style={{ marginRight: 8 }}>find countries</span>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type a country name…"
        />
      </label>
    )
  }
  