const Filter = ({ value, onChange }) => (
  <div className="grid-2 row">
    <label htmlFor="filter">filter shown with:</label>
    <input
      id="filter"
      type="search"
      value={value}
      onChange={onChange}
      placeholder="Type a name…"
      autoComplete="off"
      aria-label="Filter people by name"
    />
  </div>
);

export default Filter;
